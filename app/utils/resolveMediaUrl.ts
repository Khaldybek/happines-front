const LOCAL_ORIGIN_RE = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/

/**
 * Заменяет localhost / 127.0.0.1 origin в URL медиафайлов
 * на сконфигурированный apiBase.
 *
 * Это нужно, когда бэкенд хранит в БД абсолютные URL
 * вида http://127.0.0.1:8000/uploads/... — браузер
 * не может обратиться к localhost продакшн-сервера.
 */
export function resolveMediaUrl(
  url: string | null | undefined,
  apiBase: string,
): string {
  if (!url) return ''
  const base = apiBase.replace(/\/+$/, '')
  return url.replace(LOCAL_ORIGIN_RE, base)
}

/**
 * Рекурсивно обходит объект / массив и трансформирует все строковые
 * значения, заменяя localhost origin на apiBase.
 * Используется для обработки целых API-ответов.
 */
export function deepFixMediaUrls<T>(value: T, apiBase: string): T {
  if (typeof value === 'string') {
    return resolveMediaUrl(value, apiBase) as unknown as T
  }
  if (Array.isArray(value)) {
    return value.map(item => deepFixMediaUrls(item, apiBase)) as unknown as T
  }
  if (value !== null && typeof value === 'object') {
    const fixed: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      fixed[k] = deepFixMediaUrls(v, apiBase)
    }
    return fixed as unknown as T
  }
  return value
}
