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
import OrdersAccessBar from './components/OrdersAccessBar'
import { Category } from './types'

function Inner() {
  const { screen, setScreen } = useApp()
  const [menuCategory, setMenuCategory] = useState<Category>('burgers')

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }

  // הבאנר של שי מופיע בראש כל עמוד של המסעדה (לא במסך הכניסה ולא במטבח עצמו)
  const showOrdersBar = screen !== 'join' && screen !== 'admin'

  return (
    <div className="w-screen h-screen overflow-hidden bg-bg-black relative flex flex-col">
      {showOrdersBar && <OrdersAccessBar />}
      <div className="flex-1 min-h-0 relative">
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
            {screen === 'admin' && <AdminScreen onClose={() => setScreen('home')} />}
          </motion.div>
        </AnimatePresence>
      </div>
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
