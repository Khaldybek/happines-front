<template>
  <div class="gallery-page-wrapper" :class="{ 'is-video-modal-open': videoModalOpen }">
    <TheHeader />
    <main class="gallery-page">
      <GalleryBreadcrumbs />

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

      <!-- Фотогалерея: блоки по категориям -->
      <section v-if="activeTab === 'photo'" class="gallery-blocks">
        <div class="container">
          <!-- 1. Путешествия - изображения слева, синий блок справа -->
          <div class="gallery-row gallery-row--travel">
            <div class="gallery-row-images">
              <div class="gallery-img gallery-img--large">
                <img src="/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png" alt="Путешествия">
              </div>
              <div class="gallery-img-wrap">
                <div class="gallery-img">
                  <img src="/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png" alt="">
                </div>
                <div class="gallery-img">
                  <img src="/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png" alt="">
                </div>
              </div>
            </div>
            <div class="gallery-block gallery-block--blue">
              <span class="gallery-block-hashtag">#ПУТЕШЕСТВИЯ</span>
              <p class="gallery-block-desc">
                Путешествия С HAPPINESS – Фото И Видео. Один Мир, Одна Мечта, Одна Команда. Присоединяйтесь!
              </p>
              <NuxtLink to="/gallery/travel" class="gallery-block-btn">
                ПОДРОБНЕЕ
                <img src="/images/I16_569_132_85696.svg" alt="" class="gallery-block-btn-arrow">
              </NuxtLink>
            </div>
          </div>

          <!-- 2. Обучения и Мероприятия - оранжевый блок слева, изображения справа -->
          <div class="gallery-row gallery-row--training">
            <div class="gallery-block gallery-block--orange">
              <span class="gallery-block-hashtag">#ОБУЧЕНИЯ И МЕРОПРИЯТИЯ</span>
              <p class="gallery-block-desc">
                Обучение В HAPPINESS – Фото И Видео. Один Мир, Одна Мечта, Одна Команда. Присоединяйтесь!
              </p>
              <NuxtLink to="/gallery/training" class="gallery-block-btn">
                ПОДРОБНЕЕ
                <img src="/images/I16_569_132_85696.svg" alt="" class="gallery-block-btn-arrow">
              </NuxtLink>
            </div>
            <div class="gallery-row-images">
              <div class="gallery-img">
                <img src="/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png" alt="Обучение">
              </div>
              <div class="gallery-img">
                <img src="/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png" alt="">
              </div>
            </div>
          </div>

          <!-- 3. Годовщины - изображения слева, зелёный блок справа -->
          <div class="gallery-row gallery-row--anniversary">
            <div class="gallery-row-images gallery-row-images--single">
              <div class="gallery-img gallery-img--large">
                <img src="/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png" alt="Годовщины">
              </div>
            </div>
            <div class="gallery-block gallery-block--green">
              <span class="gallery-block-hashtag">#ГОДОВЩИНЫ</span>
              <p class="gallery-block-desc">
                Годовщины Компании HAPPINESS - Фото И Видео. Один Мир, Одна Мечта, Одна Команда! Присоединяйтесь!
              </p>
              <NuxtLink to="/gallery/anniversary" class="gallery-block-btn">
                ПОДРОБНЕЕ
                <img src="/images/I16_569_132_85696.svg" alt="" class="gallery-block-btn-arrow">
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Видеогалерея: сетка видео с пагинацией -->
      <section v-else class="gallery-video-section">
        <div class="container">
          <div class="video-gallery-grid">
            <article
              v-for="(video, i) in displayedVideos"
              :key="i"
              class="video-gallery-card"
            >
              <div class="video-gallery-thumb" @click="onVideoClick(video)">
                <img :src="video.thumb" :alt="video.title" class="video-gallery-thumb-img">
                <span class="video-gallery-overlay-title">{{ video.title }}</span>
                <span class="video-gallery-play" aria-hidden="true"></span>
                <span class="video-gallery-logo">HAPPINESS</span>
              </div>
              <p class="video-gallery-desc">{{ video.description }}</p>
            </article>
          </div>
          <div class="gallery-video-pager">
            <button type="button" class="pager-arrow" aria-label="Предыдущая страница" @click="videoPrevPage">‹</button>
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
            <button type="button" class="pager-arrow" aria-label="Следующая страница" @click="videoNextPage">›</button>
          </div>
        </div>
      </section>

      <!-- Модалка видео: чёрный фон 60%, зад чуть виден -->
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
            <button type="button" class="video-modal-close" aria-label="Закрыть" @click="closeVideoModal">×</button>
            <div v-if="selectedVideo" class="video-modal-content">
              <div class="video-modal-player">
                <img :src="selectedVideo.thumb" :alt="selectedVideo.title" class="video-modal-thumb">
                <span class="video-modal-play" aria-hidden="true"></span>
                <span class="video-modal-title-overlay">{{ selectedVideo.title }}</span>
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
definePageMeta({
  layout: false,
})

