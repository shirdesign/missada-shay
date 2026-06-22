import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Search, TrendingUp, Clock, CheckCircle, Package } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Order } from '../types'

const STATUSES: Order['status'][] = ['חדשה', 'התקבלה', 'בהכנה', 'מוכנה', 'נמסרה']
const STATUS_COLORS: Record<Order['status'], string> = {
  חדשה: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  התקבלה: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  בהכנה: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  מוכנה: 'bg-green-500/20 text-green-400 border-green-500/30',
  נמסרה: 'bg-white/10 text-white/40 border-white/20',
}

interface Props { onClose: () => void }

export default function AdminScreen({ onClose }: Props) {
  const { orders, updateOrderStatus } = useApp()
  const [search, setSearch] = useState('')

  const todayOrders = orders
  const inProgress = orders.filter(o => ['התקבלה', 'בהכנה'].includes(o.status)).length
  const completed = orders.filter(o => o.status === 'נמסרה').length
  const revenue = orders.reduce((s, o) => s + o.total, 0)

  const filtered = orders.filter(o =>
    String(o.id).includes(search) ||
    String(o.tableNumber).includes(search) ||
    o.status.includes(search)
  )

  const nextStatus = (current: Order['status']): Order['status'] => {
    const idx = STATUSES.indexOf(current)
    return STATUSES[Math.min(idx + 1, STATUSES.length - 1)]
  }

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
        <h1 className="text-white font-black text-xl">פאנל ניהול - מיסאדה שי</h1>
        <div className="text-white/50 text-sm">Admin</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 px-8 py-4">
        {[
          { label: 'הזמנות היום', value: todayOrders.length, icon: Package, color: 'text-blue-400' },
          { label: 'בתהליך', value: inProgress, icon: Clock, color: 'text-orange-400' },
          { label: 'הושלמו', value: completed, icon: CheckCircle, color: 'text-green-400' },
          { label: 'הכנסות היום', value: `₪${revenue}`, icon: TrendingUp, color: 'text-gold' },
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
            placeholder="חיפוש לפי הזמנה, שולחן, סטטוס..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-bg-card text-white placeholder-white/30 pr-9 pl-4 py-3 rounded-xl text-sm outline-none border border-white/10 focus:border-dark-red/50"
            dir="rtl"
          />
        </div>
      </div>

      {/* Orders table */}
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="bg-bg-card rounded-2xl overflow-hidden gold-border">
          {/* Table header */}
          <div className="grid grid-cols-6 gap-4 px-6 py-3 border-b border-white/10 text-white/40 text-sm font-medium text-right">
            <span>סטטוס</span>
            <span>סה"כ</span>
            <span>פריטים</span>
            <span>שעה</span>
            <span>שולחן</span>
            <span>#הזמנה</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center text-white/30 py-12">
              <div className="text-4xl mb-3">📋</div>
              <p>אין הזמנות</p>
            </div>
          ) : filtered.map(order => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-white/5 text-right items-center hover:bg-white/2 transition-colors"
            >
              <div>
                <button
                  onClick={() => updateOrderStatus(order.id, nextStatus(order.status))}
                  disabled={order.status === 'נמסרה'}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors disabled:cursor-default ${STATUS_COLORS[order.status]}`}
                >
                  {order.status}
                </button>
              </div>
              <span className="text-dark-red font-bold">₪{order.total}</span>
              <span className="text-white/60 text-sm truncate">
                {order.items.map(i => `${i.menuItem.name}×${i.quantity}`).join(', ')}
              </span>
              <span className="text-white/50 text-sm">
                {order.createdAt.getHours().toString().padStart(2,'0')}:{order.createdAt.getMinutes().toString().padStart(2,'0')}
              </span>
              <span className="text-white font-medium">{order.tableNumber}</span>
              <span className="text-gold font-bold">#{order.id}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
