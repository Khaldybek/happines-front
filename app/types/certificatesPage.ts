import type { DocumentsSection } from '~/types/documentsPage'

/** GET /api/V1/pages/certificates?lang= */

export interface CertificateProduct {
  id: number
  code: string
  title: string
}

export interface CertificateItem {
  id: number
  type: string
  position: number
  year: number | null
  description: string | null
  file_url: string
  is_pdf: boolean
  product?: CertificateProduct | null
}

export interface CertificatesPageData {
  section: DocumentsSection
  items: CertificateItem[]
}

export interface CertificatesPageResponse {
  lang?: string
  data: CertificatesPageData
}
