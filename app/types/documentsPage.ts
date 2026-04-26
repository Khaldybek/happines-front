/** GET /api/V1/pages/documents?lang= */

export interface DocumentsSection {
  title: string
  description: string
  image_url: string
}

export interface CompanyDocumentItem {
  id: number
  type: string
  position: number
  year: number
  description: string
  file_url: string
  is_pdf: boolean
}

export interface DocumentsPageData {
  section: DocumentsSection
  items: CompanyDocumentItem[]
}

export interface DocumentsPageResponse {
  lang?: string
  data: DocumentsPageData
}
