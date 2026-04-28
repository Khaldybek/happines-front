import type {
  TiptopPaymentStatusResponse,
  TiptopWidgetConfigResponse,
} from '~/types/tiptopPay'
import { optionalBearerJsonHeaders } from '~/composables/useApiBearerOptional'

let scriptLoadPromise: Promise<void> | null = null

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

async function ensureScript(widgetUrl: string): Promise<void> {
  if (!widgetUrl) return
  if (scriptLoadPromise) return scriptLoadPromise

  scriptLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${widgetUrl}"]`)
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
    script.src = widgetUrl
    script.async = true
    script.onload = () => {
      script.dataset.loaded = '1'
      resolve()
    }
    script.onerror = () => reject(new Error('Не удалось загрузить скрипт TipTop'))
    document.head.appendChild(script)
  })

  return scriptLoadPromise
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

  async function launchWidget(widgetUrl: string, config: Record<string, unknown>): Promise<{ opened: boolean, via: 'widget' | 'popup' | 'none' }> {
    if (!import.meta.client) return { opened: false, via: 'none' }

    const hostedUrl = extractHostedUrl(config)
    await ensureScript(widgetUrl)

    const w = window as unknown as Record<string, unknown>

    const TipTopPayWidget = w.TipTopPayWidget as (new (...args: unknown[]) => { open?: (cfg: unknown) => void }) | undefined
    if (TipTopPayWidget) {
      const instance = new TipTopPayWidget()
      if (instance?.open) {
        instance.open(config)
        return { opened: true, via: 'widget' }
      }
    }

    const tipTopPay = w.TipTopPay as { open?: (cfg: unknown) => void } | undefined
    if (tipTopPay?.open) {
      tipTopPay.open(config)
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

