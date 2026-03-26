import type { HomePageResponse } from '~/types/homePage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function homePageUrl(): string {
  return `${apiBaseUrl()}/api/V1/pages/home`
}

export function useHomePage() {
  const route = useRoute()
  const url = homePageUrl()

  return useAsyncData(
    'home-page',
    async () => {
      try {
        return await $fetch<HomePageResponse>(url, {
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
