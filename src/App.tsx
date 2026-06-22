import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider, useApp } from './context/AppContext'
import HomeScreen from './pages/HomeScreen'
import CategoriesScreen from './pages/CategoriesScreen'
import MenuScreen from './pages/MenuScreen'
import CheckoutScreen from './pages/CheckoutScreen'
import ConfirmationScreen from './pages/ConfirmationScreen'
import AdminScreen from './pages/AdminScreen'
import { Category } from './types'
import { Settings } from 'lucide-react'

function Inner() {
  const { screen, setScreen } = useApp()
  const [menuCategory, setMenuCategory] = useState<Category>('burgers')
  const [showAdmin, setShowAdmin] = useState(false)
  const [adminTap, setAdminTap] = useState(0)

  const handleAdminTap = () => {
    const next = adminTap + 1
    setAdminTap(next)
    if (next >= 5) { setShowAdmin(true); setAdminTap(0) }
    setTimeout(() => setAdminTap(0), 3000)
  }

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
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
          transition={{ duration: 0.25 }}
          className="w-full h-full"
        >
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

      {/* Hidden admin button (5 taps on logo area) */}
      <button
        onClick={handleAdminTap}
        className="fixed top-2 right-2 z-40 opacity-0 w-12 h-12"
        aria-hidden
      />

      {/* Visible admin icon for dev */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed top-3 left-3 z-40 text-white/10 hover:text-white/40 transition-colors"
        title="Admin"
      >
        <Settings size={18} />
      </button>

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
