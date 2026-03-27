<template>
  <div>
    <TheHeader />
    <main class="album-page">

      <!-- Хлебные крошки -->
      <nav class="breadcrumbs" aria-label="Хлебные крошки">
        <div class="container">
          <ul class="breadcrumbs-list">
            <li><NuxtLink to="/">Главная</NuxtLink></li>
            <li aria-hidden="true"><img src="/images/16_552.svg" alt=""></li>
            <li><NuxtLink to="/gallery">Галерея</NuxtLink></li>
            <li aria-hidden="true"><img src="/images/16_552.svg" alt=""></li>
            <li><NuxtLink :to="`/gallery/${encodeURIComponent(categoryParam)}`">{{ categoryTitle }}</NuxtLink></li>
            <li aria-hidden="true"><img src="/images/16_552.svg" alt=""></li>
            <li class="current">{{ albumTitleShort }}</li>
          </ul>
        </div>
      </nav>

      <!-- Загрузка -->
      <div v-if="pageStatus === 'loading'" class="album-status">
        <p>Загрузка…</p>
      </div>

      <!-- Не найдено / ошибка -->
      <div v-else-if="pageStatus !== 'ok'" class="album-status">
        <h1 class="album-title">Альбом не найден</h1>
        <NuxtLink :to="`/gallery/${encodeURIComponent(categoryParam)}`" class="album-back-link">
          ← К списку событий
        </NuxtLink>
      </div>

      <!-- Контент -->
      <template v-else>
        <div class="album-header">
          <div class="container">
            <h1 class="album-title">{{ albumTitle }}</h1>
          </div>
        </div>

        <section class="album-grid-section">
          <div class="container">
            <p v-if="!allPhotos.length" class="album-empty">
              В альбоме пока нет фотографий.
            </p>
            <template v-else>
              <div class="photos-grid">
                <div
                  v-for="(photo, i) in displayedPhotos"
                  :key="`${photo}-${i}`"
                  class="photo-wrap"
                  @click="openLightbox(i)"
                >
                  <img :src="photo" :alt="`Фото ${i + 1}`" class="photo-img">
                  <span class="photo-zoom" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor" />
                    </svg>
                  </span>
                </div>
              </div>

              <div v-if="totalPages > 1" class="album-pager">
                <button type="button" class="pager-arrow" :disabled="currentPage <= 1" @click="currentPage--">‹</button>
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
                <button type="button" class="pager-arrow" :disabled="currentPage >= totalPages" @click="currentPage++">›</button>
              </div>
            </template>
          </div>
        </section>
      </template>

      <!-- Лайтбокс -->
      <Teleport to="body">
        <div
          v-if="lightboxOpen"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
          @click.self="closeLightbox"
        >
          <button type="button" class="lightbox-close" aria-label="Закрыть" @click="closeLightbox">×</button>
          <button
            type="button"
            class="lightbox-arrow lightbox-arrow--prev"
            aria-label="Предыдущее"
            :disabled="lightboxIndex <= 0"
            @click.stop="lightboxPrev"
          >
            ‹
          </button>
          <img
            v-if="allPhotos[lightboxIndex]"
            :src="allPhotos[lightboxIndex]"
            :alt="`Фото ${lightboxIndex + 1}`"
            class="lightbox-img"
            @click.stop
          >
          <button
            type="button"
            class="lightbox-arrow lightbox-arrow--next"
            aria-label="Следующее"
            :disabled="lightboxIndex >= allPhotos.length - 1"
            @click.stop="lightboxNext"
          >
            ›
          </button>
        </div>
      </Teleport>

    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { resolvePhotoGalleryCategory } from '~/utils/resolvePhotoGalleryCategory'

definePageMeta({ layout: false })

const route = useRoute()

const categoryParam = computed(() => String(route.params.category || '').trim())
const eventId = computed(() => {
  const n = Number.parseInt(String(route.params.slug || ''), 10)
  return Number.isNaN(n) ? null : n
})

const { data: photoGalleryData } = usePhotoGalleryPage()
const { data: photosData, pending: photosPending } = usePhotoGalleryEventPhotos(eventId)

// ─── Статус страницы ──────────────────────────────────────────────────────────

type PageStatus = 'loading' | 'invalid' | 'error' | 'ok'

const pageStatus = computed<PageStatus>(() => {
  if (eventId.value == null) return 'invalid'
  if (photosPending.value && !photosData.value) return 'loading'
  if (!photosData.value?.photo_gallery) return 'error'
  return 'ok'
})

// ─── Данные ───────────────────────────────────────────────────────────────────

