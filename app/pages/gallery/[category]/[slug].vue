<template>
  <div>
    <TheHeader />
    <main class="gallery-album-page">
      <section class="breadcrumbs-section">
        <div class="container">
          <nav class="breadcrumbs-list" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="crumb-item">Главная</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <NuxtLink to="/gallery" class="crumb-item">Галерея</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <NuxtLink :to="`/gallery/${category}`" class="crumb-item">{{ categoryTitle }}</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <span class="crumb-item active">{{ albumTitleShort }}</span>
          </nav>
        </div>
      </section>

      <section class="gallery-album-intro">
        <div class="container">
          <h1 class="gallery-album-title">{{ albumTitle }}</h1>
        </div>
      </section>

      <section class="gallery-album-grid-section">
        <div class="container">
          <div class="gallery-photos-grid">
            <div
              v-for="(photo, i) in displayedPhotos"
              :key="i"
              class="gallery-photo-wrap"
              @click="openLightbox(i)"
            >
              <img :src="photo" :alt="`Фото ${i + 1}`" class="gallery-photo-img">
              <span class="gallery-photo-zoom" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
                </svg>
              </span>
            </div>
          </div>

          <div class="gallery-album-pager">
            <button type="button" class="pager-arrow" aria-label="Предыдущая страница" @click="prevPage">‹</button>
            <button
              v-for="p in totalPages"
              :key="p"
              type="button"
              class="pager-item"
              :class="{ 'is-active': p === currentPage }"
              @click="currentPage = p"
            >
              {{ p }}
            </button>
            <button type="button" class="pager-arrow" aria-label="Следующая страница" @click="nextPage">›</button>
          </div>
        </div>
      </section>

      <!-- Лайтбокс: каждое фото открывается с навигацией -->
      <Teleport to="body">
        <div
          v-if="lightboxOpen"
          class="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
          @click.self="closeLightbox"
        >
          <button type="button" class="lightbox-close" aria-label="Закрыть" @click="closeLightbox">×</button>
          <button
            type="button"
            class="lightbox-arrow lightbox-arrow--prev"
            aria-label="Предыдущее фото"
            :disabled="lightboxGlobalIndex <= 0"
            @click.stop="lightboxPrev"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <img
            :src="allPhotos[lightboxGlobalIndex]"
            :alt="`Фото ${lightboxGlobalIndex + 1}`"
            class="lightbox-img"
            @click.stop
          >
          <button
            type="button"
            class="lightbox-arrow lightbox-arrow--next"
            aria-label="Следующее фото"
            :disabled="lightboxGlobalIndex >= allPhotos.length - 1"
            @click.stop="lightboxNext"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </Teleport>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const route = useRoute()
const category = computed(() => (route.params.category as string) || 'travel')
const slug = computed(() => (route.params.slug as string) || '')

const categoryMeta: Record<string, string> = {
  travel: 'ПУТЕШЕСТВИЯ',
  training: 'ОБУЧЕНИЯ И МЕРОПРИЯТИЯ',
  anniversary: 'ГОДОВЩИНЫ',
}

const categoryTitle = computed(() => categoryMeta[category.value] ?? category.value.toUpperCase())

const albumMeta: Record<string, { title: string; titleShort: string }> = {
  'hainan-2023': {
    title: 'ГОНКОНГСКАЯ КОРПОРАЦИЯ «ШЕН ЛУНГ» HAPPINESS ПРОМОУШЕН CASHBACK (848-889)',
    titleShort: '10-е путешествие на о. Хайнань, г. Санья (12 ноября 2023 - 20 ноября 2023)',
  },
  'hainan-2023-2': {
    title: 'ГОНКОНГСКАЯ КОРПОРАЦИЯ «ШЕН ЛУНГ» HAPPINESS ПРОМОУШЕН CASHBACK (848-889)',
    titleShort: '10-е путешествие на о. Хайнань, г. Санья (12 ноября 2023 - 20 ноября 2023)',
  },
  'sanya-2024': {
    title: '10-Й ТУР РОССИЙСКИХ ДИСТРИБЬЮТОРОВ КОМПАНИЯ ШЭНЛУН ИЗ ГОНКОНГА В САНЬЮ',
    titleShort: '7-13 июня 2024 года',
  },
  'sanya-2024-2': {
    title: '10-Й ТУР РОССИЙСКИХ ДИСТРИБЬЮТОРОВ КОМПАНИЯ ШЭНЛУН ИЗ ГОНКОНГА В САНЬЮ',
    titleShort: '7-13 июня 2024 года',
  },
  'sanya-2024-3': {
    title: '10-Й ТУР РОССИЙСКИХ ДИСТРИБЬЮТОРОВ КОМПАНИЯ ШЭНЛУН ИЗ ГОНКОНГА В САНЬЮ',
    titleShort: '7-13 июня 2024 года',
  },
  'china-factory': {
    title: 'ПУТЕШЕСТВИЕ НА ЗАВОД КОМПАНИИ HAPPINESS В КИТАЕ',
    titleShort: 'Путешествие на завод компании Happiness в Китае',
  },
  'china-factory-2': {
    title: 'ПУТЕШЕСТВИЕ НА ЗАВОД КОМПАНИИ HAPPINESS В КИТАЕ',
    titleShort: 'Путешествие на завод компании Happiness в Китае',
  },
  'hainan': {
    title: 'ПУТЕШЕСТВИЕ НА О. ХАЙНАНЬ, Г. САНЬЯ',
    titleShort: 'Путешествие на о. Хайнань, г. Санья',
  },
  'hainan-2': {
    title: 'ПУТЕШЕСТВИЕ НА О. ХАЙНАНЬ, Г. САНЬЯ',
    titleShort: 'Путешествие на о. Хайнань, г. Санья',
  },
  default: {
    title: 'АЛЬБОМ ГАЛЕРЕИ',
    titleShort: 'Фотоальбом',
  },
}

