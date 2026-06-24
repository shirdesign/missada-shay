import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock } from 'lucide-react'
import { useApp } from '../context/AppContext'

const ADMIN_CODE = 'shay'

export default function OrdersAccessBar() {
  const { adminGateOpen, openAdminGate, closeAdminGate, setScreen } = useApp()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (code.trim().toLowerCase() === ADMIN_CODE) {
      setCode('')
      setError('')
      closeAdminGate()
      setScreen('admin')
    } else {
      setError('הקוד לא נכון 🙊 נסו שוב')
    }
  }

  const handleClose = () => {
    setCode('')
    setError('')
    closeAdminGate()
  }

  return (
    <>
      {/* באנר גדול בראש כל עמוד — כניסה להזמנות של שי */}
      <button
        onClick={openAdminGate}
        className="flex-shrink-0 w-full bg-gradient-to-l from-dark-red-dark via-dark-red to-dark-red-dark text-white py-3 px-4 flex items-center justify-center gap-3 border-b-2 border-gold/60 hover:brightness-110 transition-all"
        dir="rtl"
      >
        <span className="text-2xl">👨‍🍳</span>
        <span className="font-black text-base sm:text-lg">שי — ההזמנות שלך כאן! לחצו כדי להיכנס למטבח</span>
        <Lock size={18} className="text-gold" />
      </button>

      {/* חלון הקלדת קוד */}
      <AnimatePresence>
        {adminGateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/85"
            onClick={e => e.target === e.currentTarget && handleClose()}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-bg-card rounded-3xl p-8 w-full max-w-sm gold-border shadow-2xl text-center relative"
              dir="rtl"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 left-4 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-6xl mb-3">🔒</div>
              <h2 className="text-white text-2xl font-black mb-1">כניסה למטבח שי</h2>
              <p className="text-white/50 text-sm mb-6">הקלידו את הקוד הסודי כדי לראות את ההזמנות</p>

              <input
                type="text"
                autoFocus
                value={code}
                onChange={e => { setCode(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="הקוד הסודי..."
                className="w-full bg-bg-card-2 text-white text-center text-xl font-bold tracking-widest p-4 rounded-2xl outline-none border border-white/10 focus:border-gold/60"
                dir="ltr"
              />
              {error && <p className="text-dark-red-light text-sm mt-3 font-bold">{error}</p>}

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                className="w-full mt-6 bg-dark-red hover:bg-dark-red-light text-white font-black text-lg py-4 rounded-2xl transition-colors"
              >
                כניסה 👨‍🍳
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
