/**
 * Возвращает функцию-трансформер для URL медиафайлов.
 * Использует apiBase из runtimeConfig, поэтому корректно
 * работает и в dev-, и в prod-окружениях.
 */
export function useMediaUrl() {
  const { public: { apiBase } } = useRuntimeConfig()
  const base = String(apiBase ?? '').replace(/\/+$/, '')
  return (url: string | null | undefined): string => resolveMediaUrl(url, base)
}
