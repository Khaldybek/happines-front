/** Язык по умолчанию, если в URL нет ?lang= */
export const DEFAULT_API_LANG = 'ru'

function langFromRouteQuery(
  query: Record<string, unknown>,
  paramName = 'lang',
): string {
  const q = query[paramName]
  if (typeof q === 'string' && q.trim()) return q.trim().toLowerCase()
  if (Array.isArray(q) && q[0] && typeof q[0] === 'string') {
    return q[0].trim().toLowerCase()
  }
  return DEFAULT_API_LANG
}

/**
 * Параметры query для всех запросов к бэкенду (всегда с lang).
 */
export function useApiLangQuery(paramName = 'lang') {
  const route = useRoute()
  return computed(() => ({
    [paramName]: langFromRouteQuery(route.query as Record<string, unknown>, paramName),
  }))
}

export function getApiLangForRequest(
  route: { query: Record<string, unknown> },
  paramName = 'lang',
): Record<string, string> {
  return { [paramName]: langFromRouteQuery(route.query, paramName) }
}
