export interface ContactsOffice {
  name: string
  address: string
  work_time: string
  phones: string[]
  emails: string[]
}

export interface ContactsBranch {
  id: number
  name: string
  phone: string
}

export interface ContactsSeoPage {
  meta_title?: string
  meta_description?: string
  meta_keyword?: string
}

export interface ContactsPageResponse {
  content: string | null
  contact?: ContactsOffice | null
  branches?: ContactsBranch[] | null
  offices?: {
    china_head?: ContactsOffice | null
  } | null
  seoPage?: ContactsSeoPage | null
}
