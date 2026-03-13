<template>
  <main class="credentials-page" :class="{ 'credentials-page--light': pageVariant === 'light' }">
    <section class="breadcrumbs-section">
      <div class="container">
        <nav class="breadcrumbs-list" aria-label="Хлебные крошки">
          <NuxtLink to="/" class="crumb-item">Главная</NuxtLink>
          <img src="/images/16_552.svg" alt="">
          <span class="crumb-item active">{{ breadcrumbTitle }}</span>
        </nav>
      </div>
    </section>

    <section class="credentials-hero">
      <div class="container">
        <div class="hero-image-wrap">
          <img :src="heroImage" :alt="breadcrumbTitle" class="hero-image">
        </div>

        <h1 class="credentials-title">
          <span
            v-for="(part, index) in titleParts"
            :key="index"
            :class="['title-part', { 'is-accent': part.accent }]"
          >
            {{ part.text }}
          </span>
        </h1>

        <p class="credentials-subtitle">
          Мы ценим доверие наших клиентов и партнёров, поэтому подтверждаем качество и профессионализм
          компании HAPPINESS официальными сертификатами и дипломами.
        </p>

        <div v-if="mode === 'years'" class="filters-year-row">
          <button type="button" class="year-arrow is-prev" aria-label="Предыдущие годы" @click="scrollYears(-1)"></button>
          <div ref="yearsRef" class="filters-year-scroll">
            <button
              v-for="year in years"
              :key="year"
              type="button"
              class="year-chip"
              :class="{ 'is-active': year === activeYear }"
              @click="emit('update:activeYear', year)"
            >
              {{ year }} ГОД
            </button>
          </div>
          <button type="button" class="year-arrow is-next" aria-label="Следующие годы" @click="scrollYears(1)"></button>
        </div>

        <div v-else class="filters-select-row">
          <label class="fake-select-label">
            <select class="fake-select" aria-label="Выберите название продукции">
              <option selected disabled>Выберите название продукции</option>
              <option v-for="option in selectOptions" :key="option">{{ option }}</option>
            </select>
          </label>
        </div>

        <div class="credentials-grid" :class="`credentials-grid--cols-${gridColumns}`">
          <article v-for="(item, index) in items" :key="index" class="credential-card">
            <div class="credential-image-wrap">
              <img :src="item.image" :alt="item.title" class="credential-image">
            </div>
            <p class="credential-title">{{ item.title }}</p>
          </article>
        </div>

        <div class="pager">
          <button type="button" class="pager-arrow" aria-label="Предыдущая страница" @click="goPrevPage">‹</button>
          <button
            v-for="page in pages"
            :key="page"
            type="button"
            class="pager-item"
            :class="{ 'is-active': page === activePage }"
            @click="emit('update:activePage', page)"
          >
            {{ page }}
          </button>
          <button type="button" class="pager-arrow" aria-label="Следующая страница" @click="goNextPage">›</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
interface TitlePart {
  text: string
  accent?: boolean
}

interface CredentialItem {
  image: string
  title: string
}

const props = withDefaults(defineProps<{
  breadcrumbTitle: string
  heroImage: string
  titleParts: TitlePart[]
  mode?: 'years' | 'select'
  years?: number[]
  activeYear?: number
  selectOptions?: string[]
  items: CredentialItem[]
  pages?: number[]
  activePage?: number
  gridColumns?: number
  pageVariant?: 'default' | 'light'
}>(), {
  mode: 'years',
  years: () => [2010, 2011, 2012, 2013, 2014, 2015, 2016],
  activeYear: 2014,
  selectOptions: () => [],
  pages: () => [1, 2, 3, 4, 5],
  activePage: 3,
  gridColumns: 4,
  pageVariant: 'default',
})

const emit = defineEmits<{ 'update:activeYear': [number]; 'update:activePage': [number] }>()

const yearsRef = ref<HTMLElement | null>(null)
function scrollYears(direction: number) {
  const el = yearsRef.value
  if (!el) return
  const step = 180
  el.scrollBy({ left: direction * step, behavior: 'smooth' })
}

function goPrevPage() {
  const p = props.pages
  if (!p?.length || props.activePage === undefined) return
  const i = p.indexOf(props.activePage)
  if (i > 0) emit('update:activePage', p[i - 1])
}

function goNextPage() {
  const p = props.pages
  if (!p?.length || props.activePage === undefined) return
  const i = p.indexOf(props.activePage)
  if (i >= 0 && i < p.length - 1) emit('update:activePage', p[i + 1])
}
</script>

<style scoped>
.credentials-page {
  background: #ededed;
  padding-bottom: 26px;
}

.credentials-page--light {
  background: #fff;
}

