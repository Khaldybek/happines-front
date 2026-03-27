<template>
  <div>
    <TheHeader />
    <main class="product-page">
      <section class="breadcrumbs-section">
        <div class="container">
          <nav class="breadcrumbs-list" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="crumb-item">Главная</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <NuxtLink :to="categoryTo" class="crumb-item">{{ categoryTitle }}</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <span class="crumb-item active">{{ productTitle }}</span>
          </nav>
        </div>
      </section>

      <section class="product-main-section">
        <div class="container product-main-grid">
          <section class="product-gallery">
            <div class="product-main-media">
              <img
                v-if="activeMedia?.type === 'image'"
                :src="activeMedia.url"
                :alt="productTitle"
                class="product-main-image"
              >
              <video
                v-else-if="activeMedia?.type === 'video'"
                :src="activeMedia.url"
                class="product-main-image"
                controls
                playsinline
              />
            </div>

            <div v-if="galleryItems.length" class="product-thumbs-row">
              <button type="button" class="thumb-nav" @click="prevMedia">‹</button>
              <div class="thumb-track">
                <button
                  v-for="(item, idx) in galleryItems"
                  :key="`${item.type}-${item.url}-${idx}`"
                  type="button"
                  class="thumb-item"
                  :class="{ active: idx === activeMediaIndex }"
                  @click="activeMediaIndex = idx"
                >
                  <img v-if="item.type === 'image'" :src="item.url" :alt="`${productTitle} ${idx + 1}`">
                  <span v-else class="video-thumb-mark">▶</span>
                </button>
              </div>
              <button type="button" class="thumb-nav" @click="nextMedia">›</button>
            </div>
          </section>

          <section class="product-info">
            <h1 class="product-title">{{ productTitle }}</h1>
            <div class="product-meta-row">
              <span class="product-code">Артикул: {{ product.code || '—' }}</span>
              <button type="button" class="meta-btn" @click="toggleFavorite">
                <svg class="meta-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 20.5c-.3 0-.6-.1-.8-.3C8.4 17.8 4 14.2 4 9.8 4 7.2 6 5 8.6 5c1.4 0 2.7.6 3.6 1.7C13.1 5.6 14.4 5 15.8 5 18.4 5 20.4 7.2 20.4 9.8c0 4.4-4.4 8-7.2 10.4-.3.2-.6.3-1.2.3z"
                  />
                </svg>
                <span>{{ isFavorite ? 'В избранном' : 'В избранные' }}</span>
              </button>
              <button type="button" class="meta-btn" @click="shareProduct">
                <svg class="meta-icon meta-icon-share" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M16.1115 12.2227C15.4814 12.2232 14.8609 12.377 14.3036 12.6709C13.7462 12.9647 13.2687 13.3898 12.9123 13.9094L7.48813 11.4602C7.87339 10.5299 7.87489 9.48495 7.4923 8.55354L12.909 6.09187C13.4372 6.85584 14.2217 7.40518 15.1203 7.64025C16.0189 7.87531 16.9719 7.78054 17.8066 7.37312C18.6412 6.9657 19.3022 6.27262 19.6697 5.4196C20.0371 4.56657 20.0866 3.6101 19.8093 2.72368C19.5319 1.83727 18.946 1.07962 18.1579 0.588169C17.3698 0.0967179 16.4316 -0.0959833 15.5136 0.0450196C14.5956 0.186023 13.7585 0.65139 13.1542 1.35671C12.5499 2.06203 12.2184 2.96058 12.2198 3.88937C12.2233 4.10921 12.2456 4.32834 12.2865 4.54437L6.52814 7.16104C5.97509 6.64289 5.28273 6.29757 4.53611 6.16751C3.7895 6.03745 3.02116 6.1283 2.32548 6.42892C1.62979 6.72954 1.03707 7.22682 0.620132 7.85968C0.203191 8.49253 -0.0198099 9.23339 -0.021475 9.99125C-0.0231401 10.7491 0.196603 11.4909 0.610759 12.1256C1.02492 12.7603 1.61545 13.2602 2.3098 13.5639C3.00415 13.8675 3.77209 13.9618 4.51927 13.835C5.26644 13.7082 5.96031 13.3659 6.51564 12.8502L12.289 15.4569C12.2489 15.6727 12.2268 15.8915 12.2231 16.111C12.223 16.8803 12.4509 17.6324 12.8782 18.2721C13.3055 18.9118 13.9129 19.4104 14.6236 19.7048C15.3343 19.9993 16.1163 20.0764 16.8708 19.9264C17.6253 19.7763 18.3184 19.4059 18.8624 18.8619C19.4063 18.318 19.7767 17.6249 19.9268 16.8704C20.0768 16.1159 19.9997 15.3339 19.7053 14.6232C19.4108 13.9125 18.9122 13.3051 18.2725 12.8778C17.6328 12.4505 16.8807 12.2225 16.1115 12.2227V12.2227ZM16.1115 1.66687C16.5511 1.66671 16.9809 1.79692 17.3465 2.04103C17.712 2.28514 17.997 2.63219 18.1654 3.03828C18.3337 3.44438 18.3779 3.89127 18.2922 4.32245C18.2065 4.75363 17.9949 5.14972 17.6841 5.46062C17.3734 5.77153 16.9773 5.98328 16.5462 6.06911C16.1151 6.15493 15.6681 6.11097 15.262 5.94278C14.8558 5.77458 14.5087 5.48972 14.2644 5.12422C14.0202 4.75871 13.8898 4.32898 13.8898 3.88937C13.8902 3.30021 14.1244 2.73529 14.541 2.31861C14.9575 1.90193 15.5223 1.66754 16.1115 1.66687V1.66687ZM3.8898 12.2227C3.4502 12.2229 3.02042 12.0927 2.65482 11.8486C2.28922 11.6044 2.00423 11.2574 1.83589 10.8513C1.66754 10.4452 1.62341 9.99831 1.70907 9.56713C1.79473 9.13595 2.00634 8.73986 2.31713 8.42896C2.62792 8.11805 3.02393 7.9063 3.45507 7.82047C3.88622 7.73465 4.33313 7.77861 4.73929 7.94681C5.14545 8.115 5.4926 8.39986 5.73685 8.76537C5.9811 9.13087 6.11147 9.5606 6.11147 10.0002C6.11081 10.5893 5.87655 11.1541 5.46008 11.5707C5.0436 11.9874 4.4789 12.2218 3.8898 12.2227ZM16.1115 18.3335C15.6719 18.3335 15.2422 18.2032 14.8767 17.959C14.5112 17.7148 14.2264 17.3677 14.0581 16.9616C13.8899 16.5554 13.8459 16.1086 13.9317 15.6775C14.0174 15.2463 14.2291 14.8503 14.5399 14.5395C14.8507 14.2287 15.2468 14.017 15.6779 13.9312C16.109 13.8455 16.5559 13.8895 16.962 14.0577C17.3681 14.2259 17.7152 14.5108 17.9594 14.8763C18.2036 15.2418 18.334 15.6715 18.334 16.111C18.3335 16.7004 18.0992 17.2654 17.6825 17.6821C17.2658 18.0988 16.7008 18.3331 16.1115 18.3335V18.3335Z" />
                </svg>
                <span>Поделиться</span>
              </button>
            </div>

            <p class="product-desc">{{ topDescription }}</p>
            <p class="product-form">{{ releaseForm }}</p>

            <div class="price-buy-row">
              <div>
                <p class="product-price">{{ formatPrice(priceNow) }}</p>
                <p v-if="showOldPrice" class="product-old-price">{{ formatPrice(priceOld) }}</p>
              </div>
              <button type="button" class="add-cart-btn" :disabled="isAddLoading" @click="addToCart">
                <span class="add-cart-arrow">→</span>
                <span>{{ inCart ? 'В КОРЗИНЕ' : 'В КОРЗИНУ' }}</span>
              </button>
            </div>
          </section>
        </div>
      </section>

      <section class="product-tabs-section">
        <div class="container">
          <div class="tabs-row">
            <button
              v-for="tab in tabItems"
              :key="tab.key"
              type="button"
              class="tab-btn"
              :class="{ active: tab.key === activeTab }"
              @click="activeTab = tab.key"
            >
              {{ tab.title }}
            </button>
          </div>
          <div class="tab-content">
            <h2 v-if="activeTabTitle" class="tab-title">{{ activeTabTitle }}</h2>
            <p v-if="activeTabText">{{ activeTabText }}</p>
          </div>
        </div>
      </section>

    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { ProductMediaItem } from '~/types/productPage'

