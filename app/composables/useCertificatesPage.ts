import type { CertificatesPageResponse } from '~/types/certificatesPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { optionalBearerJsonHeaders } from '~/composables/useApiBearerOptional'
import { deepFixMediaUrls } from '~/utils/resolveMediaUrl'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function certificatesPageUrl(): string {
  return `${apiBaseUrl()}/api/V1/pages/certificates`
}

export function useCertificatesPage() {
  const route = useRoute()
  const baseUrl = apiBaseUrl()
  const url = certificatesPageUrl()

  return useAsyncData(
    'certificates-page',
    async () => {
      try {
        const data = await $fetch<CertificatesPageResponse>(url, {
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
