export interface MyOrderStatus {
  id: number
  name: string
  color: string
}

export interface MyOrderProduct {
  id: number
  product_name: string
  image: string
  unit_price: number
  quantity: number
  total_price: number
}

export interface MyOrderDelivery {
  id: number
  type: string
  title: string
  estimated_time: string | null
  price: number
  is_free: boolean
}

export interface MyOrderPaymentMethod {
  id: number
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
  delivery: MyOrderDelivery
  payment_method: MyOrderPaymentMethod
}

export interface MyOrdersResponse {
  data: MyOrder[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}
