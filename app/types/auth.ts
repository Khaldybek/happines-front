export interface AuthUserCountry {
  id: number
  title: string
  code?: string
  currency_code?: string
}

export interface AuthUserCity {
  id: number
  title: string
}

/** Соответствует UserProfileResource / UserMeResource */
export interface AuthUser {
  id: number
  full_name: string | null
  email: string | null
  phone: string | null
  photo: string | null
  country: AuthUserCountry | null
  city: AuthUserCity | null
  street: string | null
  house_number: string | null
}

/** Ответ GET/POST/PATCH `/api/V1/user/profile` — пользователь во вложенном `user`, плюс текст сообщения. */
export interface UserProfileResponse {
  user: AuthUser
  message?: string
}

export interface AuthLoginResponse {
  token_type: string
  token: string
  expires_in: number
  user: AuthUser
}

export interface AuthApiError {
  message: string
  errors?: Record<string, string[]>
}

/** Тело POST /api/V1/auth/register (поля по договорённости с бэкендом) */
export interface RegisterPayload {
  full_name: string
  email: string
  phone: string
  password: string
  password_confirmation: string
  country_id: number | null
  city_id: number | null
}

/**
 * Тело для POST или PATCH `/api/V1/user/profile` (auth:sanctum, Bearer token).
 * Отправляется как multipart/form-data; файл аватара — поле `photo` (image, до 4096 КБ на бэкенде).
 * Остальные поля при необходимости в том же запросе.
 */
export interface ProfileUpdatePayload {
  full_name?: string
  phone?: string
  email?: string
  country_id?: number | null
  city_id?: number | null
  street?: string
  house_number?: string
  password?: string
  photo?: File
}
