<template>
  <div class="promotion-page-wrapper">
    <TheHeader />
    <main class="promotion-page">
      <PromotionBreadcrumbs />

      <section v-if="pending" class="promo-loading container">
        <p>{{ t('loading') }}</p>
      </section>

      <template v-else-if="pageData">
        <section class="promo-hero">
          <div class="container">
            <div v-if="heroImage" class="promo-hero-image-wrap">
              <img
                :src="heroImage"
                :alt="pageHeading"
                class="promo-hero-image"
              >
            </div>
            <h1 class="promo-title">{{ pageHeading }}</h1>
          </div>
        </section>

        <section v-if="hasTabs" class="promo-regions">
          <div class="container">
            <div class="promo-tabs-wrap">
              <button
                type="button"
                class="promo-tab-arrow"
                :disabled="!canScrollTabsLeft"
                :aria-label="t('prevTab')"
                :aria-disabled="!canScrollTabsLeft"
                @click="scrollTabs(-1)"
              >
                <img
                  src="/images/I16_569_132_85696.svg"
                  alt=""
                  class="promo-tab-arrow-icon promo-tab-arrow-icon--prev"
                >
              </button>
              <div ref="tabsRef" class="promo-tabs" @scroll="onTabsScroll">
                <button
                  v-for="item in carouselSorted"
                  :key="item.id"
                  type="button"
                  class="promo-tab"
                  :class="{ 'is-active': activeTabKey === tabKeyCarousel(item.id) }"
                  @click="activeTabKey = tabKeyCarousel(item.id)"
                >
                  {{ item.title }}
                </button>
                <button
                  v-if="longTermBlocks.length"
                  type="button"
                  class="promo-tab"
                  :class="{ 'is-active': activeTabKey === 'long' }"
                  @click="activeTabKey = 'long'"
                >
                  {{ t('longTermTab') }}
                </button>
              </div>
              <button
                type="button"
                class="promo-tab-arrow"
                :disabled="!canScrollTabsRight"
                :aria-label="t('nextTab')"
                :aria-disabled="!canScrollTabsRight"
                @click="scrollTabs(1)"
              >
                <img src="/images/I16_569_132_85696.svg" alt="" class="promo-tab-arrow-icon">
              </button>
            </div>
            <p class="promo-subtitle">{{ currentSubtitle }}</p>
          </div>
        </section>

        <!-- Региональный промоушен: крупное фото (подпись под фото убрана) -->
        <section
          v-if="activeCarouselItem"
          class="promo-simple"
        >
          <div class="container promo-simple-container">
            <div class="promo-simple-photo-wrap">
              <img
                :src="activeCarouselItem.image_url"
                :alt="currentSubtitle"
                class="promo-simple-photo"
              >
            </div>
          </div>
        </section>

        <!-- Долгосрочные: широкие карточки [картинка | панель] ↔ [панель | картинка] -->
        <section
          v-else-if="activeTabKey === 'long' && longTermBlocks.length"
          class="promo-long-term"
        >
          <div class="container promo-long-term-inner">
            <article
              v-for="(block, idx) in longTermBlocks"
              :key="idx"
              class="long-term-card"
              :class="{ 'long-term-card--reverse': idx % 2 === 1 }"
            >
              <div class="long-term-card__media">
                <img
                  :src="longTermBlockImage(block)"
                  :alt="block.title"
                  class="long-term-card__img"
                  loading="lazy"
                >
              </div>
              <div
                class="long-term-card__panel"
                :class="idx % 2 === 0 ? 'long-term-card__panel--orange' : 'long-term-card__panel--blue'"
              >
                <h2 v-if="block.title" class="long-term-card__title">{{ block.title }}</h2>
                <div v-if="block.description" class="long-term-card__desc">
                  <p
                    v-for="(para, p) in splitDescription(block.description)"
                    :key="p"
                    class="long-term-card__para"
                  >
                    {{ para }}
                  </p>
                </div>
                <p v-if="longTermBlockDate(block)" class="long-term-card__date">
                  <span class="long-term-card__date-icon" aria-hidden="true">
                    <img src="/images/16_514.svg" alt="" class="long-term-card__date-icon-img">
                  </span>
                  {{ longTermBlockDate(block) }}
                </p>
                <NuxtLink
                  :to="longTermDetailTo(block, idx)"
                  class="long-term-card__btn"
                >
                  {{ t('readMore') }}
                  <span class="long-term-card__btn-arrow" aria-hidden="true">
                    <img src="/images/I16_569_132_85696.svg" alt="" class="long-term-card__btn-arrow-img">
                  </span>
                </NuxtLink>
              </div>
            </article>
          </div>
        </section>

      </template>

      <section v-else class="promo-error container">
        <p>{{ t('loadError') }}</p>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type {
  CarouselPromotion,
  PromotionsLongTermBlock,
} from '~/types/promotionsPage'

