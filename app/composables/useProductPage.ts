import type { ProductPageResponse } from '~/types/productPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { optionalBearerJsonHeaders } from '~/composables/useApiBearerOptional'
import { deepFixMediaUrls } from '~/utils/resolveMediaUrl'

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '')
    .trim()
    .replace(/\/+$/, '')
}

export function useProductPage(slug: MaybeRefOrGetter<string>) {
  const route = useRoute()
  const baseUrl = apiBaseUrl()
  const url = `${baseUrl}/api/V1/pages/product`

  return useAsyncData(
    () => `product-page:${String(toValue(slug) || '').trim()}`,
    async () => {
      const safeSlug = String(toValue(slug) || '').trim()
      if (!safeSlug) return null
      try {
        const data = await $fetch<ProductPageResponse>(url, {
          headers: optionalBearerJsonHeaders(),
          query: { slug: safeSlug, ...getApiLangForRequest(route) },
        })
        return deepFixMediaUrls(data, baseUrl)
      }
      catch {
        return null
      }
    },
    {
      server: true,
      watch: [
        () => route.query.lang,
        () => route.params.slug,
        () => useCookie<string | null>('auth_token').value,
      ],
    },
  )
}
