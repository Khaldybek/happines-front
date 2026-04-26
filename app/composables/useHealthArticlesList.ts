import type { HealthArticlesListResponse } from '~/types/healthArticlesPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { deepFixMediaUrls } from '~/utils/resolveMediaUrl'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function healthArticlesListUrl(): string {
  return `${apiBaseUrl()}/api/V1/pages/health-articles`
}

export function useHealthArticlesList() {
  const route = useRoute()
  const baseUrl = apiBaseUrl()
  const url = healthArticlesListUrl()

  return useAsyncData(
    () => {
      const page = Math.max(1, Math.floor(Number(route.query.page)) || 1)
      const lang = String(route.query.lang ?? '')
      return `health-articles-list:${page}:${lang}`
    },
    async () => {
      try {
        const page = Math.max(1, Math.floor(Number(route.query.page)) || 1)
        const data = await $fetch<HealthArticlesListResponse>(url, {
          headers: { Accept: 'application/json' },
          query: {
            ...getApiLangForRequest(route),
            page,
          },
        })
        return deepFixMediaUrls(data, baseUrl)
      }
      catch {
        return null
      }
    },
    {
      server: true,
      watch: [() => route.query.lang, () => route.query.page],
    },
  )
}
