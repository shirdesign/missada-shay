import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ConfirmationScreen() {
  const { lastOrder, setScreen } = useApp()
  if (!lastOrder) return null

  return (
    <div className="w-full h-full bg-bg-black flex items-center justify-center p-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: '110vh', opacity: [0, 1, 1, 0] }}
            transition={{ delay: i * 0.15, duration: 3 + Math.random() * 2, ease: 'linear' }}
            className="absolute text-2xl"
            style={{ left: `${Math.random() * 100}%` }}
          >
            {['🎉', '🍔', '⭐', '🔥', '✨'][i % 5]}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="bg-bg-card rounded-3xl p-10 max-w-xl w-full text-center gold-border shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <CheckCircle size={80} className="text-dark-red" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-2 -right-2 text-3xl"
            >
              🍔
            </motion.div>
          </div>
        </motion.div>

        <h1 className="text-white text-3xl font-black mb-2">ההזמנה נשלחה בהצלחה למטבח!</h1>
        <p className="text-white/50 mb-8">הצוות שלנו מכין את הארוחה שלך</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-bg-card-2 rounded-2xl p-4">
            <div className="text-white/50 text-xs mb-1">מספר הזמנה</div>
            <div className="text-gold font-black text-2xl">#{lastOrder.id}</div>
          </div>
          <div className="bg-bg-card-2 rounded-2xl p-4">
            <div className="text-white/50 text-xs mb-1">זמן הכנה משוער</div>
            <div className="text-white font-black text-2xl">{lastOrder.estimatedTime} דק'</div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-bg-card-2 rounded-2xl p-4 mb-6 text-right">
          <h3 className="text-white/60 text-sm mb-3">פריטים שהוזמנו</h3>
          <div className="space-y-2">
            {lastOrder.items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-dark-red font-bold">₪{item.unitPrice * item.quantity}</span>
                <span className="text-white">{item.menuItem.name} × {item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 mt-3 pt-3 flex justify-between font-bold">
            <span className="text-dark-red text-lg">₪{lastOrder.total}</span>
            <span className="text-white">סה"כ</span>
          </div>
        </div>

        {lastOrder.notes && (
          <div className="bg-bg-card-2 rounded-xl p-3 mb-6 text-right">
            <span className="text-white/50 text-xs">הערות: </span>
            <span className="text-white text-sm">{lastOrder.notes}</span>
          </div>
        )}

        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setScreen('home')}
            className="flex-1 bg-bg-card-2 text-white py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
          >
            הזמנה חדשה
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setScreen('categories')}
            className="flex-1 bg-dark-red text-white py-4 rounded-xl font-bold hover:bg-dark-red-light transition-colors"
          >
            חזרה לתפריט
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
