/**
 * Предоставляет $mediaUrl(url) для использования в шаблонах.
 * Заменяет localhost/127.0.0.1 origin в URL медиафайлов на настоящий apiBase.
 * Нужно когда бэкенд хранит в БД абсолютные URL с локальным адресом,
 * а браузер блокирует их загрузку (Chrome PNA).
 */
export default defineNuxtPlugin(() => {
  const { public: { apiBase } } = useRuntimeConfig()
  const base = String(apiBase ?? '').replace(/\/+$/, '')

  return {
    provide: {
      mediaUrl: (url: string | null | undefined): string =>
        resolveMediaUrl(url, base),
    },
  }
})
