export interface AuthUserCountry {
  id: number
  title: string
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

/** Данные для обновления профиля (все поля необязательны) */
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
