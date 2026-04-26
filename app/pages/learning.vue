<template>
  <div>
    <TheHeader />
    <main class="learning-page">
      <section class="page-hero-catalog">
        <div class="container">
          <LearningBreadcrumbs />

          <div v-if="pending" class="hero-content learning-skeleton" aria-busy="true">
            <div class="sk-hero" />
            <div class="sk-title" />
            <div v-for="n in 4" :key="n" class="sk-line" />
          </div>

          <p v-else-if="!payload" class="learning-error" role="alert">
            Не удалось загрузить страницу. Попробуйте позже.
          </p>

          <template v-else>
            <div class="hero-content">
              <div class="hero-image-container">
                <img
                  :src="payload.image_url"
                  :alt="payload.main_title"
                  class="hero-bg-img"
                >
              </div>
              <h1 class="learning-title">{{ payload.main_title }}</h1>
              <div class="learning-desc learning-prose" v-html="payload.description" />

              <p v-if="!payload.authenticated" class="learning-guest-hint">
                <NuxtLink to="/login">Войдите</NuxtLink>, чтобы открыть видеоархив и документы для скачивания.
              </p>

              <template v-else>
                <div v-if="hasDocuments || hasVideos" class="learning-tabs">
                  <button
                    v-if="hasDocuments"
                    type="button"
                    class="learning-tab"
                    :class="{ 'is-active': activeTab === 'documents' }"
                    @click="activeTab = 'documents'"
                  >
                    ДОКУМЕНТЫ ДЛЯ СКАЧИВАНИЯ
                  </button>
                  <button
                    v-if="hasVideos"
                    type="button"
                    class="learning-tab"
                    :class="{ 'is-active': activeTab === 'video' }"
                    @click="activeTab = 'video'"
                  >
                    ВИДЕОАРХИВ
                  </button>
                </div>
              </template>
            </div>

            <div v-if="payload.authenticated && (hasDocuments || hasVideos)" class="learning-content-box">
              <div v-if="activeTab === 'documents' && hasDocuments" class="learning-list learning-documents">
                <div v-for="doc in sortedDocuments" :key="doc.id" class="doc-group">
                  <h3 v-if="doc.title?.trim()" class="doc-group-title">{{ doc.title }}</h3>
                  <div
                    v-for="file in doc.files"
                    :key="file.id"
                    class="learning-doc-row"
                  >
                    <span class="doc-icon" aria-hidden="true">
                      <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 4a4 4 0 0 1 4-4h16l12 12v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4z" fill="#DD5F05" />
                        <path d="M20 0v12h12L20 0z" fill="#DD5F05" fill-opacity="0.7" />
                        <path d="M8 18h16v2H8v-2zm0 6h16v2H8v-2zm0 6h10v2H8v-2z" fill="#fff" />
                      </svg>
                    </span>
                    <span class="doc-title">{{ file.name }}</span>
                    <a
                      :href="file.file_url"
                      class="btn-download"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/images/I16_569_132_85696.svg" alt="" class="btn-download-arrow">
                      СКАЧАТЬ
                    </a>
                  </div>
                </div>
              </div>

              <div v-else-if="activeTab === 'video' && hasVideos" class="learning-list learning-videos">
                <a
                  v-for="video in sortedVideos"
                  :key="video.id"
                  :href="video.video_url"
                  class="learning-video-row learning-video-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div class="video-thumb-wrap">
                    <div class="video-thumb-placeholder" aria-hidden="true" />
                    <span class="video-play-icon" aria-hidden="true">
                      <img src="/images/16_561.svg" alt="">
                    </span>
                  </div>
                  <p class="video-text">{{ video.name }}</p>
                </a>
              </div>

              <p v-else class="learning-tab-empty">В этом разделе пока нет материалов.</p>
            </div>
          </template>
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type {
  OnlineLearningDocument,
  OnlineLearningPayload,
  OnlineLearningVideo,
} from '~/types/onlineLearningPage'

definePageMeta({
  layout: false,
})

const { data, pending } = useOnlineLearningPage()

const payload = computed<OnlineLearningPayload | null>(() => data.value?.online_learning ?? null)

const sortedVideos = computed<OnlineLearningVideo[]>(() => {
  const v = payload.value?.videos ?? []
  return [...v].sort((a, b) => a.position - b.position)
})

const sortedDocuments = computed(() => {
  const docs = payload.value?.documents ?? []
  return [...docs]
    .sort((a, b) => a.position - b.position)
    .map((doc: OnlineLearningDocument) => ({
      ...doc,
      files: [...(doc.files ?? [])].sort((a, b) => a.position - b.position),
    }))
    .filter(d => d.files.length > 0)
})

const hasVideos = computed(() => sortedVideos.value.length > 0)
const hasDocuments = computed(() => sortedDocuments.value.length > 0)

const activeTab = ref<'documents' | 'video'>('documents')

