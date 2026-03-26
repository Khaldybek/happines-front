import { defineStore, acceptHMRUpdate } from 'pinia'

export interface CartItem {
  id: number
  image: string
  title: string
  pricePerUnit: number
  qty: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const count = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))

  const grandTotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.pricePerUnit * i.qty, 0),
  )

  function isInCart(id: number): boolean {
    return items.value.some((i) => i.id === id)
  }

  function add(item: CartItem): void {
    const existing = items.value.find((i) => i.id === item.id)
    if (existing) {
      existing.qty += item.qty
    }
    else {
      items.value.push({ ...item })
    }
  }

  function remove(id: number): void {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function changeQty(id: number, delta: number): void {
    const item = items.value.find((i) => i.id === id)
    if (!item) return
    const next = Math.max(1, item.qty + delta)
    item.qty = next
  }

  function setQty(id: number, qty: number): void {
    const item = items.value.find((i) => i.id === id)
    if (!item) return
    item.qty = Math.max(1, qty)
  }

  function clear(): void {
    items.value = []
  }

  return { items, count, grandTotal, isInCart, add, remove, changeQty, setQty, clear }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
