import type { CartApiResponse, CartApiItem } from '~/types/cartApi'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { resolveMediaUrl } from '~/utils/resolveMediaUrl'

function cartApiBase(config: ReturnType<typeof useRuntimeConfig>): string {
  return `${String(config.public.apiBase ?? '').replace(/\/+$/, '')}/api/V1/user/cart`
}

function apiBase(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '').replace(/\/+$/, '')
}

function fixItemImages(items: CartApiItem[], base: string): CartApiItem[] {
  return items.map((item, index) => {
    const row = item as unknown as Record<string, unknown>
    const cart_item_id = Number(item.cart_item_id ?? row.id ?? index + 1)
    return {
      ...item,
      cart_item_id,
      image: resolveMediaUrl(item.image, base),
    }
  })
}

function normalizeSummary(s: Record<string, unknown>): CartApiResponse['summary'] {
  return {
    items_count: Number(s.items_count ?? s.itemsCount ?? 0),
    total_quantity: Number(s.total_quantity ?? s.totalQuantity ?? 0),
    subtotal: Number(s.subtotal ?? s.sub_total ?? 0),
  }
}

function inferSummaryFromItems(items: CartApiItem[]): CartApiResponse['summary'] {
  const total_quantity = items.reduce((acc, i) => acc + (Number(i.quantity) || 0), 0)
  const subtotal = items.reduce((acc, i) => acc + (Number(i.item_total) || 0), 0)
  return {
    items_count: items.length,
    total_quantity,
    subtotal,
  }
}

function collectCartPayloadCandidates(raw: unknown): Record<string, unknown>[] {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return []
  const o = raw as Record<string, unknown>
  const out: Record<string, unknown>[] = [o]
  const nest = (k: string) => {
    const v = o[k]
    if (v && typeof v === 'object' && !Array.isArray(v)) out.push(v as Record<string, unknown>)
  }
  nest('data')
  nest('cart')
  nest('result')
  return out
}

/** Разбор ответа GET / PATCH / sync — плоский ответ или обёртки data / cart / result */
function parseCartResponse(raw: unknown): CartApiResponse | null {
  for (const inner of collectCartPayloadCandidates(raw)) {
    const items = inner.items
    const summaryRaw = inner.summary
    if (!Array.isArray(items)) continue
    if (summaryRaw === undefined || typeof summaryRaw !== 'object' || Array.isArray(summaryRaw)) {
      return {
        items: items as CartApiItem[],
        summary: items.length
          ? inferSummaryFromItems(items as CartApiItem[])
          : { items_count: 0, total_quantity: 0, subtotal: 0 },
      }
    }
    return {
      items: items as CartApiItem[],
      summary: normalizeSummary(summaryRaw as Record<string, unknown>),
    }
  }
  return null
}

function isFullCartPayload(x: unknown): x is CartApiResponse {
  return parseCartResponse(x) !== null
}

function authHeaders(): Record<string, string> {
  const token = useCookie<string | null>('auth_token')
  const tokenType = useCookie<string>('auth_token_type')
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token.value
      ? { Authorization: `${tokenType.value ?? 'Bearer'} ${token.value}` }
      : {}),
  }
}

