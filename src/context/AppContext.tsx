import React, { createContext, useContext, useState, useCallback } from 'react'
import { CartItem, MenuItem, Customization, Order, Screen } from '../types'
import { EXTRAS } from '../data/menu'

interface AppContextType {
  screen: Screen
  setScreen: (s: Screen) => void
  tableNumber: number
  cart: CartItem[]
  addToCart: (item: MenuItem, qty: number, customization?: Customization) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  orders: Order[]
  submitOrder: (notes: string) => Order
  updateOrderStatus: (id: string, status: Order['status']) => void
  lastOrder: Order | null
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<Screen>('home')
  const [tableNumber] = useState(Math.floor(Math.random() * 20) + 1)
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [lastOrder, setLastOrder] = useState<Order | null>(null)

  const calcItemPrice = (item: MenuItem, customization?: Customization) => {
    let price = item.price
    if (customization?.extras) {
      customization.extras.forEach(extraId => {
        const extra = EXTRAS.find(e => e.id === extraId)
        if (extra) price += extra.price
      })
    }
    return price
  }

  const addToCart = useCallback((item: MenuItem, qty: number, customization?: Customization) => {
    const unitPrice = calcItemPrice(item, customization)
    const cartItemId = `${item.id}-${Date.now()}`
    setCart(prev => [...prev, { id: cartItemId, menuItem: item, quantity: qty, customization, unitPrice }])
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(i => i.id !== id))
    } else {
      setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
    }
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartTotal = cart.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  const submitOrder = useCallback((notes: string): Order => {
    const order: Order = {
      id: String(Date.now()).slice(-6),
      tableNumber,
      items: [...cart],
      total: cartTotal,
      notes,
      status: 'חדשה',
      createdAt: new Date(),
      estimatedTime: Math.floor(Math.random() * 10) + 15,
    }
    setOrders(prev => [order, ...prev])
    setLastOrder(order)
    setCart([])
    return order
  }, [cart, cartTotal, tableNumber])

  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }, [])

  return (
    <AppContext.Provider value={{
      screen, setScreen, tableNumber, cart, addToCart, removeFromCart,
      updateQuantity, clearCart, cartTotal, cartCount, orders, submitOrder,
      updateOrderStatus, lastOrder,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp outside provider')
  return ctx
}