interface VideoItem {
  title: string
  thumb: string
  description: string
}

useHead({
  title: 'Галерея — Happiness',
})

const activeTab = ref<'photo' | 'video'>('photo')

const videoCurrentPage = ref(3)
const videoPerPage = 6
const videoTotalPages = 5

const videoItems = [
  {
    title: 'Путешествие в Сиань 2025',
    thumb: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png',
    description: 'ВИДЕО О ПРОДУКЦИИ NEW',
  },
  {
    title: 'Путешествие в Сиань 2025',
    thumb: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
    description: 'ВИДЕО О ПРОДУКЦИИ NEW ЗУБНАЯ ПАСТА HAPPINESS ДВОЙНОЙ ЭФФЕКТ «СИЯЮЩИЕ ЗУБЫ И ЗДОРОВЫЕ ДЕСНЫ»',
  },
  {
    title: 'Путешествие в Сиань 2025',
    thumb: '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png',
    description: 'ВИДЕО О ПРОДУКЦИИ NEW',
  },
  {
    title: 'Путешествие в Сиань 2025',
    thumb: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png',
    description: 'ВИДЕО О ПРОДУКЦИИ NEW ЗУБНАЯ ПАСТА HAPPINESS ДВОЙНОЙ ЭФФЕКТ «СИЯЮЩИЕ ЗУБЫ И ЗДОРОВЫЕ ДЕСНЫ»',
  },
  {
    title: 'Путешествие в Сиань 2025',
    thumb: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
    description: 'ВИДЕО О ПРОДУКЦИИ NEW',
  },
  {
    title: 'Путешествие в Сиань 2025',
    thumb: '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png',
    description: 'ВИДЕО О ПРОДУКЦИИ NEW ЗУБНАЯ ПАСТА HAPPINESS ДВОЙНОЙ ЭФФЕКТ «СИЯЮЩИЕ ЗУБЫ И ЗДОРОВЫЕ ДЕСНЫ»',
  },
]

const allVideos = computed(() => {
  const list = [...videoItems]
  while (list.length < videoPerPage * videoTotalPages) list.push(...videoItems)
  return list
})

const displayedVideos = computed(() => {
  const start = (videoCurrentPage.value - 1) * videoPerPage
  return allVideos.value.slice(start, start + videoPerPage)
})

function videoPrevPage() {
  if (videoCurrentPage.value > 1) videoCurrentPage.value--
}

function videoNextPage() {
  if (videoCurrentPage.value < videoTotalPages) videoCurrentPage.value++
}

const videoModalOpen = ref(false)
const selectedVideo = ref<VideoItem | null>(null)

function onVideoClick(video: VideoItem) {
  selectedVideo.value = video
  videoModalOpen.value = true
}

function closeVideoModal() {
  videoModalOpen.value = false
  selectedVideo.value = null
}

function onVideoKeydown(e: KeyboardEvent) {
  if (!videoModalOpen.value) return
  if (e.key === 'Escape') closeVideoModal()
}

onMounted(() => {
  window.addEventListener('keydown', onVideoKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onVideoKeydown)
})
</script>