const albumTitle = computed(() => albumMeta[slug.value]?.title ?? albumMeta.default.title)
const albumTitleShort = computed(() => albumMeta[slug.value]?.titleShort ?? albumMeta.default.titleShort)

useHead({
  title: () => `${albumTitleShort.value} — Галерея — Happiness`,
})

const currentPage = ref(3)
const perPage = 20
const totalPages = 5

const placeholderPhoto = '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png'
const allPhotos = computed(() => {
  const list: string[] = []
  const imgs = [
    placeholderPhoto,
    '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
    '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png',
  ]
  for (let i = 0; i < perPage * totalPages; i++) list.push(imgs[i % imgs.length])
  return list
})

const displayedPhotos = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return allPhotos.value.slice(start, start + perPage)
})

const lightboxOpen = ref(false)
const lightboxGlobalIndex = ref(0)

function openLightbox(indexInPage: number) {
  lightboxGlobalIndex.value = (currentPage.value - 1) * perPage + indexInPage
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

function lightboxPrev() {
  if (lightboxGlobalIndex.value > 0) lightboxGlobalIndex.value--
}

function lightboxNext() {
  if (lightboxGlobalIndex.value < allPhotos.value.length - 1) lightboxGlobalIndex.value++
}

function onKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') lightboxPrev()
  if (e.key === 'ArrowRight') lightboxNext()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
  if (currentPage.value < totalPages) currentPage.value++
}
</script>

<style scoped>
.gallery-album-page {
  background: #fff;
  padding-bottom: 60px;
}

.breadcrumbs-section {
  padding: 20px 0;
}

.breadcrumbs-list {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  flex-wrap: wrap;
}

.crumb-item {
  color: #282828;
}

.crumb-item.active {
  color: #1a1a1a;
  font-weight: 600;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gallery-album-intro {
  padding: 0 0 32px;
}

.gallery-album-title {
  margin: 0;
  text-align: center;
  font-size: clamp(20px, 2.2vw, 28px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.25;
  color: #dd5f05;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.gallery-photos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}

.gallery-photo-wrap {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1;
  background: #f5f5f5;
  cursor: pointer;
}

.gallery-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.2s;
}

.gallery-photo-wrap:hover .gallery-photo-img {
  transform: scale(1.03);
}

.gallery-photo-zoom {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.gallery-photo-wrap:hover .gallery-photo-zoom {
  opacity: 1;
}

.gallery-album-pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pager-arrow,
.pager-item {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #c4c4c4;
  background: #fff;
  color: #555;
  font-size: 16px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}

.pager-item.is-active {
  border-color: #8bc34a;
  background: #8bc34a;
  color: #fff;
}

/* Lightbox — так открывается каждое фото */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 80px;
}

.lightbox-close {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
  transition: background 0.2s;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.35);
}

.lightbox-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.2s;
}

.lightbox-arrow:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.7);
}

.lightbox-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.lightbox-arrow--prev {
  left: 24px;
}

.lightbox-arrow--next {
  right: 24px;
}

.lightbox-img {
  max-width: calc(100vw - 200px);
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
}

@media (max-width: 1024px) {
  .gallery-photos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .gallery-photos-grid {
    grid-template-columns: 1fr;
  }

  .crumb-item.active {
    max-width: 180px;
  }
}
</style>