definePageMeta({ layout: false })

const route = useRoute()
const router = useRouter()

const cart = useCartApi()
const fav = useFavoritesApi()

const slug = computed(() => String(route.params.slug || '').trim())
const { data } = useProductPage(slug)

const product = computed(() => data.value?.product ?? null)

const productTitle = computed(() => product.value?.title || 'Товар')
const categoryTitle = computed(() =>
  String(product.value?.category_name || '').trim() || 'Каталог',
)
const categoryTo = computed(() => {
  const s = String(product.value?.category_slug || '').trim()
  return s ? `/catalog/${s}` : '/catalog'
})
const topDescription = computed(() =>
  String(product.value?.card_description || product.value?.description || '').trim(),
)
const releaseForm = computed(() => {
  if (!product.value) return ''
  const title = String(product.value?.short_description || '').trim()
  return title ? `Форма выпуска: ${title}` : 'Форма выпуска: 100%/флакон'
})

const priceNow = computed(() => {
  const p = product.value
  if (!p) return 0
  return Number(p.discount_price > 0 ? p.discount_price : p.price) || 0
})
const priceOld = computed(() => Number(product.value?.old_price || 0))
const showOldPrice = computed(() => Boolean(product.value && product.value.is_discount && priceOld.value > priceNow.value))

