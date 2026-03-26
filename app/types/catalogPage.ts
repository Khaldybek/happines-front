export interface CatalogProductImageItem {
  image: string | null
  video_url?: string | null
}

export interface CatalogProduct {
  id: number
  title: string
  short_title: string | null
  code: string
  slug: string
  image: string | null
  image_orig: string | null
  images: CatalogProductImageItem[]
  youtube_link: string | null
  price: number
  old_price: number
  discount_percent: number
  is_discount: number
  discount_price: number
  category_id: number
  category_slug: string
  category_name: string
  status_name: string
  stock_quantity: number
  is_new: number
  by_prescription: number
  description: string | null
  short_description: string | null
  card_description: string | null
  is_in_cart: boolean
  is_favorite: boolean
}

export interface CatalogPageResponse {
  category_id?: number
  category_slug?: string
  category_image_url?: string | null
  category_title?: string | null
  category_plural_title?: string | null
  category_description?: string | null
  products: CatalogProduct[]
}
