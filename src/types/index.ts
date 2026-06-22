export type Category = 'burgers' | 'sides' | 'drinks' | 'beer' | 'desserts' | 'deals'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: Category
  image: string
  tags?: ('vegetarian' | 'vegan' | 'spicy' | 'glutenfree')[]
  featured?: boolean
  bestseller?: boolean
  chefsPick?: boolean
  customizable?: boolean
}

export interface BreadChoice {
  id: string
  name: string
}

export interface Extra {
  id: string
  name: string
  price: number
}

export interface Customization {
  bread?: string
  extras: string[]
  remove: string[]
}

export interface CartItem {
  id: string
  menuItem: MenuItem
  quantity: number
  customization?: Customization
  unitPrice: number
}

export interface Order {
  id: string
  tableNumber: number
  items: CartItem[]
  total: number
  notes: string
  status: 'חדשה' | 'התקבלה' | 'בהכנה' | 'מוכנה' | 'נמסרה'
  createdAt: Date
  estimatedTime: number
}

export type Screen = 'home' | 'categories' | 'menu' | 'checkout' | 'confirmation' | 'admin'
