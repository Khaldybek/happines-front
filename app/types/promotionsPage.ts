export interface PromotionsPageFile {
  url: string
  name: string
  is_image: boolean
}

export interface PromotionsLongTermBlock {
  title: string
  description: string
  files: PromotionsPageFile[]
  /** Дата для строки с календарём (например 27.01.26) */
  date?: string | null
  /** Ссылка на внутреннюю страницу документа */
  slug?: string | null
}

export interface CarouselPromotion {
  id: number
  title: string
  image_url: string
  position: number
}

export interface PromotionsPageResponse {
  page?: {
    heading?: string
    hero_image_url?: string | null
  }
  long_term?: {
    blocks?: PromotionsLongTermBlock[]
  }
  carousel_promotions?: CarouselPromotion[]
}
