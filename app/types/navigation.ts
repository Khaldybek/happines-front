/** Ответ GET /api/V1/pages/navigation */

export interface NavContent {
  method: string
  path: string
  query?: Record<string, number | string>
}

export interface NavItem {
  key: string
  title: string
  href: string | null
  seo_page?: string | null
  api_ready?: boolean
  content?: NavContent | null
  type?: string
  children?: NavItem[]
  slug?: string
  category_id?: number
  catalog?: {
    base_href?: string
    open_pattern?: string
    note?: string
  }
}

export interface NavLanguageItem {
  code: string
  native: string
}

export interface NavigationResponse {
  version: number
  language: string
  base_path: string
  items: NavItem[]
  languages: {
    default: string
    query_param: string
    items: NavLanguageItem[]
  }
}