const inCart = computed(() => {
  const id = product.value?.id
  if (!id) return false
  return cart.items.some(i => i.product_id === id)
})
const isFavorite = computed(() => {
  const id = product.value?.id
  if (!id) return false
  return fav.isFavorite(id) || Boolean(product.value?.is_favorite)
})
const isAddLoading = computed(() => {
  const id = product.value?.id
  if (!id) return false
  return cart.isItemLoading(id)
})

function requireAuth(): boolean {
  const token = useCookie<string | null>('auth_token')
  if (!token.value) {
    router.push(`/login?redirect=${encodeURIComponent(route.fullPath)}`)
    return false
  }
  return true
}

async function addToCart() {
  const id = product.value?.id
  if (!id) return
  if (!requireAuth()) return
  await cart.addItem(id, 1)
}

async function toggleFavorite() {
  const id = product.value?.id
  if (!id) return
  if (!requireAuth()) return
  await fav.toggleFavorite(id)
}

async function shareProduct() {
  const url = window.location.href
  try {
    if (navigator.share) {
      await navigator.share({ title: productTitle.value, url })
      return
    }
  }
  catch {
    return
  }
  await navigator.clipboard.writeText(url).catch(() => {})
}

type GalleryItem = { type: 'image' | 'video', url: string }
const galleryItems = computed<GalleryItem[]>(() => {
  const p = product.value
  if (!p) return []
  const out: GalleryItem[] = []
  const addImage = (u?: string | null) => {
    const url = String(u || '').trim()
    if (!url || out.some(x => x.type === 'image' && x.url === url)) return
    out.push({ type: 'image', url })
  }
  const addVideo = (u?: string | null) => {
    const url = String(u || '').trim()
    if (!url || out.some(x => x.type === 'video' && x.url === url)) return
    out.push({ type: 'video', url })
  }
  addImage(p.image_orig)
  addImage(p.image)
  ;(p.images || []).forEach((m: ProductMediaItem) => {
    addImage(m.image)
    addVideo(m.video_url)
  })
  addVideo(p.youtube_link)
  return out
})

