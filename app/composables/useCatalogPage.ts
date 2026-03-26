import type { CatalogPageResponse } from '~/types/catalogPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { deepFixMediaUrls } from '~/utils/resolveMediaUrl'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function catalogPageUrl(slug: string): string {
  const safe = String(slug || '').trim()
  return `${apiBaseUrl()}/api/V1/pages/catalog/${encodeURIComponent(safe)}`
}

export function useCatalogPage(slug: string) {
  const route = useRoute()
  const baseUrl = apiBaseUrl()
  const url = catalogPageUrl(slug)

  return useAsyncData(
    `catalog-page:${slug}`,
    async () => {
      try {
        const data = await $fetch<CatalogPageResponse>(url, {
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