const categoryTitle = computed(() => {
  const c = resolvePhotoGalleryCategory(categoryParam.value, photoGalleryData.value?.photo_gallery?.categories)
  if (!c) return categoryParam.value.toUpperCase()
  return (c.hashtag || '').replace(/^#\s*/, '').trim().toUpperCase() || c.slug.toUpperCase()
})

const titleFromQuery = computed(() => {
  const raw = [route.query.title].flat()[0] ?? ''
  if (!raw) return ''
  try { return decodeURIComponent(String(raw).replace(/\+/g, ' ')) } catch { return String(raw) }
})

const albumTitle = computed(() =>
  titleFromQuery.value.trim() || (eventId.value != null ? `Событие ${eventId.value}` : 'Фотогалерея'),
)

const albumTitleShort = computed(() => {
  const t = albumTitle.value
  return t.length > 80 ? `${t.slice(0, 77)}…` : t
})

useHead({
  title: () =>
    pageStatus.value === 'invalid' ? 'Галерея — Happiness' : `${albumTitleShort.value} — Галерея — Happiness`,
})

// ─── Фото и пагинация ────────────────────────────────────────────────────────

const PER_PAGE = 20
const currentPage = ref(1)

const allPhotos = computed(() => photosData.value?.photo_gallery?.photos ?? [])
const totalPages = computed(() => Math.max(1, Math.ceil(allPhotos.value.length / PER_PAGE)))
const displayedPhotos = computed(() => allPhotos.value.slice((currentPage.value - 1) * PER_PAGE, currentPage.value * PER_PAGE))

watch(totalPages, (pages) => { if (currentPage.value > pages) currentPage.value = pages })
watch([eventId, titleFromQuery], () => { currentPage.value = 1; closeLightbox() })

// ─── Лайтбокс ────────────────────────────────────────────────────────────────

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(indexInPage: number) {
  lightboxIndex.value = (currentPage.value - 1) * PER_PAGE + indexInPage
  lightboxOpen.value = true
}

function closeLightbox() { lightboxOpen.value = false }
function lightboxPrev() { if (lightboxIndex.value > 0) lightboxIndex.value-- }
function lightboxNext() { if (lightboxIndex.value < allPhotos.value.length - 1) lightboxIndex.value++ }

function onKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') lightboxPrev()
  if (e.key === 'ArrowRight') lightboxNext()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.album-page {
  background: #fff;
  padding-bottom: 60px;
}

/* ─── Хлебные крошки ─────────────────────────────────────────────────────── */

.breadcrumbs {
  padding: 20px 0;
}

.breadcrumbs-list {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.breadcrumbs-list a {
  color: #282828;
  text-decoration: none;
}

.breadcrumbs-list a:hover {
  text-decoration: underline;
}

.breadcrumbs-list .current {
  color: #1a1a1a;
  font-weight: 600;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ─── Статусы ────────────────────────────────────────────────────────────── */

.album-status {
  padding: 60px 16px;
  text-align: center;
}

.album-back-link {
  display: inline-block;
  margin-top: 16px;
  color: #dd5f05;
  font-weight: 600;
  text-decoration: none;
}

.album-back-link:hover {
  text-decoration: underline;
}

/* ─── Заголовок ──────────────────────────────────────────────────────────── */

.album-header {
  padding: 0 0 32px;
}

.album-title {
  margin: 0 auto;
  text-align: center;
  font-size: clamp(20px, 2.2vw, 28px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.25;
  color: #dd5f05;
  max-width: 1000px;
}

/* ─── Сетка фото ─────────────────────────────────────────────────────────── */

.album-grid-section {
  padding: 0 0 50px;
}

.album-empty {
  text-align: center;
  padding: 32px 16px;
  color: #555;
  font-size: 16px;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}

.photo-wrap {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1;
  background: #f5f5f5;
  cursor: pointer;
}

.photo-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  z-index: 1;
}

.photo-wrap:hover::after {
  opacity: 1;
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.25s;
}

.photo-wrap:hover .photo-img {
  transform: scale(1.04);
}

.photo-zoom {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 2;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

.photo-wrap:hover .photo-zoom {
  opacity: 1;
}

/* ─── Пагинация ───────────────────────────────────────────────────────────── */

.album-pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
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

.pager-arrow:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.pager-item.is-active {
  border-color: #8bc34a;
  background: #8bc34a;
  color: #fff;
}

/* ─── Лайтбокс ────────────────────────────────────────────────────────────── */

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
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
  background: rgba(0, 0, 0, 0.75);
}

.lightbox-arrow:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.lightbox-arrow--prev { left: 24px; }
.lightbox-arrow--next { right: 24px; }

.lightbox-img {
  max-width: calc(100vw - 200px);
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
}

/* ─── Адаптив ─────────────────────────────────────────────────────────────── */

@media (max-width: 1024px) {
  .photos-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .photos-grid { grid-template-columns: 1fr; }
  .breadcrumbs-list .current { max-width: 180px; }
  .lightbox { padding: 48px 16px; }
  .lightbox-img { max-width: calc(100vw - 40px); }
}

@media (max-width: 480px) {
  .album-page {
    padding-bottom: 28px;
  }

  .breadcrumbs {
    padding: 10px 0;
  }

  .breadcrumbs-list {
    flex-wrap: nowrap;
    overflow-x: auto;
    white-space: nowrap;
    font-size: 12px;
    scrollbar-width: none;
  }

  .breadcrumbs-list::-webkit-scrollbar {
    display: none;
  }

  .album-header {
    padding-bottom: 16px;
  }

  .album-title {
    font-size: clamp(18px, 7vw, 22px);
  }

  .photos-grid {
    gap: 10px;
    margin-bottom: 18px;
  }

  .album-pager {
    gap: 6px;
  }

  .pager-arrow,
  .pager-item {
    width: 34px;
    height: 34px;
    font-size: 14px;
  }

  .lightbox {
    padding: 42px 10px;
  }

  .lightbox-close {
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    font-size: 22px;
  }

  .lightbox-arrow {
    width: 42px;
    height: 42px;
    font-size: 24px;
  }

  .lightbox-arrow--prev {
    left: 8px;
  }

  .lightbox-arrow--next {
    right: 8px;
  }

  .lightbox-img {
    max-width: calc(100vw - 24px);
    max-height: 80vh;
  }
}
</style>
