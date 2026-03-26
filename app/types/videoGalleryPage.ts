export interface VideoGalleryItem {
  id: number
  position: number
  video_url: string
  description: string
}

export interface VideoGalleryResponse {
  video_gallery: VideoGalleryItem[]
}
