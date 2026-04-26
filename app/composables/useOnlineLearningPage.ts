import type { OnlineLearningPageResponse } from '~/types/onlineLearningPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { optionalBearerJsonHeaders } from '~/composables/useApiBearerOptional'
import { deepFixMediaUrls } from '~/utils/resolveMediaUrl'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function onlineLearningPageUrl(): string {
  return `${apiBaseUrl()}/api/V1/pages/online-learning`
}

export function useOnlineLearningPage() {
  const route = useRoute()
  const authToken = useCookie<string | null>('auth_token')
  const baseUrl = apiBaseUrl()
  const url = onlineLearningPageUrl()

  return useAsyncData(
    'online-learning-page',
    async () => {
      try {
        const data = await $fetch<OnlineLearningPageResponse>(url, {
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
      watch: [() => route.query.lang, () => authToken.value],
    },
  )
}
