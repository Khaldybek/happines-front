import type {
  TiptopPaymentStatusResponse,
  TiptopWidgetConfigResponse,
} from '~/types/tiptopPay'
import { optionalBearerJsonHeaders } from '~/composables/useApiBearerOptional'

const scriptLoadByUrl = new Map<string, Promise<void>>()

function apiBaseUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '').trim().replace(/\/+$/, '')
}

function extractHostedUrl(config: Record<string, unknown>): string | null {
  const keys = ['payment_url', 'checkout_url', 'hosted_url', 'url', 'redirect_url']
  for (const key of keys) {
    const value = config[key]
    if (typeof value === 'string' && /^https?:\/\//i.test(value.trim())) {
      return value.trim()
    }
  }
  return null
}

function normalizeWidgetConfig(config: Record<string, unknown>): Record<string, unknown> {
  const normalized = { ...config }
  // Some integrations use publicTerminalId, while widget may expect publicId.
  if (!normalized.publicId && typeof normalized.publicTerminalId === 'string') {
    normalized.publicId = normalized.publicTerminalId
  }
  return normalized
}

function hasValidAmount(config: Record<string, unknown>): boolean {
  const amount = config.amount
  if (typeof amount === 'number') return Number.isFinite(amount) && amount > 0
  if (typeof amount === 'string') {
    const n = Number(amount)
    return Number.isFinite(n) && n > 0
  }
  return false
}

async function ensureScript(widgetUrl: string): Promise<void> {
  const src = String(widgetUrl || '').trim()
  if (!src) return

  const cached = scriptLoadByUrl.get(src)
  if (cached) return cached

  const loadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    if (existing) {
      if (existing.dataset.loaded === '1') {
        resolve()
        return
      }
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Не удалось загрузить скрипт TipTop')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => {
      script.dataset.loaded = '1'
      resolve()
    }
    script.onerror = () => reject(new Error('Не удалось загрузить скрипт TipTop'))
    document.head.appendChild(script)
  })

  scriptLoadByUrl.set(src, loadPromise)

  try {
    await loadPromise
  }
  catch (error) {
    // Allow retries after temporary network/script errors.
    scriptLoadByUrl.delete(src)
    throw error
  }
}

export function useTiptopPay() {
  const baseUrl = apiBaseUrl()

  async function getWidgetConfig(orderId: number): Promise<TiptopWidgetConfigResponse | null> {
    try {
      return await $fetch<TiptopWidgetConfigResponse>(
        `${baseUrl}/api/v1/tiptoppay/orders/${orderId}/widget-config`,
        { headers: optionalBearerJsonHeaders() },
      )
    }
    catch {
      return null
    }
  }

  async function getPaymentStatus(orderId: number): Promise<TiptopPaymentStatusResponse | null> {
    try {
      return await $fetch<TiptopPaymentStatusResponse>(
        `${baseUrl}/api/v1/tiptoppay/orders/${orderId}/status`,
        { headers: optionalBearerJsonHeaders() },
      )
    }
    catch {
      return null
    }
  }

  async function launchWidget(
    widgetUrl: string,
    config: Record<string, unknown>,
  ): Promise<{ opened: boolean, via: 'widget' | 'popup' | 'none', reason?: string }> {
    if (!import.meta.client) return { opened: false, via: 'none' }

    const normalizedConfig = normalizeWidgetConfig(config)
    const hostedUrl = extractHostedUrl(normalizedConfig)
    if (!hasValidAmount(normalizedConfig)) {
      return {
        opened: false,
        via: 'none',
        reason: 'В конфиге TipTop отсутствует сумма оплаты (amount).',
      }
    }
    await ensureScript(widgetUrl)

    const w = window as unknown as Record<string, unknown>

    const TipTopPayWidget = w.TipTopPayWidget as (new (...args: unknown[]) => { open?: (cfg: unknown) => void }) | undefined
    if (TipTopPayWidget) {
      const instance = new TipTopPayWidget()
      if (instance?.open) {
        instance.open(normalizedConfig)
        return { opened: true, via: 'widget' }
      }
    }

    const tipTopPay = w.TipTopPay as { open?: (cfg: unknown) => void } | undefined
    if (tipTopPay?.open) {
      tipTopPay.open(normalizedConfig)
      return { opened: true, via: 'widget' }
    }

    if (hostedUrl) {
      window.open(hostedUrl, '_blank', 'noopener,noreferrer,width=620,height=760')
      return { opened: true, via: 'popup' }
    }

    return { opened: false, via: 'none' }
  }

  return { getWidgetConfig, getPaymentStatus, launchWidget }
}

