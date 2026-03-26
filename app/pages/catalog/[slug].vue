<template>
  <div>
    <TheHeader />
    <main>
      <CatalogHero
        :category-title="categoryTitle"
        :hero-image="heroImage"
        :lead="heroLead"
        :description="heroDescription"
      />

      <CatalogProductGrid
        :products="gridProducts"
        :current-page="currentPage"
        :total-pages="totalPages"
        :use-green="false"
        @update:current-page="currentPage = $event"
        @add-to-cart="onAddToCart"
      />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { NavItem } from '~/types/navigation'
import type { CatalogProduct } from '~/types/catalogPage'

definePageMeta({ layout: false })

const route = useRoute()
const slug = computed(() => String(route.params.slug || '').trim())

const { data: navData } = useNavigation()
const { data: catalogData, pending } = useCatalogPage(slug.value)

const page = computed(() => catalogData.value ?? null)
const products = computed<CatalogProduct[]>(() => page.value?.products ?? [])

const productionNode = computed(() => {
  const items = (navData.value?.items ?? []) as NavItem[]
  return items.find((x) => x.key === 'production') ?? null
})

const navCategory = computed(() => {
  const children = productionNode.value?.children ?? []
  return children.find((c: any) => String(c.slug || '').trim() === slug.value) ?? null
})

const categoryTitle = computed(() =>
  String(page.value?.category_title || '').trim()
  || String(navCategory.value?.title || '').trim()
  || products.value[0]?.category_name
  || 'Каталог'
)

const heroImage = computed(() => {
  const u = String(page.value?.category_image_url || '').trim()
  return u || '/images/1ae1a66818f50d31f8b471b4238a7ac2c17b847f.png'
})

const heroLead = computed(() => {
  const t = String(page.value?.category_plural_title || '').trim()
  return t || categoryTitle.value
})

const heroDescription = computed(() => {
  if (pending.value) return 'Загрузка…'
  const t = String(page.value?.category_description || '').trim()
  if (t) return t
  if (!products.value.length) return 'Товары не найдены.'
  return ''
})

useHead(() => ({
  title: `${categoryTitle.value} — Каталог | Happiness`,
}))

const currentPage = ref(1)
const totalPages = computed(() => 1)

function formatPrice(p: number | null | undefined) {
  const n = typeof p === 'number' ? p : Number(p)
  if (!Number.isFinite(n)) return ''
  return new Intl.NumberFormat('ru-RU').format(n) + '₸'
}

function productImage(p: CatalogProduct) {
  return p.image_orig || p.image || '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png'
}

const gridProducts = computed(() =>
  products.value.map((p) => ({
    id: String(p.id),
    title: p.short_title || p.title,
    description: p.card_description || p.short_description || p.description || '',
    price: formatPrice(p.price),
    image: productImage(p),
    tealBtn: false,
  })),
)

function onAddToCart(_product: unknown) {
  // TODO: интеграция с корзиной
}
</script>
