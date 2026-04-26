import type { AboutPageResponse } from '~/types/aboutPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { optionalBearerJsonHeaders } from '~/composables/useApiBearerOptional'
import { deepFixMediaUrls } from '~/utils/resolveMediaUrl'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function aboutPageUrl(): string {
  return `${apiBaseUrl()}/api/V1/pages/about`
}

export function useAboutPage() {
  const route = useRoute()
  const baseUrl = apiBaseUrl()
  const url = aboutPageUrl()

  return useAsyncData(
    'about-page',
    async () => {
      try {
        const data = await $fetch<AboutPageResponse>(url, {
          headers: optionalBearerJsonHeaders(),
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
