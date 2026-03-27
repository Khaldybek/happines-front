import type { MyOrdersResponse } from '~/types/ordersPage'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { resolveMediaUrl } from '~/utils/resolveMediaUrl'

export function useMyOrders(page: Ref<number> = ref(1)) {
  const config = useRuntimeConfig()
  const route = useRoute()

  const baseUrl = String(config.public.apiBase ?? '').replace(/\/+$/, '')
  const url = `${baseUrl}/api/V1/orders/my`

  const token = useCookie<string | null>('auth_token')
  const tokenType = useCookie<string>('auth_token_type')

  return useAsyncData<MyOrdersResponse | null>(
    () => `my-orders-${page.value}`,
    async () => {
      if (!token.value) return null

      try {
        const data = await $fetch<MyOrdersResponse>(url, {
          headers: {
            Accept: 'application/json',
            Authorization: `${tokenType.value ?? 'Bearer'} ${token.value}`,
          },
          query: {
            ...getApiLangForRequest(route),
            page: page.value,
          },
        })

        const orders = Array.isArray(data?.orders) ? data.orders : []
        data.orders = orders.map(order => ({
          ...order,
          products: (order.products ?? []).map(product => ({
            ...product,
            image: resolveMediaUrl(product.image, baseUrl),
          })),
          payment_method: order.payment_method
            ? {
                ...order.payment_method,
                image_url: order.payment_method.image_url
                  ? resolveMediaUrl(order.payment_method.image_url, baseUrl)
                  : order.payment_method.image_url,
              }
            : order.payment_method,
        }))

        return data
      }
      catch {
        return null
      }
    },
    {
      server: false,
      watch: [page, () => route.query.lang],
    },
  )
}
