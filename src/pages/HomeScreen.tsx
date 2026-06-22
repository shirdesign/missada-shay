import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import CoinWallet from '../components/CoinWallet'

export default function HomeScreen() {
  const { setScreen, player } = useApp()

  return (
    <div className="relative w-full h-full overflow-hidden bg-bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1600&q=80')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Player info top-right */}
      {player && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
          <CoinWallet />
          <div className="bg-bg-card/80 backdrop-blur px-3 py-1.5 rounded-xl border border-white/10 text-white text-sm font-bold">
            {player.name}
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-between h-full py-12 px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-28 h-28 rounded-full border-2 border-gold flex items-center justify-center bg-black/60 text-6xl shadow-2xl">
            👨‍🍳
          </div>
          <h1 className="text-white text-5xl font-black tracking-wider text-shadow text-center">
            מסעדת שי
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-px w-16 bg-gold opacity-60" />
            <span className="text-gold text-sm tracking-widest font-light">המסעדה הכי טעימה בבית</span>
            <div className="h-px w-16 bg-gold opacity-60" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          {player && (
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-white/80 text-2xl font-light text-shadow mb-2"
            >
              שלום {player.name}! 👋
            </motion.p>
          )}
          <p className="text-white/60 text-lg font-light">
            שי מבשל רק בשבילכם 🍳
          </p>
          <p className="text-gold/60 text-sm mt-1">
            יש לך 🪙{player?.coins ?? 50} מטבעות שי לבזבז
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.button
            onClick={() => setScreen('categories')}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            className="bg-dark-red hover:bg-dark-red-light text-white text-2xl font-bold px-20 py-6 rounded-2xl shadow-2xl gold-border transition-colors"
          >
            לתפריט 🍽️
          </motion.button>
          <motion.button
            onClick={() => setScreen('admin')}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-sm font-medium px-6 py-3 rounded-xl border border-white/20 transition-colors"
          >
            👨‍🍳 מטבח שי — צפייה בהזמנות
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  )
}
