import { defineStore, acceptHMRUpdate } from 'pinia'

export interface FavoriteItem {
  id: number
  title: string
  description: string
  price: string
  image: string
  variant?: 'blue' | 'orange'
}

export const useFavoritesStore = defineStore('favorites', () => {
  const items = ref<FavoriteItem[]>([])

  const ids = computed<Set<number>>(() => new Set(items.value.map((i) => i.id)))

  const count = computed(() => items.value.length)

  function isFavorite(id: number): boolean {
    return ids.value.has(id)
  }

  function add(item: FavoriteItem): void {
    if (!isFavorite(item.id)) {
      items.value.push(item)
    }
  }

  function remove(id: number): void {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function toggle(item: FavoriteItem): void {
    isFavorite(item.id) ? remove(item.id) : add(item)
  }

  return { items, count, isFavorite, add, remove, toggle }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFavoritesStore, import.meta.hot))
}
