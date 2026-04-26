import type { DocumentsPageResponse } from '~/types/documentsPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { optionalBearerJsonHeaders } from '~/composables/useApiBearerOptional'
import { deepFixMediaUrls } from '~/utils/resolveMediaUrl'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function documentsPageUrl(): string {
  return `${apiBaseUrl()}/api/V1/pages/documents`
}

export function useDocumentsPage() {
  const route = useRoute()
  const baseUrl = apiBaseUrl()
  const url = documentsPageUrl()

  return useAsyncData(
    'documents-page',
    async () => {
      try {
        const data = await $fetch<DocumentsPageResponse>(url, {
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
