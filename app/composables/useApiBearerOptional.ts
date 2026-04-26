/**
 * JSON-запросы к API: Accept + Authorization, если в cookie есть токен (Sanctum).
 */
export function optionalBearerJsonHeaders(): Record<string, string> {
  const token = useCookie<string | null>('auth_token')
  const tokenType = useCookie<string>('auth_token_type')
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (token.value) {
    headers.Authorization = `${tokenType.value ?? 'Bearer'} ${token.value}`
  }
  return headers
}
