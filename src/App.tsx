import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider, useApp } from './context/AppContext'
import JoinScreen from './pages/JoinScreen'
import HomeScreen from './pages/HomeScreen'
import CategoriesScreen from './pages/CategoriesScreen'
import MenuScreen from './pages/MenuScreen'
import CheckoutScreen from './pages/CheckoutScreen'
import ConfirmationScreen from './pages/ConfirmationScreen'
import AdminScreen from './pages/AdminScreen'
import { Category } from './types'
import { ChefHat } from 'lucide-react'

function Inner() {
  const { screen, setScreen } = useApp()
  const [menuCategory, setMenuCategory] = useState<Category>('burgers')
  const [showAdmin, setShowAdmin] = useState(false)

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-bg-black relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="w-full h-full"
        >
          {screen === 'join' && <JoinScreen />}
          {screen === 'home' && <HomeScreen />}
          {screen === 'categories' && (
            <CategoriesScreen
              onSelectCategory={cat => { setMenuCategory(cat); setScreen('menu') }}
            />
          )}
          {screen === 'menu' && (
            <MenuScreen
              initialCategory={menuCategory}
              onBack={() => setScreen('categories')}
            />
          )}
          {screen === 'checkout' && <CheckoutScreen />}
          {screen === 'confirmation' && <ConfirmationScreen />}
        </motion.div>
      </AnimatePresence>

      {/* Admin button — subtle, bottom-left corner */}
      {screen !== 'join' && (
        <button
          onClick={() => setShowAdmin(true)}
          className="fixed bottom-4 right-4 z-40 text-white/10 hover:text-white/40 transition-colors p-2"
          title="מטבח שי"
        >
          <ChefHat size={18} />
        </button>
      )}

      <AnimatePresence>
        {showAdmin && <AdminScreen onClose={() => setShowAdmin(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Inner />
    </AppProvider>
  )
}
