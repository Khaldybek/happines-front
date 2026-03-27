<template>
  <div class="gallery-page-wrapper" :class="{ 'is-video-modal-open': videoModalOpen }">
    <TheHeader />
    <main class="gallery-page">
      <GalleryBreadcrumbs />

      <!-- Заголовок и табы -->
      <section class="gallery-intro">
        <div class="container">
          <h1 class="gallery-title">ГАЛЕРЕЯ</h1>
          <div class="gallery-tabs">
            <button
              type="button"
              class="gallery-tab"
              :class="{ 'is-active': activeTab === 'photo' }"
              @click="activeTab = 'photo'"
            >
              ФОТОГАЛЕРЕЯ
            </button>
            <button
              type="button"
              class="gallery-tab"
              :class="{ 'is-active': activeTab === 'video' }"
              @click="activeTab = 'video'"
            >
              ВИДЕОГАЛЕРЕЯ
            </button>
          </div>
        </div>
      </section>

      <!-- Фотогалерея -->
      <section v-if="activeTab === 'photo'" class="gallery-blocks">
        <div class="container">
          <p v-if="!sortedPhotoCategories.length" class="gallery-empty-msg">
            Фотогалерея пока пуста.
          </p>
          <template v-else>
            <div
              v-for="(cat, i) in sortedPhotoCategories"
              :key="cat.id"
              class="gallery-row"
              :class="{ 'gallery-row--reversed': i % 2 === 1 }"
            >
              <div class="gallery-row-images gallery-row-images--mixed">
                <div class="gallery-img gallery-img--big">
                  <img :src="categoryImageAt(cat, 0)" :alt="cat.hashtag">
                </div>
                <div class="gallery-img gallery-img--small">
                  <img :src="categoryImageAt(cat, 1)" alt="">
                </div>
                <div class="gallery-img gallery-img--small">
                  <img :src="categoryImageAt(cat, 2)" alt="">
                </div>
              </div>
              <div class="gallery-block" :class="photoBlockColor(i)">
                <span class="gallery-block-hashtag">{{ cat.hashtag }}</span>
                <p class="gallery-block-desc">{{ cat.description }}</p>
                <NuxtLink :to="`/gallery/${encodeURIComponent(cat.slug)}`" class="gallery-block-btn">
                  <span class="gallery-block-btn-visual">
                    <span class="gallery-block-btn-circle" aria-hidden="true"></span>
                    <span class="gallery-block-btn-label">Подробнее</span>
                  </span>
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- Видеогалерея -->
      <section v-else class="gallery-video-section">
        <div class="container">
          <div v-if="!allVideos.length" class="gallery-empty-msg">
            Видеогалерея пока пуста.
          </div>
          <template v-else>
            <div class="video-gallery-grid">
              <article
                v-for="video in displayedVideos"
                :key="video.id"
                class="video-gallery-card"
              >
                <div class="video-gallery-thumb" @click="openVideoModal(video)">
                  <video
                    :src="video.video_url"
                    class="video-gallery-thumb-img"
                    preload="metadata"
                    muted
                    playsinline
                  />
                  <span class="video-gallery-play" aria-hidden="true"></span>
                  <span class="video-gallery-logo">HAPPINESS</span>
                </div>
                <p class="video-gallery-desc">{{ video.description }}</p>
              </article>
            </div>

            <div v-if="videoTotalPages > 1" class="gallery-pager">
              <button
                type="button"
                class="pager-arrow"
                aria-label="Предыдущая страница"
                :disabled="videoCurrentPage <= 1"
                @click="videoCurrentPage--"
              >
                ‹
              </button>
              <button
                v-for="p in videoTotalPages"
                :key="p"
                type="button"
                class="pager-item"
                :class="{ 'is-active': p === videoCurrentPage }"
                @click="videoCurrentPage = p"
              >
                {{ p }}
              </button>
              <button
                type="button"
                class="pager-arrow"
                aria-label="Следующая страница"
                :disabled="videoCurrentPage >= videoTotalPages"
                @click="videoCurrentPage++"
              >
                ›
              </button>
            </div>
          </template>
        </div>
      </section>

      <!-- Модалка видео -->
      <Teleport to="body">
        <div
          v-if="videoModalOpen"
          class="video-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр видео"
          @click.self="closeVideoModal"
        >
          <div class="video-modal-box">
            <button type="button" class="video-modal-close" aria-label="Закрыть" @click="closeVideoModal">
              ×
            </button>
            <div v-if="selectedVideo" class="video-modal-content">
              <div class="video-modal-player">
                <video
                  :src="selectedVideo.video_url"
                  class="video-modal-video"
                  controls
                  autoplay
                  playsinline
                />
              </div>
              <p class="video-modal-desc">{{ selectedVideo.description }}</p>
            </div>
          </div>
        </div>
      </Teleport>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { VideoGalleryItem } from '~/types/videoGalleryPage'

