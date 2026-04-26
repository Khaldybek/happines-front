/** GET /api/V1/pages/privacy-policy?lang= */

export interface PrivacyPolicyBlock {
  id: number
  position: number
  title: string
  description: string
}

export interface PrivacyPolicyPageData {
  main_title: string
  blocks: PrivacyPolicyBlock[]
}

export interface PrivacyPolicyPageResponse {
  lang: string
  data: PrivacyPolicyPageData
}