<style scoped>
.gallery-page {
  background: #fff;
  padding-bottom: 60px;
}

.gallery-intro {
  padding: 0 0 40px;
}

.gallery-title {
  margin: 0 0 28px;
  text-align: center;
  font-size: clamp(36px, 4.5vw, 56px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #dd5f05;
}

.gallery-tabs {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.gallery-tab {
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  background: #fff;
  border: 1px solid #e0e0e0;
  color: #1a1a1a;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.gallery-tab.is-active {
  background: #8bc34a;
  border-color: #8bc34a;
  color: #fff;
}

.gallery-blocks {
  padding: 0 0 20px;
}

.gallery-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: stretch;
  margin-bottom: 32px;
}

.gallery-row-images {
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
}

.gallery-row-images .gallery-img--large {
  grid-column: 1;
}

.gallery-row-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.gallery-img-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.gallery-img {
  border-radius: 16px;
  overflow: hidden;
  background: #f0f0f0;
}

.gallery-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-img--large {
  min-height: 200px;
}

.gallery-img--large img {
  height: 220px;
}

.gallery-img:not(.gallery-img--large) img {
  height: 140px;
}

.gallery-row-images--single .gallery-img--large img {
  height: 260px;
}

.gallery-block {
  border-radius: 20px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.gallery-block--blue {
  background: #4b93d7;
}

.gallery-block--orange {
  background: #dd5f05;
}

.gallery-block--green {
  background: #6b9b3c;
}

.gallery-block-hashtag {
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #fff;
  margin-bottom: 16px;
}

.gallery-block-desc {
  margin: 0 0 24px;
  font-size: 15px;
  line-height: 1.5;
  color: #fff;
  flex: 1;
}

.gallery-block-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  align-self: flex-start;
  padding: 12px 24px;
  border-radius: 12px;
  background: #9ccc65;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: background 0.2s, opacity 0.2s;
}

.gallery-block-btn:hover {
  background: #8bc34a;
  opacity: 1;
}

.gallery-block-btn-arrow {
  width: 18px;
  height: 18px;
  filter: brightness(0) invert(1);
}

/* Видеогалерея */
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
  background: #333;
  cursor: pointer;
  margin-bottom: 14px;
}

.video-gallery-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-gallery-overlay-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(16px, 1.2vw, 20px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #ffd54f;
  text-align: center;
  text-shadow: 0 0 2px #fff, 0 0 4px #fff, 1px 1px 2px #000;
  padding: 0 12px;
  z-index: 2;
}

.video-gallery-play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #1e90ff;
  z-index: 1;
}

.video-gallery-play::before {
  content: "";
  position: absolute;
  left: 54%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-left: 18px solid #fff;
  border-top: 11px solid transparent;
  border-bottom: 11px solid transparent;
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

.gallery-video-pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.gallery-video-pager .pager-arrow,
.gallery-video-pager .pager-item {
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

.gallery-video-pager .pager-item.is-active {
  border-color: #8bc34a;
  background: #8bc34a;
  color: #fff;
}

@media (max-width: 900px) {
  .gallery-row {
    grid-template-columns: 1fr;
  }

  .gallery-row--training .gallery-block {
    order: 1;
  }

  .gallery-row--training .gallery-row-images {
    order: 2;
  }
}

@media (max-width: 700px) {
  .video-gallery-grid {
    grid-template-columns: 1fr;
  }
}

/* Модалка видео: оверлей #000 60%, зад чуть виден; страница за оверлеем — ч/б */
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
  background: rgba(0, 0, 0, 0.6);
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
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
  position: relative;
  aspect-ratio: 16 / 9;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-modal-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video-modal-play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E") center/60% no-repeat;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E") center/60% no-repeat;
  pointer-events: none;
}
.video-modal-title-overlay {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0,0,0,0.6);
}
.video-modal-desc {
  padding: 1rem 1.5rem 0;
  margin: 0;
  font-size: 0.9rem;
  color: #333;
  line-height: 1.4;
}
</style>
