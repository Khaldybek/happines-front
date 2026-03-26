/**
 * Соответствие href из API маршрутам текущего SPA (пока страницы названы иначе).
 */
const HREF_TO_FRONT: Record<string, string> = {
  '/online-learning': '/learning',
  '/articles': '/health-articles',
  '/promotions': '/events/promotion',
  '/terms': '/privacy',
  '/products': '/catalog',
}

/** API иногда отдаёт строку, иногда объект с path/url (или мусор) — приводим к пути. */
function coerceHrefFromApi(raw: unknown): string | null {
  if (raw == null || raw === '') return null
  if (typeof raw === 'string') {
    const t = raw.trim()
    return t || null
  }
  if (typeof raw === 'object' && raw !== null) {
    const o = raw as Record<string, unknown>
    const p = o.path ?? o.url ?? o.href
    if (typeof p === 'string' && p.trim()) return p.trim()
  }
  return null
}

export function resolveNavHref(href: unknown): string | null {
  const path = coerceHrefFromApi(href)
  if (path == null) return null

  const normalized = HREF_TO_FRONT[path] ?? path

  // API can return legacy product routes like /products/cleansing.
  if (normalized.startsWith('/products/')) {
    return normalized.replace(/^\/products\//, '/catalog/')
  }

  return normalized
}
