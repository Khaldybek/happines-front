import type { CountriesResponse } from '~/types/countries'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function countriesUrl(): string {
  return `${apiBaseUrl()}/api/V1/countries`
}

export function useCountries() {
  const route = useRoute()
  const url = countriesUrl()

  return useAsyncData(
    'countries',
    async () => {
      try {
        return await $fetch<CountriesResponse>(url, {
          headers: { Accept: 'application/json' },
          query: getApiLangForRequest(route),
        })
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
