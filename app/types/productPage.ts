export interface ProductMediaItem {
  image?: string | null
  video_url?: string | null
}

export interface ProductSectionItem {
  title: string
  description: string
}

export interface ProductDetail {
  id: number
  title: string
  short_title: string | null
  code: string | null
  slug: string
  image: string | null
  image_orig: string | null
  images: ProductMediaItem[]
  youtube_link: string | null
  instruction?: string | null
  price: number
  old_price: number
  is_discount: number
  discount_price: number
  stock_quantity: number
  quantity: number
  status_name: string
  description: string | null
  short_description: string | null
  card_description: string | null
  sections: ProductSectionItem[]
  category_slug: string | null
  category_name: string | null
  is_in_cart: boolean
  is_favorite: boolean
}

export interface ProductSeo {
  meta_title: string | null
  meta_description: string | null
  meta_keyword: string | null
}

export interface SimilarProduct {
  id: number
  title: string
  code: string | null
  slug: string
  image: string | null
  price: number
  old_price: number
  discount: number
  is_discount: number
  discount_price: number
  is_favorite: number | boolean
}

export interface ProductPageResponse {
  product: ProductDetail
  seoPage?: ProductSeo | null
  similarProducts?: SimilarProduct[]
}
