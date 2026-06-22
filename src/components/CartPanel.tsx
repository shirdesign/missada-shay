import { motion } from 'framer-motion'
import { X, Plus, Minus, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { EXTRAS } from '../data/menu'

interface Props { onClose: () => void }

export default function CartPanel({ onClose }: Props) {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, setScreen } = useApp()

  const getCustomLabel = (item: typeof cart[0]) => {
    const parts: string[] = []
    if (item.customization?.extras?.length) {
      parts.push(item.customization.extras.map(id => EXTRAS.find(e => e.id === id)?.name).filter(Boolean).join(', '))
    }
    if (item.customization?.remove?.length) {
      parts.push('ללא: ' + item.customization.remove.join(', '))
    }
    return parts.join(' | ')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="flex-1 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ x: -400 }}
        animate={{ x: 0 }}
        exit={{ x: -400 }}
        transition={{ type: 'spring', damping: 25 }}
        className="w-96 bg-bg-card h-full flex flex-col border-r border-white/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X size={22} />
          </button>
          <h2 className="text-white font-bold text-lg">סל ההזמנות</h2>
          {cart.length > 0 && (
            <button onClick={clearCart} className="text-dark-red text-sm hover:text-dark-red-light transition-colors">
              נקה הכל
            </button>
          )}
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center text-white/30 py-20">
              <div className="text-5xl mb-3">🛒</div>
              <p>הסל ריק</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="bg-bg-card-2 rounded-2xl p-4">
              <div className="flex gap-3">
                <img src={item.menuItem.image} alt={item.menuItem.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 text-right min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <button onClick={() => removeFromCart(item.id)} className="text-white/30 hover:text-dark-red transition-colors mt-0.5">
                      <Trash2 size={14} />
                    </button>
                    <span className="text-white font-medium text-sm">{item.menuItem.name}</span>
                  </div>
                  {getCustomLabel(item) && (
                    <p className="text-white/40 text-xs mt-1">{getCustomLabel(item)}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-dark-red font-bold">₪{item.unitPrice * item.quantity}</span>
                    <div className="flex items-center gap-2 bg-bg-card rounded-xl px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-white/60 hover:text-white transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="text-white text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-white/60 hover:text-white transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-white/10 space-y-4">
            <div className="flex justify-between text-white">
              <span className="font-black text-xl text-dark-red">₪{cartTotal}</span>
              <span className="font-bold text-lg">סה"כ</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { setScreen('checkout'); onClose() }}
              className="w-full bg-dark-red hover:bg-dark-red-light text-white font-bold py-4 rounded-xl transition-colors text-lg"
            >
              לסיום הזמנה
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