definePageMeta({ layout: false })

useHead({ title: 'Галерея — Happiness' })

// ─── Фотогалерея ────────────────────────────────────────────────────────────

const { data: photoGalleryData } = usePhotoGalleryPage()

const FALLBACK_IMG = '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png'

const sortedPhotoCategories = computed(() =>
  sortedPhotoGalleryCategories(photoGalleryData.value?.photo_gallery?.categories),
)

function categoryImageAt(cat: { images?: string[] }, idx: number): string {
  const imgs = cat.images ?? []
  return imgs[idx] ?? imgs[idx % imgs.length] ?? FALLBACK_IMG
}

const BLOCK_COLORS = ['gallery-block--blue', 'gallery-block--orange', 'gallery-block--green'] as const
function photoBlockColor(index: number) {
  return BLOCK_COLORS[index % BLOCK_COLORS.length]
}

// ─── Видеогалерея ────────────────────────────────────────────────────────────

const { data: videoGalleryData } = useVideoGalleryPage()

const VIDEO_PER_PAGE = 6

const allVideos = computed<VideoGalleryItem[]>(() =>
  [...(videoGalleryData.value?.video_gallery ?? [])].sort((a, b) => a.position - b.position),
)

const videoCurrentPage = ref(1)
const videoTotalPages = computed(() => Math.max(1, Math.ceil(allVideos.value.length / VIDEO_PER_PAGE)))

const displayedVideos = computed(() => {
  const start = (videoCurrentPage.value - 1) * VIDEO_PER_PAGE
  return allVideos.value.slice(start, start + VIDEO_PER_PAGE)
})

watch(videoTotalPages, (pages) => {
  if (videoCurrentPage.value > pages) videoCurrentPage.value = pages
})

// ─── Модалка видео ───────────────────────────────────────────────────────────

const activeTab = ref<'photo' | 'video'>('photo')
const videoModalOpen = ref(false)
const selectedVideo = ref<VideoGalleryItem | null>(null)

function openVideoModal(video: VideoGalleryItem) {
  selectedVideo.value = video
  videoModalOpen.value = true
}

function closeVideoModal() {
  videoModalOpen.value = false
  selectedVideo.value = null
}

