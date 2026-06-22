import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { EXTRAS } from '../data/menu'

export default function CheckoutScreen() {
  const { cart, cartTotal, tableNumber, removeFromCart, submitOrder, setScreen } = useApp()
  const [notes, setNotes] = useState('')

  const getCustomLabel = (item: typeof cart[0]) => {
    const parts: string[] = []
    if (item.customization?.extras?.length) {
      parts.push(item.customization.extras.map(id => EXTRAS.find(e => e.id === id)?.name).filter(Boolean).join(', '))
    }
    if (item.customization?.remove?.length) {
      parts.push('בלי: ' + item.customization.remove.join(', '))
    }
    return parts.join(' | ')
  }

  const handleSubmit = () => {
    submitOrder(notes)
    setScreen('confirmation')
  }

  return (
    <div className="w-full h-full bg-bg-black flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <button onClick={() => setScreen('menu')} className="text-white/60 hover:text-white flex items-center gap-2 text-sm transition-colors">
          <ArrowRight size={18} />
          חזרה לתפריט
        </button>
        <h1 className="text-white font-bold text-xl">סיום הזמנה 🍽️</h1>
        <div className="text-white/50 text-sm">שולחן {tableNumber}</div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Order list */}
        <div className="flex-1 overflow-y-auto p-8">
          <h2 className="text-white font-bold text-lg mb-4">מה הזמנת?</h2>
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="bg-bg-card rounded-2xl p-4 flex items-center gap-4">
                <img src={item.menuItem.image} alt={item.menuItem.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1 text-right">
                  <div className="flex justify-between items-start">
                    <span className="text-gold font-bold">
                      {item.unitPrice * item.quantity === 0 ? 'חינם!' : `🪙${item.unitPrice * item.quantity}`}
                    </span>
                    <span className="text-white font-medium">{item.menuItem.name} × {item.quantity}</span>
                  </div>
                  {getCustomLabel(item) && (
                    <p className="text-white/40 text-xs mt-1">{getCustomLabel(item)}</p>
                  )}
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-dark-red transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="w-80 border-r border-white/10 p-8 flex flex-col gap-6">
          <div className="bg-bg-card rounded-2xl p-5">
            <h3 className="text-white font-bold mb-3 text-right">פרטי ההזמנה</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/60">
                <span className="text-white">{tableNumber}</span>
                <span>מספר שולחן</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span className="text-white">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
                <span>פריטים</span>
              </div>
            </div>
          </div>

          <div className="bg-bg-card rounded-2xl p-5">
            <h3 className="text-white font-bold mb-3 text-right">הערות לשי 📝</h3>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="בלי בצל, בלי קטשופ, בבקשה חתוך לחצאים..."
              className="w-full bg-bg-card-2 text-white placeholder-white/30 p-3 rounded-xl text-sm outline-none border border-white/10 focus:border-dark-red/50 resize-none"
              rows={4}
              dir="rtl"
            />
          </div>

          <div className="bg-bg-card rounded-2xl p-5">
            <div className="flex justify-between items-center">
              <span className="text-gold font-black text-3xl">🪙{cartTotal}</span>
              <span className="text-white font-bold text-lg">סה"כ מטבעות</span>
            </div>
            <p className="text-white/30 text-xs mt-1 text-left">לא כסף אמיתי 😄</p>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={cart.length === 0}
            className="w-full bg-dark-red hover:bg-dark-red-light disabled:opacity-40 text-white font-black py-5 rounded-2xl transition-colors text-xl shadow-2xl"
          >
            שלח הזמנה לשי! 👨‍🍳
          </motion.button>
        </div>
      </div>
    </div>
  )
}
