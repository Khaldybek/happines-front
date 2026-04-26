import type { PrivacyPolicyPageResponse } from '~/types/privacyPolicyPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { deepFixMediaUrls } from '~/utils/resolveMediaUrl'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function privacyPolicyPageUrl(): string {
  return `${apiBaseUrl()}/api/V1/pages/privacy-policy`
}

export function usePrivacyPolicyPage() {
  const route = useRoute()
  const baseUrl = apiBaseUrl()
  const url = privacyPolicyPageUrl()

  return useAsyncData(
    'privacy-policy-page',
    async () => {
      try {
        const data = await $fetch<PrivacyPolicyPageResponse>(url, {
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
