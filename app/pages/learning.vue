<template>
  <div>
    <TheHeader />
    <main class="learning-page">
      <LearningBreadcrumbs />

      <section class="learning-hero">
        <div class="container">
          <div class="hero-image-wrap">
            <img src="/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png" alt="Онлайн обучение" class="hero-image">
          </div>
          <h1 class="learning-title">ОНЛАЙН ОБУЧЕНИЕ</h1>
          <p class="learning-desc">
            Онлайн-обучение открывает доступ к знаниям в удобное для вас время и в любом месте. Осваивайте новые навыки, повышайте квалификацию и развивайтесь в комфортном темпе.
          </p>

          <div class="learning-tabs">
            <button
              type="button"
              class="learning-tab"
              :class="{ 'is-active': activeTab === 'documents' }"
              @click="activeTab = 'documents'"
            >
              ДОКУМЕНТЫ ДЛЯ СКАЧИВАНИЯ
            </button>
            <button
              type="button"
              class="learning-tab"
              :class="{ 'is-active': activeTab === 'video' }"
              @click="activeTab = 'video'"
            >
              ВИДЕОАРХИВ
            </button>
          </div>

          <div class="learning-content-box">
            <!-- Документы -->
            <div v-if="activeTab === 'documents'" class="learning-list learning-documents">
              <div v-for="(doc, i) in documents" :key="i" class="learning-doc-row">
                <span class="doc-icon" aria-hidden="true">
                  <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 4a4 4 0 0 1 4-4h16l12 12v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4z" fill="#DD5F05"/>
                    <path d="M20 0v12h12L20 0z" fill="#DD5F05" fill-opacity="0.7"/>
                    <path d="M8 18h16v2H8v-2zm0 6h16v2H8v-2zm0 6h10v2H8v-2z" fill="#fff"/>
                  </svg>
                </span>
                <span class="doc-title">Lorem Ipsum - это текст-"рыба"</span>
                <button type="button" class="btn-download">
                  <img src="/images/I16_569_132_85696.svg" alt="" class="btn-download-arrow">
                  СКАЧАТЬ
                </button>
              </div>
            </div>
            <!-- Видеоархив -->
            <div v-else class="learning-list learning-videos">
              <div v-for="(video, i) in videos" :key="i" class="learning-video-row">
                <div class="video-thumb-wrap">
                  <img :src="video.thumb" :alt="video.title" class="video-thumb">
                  <span class="video-play-icon" aria-hidden="true">
                    <img src="/images/16_561.svg" alt="">
                  </span>
                </div>
                <p class="video-text">{{ video.text }}</p>
              </div>
            </div>

            <div class="learning-pager">
              <button type="button" class="pager-arrow" aria-label="Предыдущая страница">‹</button>
              <button
                v-for="p in pages"
                :key="p"
                type="button"
                class="pager-item"
                :class="{ 'is-active': p === currentPage }"
                @click="currentPage = p"
              >
                {{ p }}
              </button>
              <button type="button" class="pager-arrow" aria-label="Следующая страница">›</button>
            </div>
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
  title: 'Онлайн обучение — Happiness',
})

const activeTab = ref<'documents' | 'video'>('documents')
const currentPage = ref(3)
const pages = [1, 2, 3, 4, 5]

const documents = Array.from({ length: 10 }, () => ({}))
const videoPlaceholder = '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png'
const videos = Array.from({ length: 5 }, () => ({
  thumb: videoPlaceholder,
  title: 'Видео',
  text: 'Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
}))
</script>

<style scoped>
.learning-page {
  background: #fff;
  padding-bottom: 40px;
}

.breadcrumbs-section {
  padding: 20px 0;
}

.learning-hero {
  padding: 0 0 30px;
}

.hero-image-wrap {
  border-radius: 0 0 24px 24px;
  overflow: hidden;
  margin-bottom: 28px;
}

.hero-image {
  width: 100%;
  height: clamp(220px, 28vw, 390px);
  object-fit: cover;
}

.learning-title {
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 800;
  text-transform: uppercase;
  color: #dd5f05;
  margin: 0 0 16px;
  line-height: 1.1;
  letter-spacing: 0.01em;
}

.learning-desc {
  max-width: 900px;
  font-size: clamp(15px, 1.1vw, 18px);
  line-height: 1.4;
  color: #171717;
  margin: 0 0 28px;
}

.learning-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.learning-tab {
  padding: 12px 24px;
  border-radius: 999px;
  font-size: clamp(13px, 0.9vw, 16px);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  background: transparent;
  border: none;
  color: #7f7f7f;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.learning-tab.is-active {
  background: #8ec44e;
  color: #fff;
}

.learning-content-box {
  background: #b7dd79;
  border-radius: 24px;
  padding: 28px 32px 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* Документы */
.learning-documents {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.learning-doc-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.learning-doc-row:last-of-type {
  border-bottom: none;
}

.doc-icon {
  flex-shrink: 0;
  display: inline-flex;
}

.doc-icon svg {
  width: 32px;
  height: 40px;
}

.doc-title {
  flex: 1;
  font-size: clamp(15px, 1vw, 17px);
  line-height: 1.35;
  color: #1f1f1f;
  min-width: 0;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 999px;
  border: 2px solid #dd5f05;
  background: #fff;
  color: #dd5f05;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.btn-download-arrow {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

/* Видео */
.learning-videos {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.learning-video-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.video-thumb-wrap {
  position: relative;
  flex-shrink: 0;
  width: 160px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  background: #333;
}

.video-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-play-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}

.video-play-icon img {
  width: 48px;
  height: 48px;
  filter: brightness(0) invert(1);
}

.video-text {
  flex: 1;
  margin: 0;
  font-size: clamp(15px, 1vw, 17px);
  line-height: 1.4;
  color: #1f1f1f;
  min-width: 0;
}

/* Пагинация */
.learning-pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.pager-arrow,
.pager-item {
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid #c4c4c4;
  background: #fff;
  color: #7f7f7f;
  font-size: 15px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}

.pager-item.is-active {
  border-color: #8ec44e;
  background: #8ec44e;
  color: #fff;
}

@media (max-width: 768px) {
  .learning-doc-row {
    flex-wrap: wrap;
  }

  .doc-title {
    order: 1;
    width: 100%;
    padding-left: 48px;
  }

  .btn-download {
    margin-left: auto;
  }

  .learning-video-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .video-thumb-wrap {
    width: 100%;
    max-width: 320px;
    height: 180px;
  }
}
</style>