definePageMeta({
  layout: false,
})

const { data, pending } = usePromotionsPage()
const { t, promotionSubtitle } = usePromotionsLocale()

const pageData = computed(() => data.value ?? null)

const DEFAULT_HEADING = 'ПРОМОУШЕН HAPPINESS'
const DEFAULT_HERO = '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png'

const pageHeading = computed(() => pageData.value?.page?.heading?.trim() || DEFAULT_HEADING)

const heroImage = computed(() => {
  const u = pageData.value?.page?.hero_image_url
  return u && String(u).trim() ? String(u).trim() : DEFAULT_HERO
})

useHead(() => ({
  title: `${pageHeading.value} — События`,
}))

const carouselSorted = computed(() => {
  const list = pageData.value?.carousel_promotions ?? []
  return [...list].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
})

const longTermBlocks = computed(() => pageData.value?.long_term?.blocks ?? [])

const hasTabs = computed(
  () => carouselSorted.value.length > 0 || longTermBlocks.value.length > 0,
)

function tabKeyCarousel(id: number) {
  return `c-${id}`
}

const route = useRoute()
const activeTabKey = ref<string>('')

watch(
  [pageData, carouselSorted, longTermBlocks],
  () => {
    if (!pageData.value) return
    const q = route.query.tab
    if (q === 'long' && longTermBlocks.value.length) {
      activeTabKey.value = 'long'
      return
    }
    const validCarousel = carouselSorted.value.some(
      (x) => tabKeyCarousel(x.id) === activeTabKey.value,
    )
    if (activeTabKey.value === 'long' && q === 'long') return
    if (validCarousel) return
    if (carouselSorted.value.length) {
      activeTabKey.value = tabKeyCarousel(carouselSorted.value[0].id)
    } else if (longTermBlocks.value.length) {
      activeTabKey.value = 'long'
    }
  },
  { immediate: true },
)

const activeCarouselItem = computed((): CarouselPromotion | null => {
  if (!activeTabKey.value.startsWith('c-')) return null
  const id = Number(activeTabKey.value.slice(2))
  return carouselSorted.value.find((x) => x.id === id) ?? null
})

const currentSubtitle = computed(() => {
  if (activeTabKey.value === 'long') {
    return t('longTermSubtitle')
  }
  const title = activeCarouselItem.value?.title?.trim()
  if (!title) return ''
  return promotionSubtitle(title)
})

const tabsRef = ref<HTMLElement | null>(null)
const canScrollTabsLeft = ref(false)
const canScrollTabsRight = ref(false)

function updateTabScrollEdges() {
  const el = tabsRef.value
  if (!el) {
    canScrollTabsLeft.value = false
    canScrollTabsRight.value = false
    return
  }
  const { scrollLeft, scrollWidth, clientWidth } = el
  const maxScroll = Math.max(0, scrollWidth - clientWidth)
  const eps = 3
  if (maxScroll <= eps) {
    canScrollTabsLeft.value = false
    canScrollTabsRight.value = false
    return
  }
  canScrollTabsLeft.value = scrollLeft > eps
  canScrollTabsRight.value = scrollLeft < maxScroll - eps
}

function scrollTabs(direction: number) {
  const el = tabsRef.value
  if (!el) return
  if (direction < 0 && !canScrollTabsLeft.value) return
  if (direction > 0 && !canScrollTabsRight.value) return
  el.scrollBy({ left: direction * 200, behavior: 'smooth' })
}

function onTabsScroll() {
  updateTabScrollEdges()
}

let tabsResizeObserver: ResizeObserver | null = null

