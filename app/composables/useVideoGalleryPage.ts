import type { VideoGalleryResponse } from '~/types/videoGalleryPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { deepFixMediaUrls } from '~/utils/resolveMediaUrl'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function videoGalleryPageUrl(): string {
  return `${apiBaseUrl()}/api/V1/pages/video-gallery`
}

export function useVideoGalleryPage() {
  const route = useRoute()
  const baseUrl = apiBaseUrl()
  const url = videoGalleryPageUrl()

  return useAsyncData(
    'video-gallery-page',
    async () => {
      try {
        const data = await $fetch<VideoGalleryResponse>(url, {
          headers: { Accept: 'application/json' },
          query: getApiLangForRequest(route),
        })
        return deepFixMediaUrls(data, baseUrl)
      }
      catch {
        return null
      }
    },
    {
      server: true,
      watch: [() => route.query.lang],
    },
  )
}
