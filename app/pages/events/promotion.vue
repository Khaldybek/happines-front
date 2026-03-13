<template>
  <div class="promotion-page-wrapper">
    <TheHeader />
    <main class="promotion-page">
      <PromotionBreadcrumbs />

      <section class="promo-hero">
        <div class="container">
          <div class="promo-hero-image-wrap">
            <img
              src="/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png"
              alt="Промоушен HAPPINESS"
              class="promo-hero-image"
            >
          </div>
          <h1 class="promo-title">ПРОМОУШЕН HAPPINESS</h1>
        </div>
      </section>

      <section class="promo-regions">
        <div class="container">
          <div class="promo-tabs-wrap">
            <button
              type="button"
              class="promo-tab-arrow"
              aria-label="Предыдущий регион"
              @click="scrollTabs(-1)"
            >
              ‹
            </button>
            <div ref="tabsRef" class="promo-tabs" @scroll="onTabsScroll">
              <button
                v-for="r in regions"
                :key="r.id"
                type="button"
                class="promo-tab"
                :class="{ 'is-active': activeRegionId === r.id }"
                @click="activeRegionId = r.id"
              >
                {{ r.name }}
              </button>
            </div>
            <button
              type="button"
              class="promo-tab-arrow"
              aria-label="Следующий регион"
              @click="scrollTabs(1)"
            >
              ›
            </button>
          </div>
          <p class="promo-subtitle">{{ currentRegion?.subtitle }}</p>
        </div>
      </section>

      <!-- Региональные промоушены (обычная структура) -->
      <section v-if="currentRegion && activeRegionId !== 'long'" class="promo-content">
        <div class="container">
          <div
            v-for="(block, idx) in currentRegion.blocks"
            :key="idx"
            class="promo-block"
            :class="`promo-block--${block.type}`"
          >
            <div v-if="block.title" class="promo-block-header">
              <h2 class="promo-block-title">{{ block.title }}</h2>
              <span v-if="block.period" class="promo-block-period">{{ block.period }}</span>
            </div>
            <p v-if="block.description" class="promo-block-desc">{{ block.description }}</p>
            <div v-if="block.image || (block.images && block.images.length)" class="promo-block-photos">
              <img
                v-if="block.image"
                :src="block.image"
                :alt="block.title || currentRegion.subtitle"
                class="promo-block-photo"
              >
              <template v-else-if="block.images?.length">
                <img
                  v-for="(img, i) in block.images"
                  :key="i"
                  :src="img.src"
                  :alt="img.alt || block.title"
                  class="promo-block-photo"
                >
              </template>
            </div>
            <ul v-if="block.productList?.length" class="promo-block-products">
              <li v-for="(item, i) in block.productList" :key="i">{{ item }}</li>
            </ul>
            <p v-if="block.footer" class="promo-block-footer">{{ block.footer }}</p>
          </div>
        </div>
      </section>

      <!-- Долгосрочные промоушены — другая структура: карточки с фото и «Подробнее» → страница документа -->
      <section v-else-if="activeRegionId === 'long'" class="promo-long-term">
        <div class="container">
          <div class="long-term-grid">
            <article
              v-for="promo in displayedLongTerm"
              :key="promo.slug"
              class="long-term-card"
              :class="`long-term-card--${promo.theme}`"
            >
              <div class="long-term-card-inner">
                <div class="long-term-card-left">
                  <div v-if="promo.logoRight" class="long-term-card-logo">
                    <img src="/logo.svg" alt="HAPPINESS" class="long-term-logo-img">
                  </div>
                  <h2 class="long-term-card-title">{{ promo.title }}</h2>
                  <p class="long-term-card-desc">{{ promo.shortDesc }}</p>
                  <p class="long-term-card-date">
                    <span class="long-term-date-icon" aria-hidden="true">📅</span>
                    {{ promo.date }}
                  </p>
                  <NuxtLink :to="`/events/promotion/long-term/${promo.slug}`" class="long-term-card-btn">
                    ПОДРОБНЕЕ
                    <span class="long-term-card-btn-arrow">→</span>
                  </NuxtLink>
                </div>
                <div class="long-term-card-right" :class="{ 'has-image': promo.image }">
                  <div v-if="promo.image" class="long-term-card-photo-wrap">
                    <img :src="promo.image" :alt="promo.title" class="long-term-card-photo">
                  </div>
                  <div v-else class="long-term-card-brand">
                    <img src="/logo.svg" alt="HAPPINESS" class="long-term-logo-img">
                    <p class="long-term-company">Гонконгская корпорация «Шен Лунг» Happiness</p>
                    <p class="long-term-contact">+86 400-172-168</p>
                    <p class="long-term-contact">support@happiness.com</p>
                    <p class="long-term-contact">https://happiness.com</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div class="long-term-pager">
            <button
              type="button"
              class="long-term-pager-arrow"
              aria-label="Предыдущая страница"
              :disabled="longTermPage <= 1"
              @click="longTermPage = Math.max(1, longTermPage - 1)"
            >
              ‹
            </button>
            <button
              v-for="p in longTermTotalPages"
              :key="p"
              type="button"
              class="long-term-pager-item"
              :class="{ 'is-active': p === longTermPage }"
              @click="longTermPage = p"
            >
              {{ p }}
            </button>
            <button
              type="button"
              class="long-term-pager-arrow"
              aria-label="Следующая страница"
              :disabled="longTermPage >= longTermTotalPages"
              @click="longTermPage = Math.min(longTermTotalPages, longTermPage + 1)"
            >
              ›
            </button>
          </div>
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Промоушен HAPPINESS — События',
})

