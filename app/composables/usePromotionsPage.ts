import type { PromotionsPageResponse } from '~/types/promotionsPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function promotionsPageUrl(): string {
  return `${apiBaseUrl()}/api/V1/pages/promotions`
}

export function usePromotionsPage() {
  const route = useRoute()
  const url = promotionsPageUrl()

  return useAsyncData(
    'promotions-page',
    async () => {
      try {
        return await $fetch<PromotionsPageResponse>(url, {
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