export function useCartApi() {
  const config = useRuntimeConfig()
  const route = useRoute()
  const base = cartApiBase(config)
  const mediaBase = apiBase()

  const langQuery = () => getApiLangForRequest(route)

  // ── Reactive state ─────────────────────────────────────────────────────────
  const items = ref<CartApiItem[]>([])
  const summary = reactive({ items_count: 0, total_quantity: 0, subtotal: 0 })

  const fetchPending = ref(false)
  const mutating = ref(false)

  const loadingItems = ref(new Set<number>())

  function setLoadingItem(productId: number, state: boolean) {
    const s = new Set(loadingItems.value)
    state ? s.add(productId) : s.delete(productId)
    loadingItems.value = s
  }

  function applyResponse(data: CartApiResponse) {
    const list = Array.isArray(data.items) ? data.items : []
    items.value = fixItemImages(list, mediaBase)
    summary.items_count = data.summary.items_count
    summary.total_quantity = data.summary.total_quantity
    summary.subtotal = data.summary.subtotal
  }

  /** Полная перезагрузка корзины (GET /api/V1/user/cart) */
  async function fetchCart(options?: { silent?: boolean }): Promise<void> {
    const silent = options?.silent === true
    if (!silent) fetchPending.value = true
    try {
      const raw = await $fetch<unknown>(base, {
        headers: authHeaders(),
        query: langQuery(),
      })
      const parsed = parseCartResponse(raw)
      if (parsed) {
        applyResponse(parsed)
      }
      else {
        items.value = []
        summary.items_count = 0
        summary.total_quantity = 0
        summary.subtotal = 0
      }
    }
    catch {
      /* сеть / 401 — не очищаем локальную корзину после успешных мутаций */
    }
    finally {
      if (!silent) fetchPending.value = false
    }
  }

  async function applyOrRefetch(res: unknown): Promise<void> {
    const parsed = parseCartResponse(res)
    if (parsed) {
      applyResponse(parsed)
    }
    else {
      await fetchCart({ silent: true })
    }
  }

  // ── Add item — POST возвращает message + item, не полную корзину ───────────
  async function addItem(productId: number, quantity = 1): Promise<void> {
    setLoadingItem(productId, true)
    try {
      await $fetch(`${base}/add`, {
        method: 'POST',
        headers: authHeaders(),
        query: langQuery(),
        body: { product_id: productId, quantity },
      })
      await fetchCart({ silent: true })
    }
    finally {
      setLoadingItem(productId, false)
    }
  }

  async function setQty(productId: number, quantity: number): Promise<void> {
    if (quantity < 1) return removeItem(productId)

    setLoadingItem(productId, true)

    const item = items.value.find(i => i.product_id === productId)
    if (item) {
      const prev = item.quantity
      item.quantity = quantity
      item.item_total = item.price * quantity

      try {
        const res = await $fetch(`${base}/${productId}`, {
          method: 'PATCH',
          headers: authHeaders(),
          query: langQuery(),
          body: { quantity },
        })
        await applyOrRefetch(res)
      }
      catch {
        item.quantity = prev
        item.item_total = item.price * prev
      }
      finally {
        setLoadingItem(productId, false)
      }
    }
  }

  async function changeQty(productId: number, delta: number): Promise<void> {
    const item = items.value.find(i => i.product_id === productId)
    if (!item) return
    const next = Math.max(1, item.quantity + delta)
    if (next === item.quantity) return
    await setQty(productId, next)
  }

  async function removeItem(productId: number): Promise<void> {
    setLoadingItem(productId, true)

    const backup = [...items.value]
    items.value = items.value.filter(i => i.product_id !== productId)

    try {
      const res = await $fetch(`${base}/${productId}`, {
        method: 'DELETE',
        headers: authHeaders(),
        query: langQuery(),
      })
      await applyOrRefetch(res)
    }
    catch {
      items.value = backup
    }
    finally {
      setLoadingItem(productId, false)
    }
  }

  async function clearCart(): Promise<void> {
    mutating.value = true
    const backup = [...items.value]
    items.value = []

    try {
      await $fetch(base, {
        method: 'DELETE',
        headers: authHeaders(),
        query: langQuery(),
      })
      await fetchCart({ silent: true })
    }
    catch {
      items.value = backup
    }
    finally {
      mutating.value = false
    }
  }

  async function syncItems(payload: Array<{ product_id: number, quantity: number }>): Promise<void> {
    mutating.value = true
    try {
      const res = await $fetch(`${base}/sync`, {
        method: 'POST',
        headers: authHeaders(),
        query: langQuery(),
        body: { items: payload },
      })
      await applyOrRefetch(res)
    }
    finally {
      mutating.value = false
    }
  }

  const isEmpty = computed(() => items.value.length === 0)

  function isItemLoading(productId: number): boolean {
    return loadingItems.value.has(productId)
  }

  /** plain-объект с ref ломает шаблон (v-if на nested ref всегда truthy); reactive снимает вложенные ref */
  return reactive({
    items,
    summary,
    fetchPending,
    mutating,
    loadingItems,
    isEmpty,
    fetchCart,
    addItem,
    setQty,
    changeQty,
    removeItem,
    clearCart,
    syncItems,
    isItemLoading,
  })
}
