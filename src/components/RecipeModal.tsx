import { motion } from 'framer-motion'
import { X, Clock, AlertTriangle } from 'lucide-react'
import { Recipe } from '../data/recipes'

interface Props {
  itemName: string
  itemImage?: string
  recipe?: Recipe
  onClose: () => void
}

export default function RecipeModal({ itemName, itemImage, recipe, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/85"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-bg-card rounded-3xl overflow-hidden w-full max-w-lg max-h-[90vh] flex flex-col gold-border shadow-2xl"
        dir="rtl"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-l from-dark-red-dark to-dark-red px-6 py-5 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            {itemImage ? (
              <img src={itemImage} alt={itemName} className="w-14 h-14 rounded-2xl object-cover border-2 border-white/30 flex-shrink-0" />
            ) : (
              <span className="text-5xl">{recipe?.emoji ?? '👨‍🍳'}</span>
            )}
            <div className="text-right">
              <div className="text-white/70 text-xs font-bold">איך מכינים? {recipe?.emoji}</div>
              <h2 className="text-white text-2xl font-black leading-tight">{itemName}</h2>
            </div>
          </div>
        </div>

        {!recipe ? (
          <div className="p-10 text-center text-white/50">
            <div className="text-5xl mb-3">🤔</div>
            <p className="text-lg">אין עדיין מתכון למנה הזו.</p>
            <p className="text-sm mt-1">שי, תשאל אמא או אבא איך מכינים! 😊</p>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1 p-6 space-y-5">
            {/* Info chips */}
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 bg-bg-card-2 text-white/80 text-sm font-bold px-3 py-1.5 rounded-full">
                <Clock size={14} className="text-gold" />
                {recipe.time}
              </span>
              <span className="bg-bg-card-2 text-white/80 text-sm font-bold px-3 py-1.5 rounded-full">
                ⭐ {recipe.difficulty}
              </span>
            </div>

            {recipe.needsGrownup && (
              <div className="flex items-center gap-2 bg-gold/10 border border-gold/40 rounded-2xl p-3">
                <AlertTriangle size={20} className="text-gold flex-shrink-0" />
                <span className="text-gold text-sm font-bold">
                  שלב עם אש/תנור — חשוב לבקש עזרה ממבוגר! 🧑‍🍳
                </span>
              </div>
            )}

            {/* Ingredients */}
            <div>
              <h3 className="text-white font-black text-lg mb-3 flex items-center gap-2">
                🧺 מה צריך?
              </h3>
              <div className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <div key={i} className="flex items-center gap-3 bg-bg-card-2 rounded-xl px-4 py-2.5">
                    <span className="text-gold text-lg">✔</span>
                    <span className="text-white text-base">{ing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div>
              <h3 className="text-white font-black text-lg mb-3 flex items-center gap-2">
                👣 שלבי ההכנה
              </h3>
              <div className="space-y-3">
                {recipe.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-dark-red text-white font-black text-lg flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-white text-base leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dark-red/10 border border-dark-red/20 rounded-2xl p-4 text-center">
              <p className="text-white/80 text-base font-bold">בתאבון! 😋 כל הכבוד שף שי! 👨‍🍳</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
