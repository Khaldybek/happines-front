import type {
  FavoriteApiItem,
  FavoriteApiPagination,
  FavoritesApiResponse,
  FavoriteToggleResponse,
} from '~/types/favoritesApi'
import { getApiLangForRequest } from '~/composables/useApiLangQuery'
import { resolveMediaUrl } from '~/utils/resolveMediaUrl'

function favApiBase(config: ReturnType<typeof useRuntimeConfig>): string {
  return `${String(config.public.apiBase ?? '').replace(/\/+$/, '')}/api/V1/user/favorites`
}

function getMediaBase(): string {
  const config = useRuntimeConfig()
  return String(config.public.apiBase ?? '').replace(/\/+$/, '')
}

function favoritesListFromResponse(res: FavoritesApiResponse): FavoriteApiItem[] {
  const f = res.favorites
  if (Array.isArray(f)) return f
  return f?.data ?? []
}

function fixItemImages(items: FavoriteApiItem[], base: string): FavoriteApiItem[] {
  return items.map(item => ({
    ...item,
    image: resolveMediaUrl(item.image, base),
  }))
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

export function useFavoritesApi() {
  const config = useRuntimeConfig()
  const route = useRoute()
  const base = favApiBase(config)
  const mediaBase = getMediaBase()

  const langQuery = () => getApiLangForRequest(route)

  const items = ref<FavoriteApiItem[]>([])
  const pagination = ref<FavoriteApiPagination>({
    total: 0, count: 0, per_page: 20, current_page: 1, total_pages: 1,
  })

  const fetchPending = ref(false)
  const loadingItems = ref(new Set<number>())

  function setLoadingItem(productId: number, state: boolean) {
    const s = new Set(loadingItems.value)
    state ? s.add(productId) : s.delete(productId)
    loadingItems.value = s
  }

  function applyResponse(res: FavoritesApiResponse) {
    items.value = fixItemImages(favoritesListFromResponse(res), mediaBase)
    pagination.value = res.pagination
  }

  async function fetchFavorites(page = 1): Promise<void> {
    fetchPending.value = true
    try {
      const data = await $fetch<FavoritesApiResponse>(base, {
        headers: authHeaders(),
        query: { ...langQuery(), page },
      })
      applyResponse(data)
    }
    finally {
      fetchPending.value = false
    }
  }

  /** POST /add — 201: message + item; список обновляем GET */
  async function addFavorite(productId: number): Promise<void> {
    setLoadingItem(productId, true)
    try {
      await $fetch(`${base}/add`, {
        method: 'POST',
        headers: authHeaders(),
        query: langQuery(),
        body: { product_id: productId },
      })
      await fetchFavorites(pagination.value.current_page)
    }
    finally {
      setLoadingItem(productId, false)
    }
  }

  async function toggleFavorite(productId: number): Promise<FavoriteToggleResponse | null> {
    setLoadingItem(productId, true)
    try {
      const res = await $fetch<FavoriteToggleResponse>(`${base}/toggle`, {
        method: 'POST',
        headers: authHeaders(),
        query: langQuery(),
        body: { product_id: productId },
      })
      await fetchFavorites(pagination.value.current_page)
      return res
    }
    finally {
      setLoadingItem(productId, false)
    }
  }

  async function removeFavorite(productId: number): Promise<void> {
    setLoadingItem(productId, true)

    const backup = [...items.value]
    items.value = items.value.filter(i => i.product_id !== productId)
    pagination.value.total = Math.max(0, pagination.value.total - 1)

    try {
      await $fetch(`${base}/${productId}`, {
        method: 'DELETE',
        headers: authHeaders(),
        query: langQuery(),
      })
      await fetchFavorites(pagination.value.current_page)
    }
    catch {
      items.value = backup
    }
    finally {
      setLoadingItem(productId, false)
    }
  }

  async function clearFavorites(): Promise<void> {
    const backup = [...items.value]
    items.value = []
    pagination.value.total = 0

    try {
      await $fetch(base, {
        method: 'DELETE',
        headers: authHeaders(),
        query: langQuery(),
      })
      await fetchFavorites(1)
    }
    catch {
      items.value = backup
    }
  }

  const isEmpty = computed(() => items.value.length === 0)
  const isFavorite = (productId: number) =>
    items.value.some(i => i.product_id === productId)
  const isItemLoading = (productId: number) =>
    loadingItems.value.has(productId)

  /** см. useCartApi — reactive() чтобы в шаблоне v-if="fav.fetchPending" и т.д. работали */
  return reactive({
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
  })
}
