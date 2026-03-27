/**
 * GET /api/V1/orders/my — заказы текущего пользователя, сортировка от новых к старым.
 * Пагинация: ?page=1 (Laravel), по 15 записей. Legacy GET /api/V1/orders/index — тот же ответ.
 *
 * Статусы: подписи и цвет из API (`status.name`, `status.color`), не дублировать enum на фронте.
 */

export interface MyOrderStatus {
  id: number
  name: string
  color: string
}

export interface MyOrderProduct {
  /** product_id в каталоге */
  id: number
  product_name: string
  image: string
  code?: string
  unit_price: number
  quantity: number
  total_price: number
}

/** Старые заказы: id может быть null, title усечён */
export interface MyOrderDelivery {
  id: number | null
  type: string
  title: string
  estimated_time: string | null
  price: number
  is_free: boolean
}

/** Старые заказы: id null, усечённые code / title */
export interface MyOrderPaymentMethod {
  id: number | null
  code: string
  title: string
  image_url: string | null
}

export interface MyOrder {
  id: number
  created_at: string
  status: MyOrderStatus
  name: string
  phone: string
  comment: string | null
  address: string
  products: MyOrderProduct[]
  products_total: number
  delivery_price: number
  grand_total: number
  /** Старые заказы без справочника — объект может отсутствовать */
  delivery?: MyOrderDelivery | null
  payment_method?: MyOrderPaymentMethod | null
}

export interface MyOrdersPagination {
  total: number
  count: number
  per_page: number
  current_page: number
  total_pages: number
}

export interface MyOrdersResponse {
  orders: MyOrder[]
  pagination: MyOrdersPagination
}
