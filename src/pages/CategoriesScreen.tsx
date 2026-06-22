import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Category } from '../types'

const CATEGORIES: { id: Category; name: string; icon: string; image: string; desc: string }[] = [
  { id: 'burgers', name: 'המבורגרים', icon: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80', desc: '7 סוגי בורגר פרמיום' },
  { id: 'sides', name: 'תוספות', icon: '🍟', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80', desc: 'תוספות טריות ומגוונות' },
  { id: 'drinks', name: 'שתייה קלה', icon: '🥤', image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&q=80', desc: 'משקאות קרים ורעננים' },
  { id: 'beer', name: 'בירות', icon: '🍺', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&q=80', desc: 'בירות מובחרות מהחבית' },
  { id: 'desserts', name: 'קינוחים', icon: '🍰', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80', desc: 'סיום מתוק לארוחה' },
  { id: 'deals', name: 'עסקאות', icon: '🔥', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80', desc: 'ארוחות משתלמות' },
]

interface Props { onSelectCategory: (cat: Category) => void }

export default function CategoriesScreen({ onSelectCategory }: Props) {
  const { setScreen, tableNumber } = useApp()

  return (
    <div className="w-full h-full bg-bg-black flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <button onClick={() => setScreen('home')} className="text-white/60 hover:text-white flex items-center gap-2 text-sm transition-colors">
          <ArrowRight size={18} />
          חזרה
        </button>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🍔</span>
          <h1 className="text-white font-black text-xl">מיסאדה שי</h1>
        </div>
        <div className="text-white/50 text-sm">שולחן {tableNumber}</div>
      </div>

      {/* Title */}
      <div className="text-center py-6">
        <h2 className="text-white text-3xl font-bold">בחרו קטגוריה</h2>
        <div className="h-0.5 w-16 bg-dark-red mx-auto mt-2" />
      </div>

      {/* Category Grid */}
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
              style={{ height: '160px' }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 gap-1">
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-white font-bold text-lg">{cat.name}</span>
                <span className="text-white/60 text-xs">{cat.desc}</span>
              </div>
              <div className="absolute inset-0 border-2 border-dark-red opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            </motion.button>
          ))}
        </div>

        {/* Daily Special */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-5 rounded-2xl overflow-hidden relative gold-border"
          style={{ height: '90px' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-dark-red-dark to-dark-red" />
          <div className="relative flex items-center justify-between h-full px-8">
            <div>
              <div className="text-gold font-bold text-sm tracking-widest uppercase">מבצע היום</div>
              <div className="text-white font-bold text-lg">טראפל בורגר + צ'יפס בטטה + בירת ווינשטפן</div>
              <div className="text-white/60 text-sm">המלצת השף</div>
            </div>
            <div className="text-right">
              <div className="text-white/50 line-through text-sm">₪138</div>
              <div className="text-gold font-black text-3xl">₪99</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
