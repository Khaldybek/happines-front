import type { DistributorsPageResponse } from '~/types/distributorsPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function distributorsPageUrl(): string {
  return `${apiBaseUrl()}/api/V1/pages/distributors`
}

export function useDistributorsPage() {
  const route = useRoute()
  const url = distributorsPageUrl()

  return useAsyncData(
    'distributors-page',
    async () => {
      try {
        return await $fetch<DistributorsPageResponse>(url, {
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
