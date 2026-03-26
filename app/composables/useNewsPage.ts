import type { Ref } from 'vue'
import type { NewsDetailResponse, NewsItem, NewsListResponse } from '~/types/newsPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function newsPageUrl(): string {
  return `${apiBaseUrl()}/api/V1/pages/news`
}

export function newsItemUrl(id: number | string): string {
  return `${apiBaseUrl()}/api/V1/pages/news/${encodeURIComponent(String(id))}`
}

export function useNewsPage() {
  const route = useRoute()
  const url = newsPageUrl()

  return useAsyncData(
    'news-page',
    async () => {
      const pageRaw = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
      const page = Number.parseInt(String(pageRaw || '1'), 10)
      try {
        return await $fetch<NewsListResponse>(url, {
          headers: { Accept: 'application/json' },
          query: {
            ...getApiLangForRequest(route),
            page: Number.isNaN(page) || page < 1 ? 1 : page,
          },
        })
      } catch {
        return null
      }
    },
    {
      server: true,
      watch: [() => route.query.lang, () => route.query.page],
    },
  )
}

export function useNewsItem(id: number | string | Ref<number | string>) {
  const route = useRoute()
  const idValue = computed(() => String(unref(id)))

  return useAsyncData(
    () => `news-item:${idValue.value}`,
    async () => {
      try {
        const res = await $fetch<NewsDetailResponse>(newsItemUrl(idValue.value), {
          headers: { Accept: 'application/json' },
          query: getApiLangForRequest(route),
        })
        return res?.news ?? null
      } catch {
        return null
      }
    },
    {
      server: true,
      watch: [idValue, () => route.query.lang],
    },
  )
}
