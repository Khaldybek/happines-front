import type { PhotoGalleryResponse } from '~/types/photoGalleryPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'

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
  const url = photoGalleryPageUrl()

  return useAsyncData(
    'photo-gallery-page',
    async () => {
      try {
        return await $fetch<PhotoGalleryResponse>(url, {
          headers: { Accept: 'application/json' },
          query: getApiLangForRequest(route),
        })
      } catch {
        return null
      }
    },
    {
      server: true,
      watch: [() => route.query.lang],
    },
  )
}
