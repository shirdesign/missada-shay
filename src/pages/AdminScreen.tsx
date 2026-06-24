import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, TrendingUp, Clock, CheckCircle, Package, Wifi, ChefHat } from 'lucide-react'
import { supabase, DbOrder, DbOrderItem } from '../lib/supabase'
import { Order } from '../types'
import { RECIPES, Recipe } from '../data/recipes'
import RecipeModal from '../components/RecipeModal'

// איחוד פריטים זהים בהזמנה — מציג כל מנה פעם אחת עם מספר הכמות לידה
interface GroupedItem {
  item_id: string
  item_name: string
  item_image: string
  quantity: number
}
function groupItems(items: DbOrderItem[]): GroupedItem[] {
  const map = new Map<string, GroupedItem>()
  for (const it of items) {
    const existing = map.get(it.item_id)
    if (existing) existing.quantity += it.quantity
    else map.set(it.item_id, {
      item_id: it.item_id,
      item_name: it.item_name,
      item_image: it.item_image,
      quantity: it.quantity,
    })
  }
  return [...map.values()]
}

const STATUSES: Order['status'][] = ['חדשה', 'התקבלה', 'בהכנה', 'מוכנה', 'נמסרה']
const STATUS_COLORS: Record<string, string> = {
  חדשה: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  התקבלה: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  בהכנה: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  מוכנה: 'bg-green-500/20 text-green-400 border-green-500/30',
  נמסרה: 'bg-white/10 text-white/40 border-white/20',
}

interface LiveOrder extends DbOrder {
  items: DbOrderItem[]
}

interface Props { onClose: () => void }

