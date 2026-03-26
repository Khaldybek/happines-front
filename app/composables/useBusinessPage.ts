import type { BusinessPageResponse } from '~/types/businessPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { deepFixMediaUrls } from '~/utils/resolveMediaUrl'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function businessPageUrl(): string {
  return `${apiBaseUrl()}/api/V1/pages/business`
}

export function useBusinessPage() {
  const route = useRoute()
  const baseUrl = apiBaseUrl()
  const url = businessPageUrl()

  return useAsyncData(
    'business-page',
    async () => {
      try {
        const data = await $fetch<BusinessPageResponse>(url, {
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
