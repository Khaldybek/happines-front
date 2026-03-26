import type { ContactsPageResponse } from '~/types/contactsPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { deepFixMediaUrls } from '~/utils/resolveMediaUrl'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function contactsPageUrl(): string {
  return `${apiBaseUrl()}/api/V1/pages/contacts`
}

export function useContactsPage() {
  const route = useRoute()
  const baseUrl = apiBaseUrl()
  const url = contactsPageUrl()

  return useAsyncData(
    'contacts-page',
    async () => {
      try {
        const data = await $fetch<ContactsPageResponse>(url, {
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
