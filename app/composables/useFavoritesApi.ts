import type {
  FavoriteApiItem,
  FavoriteApiPagination,
  FavoritesApiResponse,
  FavoriteToggleResponse,
} from '~/types/favoritesApi'

function favApiBase(): string {
  const config = useRuntimeConfig()
  return `${String(config.public.apiBase ?? '').replace(/\/+$/, '')}/api/V1/favorites`
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

export function useFavoritesApi() {
  const base = favApiBase()

  // ── State ──────────────────────────────────────────────────────────────────
  const items = ref<FavoriteApiItem[]>([])
  const pagination = ref<FavoriteApiPagination>({
    total: 0, count: 0, per_page: 20, current_page: 1, total_pages: 1,
  })

  const fetchPending = ref(false)
  const loadingItems = ref(new Set<number>())

  // ── Helpers ────────────────────────────────────────────────────────────────
  function setLoadingItem(productId: number, state: boolean) {
    const s = new Set(loadingItems.value)
    state ? s.add(productId) : s.delete(productId)
    loadingItems.value = s
  }

  function applyResponse(res: FavoritesApiResponse) {
    items.value = res.favorites.data
    pagination.value = res.pagination
  }

  // ── Fetch ──────────────────────────────────────────────────────────────────
  async function fetchFavorites(page = 1): Promise<void> {
    fetchPending.value = true
    try {
      const data = await $fetch<FavoritesApiResponse>(base, {
        headers: authHeaders(),
        query: { page },
      })
      applyResponse(data)
    }
    finally {
      fetchPending.value = false
    }
  }

  // ── Add ────────────────────────────────────────────────────────────────────
  async function addFavorite(productId: number): Promise<void> {
    setLoadingItem(productId, true)
    try {
      const data = await $fetch<FavoritesApiResponse>(`${base}/add`, {
        method: 'POST',
        headers: authHeaders(),
        body: { product_id: productId },
      })
      applyResponse(data)
    }
    finally {
      setLoadingItem(productId, false)
    }
  }

  // ── Toggle ─────────────────────────────────────────────────────────────────
  async function toggleFavorite(productId: number): Promise<FavoriteToggleResponse | null> {
    setLoadingItem(productId, true)
    try {
      const res = await $fetch<FavoriteToggleResponse>(`${base}/toggle`, {
        method: 'POST',
        headers: authHeaders(),
        body: { product_id: productId },
      })
      // Refresh list to reflect change
      await fetchFavorites(pagination.value.current_page)
      return res
    }
    finally {
      setLoadingItem(productId, false)
    }
  }

  // ── Remove ─────────────────────────────────────────────────────────────────
  async function removeFavorite(productId: number): Promise<void> {
    setLoadingItem(productId, true)

    // Optimistic remove
    const backup = [...items.value]
    items.value = items.value.filter(i => i.product_id !== productId)
    pagination.value.total = Math.max(0, pagination.value.total - 1)

    try {
      const data = await $fetch<FavoritesApiResponse>(`${base}/${productId}`, {
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

  // ── Clear ──────────────────────────────────────────────────────────────────
  async function clearFavorites(): Promise<void> {
    const backup = [...items.value]
    items.value = []
    pagination.value.total = 0

    try {
      const data = await $fetch<FavoritesApiResponse>(base, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      applyResponse(data)
    }
    catch {
      items.value = backup
    }
  }

  // ── Computed ───────────────────────────────────────────────────────────────
  const isEmpty = computed(() => items.value.length === 0)
  const isFavorite = (productId: number) =>
    items.value.some(i => i.product_id === productId)
  const isItemLoading = (productId: number) =>
    loadingItems.value.has(productId)

  return {
    items,
    pagination,
    fetchPending,
    loadingItems,
    isEmpty,
    isFavorite,
    isItemLoading,
    fetchFavorites,
    addFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
  }
}
