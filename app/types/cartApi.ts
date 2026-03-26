export interface CartApiItem {
  cart_item_id: number
  product_id: number
  product_name: string
  code: string
  slug: string
  image: string
  price: number
  old_price: number | null
  has_discount: boolean
  stock_quantity: number
  in_stock: boolean
  quantity: number
  item_total: number
}

export interface CartApiSummary {
  items_count: number
  total_quantity: number
  subtotal: number
}

export interface CartApiResponse {
  items: CartApiItem[]
  summary: CartApiSummary
}
