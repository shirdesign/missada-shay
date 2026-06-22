import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function CartBadge({ onClick }: { onClick: () => void }) {
  const { cartCount, cartTotal } = useApp()

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-dark-red text-white px-6 py-4 rounded-2xl shadow-2xl gold-border"
      style={{ display: cartCount === 0 ? 'none' : 'flex' }}
    >
      <div className="relative">
        <ShoppingCart size={26} />
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-gold text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
            >
              {cartCount}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="text-right">
        <div className="text-xs text-white/70">סל ההזמנות</div>
        <div className="font-bold text-lg">₪{cartTotal}</div>
      </div>
    </motion.button>
  )
}
