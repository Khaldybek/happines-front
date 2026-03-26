import type { CheckoutDataResponse } from '~/types/checkoutPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'

export function useCheckoutData() {
  const config = useRuntimeConfig()
  const route = useRoute()

  const baseUrl = String(config.public.apiBase ?? '').replace(/\/+$/, '')
  const url = `${baseUrl}/api/V1/order/checkout-data`

  const token = useCookie<string | null>('auth_token')
  const tokenType = useCookie<string>('auth_token_type')

  return useAsyncData<CheckoutDataResponse | null>(
    'checkout-data',
    async () => {
      if (!token.value) return null

      try {
        return await $fetch<CheckoutDataResponse>(url, {
          headers: {
            Accept: 'application/json',
            Authorization: `${tokenType.value ?? 'Bearer'} ${token.value}`,
          },
          query: getApiLangForRequest(route),
        })
      }
      catch {
        return null
      }
    },
    {
      server: false,
      watch: [() => route.query.lang],
    },
  )
}
