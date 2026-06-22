import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

const AVATARS = ['😄', '🤩', '😎', '🥳', '🤗', '😜', '🧑‍🍳', '👸', '🦸', '🐱']

export default function JoinScreen() {
  const { joinAsPlayer } = useApp()
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('😄')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleJoin = async () => {
    const trimmed = name.trim()
    if (!trimmed) { setError('תכתוב את השם שלך!'); return }
    setLoading(true)
    try {
      await joinAsPlayer(`${avatar} ${trimmed}`)
    } catch {
      setError('משהו השתבש, נסה שוב')
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-bg-black flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1200&q=80')` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-black via-transparent to-bg-black" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-bg-card rounded-3xl p-8 w-full max-w-sm mx-4 gold-border shadow-2xl text-center"
      >
        {/* Logo */}
        <div className="text-6xl mb-2">👨‍🍳</div>
        <h1 className="text-white text-3xl font-black mb-1">מסעדת שי</h1>
        <p className="text-white/40 text-sm mb-6">המסעדה הכי טעימה בבית</p>

        {/* Coins teaser */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="bg-gold/10 border border-gold/30 rounded-2xl p-4 mb-6"
        >
          <div className="text-4xl mb-1">🪙</div>
          <div className="text-gold font-black text-2xl">50 מטבעות שי!</div>
          <div className="text-white/50 text-xs mt-1">מתנה להצטרפות — לא כסף אמיתי 😄</div>
        </motion.div>

        {/* Avatar picker */}
        <div className="mb-4">
          <p className="text-white/50 text-xs mb-2">בחר אווטאר</p>
          <div className="flex flex-wrap justify-center gap-2">
            {AVATARS.map(a => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`text-2xl w-10 h-10 rounded-xl transition-all ${
                  avatar === a ? 'bg-dark-red scale-110' : 'bg-bg-card-2 hover:bg-white/10'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Name input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="מה השם שלך?"
            value={name}
            onChange={e => { setName(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleJoin()}
            className="w-full bg-bg-card-2 text-white placeholder-white/30 text-center text-lg font-bold p-4 rounded-2xl outline-none border border-white/10 focus:border-dark-red/60"
            dir="rtl"
            maxLength={20}
          />
          {error && <p className="text-dark-red text-sm mt-2">{error}</p>}
        </div>

        {/* Join button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleJoin}
          disabled={loading}
          className="w-full bg-dark-red hover:bg-dark-red-light disabled:opacity-50 text-white font-black text-xl py-4 rounded-2xl transition-colors shadow-lg"
        >
          {loading ? '⏳ נכנסים...' : 'בואו נזמין! 🍽️'}
        </motion.button>

        <p className="text-white/20 text-xs mt-4">
          כל לקוח מקבל 50 מטבעות שי להוצאה במסעדה
        </p>
      </motion.div>
    </div>
  )
}
