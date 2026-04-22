import type { CountriesResponse, Country, City } from '~/types/countries'
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

/** Нормализация: актуальный ответ `{ success, countries }`, legacy — `{ data }` с `title` у страны/города */
function normalizeCountriesResponse(raw: unknown): CountriesResponse {
  if (!raw || typeof raw !== 'object') {
    return { success: false, countries: [] }
  }
  const o = raw as Record<string, unknown>
  const list = Array.isArray(o.countries)
    ? o.countries
    : Array.isArray(o.data)
      ? o.data
      : []

  const countries: Country[] = (list as Record<string, unknown>[]).map((c) => {
    const name = String(c.name ?? c.title ?? '').trim()
    const citiesRaw = Array.isArray(c.cities) ? c.cities : []
    const cities: City[] = (citiesRaw as Record<string, unknown>[]).map((city) => ({
      id: Number(city.id),
      name: String(city.name ?? city.title ?? '').trim(),
    }))
    return {
      id: Number(c.id),
      name,
      cities,
    }
  })

  return {
    success: Boolean(o.success),
    countries,
  }
}

export function useCountries() {
  const route = useRoute()
  const url = countriesUrl()

  return useAsyncData(
    'countries',
    async () => {
      const raw = await $fetch<unknown>(url, {
        headers: { Accept: 'application/json' },
        query: getApiLangForRequest(route),
      })
      return normalizeCountriesResponse(raw)
    },
    {
      server: true,
      watch: [() => route.query.lang],
    },
  )
}
