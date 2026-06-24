import React, { createContext, useContext, useState, useCallback } from 'react'
import { CartItem, MenuItem, Customization, Order, Screen, Player } from '../types'
import { EXTRAS } from '../data/menu'
import { supabase } from '../lib/supabase'

const STARTING_COINS = 50

interface AppContextType {
  screen: Screen
  setScreen: (s: Screen) => void
  player: Player | null
  joinAsPlayer: (name: string) => Promise<void>
  cart: CartItem[]
  addToCart: (item: MenuItem, qty: number, customization?: Customization) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  canAfford: boolean
  orders: Order[]
  submitOrder: (notes: string) => Promise<Order>
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>
  lastOrder: Order | null
  adminGateOpen: boolean
  openAdminGate: () => void
  closeAdminGate: () => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<Screen>('join')
  const [player, setPlayer] = useState<Player | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [lastOrder, setLastOrder] = useState<Order | null>(null)
  const [adminGateOpen, setAdminGateOpen] = useState(false)

  const openAdminGate = useCallback(() => setAdminGateOpen(true), [])
  const closeAdminGate = useCallback(() => setAdminGateOpen(false), [])

  const joinAsPlayer = useCallback(async (name: string) => {
    const { data, error } = await supabase
      .from('players')
      .insert({ name, coins: STARTING_COINS })
      .select()
      .single()
    if (error) throw error
    setPlayer({ id: data.id, name: data.name, coins: data.coins })
    setScreen('home')
  }, [])

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
    const customKey = JSON.stringify(customization ?? null)
    setCart(prev => {
      // אם כבר יש פריט זהה (אותה מנה ואותן בקשות) — מגדילים את הכמות במקום לפתוח שורה חדשה
      const existing = prev.find(
        i => i.menuItem.id === item.id && JSON.stringify(i.customization ?? null) === customKey
      )
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + qty } : i)
      }
      return [...prev, {
        id: `${item.id}-${Date.now()}`,
        menuItem: item,
        quantity: qty,
        customization,
        unitPrice,
      }]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) setCart(prev => prev.filter(i => i.id !== id))
    else setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartTotal = cart.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)
  const canAfford = !player || player.coins >= cartTotal

  const submitOrder = useCallback(async (notes: string): Promise<Order> => {
    if (!player) throw new Error('No player')

    const orderId = String(Date.now()).slice(-6)
    const estimatedTime = Math.floor(Math.random() * 10) + 10
    const tableNumber = Math.floor(Math.random() * 8) + 1

    // Insert order
    const { error: orderError } = await supabase.from('orders').insert({
      id: orderId,
      player_id: player.id,
      player_name: player.name,
      table_number: tableNumber,
      total_coins: cartTotal,
      notes,
      status: 'חדשה',
      estimated_time: estimatedTime,
    })
    if (orderError) throw orderError

    // Insert items
    const items = cart.map(item => ({
      order_id: orderId,
      item_id: item.menuItem.id,
      item_name: item.menuItem.name,
      item_image: item.menuItem.image,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      customization: item.customization ?? {},
    }))
    const { error: itemsError } = await supabase.from('order_items').insert(items)
    if (itemsError) throw itemsError

    // Deduct coins
    const newCoins = Math.max(0, player.coins - cartTotal)
    await supabase.from('players').update({ coins: newCoins }).eq('id', player.id)
    setPlayer(prev => prev ? { ...prev, coins: newCoins } : prev)

    const order: Order = {
      id: orderId,
      playerName: player.name,
      tableNumber,
      items: [...cart],
      total: cartTotal,
      notes,
      status: 'חדשה',
      createdAt: new Date(),
      estimatedTime,
    }
    setOrders(prev => [order, ...prev])
    setLastOrder(order)
    setCart([])
    return order
  }, [player, cart, cartTotal])

  const updateOrderStatus = useCallback(async (id: string, status: Order['status']) => {
    await supabase.from('orders').update({ status }).eq('id', id)
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }, [])

  return (
    <AppContext.Provider value={{
      screen, setScreen, player, joinAsPlayer,
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartCount, canAfford,
      orders, submitOrder, updateOrderStatus, lastOrder,
      adminGateOpen, openAdminGate, closeAdminGate,
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
