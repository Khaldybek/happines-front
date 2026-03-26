export interface DistributorContribution {
  text: string
}

export interface DistributorItem {
  id: number
  image_url: string
  name: string
  place_of_work: string
  position_title: string
  contributions: DistributorContribution[]
}

export interface DistributorsPageData {
  main_title: string
  title: string
  description: string
  main_image_url: string
  distributors: DistributorItem[]
}

export interface DistributorsPageResponse {
  data: DistributorsPageData
}
