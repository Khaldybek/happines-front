import type { OrderPlaceRequest, OrderPlaceResponse } from '~/types/checkoutPage'

export function useOrderPlace() {
  const config = useRuntimeConfig()
  const baseUrl = String(config.public.apiBase ?? '').replace(/\/+$/, '')

  const token = useCookie<string | null>('auth_token')
  const tokenType = useCookie<string>('auth_token_type')

  const pending = ref(false)
  const error = ref<string | null>(null)
  const fieldErrors = ref<Record<string, string[]>>({})

  async function placeOrder(payload: OrderPlaceRequest): Promise<OrderPlaceResponse | null> {
    pending.value = true
    error.value = null
    fieldErrors.value = {}

    try {
      return await $fetch<OrderPlaceResponse>(
        `${baseUrl}/api/V1/order/place`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `${tokenType.value ?? 'Bearer'} ${token.value}`,
          },
          body: payload,
        },
      )
    }
    catch (err: unknown) {
      const data = (err as { data?: { message?: string, errors?: Record<string, string[]> } })?.data
      error.value = data?.message ?? 'Не удалось оформить заказ'
      fieldErrors.value = data?.errors ?? {}
      return null
    }
    finally {
      pending.value = false
    }
  }

  function clearErrors() {
    error.value = null
    fieldErrors.value = {}
  }

  return { pending, error, fieldErrors, placeOrder, clearErrors }
}
