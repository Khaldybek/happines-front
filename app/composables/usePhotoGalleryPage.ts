import type { PhotoGalleryResponse } from '~/types/photoGalleryPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { deepFixMediaUrls } from '~/utils/resolveMediaUrl'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function photoGalleryPageUrl(): string {
  return `${apiBaseUrl()}/api/V1/pages/photo-gallery`
}

export function usePhotoGalleryPage() {
  const route = useRoute()
  const baseUrl = apiBaseUrl()
  const url = photoGalleryPageUrl()

  return useAsyncData(
    'photo-gallery-page',
    async () => {
      try {
        const data = await $fetch<PhotoGalleryResponse>(url, {
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
