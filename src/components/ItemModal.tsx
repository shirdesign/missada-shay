import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react'
import { MenuItem, Customization } from '../types'
import { BREAD_CHOICES, COOKING_LEVELS, EXTRAS, REMOVABLE_INGREDIENTS } from '../data/menu'
import { useApp } from '../context/AppContext'

interface Props {
  item: MenuItem
  onClose: () => void
}

export default function ItemModal({ item, onClose }: Props) {
  const { addToCart } = useApp()
  const [qty, setQty] = useState(1)
  const [bread, setBread] = useState('regular')
  const [cooking, setCooking] = useState('medium')
  const [extras, setExtras] = useState<string[]>([])
  const [remove, setRemove] = useState<string[]>([])
  const [showCustom, setShowCustom] = useState(false)

  const toggleExtra = (id: string) =>
    setExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id])
  const toggleRemove = (name: string) =>
    setRemove(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])

  const extrasTotal = extras.reduce((sum, id) => {
    const e = EXTRAS.find(x => x.id === id)
    return sum + (e?.price ?? 0)
  }, 0)
  const unitPrice = item.price + extrasTotal
  const total = unitPrice * qty

  const handleAdd = () => {
    const customization: Customization | undefined = item.customizable
      ? { bread, cooking, extras, remove }
      : undefined
    addToCart(item, qty, customization)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-bg-card rounded-3xl overflow-hidden w-full max-w-2xl max-h-[90vh] flex flex-col gold-border shadow-2xl"
      >
        {/* Image */}
        <div className="relative h-56 flex-shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
          >
            <X size={20} />
          </button>
          {item.chefsPick && (
            <div className="absolute top-4 right-4 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
              👨‍🍳 המלצת השף
            </div>
          )}
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          {/* Title & price */}
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-white text-2xl font-bold">{item.name}</h2>
            <span className="text-dark-red text-2xl font-black">₪{item.price}</span>
          </div>
          {item.description && (
            <p className="text-white/70 text-sm leading-relaxed mb-4">{item.description}</p>
          )}

          {/* Tags */}
          {item.tags && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {item.tags.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-dark-red/20 text-dark-red-light border border-dark-red/30">
                  {tag === 'vegetarian' ? '🌿 צמחוני' : tag === 'vegan' ? '🌱 טבעוני' : tag === 'spicy' ? '🌶️ חריף' : '🌾 ללא גלוטן'}
                </span>
              ))}
            </div>
          )}

          {/* Customization toggle */}
          {item.customizable && (
            <button
              onClick={() => setShowCustom(!showCustom)}
              className="w-full flex items-center justify-between bg-bg-card-2 rounded-xl p-4 mb-4 text-white hover:bg-white/5 transition-colors"
            >
              <span className="font-medium">התאמה אישית</span>
              {showCustom ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          )}

          <AnimatePresence>
            {showCustom && item.customizable && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {/* Bread */}
                <div className="mb-4">
                  <h4 className="text-white/60 text-xs uppercase tracking-widest mb-2">סוג לחמנייה</h4>
                  <div className="flex gap-2 flex-wrap">
                    {BREAD_CHOICES.map(b => (
                      <button
                        key={b.id}
                        onClick={() => setBread(b.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                          bread === b.id
                            ? 'bg-dark-red text-white'
                            : 'bg-bg-card-2 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cooking */}
                <div className="mb-4">
                  <h4 className="text-white/60 text-xs uppercase tracking-widest mb-2">רמת צלייה</h4>
                  <div className="flex gap-2 flex-wrap">
                    {COOKING_LEVELS.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setCooking(c.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                          cooking === c.id
                            ? 'bg-dark-red text-white'
                            : 'bg-bg-card-2 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Extras */}
                <div className="mb-4">
                  <h4 className="text-white/60 text-xs uppercase tracking-widest mb-2">תוספות</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {EXTRAS.map(e => (
                      <button
                        key={e.id}
                        onClick={() => toggleExtra(e.id)}
                        className={`px-3 py-2 rounded-xl text-sm text-right transition-colors flex items-center justify-between ${
                          extras.includes(e.id)
                            ? 'bg-dark-red text-white'
                            : 'bg-bg-card-2 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xs text-white/50">+₪{e.price}</span>
                        <span>{e.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Remove */}
                <div className="mb-4">
                  <h4 className="text-white/60 text-xs uppercase tracking-widest mb-2">הסרת רכיבים</h4>
                  <div className="flex gap-2 flex-wrap">
                    {REMOVABLE_INGREDIENTS.map(ing => (
                      <button
                        key={ing}
                        onClick={() => toggleRemove(ing)}
                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                          remove.includes(ing)
                            ? 'bg-white/20 text-white line-through'
                            : 'bg-bg-card-2 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        {ing}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex items-center gap-4">
          {/* Qty */}
          <div className="flex items-center gap-3 bg-bg-card-2 rounded-xl p-2">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-white hover:text-dark-red transition-colors">
              <Minus size={20} />
            </button>
            <span className="text-white font-bold text-lg w-6 text-center">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="text-white hover:text-dark-red transition-colors">
              <Plus size={20} />
            </button>
          </div>
          {/* Add button */}
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.97 }}
            className="flex-1 bg-dark-red hover:bg-dark-red-light text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-between px-6"
          >
            <span className="text-lg font-black">₪{total}</span>
            <span className="text-lg">הוספה להזמנה</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