function onKeydown(e: KeyboardEvent) {
  if (videoModalOpen.value && e.key === 'Escape') closeVideoModal()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
/* ─── Общее ───────────────────────────────────────────────────────────────── */

.gallery-page {
  background: #fff;
  padding-bottom: 60px;
}

/* ─── Заголовок / табы ────────────────────────────────────────────────────── */

.gallery-intro {
  padding: 0 0 52px;
}

.gallery-title {
  margin: 0 0 36px;
  text-align: center;
  font-size: clamp(52px, 6vw, 82px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #dd5f05;
}

.gallery-tabs {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.gallery-tab {
  padding: 10px 16px;
  border-radius: 40px;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  background: #fff;
  border: none;
  color: #1a1a1a;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.gallery-tab.is-active {
  background: linear-gradient(166deg, #67a432 14.55%, #3b710f 73.84%);
  color: #fff;
}

/* ─── Пустое состояние ────────────────────────────────────────────────────── */

.gallery-empty-msg {
  margin: 0;
  text-align: center;
  padding: 48px 16px;
  font-size: 18px;
  color: #555;
}

/* ─── Фотогалерея: строки с категориями ──────────────────────────────────── */

.gallery-blocks {
  padding: 0 0 34px;
}

.gallery-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: stretch;
  margin-bottom: 40px;
}

/* Нечётные строки: блок перед изображениями визуально */
.gallery-row--reversed .gallery-block {
  order: -1;
}

/* ─── Коллаж изображений ─────────────────────────────────────────────────── */

.gallery-row-images--mixed {
  display: grid;
  grid-template-columns: 416px 274px;
  grid-template-rows: 222px 222px;
  justify-content: end;
  gap: 8px;
}

.gallery-row-images--mixed .gallery-img--big {
  grid-row: 1 / span 2;
}

.gallery-row-images--mixed .gallery-img--small {
  grid-column: 2;
}

/* Зеркало для нечётных строк */
.gallery-row--reversed .gallery-row-images--mixed {
  grid-template-columns: 274px 416px;
  justify-content: start;
}

.gallery-row--reversed .gallery-row-images--mixed .gallery-img--big {
  grid-column: 2;
  grid-row: 1 / span 2;
}

.gallery-row--reversed .gallery-row-images--mixed .gallery-img--small {
  grid-column: 1;
}

.gallery-img {
  border-radius: 50px;
  overflow: hidden;
  background: #f0f0f0;
}

.gallery-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-img--big img {
  height: 452px;
}

.gallery-img--small img {
  height: 222px;
}

/* ─── Цветные блоки категорий ─────────────────────────────────────────────── */

.gallery-block {
  border-radius: 50px;
  padding: 44px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 452px;
}

.gallery-block--blue {
  background: #4b93d7;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.gallery-block--orange {
  background: #ff7b1c;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.gallery-block--green {
  background: #78a435;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.gallery-block-hashtag {
  font-size: 20px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #fff;
  margin-bottom: 14px;
}

.gallery-block-desc {
  margin: 0 0 24px;
  font-size: 40px;
  line-height: 1.28;
  letter-spacing: 0.02em;
  color: #fff;
  flex: 1;
}

.gallery-block-btn {
  display: inline-flex;
  align-self: flex-start;
  text-decoration: none;
  border-radius: 85px;
  transition: opacity 0.2s;
}

.gallery-block-btn:hover {
  opacity: 0.88;
}

.gallery-block-btn-visual {
  display: inline-flex;
  align-items: stretch;
  border-radius: 85px;
  overflow: hidden;
}

.gallery-block-btn-circle {
  width: 52px;
  flex-shrink: 0;
  background-color: #2cb9a2;
  background-image: url("/images/I16_569_132_85696.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px 18px;
}

.gallery-block-btn-label {
  display: inline-flex;
  align-items: center;
  padding: 16px 18px;
  background: #2cb9a2;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 1;
}

/* ─── Видеогалерея ────────────────────────────────────────────────────────── */

.gallery-video-section {
  padding: 0 0 50px;
}

.video-gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px 24px;
  margin-bottom: 40px;
}

.video-gallery-card {
  background: #fff;
}

.video-gallery-thumb {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 16/10;
  background: #1a1a1a;
  cursor: pointer;
  margin-bottom: 14px;
}

.video-gallery-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-gallery-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  transition: background 0.2s;
}

.video-gallery-thumb:hover .video-gallery-play {
  background: rgba(0, 0, 0, 0.4);
}

.video-gallery-play::after {
  content: "";
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #1e90ff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40%;
}

.video-gallery-logo {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #fff;
  z-index: 2;
}

.video-gallery-desc {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  color: #1a1a1a;
  text-transform: uppercase;
}

/* ─── Пагинация ───────────────────────────────────────────────────────────── */

.gallery-pager {
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

/* ─── Модалка видео ───────────────────────────────────────────────────────── */

.gallery-page-wrapper.is-video-modal-open {
  filter: grayscale(1);
}

.video-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.65);
}

.video-modal-box {
  position: relative;
  max-width: 900px;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.video-modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  line-height: 1;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
}

.video-modal-close:hover {
  background: rgba(0, 0, 0, 0.8);
}

.video-modal-content {
  padding: 0 0 1.5rem;
}

.video-modal-player {
  aspect-ratio: 16 / 9;
  background: #111;
}

.video-modal-video {
  width: 100%;
  height: 100%;
  display: block;
}

.video-modal-desc {
  padding: 1rem 1.5rem 0;
  margin: 0;
  font-size: 0.9rem;
  color: #333;
  line-height: 1.4;
}

/* ─── Адаптив ─────────────────────────────────────────────────────────────── */

@media (max-width: 900px) {
  .gallery-row {
    grid-template-columns: 1fr;
  }

  /* На мобайле нечётные строки: блок сначала, изображения снизу */
  .gallery-row--reversed .gallery-block {
    order: 0;
  }

  .gallery-row--reversed .gallery-row-images {
    order: 1;
  }

  .gallery-row-images--mixed,
  .gallery-row--reversed .gallery-row-images--mixed {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    justify-content: stretch;
  }

  .gallery-row-images--mixed .gallery-img--big,
  .gallery-row-images--mixed .gallery-img--small,
  .gallery-row--reversed .gallery-row-images--mixed .gallery-img--big,
  .gallery-row--reversed .gallery-row-images--mixed .gallery-img--small {
    grid-row: auto;
    grid-column: auto;
  }

  .gallery-img--big img,
  .gallery-img--small img {
    height: 240px;
  }

  .gallery-block {
    min-height: auto;
    border-radius: 30px !important;
    padding: 26px 20px;
  }

  .gallery-block-desc {
    font-size: 24px;
  }
}

@media (max-width: 700px) {
  .gallery-page {
    padding-bottom: 32px;
  }

  .gallery-intro {
    padding-bottom: 20px;
  }

  .gallery-title {
    margin-bottom: 14px;
    font-size: clamp(32px, 10vw, 44px);
  }

  .gallery-tabs {
    gap: 10px;
  }

  .gallery-tab {
    padding: 8px 12px;
    font-size: 12px;
  }

  .gallery-blocks {
    padding-bottom: 18px;
  }

  .gallery-row {
    margin-bottom: 18px;
    gap: 10px;
  }

  .gallery-img {
    border-radius: 16px;
  }

  .gallery-img--big img,
  .gallery-img--small img {
    height: 180px;
  }

  .gallery-block {
    padding: 16px 14px;
    border-radius: 16px !important;
  }

  .gallery-block-hashtag {
    font-size: 14px;
    margin-bottom: 8px;
  }

  .gallery-block-desc {
    font-size: 18px;
    margin-bottom: 12px;
    line-height: 1.25;
  }

  .gallery-block-btn-circle {
    width: 40px;
    background-size: 14px 14px;
  }

  .gallery-block-btn-label {
    padding: 12px 12px;
    font-size: 12px;
  }

  .video-gallery-grid {
    grid-template-columns: 1fr;
    gap: 14px;
    margin-bottom: 16px;
  }

  .video-gallery-thumb {
    margin-bottom: 8px;
    border-radius: 12px;
  }

  .video-gallery-play::after {
    width: 50px;
    height: 50px;
  }

  .video-gallery-desc {
    font-size: 13px;
  }

  .gallery-pager {
    gap: 6px;
  }

  .pager-arrow,
  .pager-item {
    width: 34px;
    height: 34px;
    font-size: 14px;
  }

  .video-modal-overlay {
    padding: 10px;
  }

  .video-modal-box {
    border-radius: 10px;
  }

  .video-modal-close {
    width: 34px;
    height: 34px;
    font-size: 22px;
  }

  .video-modal-desc {
    padding: 10px 12px 0;
    font-size: 13px;
  }
}
</style>
