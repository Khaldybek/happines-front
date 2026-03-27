<template>
  <div>
    <TheHeader />
    <main class="news-article-page">
      <!-- Как в Figma: белая полоса только с крошками под шапкой -->
      <section class="news-breadcrumbs-bar" aria-label="Навигация по разделу">
        <div class="container article-content">
          <nav class="news-breadcrumbs" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="crumb-item">Главная</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <NuxtLink to="/news" class="crumb-item">Новости</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <span class="crumb-item active">{{ articleTitle }}</span>
          </nav>
        </div>
      </section>

      <!-- Серая зона: первым идёт фото, затем заголовок и текст (node 748-14826) -->
      <article class="page-hero-catalog news-article-panel">
        <div class="container article-content">
          <div class="hero-content">
            <div v-if="articleMainImage" class="hero-image-container">
              <img
                :src="articleMainImage"
                :alt="articleTitle"
                class="hero-bg-img"
              >
            </div>

            <h1 class="article-title">{{ articleTitle }}</h1>
            <p v-if="articleDate" class="article-date">{{ articleDate }}</p>
          </div>

          <div v-if="articleIntro" class="article-prose">
            <p class="article-intro">{{ articleIntro }}</p>
          </div>

          <div v-if="articleBetweenImage" class="article-image article-image--between">
            <img :src="articleBetweenImage" :alt="articleTitle">
          </div>

          <div class="article-prose">
            <div v-if="articleSecondHtml" class="article-body" v-html="articleSecondHtml" />
            <div v-else class="article-body">
              <p>Новость пока не содержит полного описания.</p>
            </div>
          </div>
        </div>
      </article>

      <section class="other-news-section">
        <div class="container">
          <div class="other-news-header">
            <h2 class="other-news-title">ДРУГИЕ НОВОСТИ</h2>
            <div class="other-news-nav">
              <button type="button" class="news-nav-btn prev" aria-label="Назад" @click="scrollPrev">
                <img src="/images/1_791.svg" alt="">
              </button>
              <button type="button" class="news-nav-btn next" aria-label="Вперёд" @click="scrollNext">
                <img src="/images/1_796.svg" alt="">
              </button>
            </div>
          </div>
          <div ref="carouselRef" class="other-news-carousel">
            <NuxtLink
              v-for="(item, i) in otherNews"
              :key="item.id || i"
              :to="`/news/${item.id}`"
              class="news-card"
            >
              <div class="news-card-img">
                <img :src="item.main_image || '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png'" :alt="item.title">
              </div>
              <div class="news-card-content">
                <h3>{{ item.title }}</h3>
                <p>{{ excerpt(item) }}</p>
                <span class="news-card-date">{{ formatDate(item.display_date) }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/types/newsPage'

definePageMeta({
  layout: false,
})

const route = useRoute()
const id = computed(() => String(route.params.slug || '').trim())

const { data: articleData } = useNewsItem(id)
const { data: listData } = useNewsPage()

const article = computed<NewsItem | null>(() => articleData.value ?? null)
const otherNews = computed<NewsItem[]>(() => {
  const all = listData.value?.news?.items ?? []
  const currentId = Number.parseInt(id.value, 10)
  return all.filter((x) => x.id !== currentId).slice(0, 6)
})

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '–')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/&amp;/g, '&')
}

function stripHtml(value: string) {
  return decodeHtml(value)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function excerpt(item: NewsItem) {
  const raw = item.first_description || item.second_description || ''
  const txt = stripHtml(raw)
  return txt.length > 160 ? `${txt.slice(0, 157)}…` : txt
}

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

const articleTitle = computed(() => article.value?.title || 'Новость')
const articleDate = computed(() => article.value?.display_date ? formatDate(article.value.display_date) : '')
const articleMainImage = computed(() => article.value?.main_image || '')
const articleBetweenImage = computed(() => article.value?.between_descriptions_image || '')
const articleIntro = computed(() => stripHtml(article.value?.first_description || ''))
const articleSecondHtml = computed(() => (article.value?.second_description || '').trim())

useHead(() => ({
  title: `${articleTitle.value} — Новости — Happiness`,
}))

const carouselRef = ref<HTMLElement | null>(null)
function scrollPrev() {
  if (carouselRef.value) carouselRef.value.scrollBy({ left: -380, behavior: 'smooth' })
}
function scrollNext() {
  if (carouselRef.value) carouselRef.value.scrollBy({ left: 380, behavior: 'smooth' })
}
</script>

<style scoped>
.news-article-page {
  background: #fff;
  min-height: 100vh;
  padding-bottom: 80px;
}

.news-breadcrumbs-bar {
  background: #fff;
}

.news-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 14px;
  padding: 20px 0;
  margin: 0;
}

.news-breadcrumbs .crumb-item {
  color: #282828;
}

.news-breadcrumbs .crumb-item.active {
  color: #7f7f7f;
}

