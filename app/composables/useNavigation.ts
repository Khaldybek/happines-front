import type { NavigationResponse } from '~/types/navigation'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  const raw = String(config.public.apiBase ?? '').trim()
  return raw.replace(/\/+$/, '')
}

export function navigationEndpoint(): string {
  return `${apiBaseUrl()}/api/V1/pages/navigation`
}

/**
 * Меню и метаданные языков с бэкенда. В запросе всегда ?lang=… (из URL или ru).
 */
export function useNavigation() {
  const route = useRoute()
  const url = navigationEndpoint()

  return useAsyncData(
    'api-navigation',
    async () => {
      try {
        const res = await $fetch<NavigationResponse>(url, {
          headers: { Accept: 'application/json' },
          query: getApiLangForRequest(route),
        })
        return res?.items?.length ? res : null
      } catch {
        return null
      }
    },
    {
      server: true,
      lazy: false,
      watch: [() => route.query.lang],
    },
  )
}
