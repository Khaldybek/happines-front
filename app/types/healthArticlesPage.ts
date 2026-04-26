/** GET /api/V1/pages/health-articles?lang=&page= */

export interface HealthArticlesPagination {
  total: number
  per_page: number
  current_page: number
  last_page: number
  from: number | null
  to: number | null
}

export interface HealthArticleListItem {
  id: number
  title: string
  description: string
  display_date: string
  image_url: string
  recommendation_section_title: string
  recommendation_blocks: HealthArticleRecommendationBlock[]
}

export interface HealthArticleRecommendationBlock {
  title: string
  description: string
  position: number
}

export interface HealthArticlesListPayload {
  items: HealthArticleListItem[]
  pagination: HealthArticlesPagination
}

export interface HealthArticlesListResponse {
  health_articles: HealthArticlesListPayload
}

/** GET /api/V1/pages/health-articles/{id}?lang= */

export interface HealthArticleDetail {
  id: number
  title: string
  description: string
  display_date: string
  image_url: string
  recommendation_section_title: string
  recommendation_blocks: HealthArticleRecommendationBlock[]
}

export interface HealthArticleDetailResponse {
  health_article: HealthArticleDetail
}
