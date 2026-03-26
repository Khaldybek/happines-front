export interface CheckoutCountry {
  id: number
  title: string
}

export interface CheckoutCity {
  id: number
  title: string
}

export interface CheckoutUserAddress {
  country: CheckoutCountry | null
  city: CheckoutCity | null
  street: string | null
  house_number: string | null
}

export interface CheckoutPickupPoint {
  id: number
  title: string
  address: string
  working_hours: string
}

export interface CheckoutDeliveryMethod {
  id: number
  type: 'delivery' | 'pickup' | string
  title: string
  estimated_time?: string
  pickup_points?: CheckoutPickupPoint[]
}

export interface CheckoutPaymentMethod {
  id: number
  code: string
  title: string
  image_url: string | null
}

export interface CheckoutDataResponse {
  user_address: CheckoutUserAddress | null
  delivery_methods: CheckoutDeliveryMethod[]
  payment_methods: CheckoutPaymentMethod[]
}

// ── Order placement ──────────────────────────────────────────────────────────

export interface OrderProductPayload {
  id: number
  quantity: number
}

export interface OrderPlaceRequest {
  name: string
  phone: string
  comment?: string
  address: string
  delivery_method_id: number
  pickup_point_id: number | null
  payment_method_id: number
  products: OrderProductPayload[]
}

export interface PlacedOrderProduct {
  product_name: string
  quantity: number
  price: number
  total_price: number
}

export interface PlacedOrder {
  id: number
  status: number
  status_name: string
  created_at: string
  name: string
  phone: string
  comment: string | null
  address: string
  delivery_method: CheckoutDeliveryMethod
  payment_method: CheckoutPaymentMethod
  products: PlacedOrderProduct[]
  total_price: number
}

export interface OrderPlaceResponse {
  message: string
  order: PlacedOrder
}
