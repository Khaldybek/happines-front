export interface NewsItem {
  id: number
  title: string
  display_date: string
  main_image: string | null
  first_description: string | null
  between_descriptions_image: string | null
  second_description: string | null
}

export interface NewsPagination {
  total: number
  per_page: number
  current_page: number
  last_page: number
  from: number | null
  to: number | null
}

export interface NewsListResponse {
  news: {
    items: NewsItem[]
    pagination: NewsPagination
  }
}

/** Ответ GET /api/V1/pages/news/{id} */
export interface NewsDetailResponse {
  news: NewsItem
}
