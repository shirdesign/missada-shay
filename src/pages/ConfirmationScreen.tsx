import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function ConfirmationScreen() {
  const { lastOrder, setScreen } = useApp()
  if (!lastOrder) return null

  return (
    <div className="w-full h-full bg-bg-black flex items-center justify-center p-8">
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: '110vh', opacity: [0, 1, 1, 0] }}
            transition={{ delay: i * 0.12, duration: 3 + (i % 3) * 0.5, ease: 'linear' }}
            className="absolute text-2xl"
            style={{ left: `${(i * 4.2) % 100}%` }}
          >
            {['🎉', '🍳', '⭐', '🪙', '✨', '🎊', '🥪', '😋'][i % 8]}
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
          className="text-8xl mb-4"
        >
          👨‍🍳
        </motion.div>

        <h1 className="text-white text-3xl font-black mb-1">ההזמנה נשלחה לשי!</h1>
        <p className="text-white/50 mb-6 text-lg">שי הולך למטבח עכשיו להכין... 🍳</p>

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
          <h3 className="text-white/60 text-sm mb-3">מה הזמנת?</h3>
          <div className="space-y-2">
            {lastOrder.items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gold font-bold">
                  {item.unitPrice * item.quantity === 0 ? 'חינם!' : `🪙${item.unitPrice * item.quantity}`}
                </span>
                <span className="text-white">{item.menuItem.name} × {item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 mt-3 pt-3 flex justify-between font-bold">
            <span className="text-gold text-lg">🪙{lastOrder.total}</span>
            <span className="text-white">סה"כ מטבעות שי</span>
          </div>
        </div>

        {lastOrder.notes && (
          <div className="bg-bg-card-2 rounded-xl p-3 mb-6 text-right">
            <span className="text-white/50 text-xs">הערות: </span>
            <span className="text-white text-sm">{lastOrder.notes}</span>
          </div>
        )}

        <div className="bg-dark-red/10 border border-dark-red/20 rounded-xl p-3 mb-6">
          <p className="text-white/60 text-sm">🪙 זכרו — מטבעות שי הם לא כסף אמיתי! זה רק משחק 😄</p>
        </div>

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
