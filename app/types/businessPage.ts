export interface BusinessFeature {
  icon_url: string | null
  title: string
}

export interface BusinessFaqItem {
  question: string
  answer: string
}

export interface BusinessPageData {
  hero_video_url: string | null
  hero_image_url: string | null
  main_title: string | null
  main_description: string | null
  section_title: string | null
  section_description: string | null
  videos: string[]
  reviews_title: string | null
  reviews: unknown[]
  faq_title: string | null
  faq: BusinessFaqItem[]
  features: BusinessFeature[]
}

export interface BusinessPageResponse {
  data?: BusinessPageData | null
}
