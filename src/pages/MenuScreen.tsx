import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Search, ShoppingCart, Star, Flame, ChefHat } from 'lucide-react'
import { MenuItem, Category } from '../types'
import { MENU_ITEMS } from '../data/menu'
import { useApp } from '../context/AppContext'
import ItemModal from '../components/ItemModal'
import CartPanel from '../components/CartPanel'

const CATEGORY_LABELS: Record<Category, string> = {
  burgers: '🍔 המבורגרים',
  sides: '🍟 תוספות',
  drinks: '🥤 שתייה קלה',
  beer: '🍺 בירות',
  desserts: '🍰 קינוחים',
  deals: '🔥 עסקאות',
}

const DIET_FILTERS = [
  { id: 'vegetarian', label: '🌿 צמחוני' },
  { id: 'vegan', label: '🌱 טבעוני' },
  { id: 'spicy', label: '🌶️ חריף' },
  { id: 'glutenfree', label: '🌾 ללא גלוטן' },
]

interface Props {
  initialCategory: Category
  onBack: () => void
}

export default function MenuScreen({ initialCategory, onBack }: Props) {
  const { cartCount, cartTotal, tableNumber } = useApp()
  const [category, setCategory] = useState<Category>(initialCategory)
  const [search, setSearch] = useState('')
  const [dietFilter, setDietFilter] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [showCart, setShowCart] = useState(false)
  const [activeSection, setActiveSection] = useState<'category' | 'featured' | 'bestseller' | 'chef'>('category')

  const filtered = useMemo(() => {
    let items = activeSection === 'featured'
      ? MENU_ITEMS.filter(i => i.featured)
      : activeSection === 'bestseller'
      ? MENU_ITEMS.filter(i => i.bestseller)
      : activeSection === 'chef'
      ? MENU_ITEMS.filter(i => i.chefsPick)
      : MENU_ITEMS.filter(i => i.category === category)

    if (search) {
      const q = search.toLowerCase()
      items = items.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
    }
    if (dietFilter.length > 0) {
      items = items.filter(i => dietFilter.every(f => i.tags?.includes(f as 'vegetarian' | 'vegan' | 'spicy' | 'glutenfree')))
    }
    return items
  }, [category, search, dietFilter, activeSection])

  return (
    <div className="w-full h-full bg-bg-black flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 flex-shrink-0">
        <button onClick={onBack} className="text-white/60 hover:text-white flex items-center gap-2 text-sm transition-colors">
          <ArrowRight size={18} />
          קטגוריות
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xl">🍔</span>
          <span className="text-white font-black">מיסאדה שי</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/50 text-sm">שולחן {tableNumber}</span>
          {cartCount > 0 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCart(true)}
              className="flex items-center gap-2 bg-dark-red text-white px-4 py-2 rounded-xl text-sm font-bold"
            >
              <ShoppingCart size={16} />
              <span>{cartCount} פריטים • ₪{cartTotal}</span>
            </motion.button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - categories */}
        <div className="w-48 flex-shrink-0 border-l border-white/10 overflow-y-auto bg-bg-card">
          <div className="p-3 space-y-1">
            <button
              onClick={() => setActiveSection('featured')}
              className={`w-full text-right px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                activeSection === 'featured' ? 'bg-dark-red text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Star size={14} />
              המומלצים
            </button>
            <button
              onClick={() => setActiveSection('bestseller')}
              className={`w-full text-right px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                activeSection === 'bestseller' ? 'bg-dark-red text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Flame size={14} />
              הכי נמכרים
            </button>
            <button
              onClick={() => setActiveSection('chef')}
              className={`w-full text-right px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                activeSection === 'chef' ? 'bg-dark-red text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <ChefHat size={14} />
              המלצת שף
            </button>

            <div className="h-px bg-white/10 my-2" />

            {(Object.keys(CATEGORY_LABELS) as Category[]).map(cat => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setActiveSection('category') }}
                className={`w-full text-right px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === 'category' && category === cat
                    ? 'bg-dark-red text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search & filters */}
          <div className="px-5 py-3 border-b border-white/10 flex-shrink-0 space-y-2">
            <div className="relative">
              <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-white/40" />
              <input
                type="text"
                placeholder="חיפוש מנה..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-bg-card-2 text-white placeholder-white/30 pr-9 pl-4 py-2.5 rounded-xl text-sm outline-none border border-white/10 focus:border-dark-red/50"
                dir="rtl"
              />
            </div>
            <div className="flex gap-2">
              {DIET_FILTERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setDietFilter(prev =>
                    prev.includes(f.id) ? prev.filter(x => x !== f.id) : [...prev, f.id]
                  )}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    dietFilter.includes(f.id)
                      ? 'bg-dark-red text-white'
                      : 'bg-bg-card-2 text-white/50 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section title */}
          <div className="px-5 py-3 flex-shrink-0">
            <h2 className="text-white font-bold text-lg">
              {activeSection === 'featured' ? '⭐ המומלצים שלנו' :
               activeSection === 'bestseller' ? '🔥 הכי נמכרים' :
               activeSection === 'chef' ? '👨‍🍳 המלצת השף' :
               CATEGORY_LABELS[category]}
            </h2>
          </div>

          {/* Items grid */}
          <div className="flex-1 overflow-y-auto px-5 pb-5">
            <div className="grid grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                {filtered.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedItem(item)}
                    className="bg-bg-card rounded-2xl overflow-hidden text-right gold-border group hover:border-dark-red/50 transition-colors"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent" />
                      <div className="absolute top-2 right-2 flex gap-1 flex-wrap justify-end">
                        {item.chefsPick && <span className="bg-gold text-black text-xs px-2 py-0.5 rounded-full font-bold">שף</span>}
                        {item.bestseller && <span className="bg-dark-red text-white text-xs px-2 py-0.5 rounded-full font-bold">🔥</span>}
                        {item.featured && !item.bestseller && <span className="bg-dark-red/80 text-white text-xs px-2 py-0.5 rounded-full">⭐</span>}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-dark-red font-black text-lg">₪{item.price}</span>
                        <span className="text-white font-bold text-sm leading-snug">{item.name}</span>
                      </div>
                      {item.description && (
                        <p className="text-white/50 text-xs mt-1 line-clamp-2 text-right">{item.description}</p>
                      )}
                      {item.tags && (
                        <div className="flex gap-1 mt-2 justify-end flex-wrap">
                          {item.tags.map(t => (
                            <span key={t} className="text-xs bg-white/5 text-white/40 px-2 py-0.5 rounded-full">
                              {t === 'vegetarian' ? '🌿' : t === 'vegan' ? '🌱' : t === 'spicy' ? '🌶️' : '🌾'}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>

              {filtered.length === 0 && (
                <div className="col-span-2 text-center py-16 text-white/30">
                  <div className="text-5xl mb-4">🔍</div>
                  <p>לא נמצאו תוצאות</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Item modal */}
      <AnimatePresence>
        {selectedItem && (
          <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>

      {/* Cart panel */}
      <AnimatePresence>
        {showCart && <CartPanel onClose={() => setShowCart(false)} />}
      </AnimatePresence>

      {/* Floating cart button */}
      {cartCount > 0 && !showCart && (
        <motion.button
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 left-6 bg-dark-red text-white px-6 py-4 rounded-2xl shadow-2xl gold-border flex items-center gap-3"
        >
          <ShoppingCart size={22} />
          <div className="text-right">
            <div className="text-xs text-white/70">סל ההזמנות</div>
            <div className="font-bold">₪{cartTotal} • {cartCount} פריטים</div>
          </div>
        </motion.button>
      )}
    </div>
  )
}