onMounted(() => {
  window.addEventListener('resize', updateTabScrollEdges)
  nextTick(() => {
    updateTabScrollEdges()
    const el = tabsRef.value
    if (el && typeof ResizeObserver !== 'undefined') {
      tabsResizeObserver = new ResizeObserver(() => updateTabScrollEdges())
      tabsResizeObserver.observe(el)
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTabScrollEdges)
  tabsResizeObserver?.disconnect()
  tabsResizeObserver = null
})

watch(
  [() => pending.value, carouselSorted, longTermBlocks, hasTabs],
  () => {
    nextTick(() => updateTabScrollEdges())
  },
  { flush: 'post' },
)

function splitDescription(text: string): string[] {
  return text
    .split(/\r\n|\r|\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}

const PLACEHOLDER_IMG = '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png'

function longTermBlockImage(block: PromotionsLongTermBlock): string {
  const img = block.files?.find((f) => f.is_image)
  return img?.url || PLACEHOLDER_IMG
}

/**
 * Ссылка на страницу блока. В query всегда передаём i=индекс — страница детали
 * открывает именно этот элемент массива long_term.blocks (надёжно при ?lang= и кэше).
 */
function longTermDetailTo(block: PromotionsLongTermBlock, idx: number) {
  const q: Record<string, string> = {}
  for (const key of Object.keys(route.query)) {
    if (key === 'i' || key === 'tab') continue
    const v = route.query[key]
    q[key] = Array.isArray(v) ? String(v[0] ?? '') : String(v ?? '')
  }
  q.i = String(idx)
  const s = block.slug?.trim()
  const path = s
    ? `/events/promotion/long-term/${encodeURIComponent(s)}`
    : `/events/promotion/long-term/block-${idx}`
  return { path, query: q }
}

function longTermBlockDate(block: PromotionsLongTermBlock): string {
  if (block.date && String(block.date).trim()) return String(block.date).trim()
  const m = block.title?.match(
    /\b(\d{1,2}\.\d{1,2}\.\d{2,4})\b/,
  )
  return m?.[1] ?? ''
}
</script>

<style scoped>
.promo-loading,
.promo-error {
  padding: 48px 16px;
  text-align: center;
  color: #666;
}

.promotion-page {
  background: #fff;
  padding-bottom: 60px;
}

.promo-hero {
  padding: 0 0 44px;
}

.promo-hero-image-wrap {
  border-radius: 50px;
  overflow: hidden;
  margin-bottom: 40px;
}

.promo-hero-image {
  width: 100%;
  height: clamp(240px, 31.6vw, 456px);
  display: block;
  object-fit: cover;
}

.promo-title {
  margin: 0;
  text-align: center;
  font-size: clamp(38px, 6.5vw, 94px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #dd5f05;
  line-height: 1.05;
}

.promo-regions {
  padding: 0 0 46px;
}

.promo-tabs-wrap {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.promo-tab-arrow {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  background: #e28133;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.2s;
}
.promo-tab-arrow:hover:not(:disabled) {
  opacity: 0.9;
}

.promo-tab-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: #c4b4a8;
}

.promo-tab-arrow:disabled .promo-tab-arrow-icon {
  opacity: 0.55;
}

.promo-tab-arrow-icon {
  width: 32px;
  height: 32px;
  filter: none;
}

/* Левая стрелка: тот же asset, что и «вперёд» (85695 — только круг без path) */
.promo-tab-arrow-icon--prev {
  transform: scaleX(-1);
}

.promo-tabs {
  flex: 1;
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  padding: 3px 0;
}
.promo-tabs::-webkit-scrollbar {
  height: 6px;
}
.promo-tabs::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.promo-tab {
  flex-shrink: 0;
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  background: transparent;
  border: none;
  color: #2d2d2d;
  cursor: pointer;
  line-height: 1.2;
  transition: background 0.2s, color 0.2s;
}
.promo-tab:hover {
  color: #1a1a1a;
}
.promo-tab.is-active {
  background: linear-gradient(158deg, #67a432 14.55%, #3b710f 73.84%);
  color: #fff;
  border-radius: 40px;
}

.promo-subtitle {
  margin: 0;
  text-align: center;
  font-size: clamp(24px, 2.2vw, 32px);
  font-weight: 600;
  color: #000;
  letter-spacing: 0.04em;
  line-height: 1.1;
}

/* Долгосрочные: две колонки, шахматный порядок */
.promo-long-term {
  padding: 0 0 66px;
}

.promo-long-term-inner {
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  gap: 34px;
}

.long-term-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 360px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.long-term-card--reverse .long-term-card__media {
  order: 2;
}
.long-term-card--reverse .long-term-card__panel {
  order: 1;
}

.long-term-card__media {
  background: linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 24px;
  min-height: 340px;
}

.long-term-card__img {
  max-width: 100%;
  max-height: min(500px, 62vh);
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}

.long-term-card__panel {
  padding: 42px 36px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  color: #fff;
}

.long-term-card__panel--orange {
  background: linear-gradient(155deg, #ff9a3e 0%, #e8640c 45%, #d35400 100%);
}

.long-term-card__panel--blue {
  background: linear-gradient(155deg, #6b9ef5 0%, #3b7ddd 45%, #2563eb 100%);
}

.long-term-card__title {
  margin: 0;
  font-size: clamp(1.3rem, 2.4vw, 2rem);
  font-weight: 800;
  line-height: 1.3;
  color: #fff;
}

.long-term-card__desc {
  flex: 1;
  min-height: 0;
}

.long-term-card__para {
  margin: 0 0 10px;
  font-size: 1rem;
  line-height: 1.62;
  color: rgba(255, 255, 255, 0.95);
}
.long-term-card__para:last-child {
  margin-bottom: 0;
}

.long-term-card__date {
  margin: 6px 0 0;
  font-size: 0.98rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  gap: 8px;
}

.long-term-card__date-icon {
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.long-term-card__date-icon-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.long-term-card__btn {
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  align-self: flex-start;
  padding: 13px 24px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  background: #0d9488;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  font-family: var(--font-sans, inherit);
}

.long-term-card__btn:hover {
  background: #0f766e;
  color: #fff;
}

.long-term-card__btn-arrow {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.long-term-card__btn-arrow-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

@media (max-width: 900px) {
  .long-term-card {
    grid-template-columns: 1fr;
  }
  .long-term-card--reverse .long-term-card__media,
  .long-term-card--reverse .long-term-card__panel {
    order: unset;
  }
  .long-term-card__media {
    order: -1;
    min-height: 220px;
    padding: 20px 16px;
  }
  .long-term-card__img {
    max-height: 280px;
  }
  .long-term-card__panel {
    padding: 26px 20px 32px;
  }
}

/* Региональный промоушен: широкий баннер как в макете */
.promo-simple {
  padding: 0 0 66px;
}

.promo-simple-container {
  max-width: 1280px;
  margin: 0 auto;
}

.promo-simple-photo-wrap {
  width: 100%;
  border-radius: 0;
  overflow: hidden;
  background: #f0f0f0;
  line-height: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.promo-simple-photo {
  width: 100%;
  height: clamp(300px, 50vw, 720px);
  max-width: 100%;
  display: block;
  vertical-align: top;
  object-fit: cover;
}

@media (max-width: 600px) {
  .promotion-page {
    padding-bottom: 34px;
  }

  .promo-hero {
    padding-bottom: 20px;
  }

  .promo-hero-image-wrap {
    border-radius: 18px;
    margin-bottom: 14px;
  }

  .promo-hero-image {
    height: clamp(180px, 52vw, 260px);
  }

  .promo-title {
    font-size: clamp(24px, 9vw, 34px);
    line-height: 1.06;
  }

  .promo-regions {
    padding-bottom: 20px;
  }

  .promo-tabs-wrap {
    gap: 8px;
    margin-bottom: 12px;
  }

  .promo-tab-arrow {
    width: 42px;
    height: 42px;
  }

  .promo-tab-arrow-icon {
    width: 22px;
    height: 22px;
  }

  .promo-tabs {
    gap: 8px;
  }

  .promo-tab {
    padding: 8px 10px;
    font-size: 12px;
  }

  .promo-subtitle {
    font-size: clamp(16px, 5.4vw, 22px);
  }

  .promo-simple,
  .promo-long-term {
    padding-bottom: 28px;
  }

  .promo-simple-photo {
    height: clamp(180px, 58vw, 260px);
  }

  .promo-long-term-inner {
    gap: 16px;
  }

  .long-term-card {
    border-radius: 14px;
    min-height: 0;
  }

  .long-term-card__media {
    min-height: 150px;
    padding: 12px;
  }

  .long-term-card__img {
    max-height: 190px;
  }

  .long-term-card__panel {
    padding: 14px 12px 16px;
    gap: 10px;
  }

  .long-term-card__title {
    font-size: 18px;
    line-height: 1.2;
  }

  .long-term-card__para {
    font-size: 14px;
    line-height: 1.45;
    margin-bottom: 8px;
  }

  .long-term-card__date {
    font-size: 13px;
    margin-top: 2px;
  }

  .long-term-card__btn {
    width: 100%;
    justify-content: center;
    padding: 10px 12px;
    font-size: 11px;
    gap: 8px;
  }
}

</style>
