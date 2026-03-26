import type { CartApiResponse, CartApiItem } from '~/types/cartApi'

function cartApiBase(): string {
  const config = useRuntimeConfig()
  return `${String(config.public.apiBase ?? '').replace(/\/+$/, '')}/api/V1/cart`
}

function authHeaders(): Record<string, string> {
  const token = useCookie<string | null>('auth_token')
  const tokenType = useCookie<string>('auth_token_type')
  return {
    Accept: 'application/json',
    ...(token.value
      ? { Authorization: `${tokenType.value ?? 'Bearer'} ${token.value}` }
      : {}),
  }
}

export function useCartApi() {
  const base = cartApiBase()

  // ── Reactive state ─────────────────────────────────────────────────────────
  const items = ref<CartApiItem[]>([])
  const summary = reactive({ items_count: 0, total_quantity: 0, subtotal: 0 })

  const fetchPending = ref(false)
  const mutating = ref(false) // any write operation in progress

  // Per-item loading set (product_id)
  const loadingItems = ref(new Set<number>())

  // ── Helpers ────────────────────────────────────────────────────────────────
  function setLoadingItem(productId: number, state: boolean) {
    const s = new Set(loadingItems.value)
    state ? s.add(productId) : s.delete(productId)
    loadingItems.value = s
  }

  function applyResponse(data: CartApiResponse) {
    items.value = data.items
    summary.items_count = data.summary.items_count
    summary.total_quantity = data.summary.total_quantity
    summary.subtotal = data.summary.subtotal
  }

  // ── Fetch cart ─────────────────────────────────────────────────────────────
  async function fetchCart(): Promise<void> {
    fetchPending.value = true
    try {
      const data = await $fetch<CartApiResponse>(base, { headers: authHeaders() })
      applyResponse(data)
    }
    finally {
      fetchPending.value = false
    }
  }

  // ── Add item ───────────────────────────────────────────────────────────────
  async function addItem(productId: number, quantity = 1): Promise<void> {
    setLoadingItem(productId, true)
    try {
      const data = await $fetch<CartApiResponse>(`${base}/add`, {
        method: 'POST',
        headers: authHeaders(),
        body: { product_id: productId, quantity },
      })
      applyResponse(data)
    }
    finally {
      setLoadingItem(productId, false)
    }
  }

  // ── Set exact quantity ─────────────────────────────────────────────────────
  async function setQty(productId: number, quantity: number): Promise<void> {
    if (quantity < 1) return removeItem(productId)

    setLoadingItem(productId, true)

    // Optimistic update
    const item = items.value.find(i => i.product_id === productId)
    if (item) {
      const prev = item.quantity
      item.quantity = quantity
      item.item_total = item.price * quantity

      try {
        const data = await $fetch<CartApiResponse>(`${base}/${productId}`, {
          method: 'PATCH',
          headers: authHeaders(),
          body: { quantity },
        })
        applyResponse(data)
      }
      catch {
        // Rollback on error
        item.quantity = prev
        item.item_total = item.price * prev
      }
      finally {
        setLoadingItem(productId, false)
      }
    }
  }

  // ── Change quantity by delta ───────────────────────────────────────────────
  async function changeQty(productId: number, delta: number): Promise<void> {
    const item = items.value.find(i => i.product_id === productId)
    if (!item) return
    const next = Math.max(1, item.quantity + delta)
    if (next === item.quantity) return
    await setQty(productId, next)
  }

  // ── Remove item ────────────────────────────────────────────────────────────
  async function removeItem(productId: number): Promise<void> {
    setLoadingItem(productId, true)

    // Optimistic remove
    const backup = [...items.value]
    items.value = items.value.filter(i => i.product_id !== productId)

    try {
      const data = await $fetch<CartApiResponse>(`${base}/${productId}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      applyResponse(data)
    }
    catch {
      items.value = backup
    }
    finally {
      setLoadingItem(productId, false)
    }
  }

  // ── Clear cart ─────────────────────────────────────────────────────────────
  async function clearCart(): Promise<void> {
    mutating.value = true
    const backup = [...items.value]
    items.value = []

    try {
      const data = await $fetch<CartApiResponse>(base, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      applyResponse(data)
    }
    catch {
      items.value = backup
    }
    finally {
      mutating.value = false
    }
  }

  // ── Sync multiple items ────────────────────────────────────────────────────
  async function syncItems(payload: Array<{ product_id: number, quantity: number }>): Promise<void> {
    mutating.value = true
    try {
      const data = await $fetch<CartApiResponse>(`${base}/sync`, {
        method: 'POST',
        headers: authHeaders(),
        body: { items: payload },
      })
      applyResponse(data)
    }
    finally {
      mutating.value = false
    }
  }

  // ── Computed helpers ───────────────────────────────────────────────────────
  const isEmpty = computed(() => items.value.length === 0)

  function isItemLoading(productId: number): boolean {
    return loadingItems.value.has(productId)
  }

  return {
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
  }
}
