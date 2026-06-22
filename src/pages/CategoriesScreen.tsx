import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Category } from '../types'

const CATEGORIES: { id: Category; name: string; icon: string; image: string; desc: string }[] = [
  { id: 'burgers', name: 'כריכים ולחמים', icon: '🥪', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80', desc: 'שי מכין בעצמו!' },
  { id: 'sides', name: 'תוספות', icon: '🥗', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80', desc: 'ירקות וטעמים' },
  { id: 'drinks', name: 'שתייה', icon: '🥤', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&q=80', desc: 'שוקו, מיץ ועוד' },
  { id: 'beer', name: 'מתוקים', icon: '🍪', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&q=80', desc: 'עוגיות וגלידה' },
  { id: 'desserts', name: 'ארוחות', icon: '🍳', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80', desc: 'פנקייק ופסטה' },
  { id: 'deals', name: 'מנות מיוחדות', icon: '⭐', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80', desc: 'ארוחות משתלמות' },
]

interface Props { onSelectCategory: (cat: Category) => void }

export default function CategoriesScreen({ onSelectCategory }: Props) {
  const { setScreen, player } = useApp()

  return (
    <div className="w-full h-full bg-bg-black flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <button onClick={() => setScreen('home')} className="text-white/60 hover:text-white flex items-center gap-2 text-sm transition-colors">
          <ArrowRight size={18} />
          חזרה
        </button>
        <div className="flex items-center gap-3">
          <span className="text-2xl">👨‍🍳</span>
          <h1 className="text-white font-black text-xl">מסעדת שי</h1>
        </div>
        <div className="text-white/50 text-sm">{player?.name}</div>
      </div>

      <div className="text-center py-5">
        <h2 className="text-white text-3xl font-bold">מה תרצו לאכול? 😋</h2>
        <p className="text-white/40 text-sm mt-1">הכל עולה מטבעות שי 🪙 — לא כסף אמיתי!</p>
        <div className="h-0.5 w-16 bg-dark-red mx-auto mt-2" />
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="grid grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectCategory(cat.id)}
              className="relative overflow-hidden rounded-2xl group gold-border"
              style={{ height: '155px' }}
            >
              <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 gap-1">
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-white font-bold text-base">{cat.name}</span>
                <span className="text-white/60 text-xs">{cat.desc}</span>
              </div>
              <div className="absolute inset-0 border-2 border-dark-red opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            </motion.button>
          ))}
        </div>

        {/* Daily special */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-5 rounded-2xl overflow-hidden relative gold-border"
          style={{ height: '85px' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-dark-red-dark to-dark-red" />
          <div className="relative flex items-center justify-between h-full px-8">
            <div className="text-right">
              <div className="text-gold font-bold text-sm">🌟 מנה מיוחדת של היום</div>
              <div className="text-white font-bold text-lg">פנקייק שי + גלידה + שוקו</div>
              <div className="text-white/50 text-xs">המלצת שף שי</div>
            </div>
            <div className="text-right">
              <div className="text-white/50 line-through text-sm">🪙 12</div>
              <div className="text-gold font-black text-3xl">🪙 9</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