interface PromoBlock {
  type: 'card' | 'orange' | 'purple'
  title?: string
  period?: string
  description?: string
  image?: string
  images?: { src: string; alt?: string }[]
  productList?: string[]
  footer?: string
}

interface RegionContent {
  id: string
  name: string
  subtitle: string
  blocks: PromoBlock[]
}

const regions: RegionContent[] = [
  {
    id: 'kz',
    name: 'КАЗАХСТАН',
    subtitle: 'Промоушен для Казахстана',
    blocks: [
      {
        type: 'orange',
        title: 'Промоушен (Казахстан) на 849 расчетную неделю (03.02.2026-09.02.2026)',
        description: 'Условия для нового контракта от 450 у.е., активация и годовое подтверждение. Бонусная продукция: 1+1 ҮТ01 Оздоровительные пластыри для глаз Happiness, 2+1 Y001 Кордицепс - источник жизненной силы.',
        image: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
        footer: 'При оформлении «Золотого треугольника» 3 контрактов общая сумма дополнительной продукции составляет 300 у.е.',
      },
      {
        type: 'purple',
        title: 'Анализ промоушена кешбэка',
        description: 'Партнёрская программа «золотой треугольник»: регистрация контракта, номер партнёра A как рекомендателя, закрытие 3 циклов.',
        image: '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png',
      },
    ],
  },
  {
    id: 'msk',
    name: 'МОСКВА',
    subtitle: 'Промоушен для Москвы',
    blocks: [
      {
        type: 'card',
        title: 'Промоушен Москва',
        period: 'на 848 расчетную неделю 27.01.2026 - 02.02.2026',
        description: 'Если Вы оформляете новый контракт стандартной карты 350 SV стоимостью 450 у.е. и выше, а также активизацию и годовое подтверждение, то Вы получите подарок на сумму 100 у.е.',
        images: [
          { src: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png', alt: 'Подарок 1' },
          { src: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png', alt: 'Подарок 2' },
        ],
        productList: ['С001 Почечный чай - 1 шт (40 у.е.)', 'S001 Кордицепс "1+1 Эффект"- 1 шт (60 у.е.)'],
      },
    ],
  },
  {
    id: 'ekb',
    name: 'ЕКАТЕРИНБУРГ',
    subtitle: 'Промоушен для Екатеринбурга',
    blocks: [
      {
        type: 'card',
        title: 'Промоушен Екатеринбург',
        period: 'на 848 расчетную неделю 27.01.2026 - 02.02.2026',
        description: 'При покупке продукции на 450 у.е. и выше — подарок на сумму 100 у.е.',
        image: '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png',
        productList: ['С001 Почечный чай - 1 шт (40 у.е.)', 'Y001 Кордицепс - 1 шт (60 у.е.)'],
      },
    ],
  },
  {
    id: 'kg',
    name: 'КЫРГЫЗСТАН',
    subtitle: 'Промоушен для Кыргызстана',
    blocks: [
      {
        type: 'card',
        title: 'Промоушен Кыргызстан',
        period: 'на 848 расчетную неделю 27.01.2026 - 02.02.2026',
        description: 'Новый контракт от 450 у.е., активация и годовое подтверждение — подарок 100 у.е.',
        image: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png',
        productList: ['С001 Почечный чай - 1 шт', 'P004 Кальций Гао Гай - 1 шт'],
      },
    ],
  },
  {
    id: 'eu',
    name: 'ЕВРОПА',
    subtitle: 'Промоушен для Европы',
    blocks: [
      {
        type: 'orange',
        title: 'Promoción (Europa) para la semana de facturación 849 (03.02.2026-09.02.2026)',
        description: 'Акция 2+1 на продукцию Y001, CT01, C001, C003, P004 при покупке от 450€.',
        image: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
        footer: 'При оформлении «Золотого треугольника» 3 контрактов — дополнительная продукция на 300 у.е.',
      },
      {
        type: 'purple',
        title: 'Анализ промоушена кешбэка',
        description: 'Программа «золотой треугольник»: контракт с рекомендателем A, закрытие 3 циклов.',
        image: '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png',
      },
    ],
  },
  {
    id: 'ua',
    name: 'УКРАИНА',
    subtitle: 'Промоушен для Украины',
    blocks: [
      {
        type: 'card',
        title: 'Промоушен Украина',
        period: 'на 848 расчетную неделю 27.01.2026 - 02.02.2026',
        description: 'Покупка на 450 у.е. и выше — подарок на 100 у.е.',
        image: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png',
        productList: ['С001 Почечный чай - 1 шт (40 у.е.)', 'S003 Капсулы «Комплекс Линчжи» - 1 шт (60 у.е.)'],
      },
    ],
  },
  {
    id: 'ge',
    name: 'ГРУЗИЯ',
    subtitle: 'Промоушен для Грузии',
    blocks: [
      {
        type: 'card',
        title: 'Промоушен Грузия',
        period: 'на 848 расчетную неделю 27.01.2026-02.02.2026',
        description: 'Если Вы приобретаете продукцию компании на 450 у.е. и больше, Вы получаете подарок на сумму 100$:',
        images: [
          { src: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png', alt: 'K001' },
          { src: '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png', alt: 'S003' },
        ],
        productList: ['K001 "Сюе Бань Люй" - 1 шт. (50$)', 'S003 Капсулы "Комплекс Линчжи" - 1 шт. (50$)'],
      },
    ],
  },
  {
    id: 'tr',
    name: 'ТУРЦИЯ',
    subtitle: 'Промоушен для Турции',
    blocks: [
      {
        type: 'card',
        title: 'Промоушен Турция',
        period: 'на 848 расчетную неделю 27.01.2026 - 02.02.2026',
        description: 'Новый контракт от 450 у.е., активация и годовое подтверждение — подарок 100 у.е.',
        image: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png',
        productList: ['С001 Почечный чай - 1 шт', 'Y001 Кордицепс - 1 шт'],
      },
    ],
  },
  {
    id: 'uz',
    name: 'УЗБЕКИСТАН',
    subtitle: 'Промоушен для Узбекистана',
    blocks: [
      {
        type: 'card',
        title: 'Промоушен Узбекистан',
        period: 'на 848 расчётную неделю 27.01.2026-02.02.2026',
        description: 'Если Вы оформляете новый контракт на 450 у.е и выше, а также активизацию и годовое подтверждение, то Вы получаете подарки на сумму 100 у.е',
        images: [
          { src: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png', alt: 'Почечный чай' },
          { src: '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png', alt: 'Кальций Гао Гай' },
          { src: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png', alt: 'Ортопедический пластырь' },
        ],
        productList: [
          'С001 Почечный чай - 1 шт. (40 y.e)',
          'Р004 Таблетки «Кальций Гао Гай» - 1 шт. (50 y.e)',
          'В001 Ортопедический пластырь - 2 шт. (10 у.е)',
        ],
      },
    ],
  },
  {
    id: 'long',
    name: 'ДОЛГОСРОЧНЫЕ ПРОМОУШЕНЫ',
    subtitle: 'Долгосрочные промоушены',
    blocks: [],
  },
]

interface LongTermPromo {
  slug: string
  title: string
  shortDesc: string
  date: string
  image?: string
  theme: 'orange' | 'blue' | 'green' | 'peach'
  logoRight?: boolean
}

const longTermPromos: LongTermPromo[] = [
  {
    slug: 'cashback-848-889',
    title: 'Гонконгская корпорация «Шен Лунг» HAPPINESS Промоушен Cashback (848-889)',
    shortDesc: 'Кэшбек на покупку автомобиля. Партнёр А рекомендует партнёра Б, при закрытии 3 циклов — начисление вознаграждений.',
    date: '27.01.26',
    theme: 'orange',
    logoRight: true,
  },
  {
    slug: 'q1-2026',
    title: 'HAPPINESS – промоушен на первый квартал 2026 года',
    shortDesc: 'Промоушен с 847 по 858 р/н. Рекомендация новых партнёров и закрытие этапов. Вознаграждение: поездка (1 место), проезд и проживание.',
    date: '20.01.26',
    theme: 'blue',
    logoRight: false,
  },
  {
    slug: 'lisyang-l7-2025',
    title: 'HAPPINESS – промоушен 2025 "Забери домой свой Лисян L7"',
    shortDesc: 'Условия и порядок начисления по программе. Детали в документе.',
    date: '27.12.24',
    theme: 'green',
    logoRight: false,
  },
  {
    slug: 'iphone-15-757-766',
    title: 'Промоушен на IPhone 15 (757-766 р/н)',
    shortDesc: 'Специальная акция на iPhone 15 для партнёров. Сроки и условия в документе.',
    date: '22.04.24',
    image: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png',
    theme: 'peach',
    logoRight: true,
  },
  {
    slug: 'travel-2026',
    title: 'Промоушен «Поездка» (848-858)',
    shortDesc: 'Вознаграждение поездкой за выполнение условий. 12 недель.',
    date: '27.01.26',
    theme: 'blue',
    logoRight: true,
  },
  {
    slug: 'quarter-bonus',
    title: 'Квартальный бонус 2026',
    shortDesc: 'Дополнительные бонусы за объём в квартале. Условия в документе.',
    date: '01.01.26',
    theme: 'green',
    logoRight: false,
  },
]

const longTermPage = ref(1)
const longTermPerPage = 4
const longTermTotalPages = computed(() => Math.max(1, Math.ceil(longTermPromos.length / longTermPerPage)))
const displayedLongTerm = computed(() => {
  const start = (longTermPage.value - 1) * longTermPerPage
  return longTermPromos.slice(start, start + longTermPerPage)
})

const route = useRoute()
const activeRegionId = ref(regions[0].id)
const tabsRef = ref<HTMLElement | null>(null)

const currentRegion = computed(() => regions.find(r => r.id === activeRegionId.value) ?? null)

onMounted(() => {
  const tab = route.query.tab as string
  if (tab === 'long') activeRegionId.value = 'long'
})

function scrollTabs(direction: number) {
  const el = tabsRef.value
  if (!el) return
  const step = 200
  el.scrollBy({ left: direction * step, behavior: 'smooth' })
}

function onTabsScroll() {
  // optional: update active tab by scroll position
}
</script>

<style scoped>
.promotion-page {
  background: #fff;
  padding-bottom: 60px;
}

.promo-hero {
  padding: 0 0 24px;
}

.promo-hero-image-wrap {
  border-radius: 0 0 24px 24px;
  overflow: hidden;
  margin-bottom: 24px;
}

.promo-hero-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  max-height: 360px;
}

.promo-title {
  margin: 0;
  text-align: center;
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #dd5f05;
}

.promo-regions {
  padding: 0 0 32px;
}

.promo-tabs-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.promo-tab-arrow {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #333;
  background: #f0f0f0;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.promo-tab-arrow:hover {
  background: #e0e0e0;
  color: #000;
}

.promo-tabs {
  flex: 1;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  padding: 4px 0;
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
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  background: #fff;
  border: 1px solid #e0e0e0;
  color: #333;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.promo-tab:hover {
  background: #f5f5f5;
  border-color: #ccc;
}
.promo-tab.is-active {
  background: #78a435;
  border-color: #78a435;
  color: #fff;
}

.promo-subtitle {
  margin: 0;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.promo-content {
  padding: 0 0 40px;
}

.promo-block {
  border-radius: 20px;
  padding: 28px 24px;
  margin-bottom: 24px;
  background: #f8f8f8;
}
.promo-block:last-child {
  margin-bottom: 0;
}

.promo-block--card {
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.promo-block--orange {
  background: linear-gradient(135deg, #ff9933 0%, #e85a00 100%);
  color: #fff;
}
.promo-block--orange .promo-block-title,
.promo-block--orange .promo-block-period,
.promo-block--orange .promo-block-desc,
.promo-block--orange .promo-block-products,
.promo-block--orange .promo-block-footer {
  color: #fff;
}
.promo-block--orange .promo-block-products li {
  color: rgba(255, 255, 255, 0.95);
}

.promo-block--purple {
  background: linear-gradient(135deg, #6666ff 0%, #4b4bb5 100%);
  color: #fff;
}
.promo-block--purple .promo-block-title,
.promo-block--purple .promo-block-period,
.promo-block--purple .promo-block-desc,
.promo-block--purple .promo-block-products,
.promo-block--purple .promo-block-footer {
  color: #fff;
}

.promo-block-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 12px;
}

.promo-block-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
}

.promo-block-period {
  font-size: 0.9rem;
  color: #666;
}

.promo-block-desc {
  margin: 0 0 20px;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #333;
}

.promo-block-photos {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  justify-content: flex-start;
  align-items: flex-end;
}

.promo-block-photo {
  width: 120px;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.promo-block--card .promo-block-photos {
  gap: 24px;
}
.promo-block--card .promo-block-photo {
  width: 140px;
}

.promo-block-products {
  margin: 0 0 12px;
  padding-left: 1.25rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #333;
}

.promo-block-footer {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.75);
}
.promo-block--orange .promo-block-footer,
.promo-block--purple .promo-block-footer {
  color: rgba(255, 255, 255, 0.9);
}

/* Долгосрочные промоушены — карточки с фото и кнопка «Подробнее» */
.promo-long-term {
  padding: 0 0 48px;
}

.long-term-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.long-term-card {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.long-term-card-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 200px;
}
@media (max-width: 768px) {
  .long-term-card-inner {
    grid-template-columns: 1fr;
  }
}

.long-term-card-left {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.long-term-card--orange .long-term-card-left {
  background: linear-gradient(135deg, #f5e6d3 0%, #fff 50%);
  color: #1a1a1a;
}
.long-term-card--orange .long-term-card-right {
  background: linear-gradient(135deg, #ff9933 0%, #e85a00 100%);
  color: #fff;
}

.long-term-card--blue .long-term-card-left {
  background: #e8f4fc;
  color: #1a1a1a;
}
.long-term-card--blue .long-term-card-right {
  background: linear-gradient(135deg, #4b93d7 0%, #2d6ba8 100%);
  color: #fff;
}

.long-term-card--green .long-term-card-left {
  background: #e8f5e9;
  color: #1a1a1a;
}
.long-term-card--green .long-term-card-right {
  background: linear-gradient(135deg, #78a435 0%, #5a7d28 100%);
  color: #fff;
}

.long-term-card--peach .long-term-card-left {
  background: #fff5ee;
  color: #1a1a1a;
}
.long-term-card--peach .long-term-card-right {
  background: linear-gradient(135deg, #ffcc99 0%, #ffb366 50%, #e68a00 100%);
  color: #1a1a1a;
}

.long-term-card-logo {
  margin-bottom: 4px;
}
.long-term-logo-img {
  height: 28px;
  width: auto;
  display: block;
}

.long-term-card-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
  color: inherit;
}

.long-term-card-desc {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.45;
  color: inherit;
  opacity: 0.9;
  flex: 1;
}

.long-term-card-date {
  margin: 0;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
}
.long-term-date-icon {
  font-size: 1rem;
}

.long-term-card-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  background: #78a435;
  color: #fff;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
  align-self: flex-start;
}
.long-term-card-btn:hover {
  background: #5a7d28;
  color: #fff;
}
.long-term-card-btn-arrow {
  font-size: 1rem;
}

.long-term-card-right {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
}
.long-term-card-right.has-image {
  padding: 16px;
  background: #f8f8f8;
}
.long-term-card-photo-wrap {
  width: 100%;
  max-width: 220px;
  margin: 0 auto;
}
.long-term-card-photo {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

.long-term-card-brand {
  text-align: center;
}
.long-term-card-brand .long-term-logo-img {
  margin: 0 auto 12px;
}
.long-term-company {
  margin: 0 0 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: inherit;
}
.long-term-contact {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.9;
}

.long-term-pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
}
.long-term-pager-arrow {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #333;
  background: #f0f0f0;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
}
.long-term-pager-arrow:hover:not(:disabled) {
  background: #e0e0e0;
}
.long-term-pager-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.long-term-pager-item {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.long-term-pager-item:hover {
  background: #f5f5f5;
  border-color: #78a435;
}
.long-term-pager-item.is-active {
  background: #78a435;
  border-color: #78a435;
  color: #fff;
}

@media (min-width: 900px) {
  .promo-content .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }
  .promo-content .container :deep(.promo-block) {
    margin-bottom: 0;
  }
  .promo-block--card.promo-block:only-child {
    grid-column: 1 / -1;
  }
}
</style>
