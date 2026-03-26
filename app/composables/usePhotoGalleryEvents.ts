import type { Ref } from 'vue'
import type { PhotoGalleryEventPhotosResponse, PhotoGalleryEventsResponse } from '~/types/photoGalleryPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function photoGalleryCategoryEventsUrl(slug: string): string {
  return `${apiBaseUrl()}/api/V1/pages/photo-gallery/${encodeURIComponent(slug)}/events`
}

export function photoGalleryEventPhotosUrl(eventId: number | string): string {
  return `${apiBaseUrl()}/api/V1/pages/photo-gallery/events/${encodeURIComponent(String(eventId))}/photos`
}

function pageFromRoute(route: ReturnType<typeof useRoute>): number {
  const raw = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
  const n = Number.parseInt(String(raw || '1'), 10)
  return Number.isNaN(n) || n < 1 ? 1 : n
}

export function usePhotoGalleryCategoryEvents(slug: Ref<string | null | undefined>) {
  const route = useRoute()
  const slugValue = computed(() => slug.value ?? null)

  return useAsyncData(
    () => `photo-gallery-events:${slugValue.value ?? 'none'}:${pageFromRoute(route)}`,
    async () => {
      if (!slugValue.value) return null
      try {
        return await $fetch<PhotoGalleryEventsResponse>(photoGalleryCategoryEventsUrl(slugValue.value), {
          headers: { Accept: 'application/json' },
          query: {
            ...getApiLangForRequest(route),
            page: pageFromRoute(route),
          },
        })
      } catch {
        return null
      }
    },
    {
      server: true,
      watch: [slugValue, () => route.query.lang, () => route.query.page],
    },
  )
}

export function usePhotoGalleryEventPhotos(id: Ref<number | null | undefined>) {
  const route = useRoute()
  const idVal = computed(() => id.value ?? null)

  return useAsyncData(
    () => `photo-gallery-event-photos:${idVal.value ?? 'none'}`,
    async () => {
      if (idVal.value == null) return null
      try {
        return await $fetch<PhotoGalleryEventPhotosResponse>(photoGalleryEventPhotosUrl(idVal.value), {
          headers: { Accept: 'application/json' },
          query: getApiLangForRequest(route),
        })
      } catch {
        return null
      }
    },
    {
      server: true,
      watch: [idVal, () => route.query.lang],
    },
  )
}