.breadcrumbs-section {
  padding: 14px 0 10px;
}

.breadcrumbs-list {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.crumb-item {
  color: #282828;
}

.crumb-item.active {
  color: #8e8e8e;
}

.hero-image-wrap {
  border-radius: 34px;
  overflow: hidden;
  margin-bottom: 34px;
}

.hero-image {
  width: 100%;
  height: 390px;
  object-fit: cover;
}

.credentials-title {
  margin: 0;
  text-align: center;
  line-height: 0.98;
  letter-spacing: 0.01em;
  font-size: clamp(52px, 6.2vw, 110px);
  font-weight: 900;
  text-transform: uppercase;
}

.title-part {
  color: #0a0b0f;
  margin-right: 14px;
}

.title-part.is-accent {
  color: #dd5f05;
}

.credentials-subtitle {
  margin: 20px auto 28px;
  max-width: 820px;
  text-align: center;
  font-size: clamp(15px, 1.2vw, 17px);
  line-height: 1.45;
  color: #1a1a1a;
  font-weight: 400;
}

.filters-year-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.filters-year-scroll {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  max-width: min(100%, 800px);
  padding: 4px 0;
}
.filters-year-scroll::-webkit-scrollbar {
  display: none;
}

.year-arrow {
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  border: 1px solid #e28133;
  background: #fff;
  transition: background 0.2s, color 0.2s;
}
.year-arrow:hover {
  background: #f5f5f5;
}

.year-arrow.is-prev {
  color: #e28133;
}

.year-arrow.is-next {
  background: #e28133;
  color: #fff;
  border-color: #e28133;
}
.year-arrow.is-next:hover {
  background: #c96f28;
  border-color: #c96f28;
}

.year-arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 9px;
  height: 9px;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
}

.year-arrow.is-prev::before {
  transform: translate(-38%, -50%) rotate(-135deg);
}

.year-arrow.is-next::before {
  transform: translate(-62%, -50%) rotate(45deg);
}

.year-chip {
  flex-shrink: 0;
  border: none;
  border-radius: 999px;
  background: #b8b8b8;
  color: #fff;
  padding: 12px 21px;
  font-size: clamp(14px, 0.76vw, 16px);
  line-height: 1;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s;
}

.year-chip:hover {
  background: #a0a0a0;
}

.year-chip.is-active {
  background: #5ea125;
  color: #fff;
}

.filters-select-row {
  display: flex;
  justify-content: center;
  margin-bottom: 26px;
}

.fake-select {
  width: min(100%, 460px);
  border: 2px solid #d5d5d5;
  border-radius: 999px;
  padding: 12px 18px;
  font-size: 16px;
  color: #8f8f8f;
  background: #f6f6f6;
}

.credentials-grid {
  display: grid;
  gap: 16px;
}

.credentials-grid--cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.credentials-grid--cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.credential-card {
  min-width: 0;
  transition: box-shadow 0.2s, transform 0.2s;
}

.credentials-page .credential-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.credentials-page--light .credential-image-wrap {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.credentials-page--light .credential-card:hover .credential-image-wrap {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.credential-image-wrap {
  height: 244px;
  background: #f2f2f2;
  border: 1px solid #dfdfdf;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.credential-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.credential-title {
  margin: 9px 0 0;
  text-transform: uppercase;
  font-size: clamp(12px, 0.76vw, 15px);
  line-height: 1.16;
  font-weight: 800;
  color: #1f1f1f;
}

.pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
}

.pager-item,
.pager-arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #c4c4c4;
  background: #fff;
  color: #666;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.pager-arrow:hover,
.pager-item:hover {
  border-color: #5ea125;
  color: #333;
}

.pager-item.is-active {
  border-color: #5ea125;
  background: #5ea125;
  color: #fff;
}

@media (max-width: 1200px) {
  .hero-image {
    height: 320px;
  }

  .credentials-grid--cols-4 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .hero-image-wrap {
    border-radius: 18px;
    margin-bottom: 18px;
  }

  .hero-image {
    height: 220px;
  }

  .credentials-subtitle {
    margin: 16px auto 18px;
    font-size: clamp(18px, 2.2vw, 24px);
    line-height: 1.24;
  }

  .credentials-grid--cols-4,
  .credentials-grid--cols-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .credential-image-wrap {
    height: 190px;
  }
}

@media (max-width: 580px) {
  .credentials-grid--cols-4,
  .credentials-grid--cols-3 {
    grid-template-columns: 1fr;
  }

  .credential-image-wrap {
    height: 260px;
  }

  .year-chip {
    font-size: 13px;
    padding: 10px 16px;
  }
}
</style>
