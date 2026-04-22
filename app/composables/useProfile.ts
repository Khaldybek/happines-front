import type { AuthUser, AuthApiError, ProfileUpdatePayload, UserProfileResponse } from '~/types/auth'
import { resolveMediaUrl } from '~/utils/resolveMediaUrl'

function isAuthUserShape(o: unknown): o is AuthUser {
  return !!o && typeof o === 'object' && typeof (o as AuthUser).id === 'number'
}

/** Бэкенд отдаёт `{ user, message }`; поддерживаем и плоский объект пользователя (legacy). */
function parseProfileResponse(raw: unknown): { user: AuthUser; message?: string } | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (isAuthUserShape(o.user)) {
    return {
      user: o.user,
      message: typeof o.message === 'string' ? o.message : undefined,
    }
  }
  if (isAuthUserShape(raw)) {
    return {
      user: raw,
      message: typeof o.message === 'string' ? o.message : undefined,
    }
  }
  return null
}

function withResolvedPhoto(user: AuthUser, mediaBase: string): AuthUser {
  if (!user.photo) return user
  return { ...user, photo: resolveMediaUrl(user.photo, mediaBase) }
}

function profileApiUrl(): string {
  const config = useRuntimeConfig()
  return `${String(config.public.apiBase ?? '').replace(/\/+$/, '')}/api/V1/user/profile`
}

function getApiBase(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '').replace(/\/+$/, '')
}

function buildAuthHeaders(): Record<string, string> {
  const token = useCookie<string | null>('auth_token')
  const tokenType = useCookie<string>('auth_token_type')
  if (!token.value) return { Accept: 'application/json' }
  return {
    Accept: 'application/json',
    Authorization: `${tokenType.value ?? 'Bearer'} ${token.value}`,
  }
}

export function useProfile() {
  const url = profileApiUrl()
  const mediaBase = getApiBase()

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const { data: profile, pending: fetchPending, refresh } = useAsyncData<AuthUser | null>(
    'user-profile',
    async () => {
      try {
        const raw = await $fetch<UserProfileResponse | AuthUser>(url, {
          headers: buildAuthHeaders(),
        })
        const parsed = parseProfileResponse(raw)
        if (!parsed) return null
        return withResolvedPhoto(parsed.user, mediaBase)
      }
      catch {
        return null
      }
    },
    /**
     * server: true — иначе на SSR pending=false и сразу форма, на клиенте
     * сначала pending=true (скелетон) → hydration mismatch.
     */
    { server: true },
  )

  // ── Update ─────────────────────────────────────────────────────────────────
  const updatePending = ref(false)
  const updateError = ref<string | null>(null)
  const updateFieldErrors = ref<Record<string, string[]>>({})
  const updateSuccess = ref(false)
  /** Текст `message` из ответа API после успешного сохранения. */
  const updateSuccessMessage = ref<string | null>(null)

  /**
   * Обновление профиля и при необходимости фото в одном запросе:
   * POST (или PATCH) `/api/V1/user/profile`, multipart/form-data, поле файла `photo`.
   */
  async function updateProfile(payload: ProfileUpdatePayload): Promise<boolean> {
    updatePending.value = true
    updateError.value = null
    updateFieldErrors.value = {}
    updateSuccess.value = false
    updateSuccessMessage.value = null

    try {
      const body = toFormData(payload)

      // FormData: не передаём Content-Type — boundary задаётся автоматически.
      const raw = await $fetch<UserProfileResponse | AuthUser>(url, {
        method: 'POST',
        headers: buildAuthHeaders(),
        body,
      })

      const parsed = parseProfileResponse(raw)
      if (!parsed) {
        updateError.value = 'Некорректный ответ сервера при сохранении профиля'
        return false
      }

      profile.value = withResolvedPhoto(parsed.user, mediaBase)
      updateSuccessMessage.value = parsed.message ?? null
      updateSuccess.value = true
      return true
    }
    catch (err: unknown) {
      const data = (err as { data?: AuthApiError })?.data
      updateError.value = data?.message ?? 'Ошибка при сохранении профиля'
      updateFieldErrors.value = data?.errors ?? {}
      return false
    }
    finally {
      updatePending.value = false
    }
  }

  function clearUpdateStatus() {
    updateError.value = null
    updateFieldErrors.value = {}
    updateSuccess.value = false
    updateSuccessMessage.value = null
  }

  return {
    profile,
    fetchPending,
    refresh,
    updatePending,
    updateError,
    updateFieldErrors,
    updateSuccess,
    updateSuccessMessage,
    updateProfile,
    clearUpdateStatus,
  }
}

/** Сериализует payload в FormData; пропускает undefined и null (кроме явных id-полей). */
function toFormData(payload: ProfileUpdatePayload): FormData {
  const fd = new FormData()

  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined) continue

    if (value instanceof File) {
      fd.append(key, value)
    }
    else if (value === null) {
      // Передаём пустую строку, чтобы сбросить поле на бэкенде
      fd.append(key, '')
    }
    else {
      fd.append(key, String(value))
    }
  }

  return fd
}
