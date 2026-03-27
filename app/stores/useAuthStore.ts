import { defineStore, acceptHMRUpdate } from 'pinia'
import type { AuthUser, AuthLoginResponse, AuthApiError, RegisterPayload } from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig()

  // Token persisted in a cookie — works on both SSR and client
  const token = useCookie<string | null>('auth_token', {
    default: () => null,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  const tokenType = useCookie<string>('auth_token_type', {
    default: () => 'Bearer',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  })

  const user = ref<AuthUser | null>(null)
  const pending = ref(false)
  const error = ref<string | null>(null)
  const fieldErrors = ref<Record<string, string[]>>({})

  const isLoggedIn = computed(() => !!token.value)

  const authHeader = computed(() =>
    token.value ? `${tokenType.value} ${token.value}` : null,
  )

  async function loginByEmail(email: string, password: string): Promise<boolean> {
    pending.value = true
    error.value = null
    fieldErrors.value = {}

    const baseUrl = String(config.public.apiBase ?? '').replace(/\/+$/, '')

    try {
      const response = await $fetch<AuthLoginResponse>(
        `${baseUrl}/api/V1/auth/login-email`,
        {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: { email, password },
        },
      )

      token.value = response.token
      tokenType.value = response.token_type
      user.value = response.user

      return true
    }
    catch (err: unknown) {
      const fetchError = err as { data?: AuthApiError }
      const data = fetchError?.data
      error.value = data?.message ?? 'Произошла ошибка авторизации'
      fieldErrors.value = data?.errors ?? {}
      return false
    }
    finally {
      pending.value = false
    }
  }

  /** POST /api/V1/auth/register — ответ как после логина (token + user) */
  async function register(payload: RegisterPayload): Promise<boolean> {
    pending.value = true
    error.value = null
    fieldErrors.value = {}

    const baseUrl = String(config.public.apiBase ?? '').replace(/\/+$/, '')

    try {
      const response = await $fetch<AuthLoginResponse>(
        `${baseUrl}/api/V1/auth/registration`,
        {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: {
            full_name: payload.full_name.trim(),
            email: payload.email.trim(),
            phone: payload.phone.trim(),
            password: payload.password,
            password_confirmation: payload.password_confirmation,
            country_id: payload.country_id,
            city_id: payload.city_id,
          },
        },
      )

      token.value = response.token
      tokenType.value = response.token_type
      user.value = response.user

      return true
    }
    catch (err: unknown) {
      const fetchError = err as { data?: AuthApiError }
      const data = fetchError?.data
      error.value = data?.message ?? 'Не удалось зарегистрироваться'
      fieldErrors.value = data?.errors ?? {}
      return false
    }
    finally {
      pending.value = false
    }
  }

  function logout() {
    token.value = null
    tokenType.value = 'Bearer'
    user.value = null
    error.value = null
    fieldErrors.value = {}
  }

  function clearErrors() {
    error.value = null
    fieldErrors.value = {}
  }

  return {
    token,
    tokenType,
    user,
    pending,
    error,
    fieldErrors,
    isLoggedIn,
    authHeader,
    loginByEmail,
    register,
    logout,
    clearErrors,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
