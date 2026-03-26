export interface PhotoGalleryCategory {
  id: number
  slug: string
  position: number
  hashtag: string
  description: string
  images: string[]
  events_count: number
}

export interface PhotoGalleryPayload {
  categories: PhotoGalleryCategory[]
}

export interface PhotoGalleryResponse {
  photo_gallery: PhotoGalleryPayload
}

export interface PhotoGalleryEventListItem {
  id: number
  position: number
  title: string
  cover_image: string
  images_count: number
}

export interface PhotoGalleryEventsPagination {
  total: number
  per_page: number
  current_page: number
  last_page: number
  from: number
  to: number
}

export interface PhotoGalleryEventsBundle {
  category: PhotoGalleryCategory
  events: {
    items: PhotoGalleryEventListItem[]
    pagination: PhotoGalleryEventsPagination
  }
}

/** GET /api/V1/pages/photo-gallery/{slug}/events */
export interface PhotoGalleryEventsResponse {
  photo_gallery: PhotoGalleryEventsBundle
}

/** GET /api/V1/pages/photo-gallery/events/{event-id}/photos */
export interface PhotoGalleryEventPhotosResponse {
  photo_gallery: {
    event_id: number
    photos: string[]
  }
}
