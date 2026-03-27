/**
 * GET /api/V1/user/cart — заголовок Authorization: Bearer token; при необходимости ?lang=ru|kz|en|zh
 *
 * Тело ответа (плоское): `{ items, summary }`. В composable также разбираются обёртки `data` / `cart` / `result`.
 */
export interface CartApiItem {
  cart_item_id: number
  product_id: number
  product_name: string
  code: string
  slug: string
  image: string
  price: number
  /** Без скидки бэкенд может прислать то же число, что и `price` */
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

/**
 * POST /api/V1/user/cart/add — тело: `{ product_id: number, quantity?: number }` (quantity по смыслу опционально у бэка).
 * Ответ: message + item, не полная корзина — после добавления клиент запрашивает GET cart.
 */
export interface CartAddResponse {
  message: string
  item: CartApiItem
}

/** PATCH /{id}, DELETE /{id} — может быть только message */
export interface CartMutateResponse {
  message?: string
  item?: CartApiItem
  items?: CartApiItem[]
  summary?: CartApiSummary
}
