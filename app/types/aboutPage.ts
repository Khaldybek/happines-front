/** GET /api/V1/pages/about?lang= */

export interface AboutSeoPage {
  meta_title?: string | null
  meta_description?: string | null
  meta_keyword?: string | null
}

export interface AboutVideoBlock {
  video_url?: string | null
  is_external_url?: boolean | null
}

export interface AboutBlock2 {
  title?: string | null
  secondary_title?: string | null
  description?: string | null
  image_url?: string | null
  link?: string | null
  link_name?: string | null
}

export interface AboutBlock3Description {
  position: number
  text: string
}

export interface AboutBlock3Item {
  id: number
  position: number
  title?: string | null
  icon_url?: string | null
  descriptions?: AboutBlock3Description[]
}

export interface AboutBlock3 {
  main_title?: string | null
  secondary_title?: string | null
  description?: string | null
  items?: AboutBlock3Item[]
}

export interface AboutBlock4 {
  name?: string | null
  image_url?: string | null
}

export interface AboutBlock5Criterion {
  position: number
  text: string
}

export interface AboutBlock5Card {
  id: number
  position: number
  title?: string | null
  description?: string | null
  link?: string | null
  link_name?: string | null
  criteria?: AboutBlock5Criterion[]
}

export interface AboutBlock5 {
  section_title?: string | null
  blocks?: AboutBlock5Card[]
}

export interface AboutBlock6Mini {
  id?: number
  position?: number
  title?: string | null
  description?: string | null
}

export interface AboutBlock6 {
  title?: string | null
  description?: string | null
  secondary_title?: string | null
  secondary_description?: string | null
  link?: string | null
  link_name?: string | null
  minis?: AboutBlock6Mini[]
}

export interface AboutUsPage {
  video_url?: string | null
  is_external_url?: boolean | null
  block1?: AboutVideoBlock | null
  block2?: AboutBlock2 | null
  block3?: AboutBlock3 | null
  block4?: AboutBlock4 | null
  block5?: AboutBlock5 | null
  block6?: AboutBlock6 | null
}

export interface AboutUsContent {
  aboutCompany?: unknown | null
  distributor?: unknown | null
  paying?: unknown | null
  points?: unknown[]
}

export interface AboutPageResponse {
  aboutUsContent?: AboutUsContent | null
  aboutUsPage?: AboutUsPage | null
  seoPage?: AboutSeoPage | null
}
