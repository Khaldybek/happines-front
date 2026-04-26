/** GET /api/V1/pages/online-learning?lang= */

export interface OnlineLearningVideo {
  id: number
  name: string
  video_url: string
  position: number
}

export interface OnlineLearningDocFile {
  id: number
  name: string
  file_url: string
  position: number
}

export interface OnlineLearningDocument {
  id: number
  title: string
  position: number
  files: OnlineLearningDocFile[]
}

/**
 * Гость: authenticated false, только main_title, image_url, description.
 * Авторизованный: + videos, documents (другой текст в description).
 */
export interface OnlineLearningPayload {
  authenticated: boolean
  main_title: string
  image_url: string
  description: string
  videos?: OnlineLearningVideo[]
  documents?: OnlineLearningDocument[]
}

export interface OnlineLearningPageResponse {
  online_learning: OnlineLearningPayload
}
