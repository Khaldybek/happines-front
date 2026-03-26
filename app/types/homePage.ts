import type { CatalogProduct } from '~/types/catalogPage'
import type { NewsItem } from '~/types/newsPage'

export interface HomeTextBlock {
  title: string | null
  description: string | null
}

export interface HomeAdvantageCard {
  title: string | null
  description: string | null
  image: string | null
  icon: string | null
}

export interface HomeCategoryItem {
  id: number
  slug: string
  category_title: string | null
  category_plural_title: string | null
  href: string | null
  image_one: string | null
  image_two: string | null
  image_three: string | null
}

export interface HomeSixthLink {
  title: string | null
  link: string | null
}

export interface HomeEighthItem {
  block_image: string | null
  product: CatalogProduct
}

export interface HomeVideoGalleryItem {
  id: number
  position: number | null
  video_url: string | null
  description: string | null
}

export interface HomeContentPayload {
  hero: {
    title: string | null
    description: string | null
    gallery: string[]
  }
  second_block: {
    title: string | null
    description_1: string | null
    description_2: string | null
    description_3: string | null
    description_4: string | null
    slider_1: string[]
    slider_2: string[]
    slider_3: string[]
  }
  third_block: {
    title: string | null
    text_blocks: HomeTextBlock[]
  }
  fourth_block: {
    title: string | null
    cards: HomeAdvantageCard[]
  }
  fifth_block: {
    title: string | null
    categories: HomeCategoryItem[]
  }
  sixth_block: {
    icon: string | null
    links: HomeSixthLink[]
  }
  seventh_block: {
    products: CatalogProduct[]
  }
  eighth_block: {
    title: string | null
    items: HomeEighthItem[]
  }
  ninth_block: {
    title: string | null
    news: NewsItem[]
  }
  tenth_block: {
    title: string | null
    subtitle: string | null
    description: string | null
    videos: HomeVideoGalleryItem[]
  }
  eleventh_block: {
    image: string | null
  }
}

export interface HomePageResponse {
  homeContent: HomeContentPayload
}
