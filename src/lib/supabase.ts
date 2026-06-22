import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://lvanmsvdyirggwajsbdr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2YW5tc3ZkeWlyZ2d3YWpzYmRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMzgyNTcsImV4cCI6MjA5NzcxNDI1N30.K5ZybWGYhzBsc6jy9MPoHQcog5QJzW7XvS4GNx1Iqno'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  realtime: { params: { eventsPerSecond: 10 } },
})

export interface DbPlayer {
  id: string
  name: string
  coins: number
  created_at: string
}

export interface DbOrder {
  id: string
  player_id: string
  player_name: string
  table_number: number
  total_coins: number
  notes: string
  status: string
  estimated_time: number
  created_at: string
}

export interface DbOrderItem {
  id: string
  order_id: string
  item_id: string
  item_name: string
  item_image: string
  quantity: number
  unit_price: number
  customization: Record<string, unknown>
}
