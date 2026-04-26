import { resolveNavHref } from '~/utils/navHref'

export type AboutCtaResolved
  = | { kind: 'internal', to: string }
    | { kind: 'external', href: string }

function coerceString(raw: unknown): string | null {
  if (raw == null || raw === '') return null
  if (typeof raw === 'string') {
    const t = raw.trim()
    return t || null
  }
  return null
}

function isFrontSiteHost(hostname: string): boolean {
  const h = hostname.replace(/^www\./i, '').toLowerCase()
  if (h === 'localhost' || h === '127.0.0.1') return true
  if (h.includes('admin')) return false
  if (h.includes('happiness') || h.includes('happines')) return true
  return false
}

/**
 * Ссылки из блоков «О нас» (часто полный URL стенда) → внутренний NuxtLink или внешняя ссылка.
 */
export function resolveAboutCtaLink(href: unknown): AboutCtaResolved | null {
  const s = coerceString(href)
  if (!s) return null

  if (!/^https?:\/\//i.test(s)) {
    const path = s.startsWith('/') ? s : `/${s}`
    const to = resolveNavHref(path) ?? path
    return { kind: 'internal', to: to.startsWith('/') ? to : `/${to}` }
  }

  let url: URL
  try {
    url = new URL(s)
  }
  catch {
    return null
  }

  if (isFrontSiteHost(url.hostname)) {
    const path = (url.pathname || '/') + (url.search || '')
    const to = resolveNavHref(path) ?? path
    return { kind: 'internal', to: to.startsWith('/') ? to : `/${to}` }
  }

  return { kind: 'external', href: s }
}
