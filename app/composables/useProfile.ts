import type { AuthUser, AuthApiError, ProfileUpdatePayload } from '~/types/auth'
import { resolveMediaUrl } from '~/utils/resolveMediaUrl'

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
        const user = await $fetch<AuthUser>(url, {
          headers: buildAuthHeaders(),
        })
        if (user?.photo) {
          user.photo = resolveMediaUrl(user.photo, mediaBase)
        }
        return user
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

  async function updateProfile(payload: ProfileUpdatePayload): Promise<boolean> {
    updatePending.value = true
    updateError.value = null
    updateFieldErrors.value = {}
    updateSuccess.value = false

    try {
      const body = toFormData(payload)

      const updated = await $fetch<AuthUser>(url, {
        method: 'POST',
        headers: buildAuthHeaders(),
        body,
      })

      if (updated?.photo) {
        updated.photo = resolveMediaUrl(updated.photo, mediaBase)
      }
      profile.value = updated
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
  }

  return {
    profile,
    fetchPending,
    refresh,
    updatePending,
    updateError,
    updateFieldErrors,
    updateSuccess,
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