watch(
  [hasDocuments, hasVideos, () => payload.value?.authenticated],
  () => {
    if (!payload.value?.authenticated) return
    if (hasDocuments.value && !hasVideos.value) activeTab.value = 'documents'
    else if (!hasDocuments.value && hasVideos.value) activeTab.value = 'video'
    else if (activeTab.value === 'documents' && !hasDocuments.value && hasVideos.value) {
      activeTab.value = 'video'
    }
    else if (activeTab.value === 'video' && !hasVideos.value && hasDocuments.value) {
      activeTab.value = 'documents'
    }
  },
  { immediate: true },
)

const headTitle = computed(() => {
  const t = payload.value?.main_title?.trim()
  return t ? `${t} — Happiness` : 'Онлайн обучение — Happiness'
})

useHead({
  title: () => headTitle.value,
})
</script>

<style scoped>
.learning-page {
  background: #fff;
  padding-bottom: 40px;
}

.learning-skeleton {
  padding: 20px 0 40px;
}

.sk-hero {
  height: 220px;
  border-radius: 16px;
  margin-bottom: 24px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: sk-shimmer 1.2s ease-in-out infinite;
}

.sk-title {
  height: 48px;
  width: 70%;
  border-radius: 8px;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: sk-shimmer 1.2s ease-in-out infinite;
}

.sk-line {
  height: 14px;
  border-radius: 4px;
  margin-bottom: 10px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: sk-shimmer 1.2s ease-in-out infinite;
}

@keyframes sk-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.learning-error {
  text-align: center;
  padding: 40px 16px;
  color: #666;
  font-size: 17px;
}

.learning-title {
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 800;
  text-transform: uppercase;
  color: #dd5f05;
  margin: 30px 0 18px;
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

.learning-prose :deep(p) {
  margin: 0 0 12px;
}

.learning-prose :deep(p:last-child) {
  margin-bottom: 0;
}

.learning-prose :deep(ul),
.learning-prose :deep(ol) {
  margin: 0 0 12px;
  padding-left: 1.25rem;
}

.learning-prose :deep(a) {
  color: #dd5f05;
  text-decoration: underline;
}

.learning-guest-hint {
  max-width: 900px;
  margin: 0 0 8px;
  font-size: 16px;
  line-height: 1.45;
  color: #444;
}

.learning-guest-hint a {
  color: #dd5f05;
  font-weight: 700;
  text-decoration: underline;
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
  transition:
    background 0.2s,
    color 0.2s;
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

.learning-tab-empty {
  margin: 0;
  text-align: center;
  font-size: 16px;
  color: #333;
}

/* Документы */
.learning-documents {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.doc-group {
  margin-bottom: 8px;
}

.doc-group:last-child {
  margin-bottom: 0;
}

.doc-group-title {
  margin: 20px 0 8px;
  font-size: 17px;
  font-weight: 700;
  color: #1a1a1a;
}

.doc-group:first-child .doc-group-title {
  margin-top: 0;
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
  text-decoration: none;
}

.btn-download:hover {
  background: #fff5ed;
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

.learning-video-link {
  text-decoration: none;
  color: inherit;
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

.video-thumb-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4a6a3a 0%, #2d4a22 100%);
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

.learning-video-link:hover .video-text {
  color: #dd5f05;
}

@media (max-width: 768px) {
  .learning-title {
    margin: 22px 0 14px;
  }

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

@media (max-width: 600px) {
  .learning-page {
    padding-bottom: 24px;
  }

  .learning-title {
    margin: 14px 0 10px;
    font-size: clamp(24px, 8.5vw, 30px);
  }

  .learning-desc {
    margin-bottom: 14px;
    font-size: 14px;
    line-height: 1.35;
  }

  .learning-guest-hint {
    font-size: 14px;
  }

  .learning-tabs {
    gap: 8px;
    margin-bottom: 12px;
  }

  .learning-tab {
    padding: 9px 14px;
    font-size: 12px;
  }

  .learning-content-box {
    border-radius: 16px;
    padding: 14px 12px 16px;
  }

  .learning-documents,
  .learning-videos {
    gap: 10px;
  }

  .learning-doc-row {
    gap: 10px;
    padding: 8px 0;
  }

  .doc-icon svg {
    width: 26px;
    height: 34px;
  }

  .doc-title {
    padding-left: 36px;
    font-size: 14px;
  }

  .btn-download {
    width: 100%;
    justify-content: center;
    padding: 9px 14px;
    font-size: 12px;
  }

  .learning-video-row {
    gap: 10px;
  }

  .video-thumb-wrap {
    max-width: 100%;
    height: 150px;
    border-radius: 10px;
  }

  .video-play-icon img {
    width: 38px;
    height: 38px;
  }

  .video-text {
    font-size: 14px;
    line-height: 1.35;
  }
}
</style>
