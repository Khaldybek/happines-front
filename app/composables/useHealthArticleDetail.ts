import type { HealthArticleDetailResponse } from '~/types/healthArticlesPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { deepFixMediaUrls } from '~/utils/resolveMediaUrl'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function healthArticleDetailUrl(id: string | number): string {
  const sid = String(id ?? '').trim()
  return `${apiBaseUrl()}/api/V1/pages/health-articles/${encodeURIComponent(sid)}`
}

export function useHealthArticleDetail(id: MaybeRefOrGetter<string | number>) {
  const route = useRoute()
  const baseUrl = apiBaseUrl()

  return useAsyncData(
    () => `health-article-detail:${String(toValue(id) ?? '').trim()}:${String(route.query.lang ?? '')}`,
    async () => {
      const sid = String(toValue(id) ?? '').trim()
      if (!sid || !/^\d+$/.test(sid)) return null
      try {
        const data = await $fetch<HealthArticleDetailResponse>(healthArticleDetailUrl(sid), {
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
      watch: [() => route.query.lang, () => toValue(id)],
    },
  )
}