export default function AdminScreen({ onClose }: Props) {
  const [orders, setOrders] = useState<LiveOrder[]>([])
  const [search, setSearch] = useState('')
  const [connected, setConnected] = useState(false)
  const [newOrderId, setNewOrderId] = useState<string | null>(null)
  const [recipeItem, setRecipeItem] = useState<{ name: string; image: string; recipe?: Recipe } | null>(null)

  // Load existing orders + realtime
  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false })
        .limit(50)
      if (data) {
        setOrders(data.map((o: DbOrder & { order_items: DbOrderItem[] }) => ({
          ...o,
          items: o.order_items ?? [],
        })))
      }
      setConnected(true)
    }
    fetchOrders()

    // Realtime subscription
    const channel = supabase
      .channel('admin-orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, async (payload) => {
        const newOrder = payload.new as DbOrder
        // fetch items
        const { data: items } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', newOrder.id)
        setOrders(prev => [{ ...newOrder, items: items ?? [] }, ...prev])
        setNewOrderId(newOrder.id)
        setTimeout(() => setNewOrderId(null), 4000)
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
        const updated = payload.new as DbOrder
        setOrders(prev => prev.map(o => o.id === updated.id ? { ...o, ...updated } : o))
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const updateStatus = async (id: string, current: string) => {
    const idx = STATUSES.indexOf(current as Order['status'])
    const next = STATUSES[Math.min(idx + 1, STATUSES.length - 1)]
    await supabase.from('orders').update({ status: next }).eq('id', id)
  }

  const filtered = orders.filter(o =>
    o.id.includes(search) ||
    String(o.table_number).includes(search) ||
    o.status.includes(search) ||
    o.player_name.includes(search)
  )

  const inProgress = orders.filter(o => ['התקבלה', 'בהכנה'].includes(o.status)).length
  const completed = orders.filter(o => o.status === 'נמסרה').length
  const totalCoins = orders.reduce((s, o) => s + o.total_coins, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-bg-black flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
          <X size={22} />
        </button>
        <div className="flex items-center gap-3">
          <span className="text-2xl">👨‍🍳</span>
          <h1 className="text-white font-black text-xl">מטבח מסעדת שי</h1>
          <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${connected ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/30'}`}>
            <Wifi size={10} />
            {connected ? 'מחובר' : 'מתחבר...'}
          </div>
        </div>
        <div className="text-white/30 text-xs">מתעדכן בזמן אמת 🔴</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 px-8 py-4">
        {[
          { label: 'הזמנות היום', value: orders.length, icon: Package, color: 'text-blue-400' },
          { label: 'בהכנה', value: inProgress, icon: Clock, color: 'text-orange-400' },
          { label: 'הוגשו', value: completed, icon: CheckCircle, color: 'text-green-400' },
          { label: 'מטבעות שי', value: `🪙${totalCoins}`, icon: TrendingUp, color: 'text-gold' },
        ].map(stat => (
          <div key={stat.label} className="bg-bg-card rounded-2xl p-5 gold-border">
            <div className="flex items-center justify-between mb-2">
              <stat.icon size={22} className={stat.color} />
              <span className="text-white/50 text-sm">{stat.label}</span>
            </div>
            <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="px-8 pb-3">
        <div className="relative">
          <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-white/40" />
          <input
            type="text"
            placeholder="חיפוש לפי שם, הזמנה, שולחן..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-bg-card text-white placeholder-white/30 pr-9 pl-4 py-3 rounded-xl text-sm outline-none border border-white/10 focus:border-dark-red/50"
            dir="rtl"
          />
        </div>
      </div>

      {/* Orders */}
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        {filtered.length === 0 ? (
          <div className="text-center text-white/30 py-20">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-lg">אין הזמנות עדיין...</p>
            <p className="text-sm mt-1">שי מחכה ללקוחות הראשונים!</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map(order => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`bg-bg-card rounded-2xl p-5 gold-border transition-all ${
                    newOrderId === order.id ? 'ring-2 ring-gold ring-offset-2 ring-offset-bg-black' : ''
                  }`}
                >
                  {newOrderId === order.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-gold text-xs font-bold mb-2 flex items-center gap-1"
                    >
                      🔔 הזמנה חדשה!
                    </motion.div>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: status + meta */}
                    <div className="flex flex-col gap-2 items-start">
                      <button
                        onClick={() => updateStatus(order.id, order.status)}
                        disabled={order.status === 'נמסרה'}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors disabled:cursor-default ${STATUS_COLORS[order.status]}`}
                      >
                        {order.status} {order.status !== 'נמסרה' ? '→' : '✓'}
                      </button>
                      <div className="text-white/30 text-xs">
                        {new Date(order.created_at).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    {/* Middle: items */}
                    <div className="flex-1 text-right">
                      <div className="flex items-center justify-end gap-3 mb-2">
                        <div className="text-white font-bold">{order.player_name}</div>
                        <div className="text-white/40 text-sm">שולחן {order.table_number}</div>
                        <div className="text-gold font-black">#{order.id}</div>
                      </div>
                      <div className="space-y-1.5">
                        {groupItems(order.items).map(item => (
                          <div key={item.item_id} className="flex items-center justify-end gap-2 text-sm">
                            <button
                              onClick={() => setRecipeItem({ name: item.item_name, image: item.item_image, recipe: RECIPES[item.item_id] })}
                              className="flex items-center gap-1 bg-dark-red/80 hover:bg-dark-red text-white text-xs font-bold px-2.5 py-1 rounded-lg transition-colors"
                            >
                              <ChefHat size={13} />
                              להכנה
                            </button>
                            <span className="text-white/60">{item.item_name}</span>
                            <span className="flex-shrink-0 min-w-[1.5rem] h-6 px-1.5 bg-gold/20 text-gold font-black rounded-md flex items-center justify-center text-xs">
                              ×{item.quantity}
                            </span>
                            <img src={item.item_image} alt="" className="w-7 h-7 rounded-lg object-cover" />
                          </div>
                        ))}
                      </div>
                      {order.notes && (
                        <div className="mt-2 bg-bg-card-2 rounded-lg px-3 py-1.5 text-white/50 text-xs text-right">
                          📝 {order.notes}
                        </div>
                      )}
                    </div>

                    {/* Right: coins */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-gold font-black text-xl">🪙{order.total_coins}</div>
                      <div className="text-white/30 text-xs">{order.estimated_time} דק׳</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* חלון מתכון ושלבי הכנה — פשוט לילדים */}
      <AnimatePresence>
        {recipeItem && (
          <RecipeModal
            itemName={recipeItem.name}
            itemImage={recipeItem.image}
            recipe={recipeItem.recipe}
            onClose={() => setRecipeItem(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
