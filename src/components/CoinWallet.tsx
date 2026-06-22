import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function CoinWallet({ cartTotal = 0 }: { cartTotal?: number }) {
  const { player } = useApp()
  if (!player) return null

  const after = player.coins - cartTotal
  const low = player.coins <= 10

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-bold ${
        low
          ? 'bg-red-900/30 border-red-500/40 text-red-400'
          : 'bg-gold/10 border-gold/30 text-gold'
      }`}
    >
      <span className="text-base">🪙</span>
      <span>{player.coins}</span>
      <AnimatePresence>
        {cartTotal > 0 && (
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className={`text-xs ${after < 0 ? 'text-red-400' : 'text-white/40'}`}
          >
            → {Math.max(0, after)}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
