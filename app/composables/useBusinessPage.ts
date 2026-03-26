import type { BusinessPageResponse } from '~/types/businessPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'

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
  const url = businessPageUrl()

  return useAsyncData(
    'business-page',
    async () => {
      try {
        return await $fetch<BusinessPageResponse>(url, {
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