const activeMediaIndex = ref(0)
watch(galleryItems, () => {
  activeMediaIndex.value = 0
}, { immediate: true })
const activeMedia = computed(() => galleryItems.value[activeMediaIndex.value] || null)
function prevMedia() {
  if (!galleryItems.value.length) return
  activeMediaIndex.value = (activeMediaIndex.value - 1 + galleryItems.value.length) % galleryItems.value.length
}
function nextMedia() {
  if (!galleryItems.value.length) return
  activeMediaIndex.value = (activeMediaIndex.value + 1) % galleryItems.value.length
}

const tabItems = computed(() => {
  const source = product.value?.sections || []
  return source.map((x, i) => ({ key: `tab-${i}`, title: x.title || `Раздел ${i + 1}`, text: String(x.description || '').trim() }))
})
const activeTab = ref('tab-0')
watch(tabItems, (items) => {
  if (!items.length) return
  if (!items.some(x => x.key === activeTab.value)) activeTab.value = items[0].key
}, { immediate: true })

const activeTabTitle = computed(() => tabItems.value.find(t => t.key === activeTab.value)?.title || 'ОПИСАНИЕ')
const activeTabText = computed(() => {
  const direct = tabItems.value.find(t => t.key === activeTab.value)?.text
  if (direct) return direct
  const t = activeTabTitle.value.toLowerCase()
  if (t.includes('состав')) {
    return String(product.value?.short_description || '').trim()
  }
  if (t.includes('рекомен')) {
    return String(product.value?.instruction || '').trim()
  }
  return String(product.value?.description || '').trim()
})

function formatPrice(value: number) {
  return `${new Intl.NumberFormat('ru-RU').format(value)}₸`
}

onMounted(async () => {
  const token = useCookie<string | null>('auth_token')
  if (!token.value) return
  await Promise.all([cart.fetchCart(), fav.fetchFavorites(1)]).catch(() => {})
})

useHead(() => ({
  title: `${data.value?.seoPage?.meta_title || productTitle.value} — Happiness`,
  meta: [
    { name: 'description', content: data.value?.seoPage?.meta_description || topDescription.value || '' },
    { name: 'keywords', content: data.value?.seoPage?.meta_keyword || productTitle.value || '' },
  ],
}))
</script>

