import type { ContactsPageResponse } from '~/types/contactsPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'

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
  const url = contactsPageUrl()

  return useAsyncData(
    'contacts-page',
    async () => {
      try {
        return await $fetch<ContactsPageResponse>(url, {
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