.article-content {
  max-width: none;
  margin: 0 auto;
}

/* Убираем второй внутренний отступ, чтобы блок не "сжимался" по бокам */
.news-article-panel .hero-content {
  padding: 0;
}

.hero-content .article-title:first-child {
  margin-top: 0;
}

.article-title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  color: var(--primary-orange);
  text-align: center;
  margin: 30px 0 16px 0;
  line-height: 1.2;
  text-transform: uppercase;
}

.article-date {
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  color: #666;
  margin: 0 0 28px 0;
}

/* Узкая колонка текста по макету (шире фото по ширине контейнера) */
.article-prose {
  max-width: 760px;
  margin: 0 auto;
  text-align: left;
}

.article-intro {
  font-size: 18px;
  color: #121212;
  line-height: 1.7;
  margin: 0 0 32px 0;
  text-align: left;
}

.article-image {
  margin-bottom: 24px;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
}

.article-image img {
  width: 100%;
  height: auto;
  display: block;
}

.article-image--between {
  margin: 0 auto 28px;
  max-width: 760px;
  width: 100%;
}

.article-images-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 40px;
}

.article-images-row img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 16px;
}

.article-body {
  font-size: 16px;
  color: #121212;
  line-height: 1.7;
  text-align: left;
}

.article-body :deep(p) {
  margin: 0 0 20px 0;
}

.article-body :deep(p:last-child) {
  margin-bottom: 0;
}

.article-highlight {
  font-weight: 600;
  color: var(--primary-orange);
}

.other-news-section {
  background: #f5f5f5;
  padding: 60px 0;
}

.other-news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.other-news-title {
  font-size: 28px;
  font-weight: 700;
  color: #121212;
  margin: 0;
  text-transform: uppercase;
}

.other-news-nav {
  display: flex;
  gap: 12px;
}

.news-nav-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #ddd;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.news-nav-btn.next {
  background: var(--primary-orange);
  border-color: var(--primary-orange);
}

.news-nav-btn img {
  width: 20px;
  height: 20px;
}

.news-nav-btn.next img {
  filter: brightness(0) invert(1);
}

.other-news-carousel {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 8px 0 24px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.other-news-carousel::-webkit-scrollbar {
  display: none;
}

.news-card {
  flex: 0 0 360px;
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  scroll-snap-align: start;
  cursor: pointer;
  transition: box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.news-card:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.news-card:hover .news-card-content h3 {
  color: var(--primary-orange);
}

.news-card-img {
  height: 220px;
  overflow: hidden;
}

.news-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-card-content {
  padding: 24px;
}

.news-card-content h3 {
  font-size: 16px;
  font-weight: 700;
  color: #121212;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  line-height: 1.3;
  transition: color 0.2s;
}

.news-card-content p {
  font-size: 14px;
  color: #121212;
  line-height: 1.5;
  margin: 0 0 16px 0;
}

.news-card-date {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #666;
}

@media (max-width: 768px) {
  .news-breadcrumbs {
    padding: 10px 0;
    font-size: 12px;
    overflow-x: auto;
    white-space: nowrap;
    flex-wrap: nowrap;
    scrollbar-width: none;
  }

  .news-breadcrumbs::-webkit-scrollbar {
    display: none;
  }

  .article-title {
    margin: 22px 0 14px;
  }

  .hero-content .article-title:first-child {
    margin-top: 0;
  }

  .article-images-row {
    grid-template-columns: 1fr;
  }

  .article-prose,
  .article-image--between {
    max-width: 100%;
  }

  .other-news-section {
    padding: 36px 0;
  }

  .other-news-header {
    margin-bottom: 14px;
  }

  .other-news-title {
    font-size: 22px;
  }

  .news-nav-btn {
    width: 40px;
    height: 40px;
  }

  .other-news-carousel {
    gap: 12px;
    padding-bottom: 10px;
  }

  .news-card {
    flex-basis: min(86vw, 320px);
    border-radius: 16px;
  }

  .news-card-img {
    height: 168px;
  }

  .news-card-content {
    padding: 14px;
  }
}

@media (max-width: 480px) {
  .news-article-page {
    padding-bottom: 42px;
  }

  .article-title {
    margin: 14px 0 8px;
    font-size: clamp(22px, 8vw, 28px);
  }

  .article-date {
    font-size: 13px;
    margin-bottom: 14px;
  }

  .article-intro,
  .article-body {
    font-size: 14px;
    line-height: 1.5;
  }

  .article-intro {
    margin-bottom: 14px;
  }

  .article-image--between {
    margin-bottom: 16px;
  }

  .other-news-title {
    font-size: 18px;
  }

  .other-news-nav {
    gap: 8px;
  }

  .news-nav-btn {
    width: 34px;
    height: 34px;
  }

  .news-nav-btn img {
    width: 16px;
    height: 16px;
  }
}
</style>