<style scoped>
.product-page { background: #fff; padding-bottom: 44px; }
.breadcrumbs-section { padding: 12px 0; }
.breadcrumbs-list { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.crumb-item { color: #7d7d7d; }
.crumb-item.active { color: #9f9f9f; }

.product-main-grid { display: grid; grid-template-columns: minmax(0, 1.07fr) minmax(0, 1fr); gap: 42px; align-items: start; }
.product-main-media { border-radius: 34px; overflow: hidden; background: #f1f1f1; }
.product-main-image { width: 100%; display: block; aspect-ratio: 1.18; object-fit: cover; }

.product-thumbs-row { display: grid; grid-template-columns: 30px 1fr 30px; align-items: center; gap: 8px; margin-top: 14px; }
.thumb-nav { width: 24px; height: 24px; border-radius: 50%; border: 1px solid #ddd; color: #999; font-size: 16px; }
.thumb-track { overflow-x: auto; white-space: nowrap; }
.thumb-track::-webkit-scrollbar { height: 5px; }
.thumb-track::-webkit-scrollbar-thumb { background: #d8d8d8; border-radius: 999px; }
.thumb-item { display: inline-flex; width: 82px; height: 56px; border-radius: 9px; overflow: hidden; border: 1.5px solid #d9d9d9; margin-right: 8px; background: #fff; vertical-align: top; }
.thumb-item.active { border-color: #e28133; }
.thumb-item img { width: 100%; height: 100%; object-fit: cover; }
.video-thumb-mark { width: 100%; display: inline-flex; align-items: center; justify-content: center; background: #232323; color: #fff; font-size: 20px; }

.product-title { margin: 2px 0 12px; font-size: clamp(30px, 2.4vw, 50px); line-height: 1.02; color: #111; }
.product-meta-row { display: flex; align-items: center; gap: 22px; margin-bottom: 14px; flex-wrap: wrap; }
.product-code { color: #737373; font-size: 15px; }
.meta-btn { display: inline-flex; gap: 7px; align-items: center; color: #575757; font-size: 16px; }
.meta-icon { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
.meta-icon-share { width: 20px; height: 20px; fill: #282828; stroke: none; }
.product-desc { margin: 0 0 10px; color: #171717; line-height: 1.38; font-size: clamp(16px, 1.12vw, 34px); }
.product-form { margin: 0 0 20px; color: #6b6b6b; font-size: 18px; }

.price-buy-row { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; }
.product-price { margin: 0; font-size: clamp(34px, 2.6vw, 64px); font-weight: 800; }
.product-old-price { margin: 2px 0 0; color: #9b9b9b; text-decoration: line-through; font-size: 18px; }
.add-cart-btn { display: inline-flex; align-items: center; border-radius: 999px; overflow: hidden; border: 0; }
.add-cart-arrow { width: 58px; height: 58px; display: inline-flex; align-items: center; justify-content: center; background: #e28133; color: #fff; font-size: 24px; }
.add-cart-btn > span:last-child { height: 58px; display: inline-flex; align-items: center; padding: 0 24px; background: #e28133; color: #fff; font-weight: 800; font-size: 26px; }

.product-tabs-section { padding-top: 38px; }
.tabs-row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; border-bottom: 1px solid #ededed; padding-bottom: 8px; }
.tab-btn { font-size: clamp(14px, 1.15vw, 20px); font-weight: 700; color: #1e1e1e; border-radius: 999px; padding: 6px 14px; line-height: 1.2; }
.tab-btn.active { background: #6ea638; color: #fff; }
.tab-content { padding-top: 16px; font-size: clamp(15px, 1.02vw, 19px); line-height: 1.55; color: #202020; }
.tab-title { margin: 0 0 10px; font-size: clamp(34px, 2.5vw, 48px); line-height: 1.08; }

@media (max-width: 1100px) {
  .product-main-grid { grid-template-columns: 1fr; gap: 20px; }
  .product-title { font-size: clamp(28px, 7vw, 44px); }
  .tab-btn { font-size: 16px; }
  .tab-title { font-size: clamp(26px, 5.6vw, 36px); }
}

@media (max-width: 760px) {
  .breadcrumbs-list { font-size: 12px; overflow-x: auto; white-space: nowrap; flex-wrap: nowrap; }
  .product-main-media { border-radius: 16px; }
  .product-title { font-size: clamp(24px, 8.2vw, 34px); }
  .product-code { font-size: 13px; }
  .meta-btn { font-size: 13px; }
  .product-desc { font-size: 14px; }
  .product-form { font-size: 14px; margin-bottom: 12px; }
  .price-buy-row { gap: 12px; }
  .product-price { font-size: clamp(28px, 9vw, 38px); }
  .add-cart-arrow { width: 40px; height: 40px; font-size: 18px; }
  .add-cart-btn > span:last-child { height: 40px; padding: 0 14px; font-size: 16px; }
  .tabs-row { gap: 8px; }
  .tab-btn { font-size: 12px; padding: 7px 10px; }
  .tab-title { font-size: clamp(22px, 7vw, 30px); }
  .tab-content { font-size: 14px; }
}
</style>
