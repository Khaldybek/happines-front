export interface FavoriteApiItem {
  favorite_id: number
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
  is_in_cart: boolean
}

export interface FavoriteApiPagination {
  total: number
  count: number
  per_page: number
  current_page: number
  total_pages: number
}

/** GET: favorites — массив или Laravel pagination { data: [...] } */
export interface FavoritesApiResponse {
  favorites: FavoriteApiItem[] | { data: FavoriteApiItem[] }
  pagination: FavoriteApiPagination
}

export interface FavoriteToggleResponse {
  message: string
  is_favorite: boolean
}
