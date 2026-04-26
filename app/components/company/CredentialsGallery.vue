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

        <p class="credentials-subtitle">{{ subtitleText }}</p>

        <div v-if="mode === 'years' && showYearFilter" class="filters-year-row">
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

        <div v-else-if="mode === 'select' && showSelectRow" class="filters-select-row">
          <label class="fake-select-label">
            <select
              class="fake-select"
              aria-label="Выберите название продукции"
              :value="selectValue"
              @change="onSelectChange"
            >
              <option value="">Все продукты</option>
              <option v-for="option in selectOptions" :key="option" :value="option">{{ option }}</option>
            </select>
          </label>
        </div>

        <div class="credentials-grid" :class="`credentials-grid--cols-${gridColumns}`">
          <template v-for="(item, index) in items" :key="credentialKey(item, index)">
            <a
              v-if="item.fileUrl"
              :href="item.fileUrl"
              class="credential-card credential-card--link"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${item.title}. Открыть файл`"
            >
              <div
                class="credential-image-wrap"
                :class="{ 'credential-image-wrap--pdf': item.previewKind === 'pdf' }"
              >
                <template v-if="item.previewKind === 'pdf'">
                  <svg class="credential-pdf-icon" viewBox="0 0 48 56" aria-hidden="true" focusable="false">
                    <path fill="#e8e8e8" d="M4 4a4 4 0 0 1 4-4h22l16 16v36a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V4z" />
                    <path fill="#d0d0d0" d="M30 0v16h16L30 0z" />
                    <path fill="#c62828" d="M12 40h24v4H12v-4zm0-8h24v4H12v-4zm0-8h16v4H12v-4z" />
                  </svg>
                  <span class="credential-pdf-badge">PDF</span>
                </template>
                <img
                  v-else
                  :src="item.image"
                  :alt="item.title"
                  class="credential-image"
                  loading="lazy"
                  decoding="async"
                >
              </div>
              <p class="credential-title">{{ item.title }}</p>
            </a>
            <article v-else class="credential-card">
              <div
                class="credential-image-wrap"
                :class="{ 'credential-image-wrap--pdf': item.previewKind === 'pdf' }"
              >
                <template v-if="item.previewKind === 'pdf'">
                  <svg class="credential-pdf-icon" viewBox="0 0 48 56" aria-hidden="true" focusable="false">
                    <path fill="#e8e8e8" d="M4 4a4 4 0 0 1 4-4h22l16 16v36a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V4z" />
                    <path fill="#d0d0d0" d="M30 0v16h16L30 0z" />
                    <path fill="#c62828" d="M12 40h24v4H12v-4zm0-8h24v4H12v-4zm0-8h16v4H12v-4z" />
                  </svg>
                  <span class="credential-pdf-badge">PDF</span>
                </template>
                <img
                  v-else
                  :src="item.image"
                  :alt="item.title"
                  class="credential-image"
                  loading="lazy"
                  decoding="async"
                >
              </div>
              <p class="credential-title">{{ item.title }}</p>
            </article>
          </template>
        </div>

        <div v-if="showPager" class="pager">
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
import { computed } from 'vue'

interface TitlePart {
  text: string
  accent?: boolean
}

interface CredentialItem {
  /** URL превью; для PDF не используется (см. previewKind). */
  image: string
  title: string
  /** Если задано, карточка ведёт на файл (скачать / открыть в новой вкладке). */
  fileUrl?: string
  /** image — превью-картинка; pdf — аккуратный блок PDF. */
  previewKind: 'image' | 'pdf'
}

const DEFAULT_SUBTITLE = 'Мы ценим доверие наших клиентов и партнёров, поэтому подтверждаем качество и профессионализм компании HAPPINESS официальными сертификатами и дипломами.'

const props = withDefaults(defineProps<{
  breadcrumbTitle: string
  heroImage: string
  titleParts: TitlePart[]
  /** Текст под заголовком; для сертификатов не передаётся — показывается стандартный абзац. */
  sectionDescription?: string | null
  mode?: 'years' | 'select'
  years?: number[]
  activeYear?: number
  selectOptions?: string[]
  /** Значение фильтра по продукту; пустая строка — «Все продукты». */
  selectValue?: string
  items: CredentialItem[]
  pages?: number[]
  activePage?: number
  gridColumns?: number
  pageVariant?: 'default' | 'light'
}>(), {
  sectionDescription: null,
  mode: 'years',
  years: () => [2010, 2011, 2012, 2013, 2014, 2015, 2016],
  activeYear: 2014,
  selectOptions: () => [],
  selectValue: '',
  pages: () => [1, 2, 3, 4, 5],
  activePage: 3,
  gridColumns: 4,
  pageVariant: 'default',
})

const subtitleText = computed(() => {
  const t = props.sectionDescription?.trim()
  return t || DEFAULT_SUBTITLE
})

const showYearFilter = computed(() => (props.years?.length ?? 0) > 1)

const showPager = computed(() => (props.pages?.length ?? 0) > 1)

const showSelectRow = computed(
  () => props.mode === 'select' && (props.selectOptions?.length ?? 0) > 1,
)

function credentialKey(item: CredentialItem, index: number): string {
  if (item.fileUrl) return `${item.fileUrl}-${item.previewKind}-${index}`
  return `${item.image}-${item.title}-${index}`
}

const emit = defineEmits<{
  'update:activeYear': [number]
  'update:activePage': [number]
  'update:selectValue': [string]
}>()

function onSelectChange(e: Event) {
  const el = e.target as HTMLSelectElement | null
  emit('update:selectValue', el?.value ?? '')
}

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
  padding-bottom: max(20px, env(safe-area-inset-bottom, 0px));
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
  flex-wrap: wrap;
  gap: 6px 8px;
  font-size: 14px;
  line-height: 1.3;
  row-gap: 6px;
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
  max-width: 100%;
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
  font-size: clamp(28px, 5.2vw, 110px);
  font-weight: 900;
  text-transform: uppercase;
  padding: 0 4px;
  word-break: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  max-width: 100%;
  box-sizing: border-box;
}

.title-part {
  color: #0a0b0f;
  margin-right: clamp(4px, 1.2vw, 14px);
}

.title-part.is-accent {
  color: #dd5f05;
}

.credentials-subtitle {
  margin: 20px auto 28px;
  max-width: 820px;
  padding: 0 4px;
  text-align: center;
  font-size: clamp(14px, 1.1vw, 17px);
  line-height: 1.5;
  color: #1a1a1a;
  font-weight: 400;
}

.filters-year-row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px 12px;
  margin-bottom: 28px;
  max-width: 100%;
  padding: 0 2px;
  box-sizing: border-box;
}

.filters-year-scroll {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  max-width: min(100%, 800px);
  min-width: 0;
  flex: 1 1 200px;
  padding: 4px 0;
  -webkit-overflow-scrolling: touch;
}
.filters-year-scroll::-webkit-scrollbar {
  display: none;
}

.year-arrow {
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  border: 1px solid #e28133;
  background: #fff;
  transition: background 0.2s, color 0.2s;
  touch-action: manipulation;
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
  padding: 12px 18px;
  min-height: 44px;
  font-size: clamp(12px, 0.8vw, 16px);
  line-height: 1.1;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s;
  touch-action: manipulation;
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
  width: 100%;
  padding: 0 2px;
  box-sizing: border-box;
}

.fake-select {
  width: min(100%, 460px);
  min-height: 48px;
  box-sizing: border-box;
  border: 2px solid #d5d5d5;
  border-radius: 999px;
  padding: 10px 16px 10px 18px;
  font-size: 16px;
  line-height: 1.2;
  color: #8f8f8f;
  background: #f6f6f6;
  max-width: 100%;
}

.credentials-grid {
  display: grid;
  gap: clamp(10px, 2.5vw, 16px);
  width: 100%;
  min-width: 0;
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

a.credential-card--link {
  text-decoration: none;
  color: inherit;
  display: block;
}

a.credential-card--link:hover .credential-title {
  color: #dd5f05;
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

.credential-image-wrap--pdf {
  flex-direction: column;
  gap: 10px;
  background: linear-gradient(165deg, #fafafa 0%, #ececec 45%, #e4e4e4 100%);
  border: 1px solid #d2d2d2;
}

.credential-pdf-icon {
  width: 56px;
  height: auto;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.12));
}

.credential-pdf-badge {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #c62828;
  line-height: 1;
}

.credential-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.credential-title {
  margin: 9px 0 0;
  text-transform: uppercase;
  font-size: clamp(11px, 2.1vw, 15px);
  line-height: 1.2;
  font-weight: 800;
  color: #1f1f1f;
  word-break: break-word;
  overflow-wrap: break-word;
  padding: 0 1px;
}

.pager {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px 10px;
  margin-top: 28px;
  max-width: 100%;
  padding: 0 4px 4px;
  box-sizing: border-box;
}

.pager-item,
.pager-arrow {
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
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
  touch-action: manipulation;
  flex-shrink: 0;
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
    height: min(320px, 32vw);
  }

  .credentials-grid--cols-4 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .breadcrumbs-section {
    padding: 10px 0 6px;
  }

  .breadcrumbs-list {
    font-size: 13px;
  }

  .hero-image-wrap {
    border-radius: 20px;
    margin-bottom: 20px;
  }

  .hero-image {
    height: min(240px, 32vw);
  }

  .credentials-title {
    line-height: 1.04;
  }

  .credentials-subtitle {
    margin: 14px auto 20px;
    font-size: clamp(15px, 2.2vw, 20px);
    line-height: 1.3;
  }

  .filters-year-row {
    margin-bottom: 22px;
  }

  .filters-select-row {
    margin-bottom: 20px;
  }

  .fake-select {
    width: 100%;
  }

  .credentials-grid--cols-4,
  .credentials-grid--cols-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .credential-image-wrap {
    height: min(200px, 28vw);
  }
}

@media (max-width: 640px) {
  .year-arrow {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
  }
}

@media (max-width: 580px) {
  .breadcrumbs-section .container {
    padding-left: max(12px, env(safe-area-inset-left, 0px));
    padding-right: max(12px, env(safe-area-inset-right, 0px));
  }

  .credentials-hero .container {
    padding-left: max(12px, env(safe-area-inset-left, 0px));
    padding-right: max(12px, env(safe-area-inset-right, 0px));
  }

  .credentials-title {
    font-size: clamp(22px, 6.2vw, 40px);
    line-height: 1.05;
  }

  .hero-image-wrap {
    border-radius: 16px;
    margin-bottom: 16px;
  }

  .hero-image {
    height: min(200px, 50vw);
  }

  .credentials-subtitle {
    margin: 12px auto 16px;
    padding: 0 2px;
    font-size: 15px;
  }

  .filters-year-row {
    gap: 8px;
    margin-bottom: 18px;
  }

  .year-chip {
    font-size: 12px;
    padding: 10px 14px;
    min-height: 42px;
  }

  .credentials-grid--cols-4,
  .credentials-grid--cols-3 {
    grid-template-columns: 1fr;
  }

  .credential-image-wrap {
    height: min(220px, 58vw);
  }

  .credential-pdf-icon {
    width: 48px;
  }

  .pager {
    margin-top: 20px;
    gap: 6px 8px;
  }

  .pager-item,
  .pager-arrow {
    width: 38px;
    height: 38px;
    min-width: 38px;
    min-height: 38px;
    font-size: 14px;
  }
}

@media (max-width: 400px) {
  .breadcrumbs-list {
    font-size: 12px;
  }

  .credentials-title {
    font-size: clamp(20px, 5.4vw, 32px);
  }

  .hero-image {
    height: min(180px, 48vw);
  }

  .credential-image-wrap {
    height: min(200px, 64vw);
  }
}
</style>
