import type { DistributorsPageResponse } from '~/types/distributorsPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { deepFixMediaUrls } from '~/utils/resolveMediaUrl'

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
  const baseUrl = apiBaseUrl()
  const url = distributorsPageUrl()

  return useAsyncData(
    'distributors-page',
    async () => {
      try {
        const data = await $fetch<DistributorsPageResponse>(url, {
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
