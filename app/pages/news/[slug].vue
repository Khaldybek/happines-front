<template>
  <div>
    <TheHeader />
    <main class="news-article-page">
      <section class="breadcrumbs-section">
        <div class="container">
          <nav class="breadcrumbs-list" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="crumb-item">Главная</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <NuxtLink to="/news" class="crumb-item">Новости</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <span class="crumb-item active">{{ article.title }}</span>
          </nav>
        </div>
      </section>

      <article class="article-content">
        <div class="container">
          <h1 class="article-title">{{ article.title }}</h1>
          <p class="article-date">{{ article.date }}</p>
          <p class="article-intro">{{ article.intro }}</p>

          <div class="article-image article-image--full">
            <img :src="article.images[0]" :alt="article.title">
          </div>

          <div class="article-image">
            <img :src="article.images[1]" :alt="article.title">
          </div>

          <div class="article-images-row">
            <img :src="article.images[2]" :alt="article.title">
            <img :src="article.images[3]" :alt="article.title">
          </div>

          <div class="article-body">
            <p>Сиань — древняя столица Китая, один из ключевых пунктов Великого шёлкового пути. Партнёры HAPPINESS увидели терракотовую армию, старинные стены города, оживлённые рынки и храмы. Поездка в Сиань вновь показала: с HAPPINESS мечты становятся реальностью! Компания не только даёт финансовые возможности, но и открывает мир, создаёт моменты счастья и вдохновляет на новые достижения.</p>
            <p>Путешествие с HAPPINESS — это не только экскурсии, но и тёплые встречи, душевные разговоры, моменты, которые сближают. Партнёры делились успехами, строили планы на будущее. Руководство компании было рядом с участниками поездки, поддерживая командный дух.</p>
            <p class="article-highlight">Благодарим каждого участника за энергию, стремление к успеху и веру в наши общие ценности. Впереди – еще больше ярких путешествий, побед и совместных радостей! HAPPINESS – там, где сбываются мечты!</p>
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
              :key="i"
              :to="`/news/${item.slug}`"
              class="news-card"
            >
              <div class="news-card-img">
                <img :src="item.image" :alt="item.title">
              </div>
              <div class="news-card-content">
                <h3>{{ item.title }}</h3>
                <p>{{ item.excerpt }}</p>
                <span class="news-card-date">{{ item.date }}</span>
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
definePageMeta({
  layout: false,
})

const route = useRoute()
const slug = route.params.slug as string

const article = {
  title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.',
  date: '24 декабря 2025',
  intro: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен на путешествие в древний Сиань – город, где история и современность гармонично переплетаются. Вместе с представителями руководства и генеральным директором партнёры отправились в незабываемую поездку, полную открытий, тёплых встреч и вдохновляющих моментов.',
  images: [
    '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png',
    '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png',
    '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png',
    '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png',
  ],
}

const otherNews = [
  { slug: 'partnery-happiness-v-siane-2025', title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен на пут...', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
  { slug: 'partnery-happiness-v-siane-2025', title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен на пут...', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
  { slug: 'partnery-happiness-v-siane-2025', title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен на пут...', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
]

useHead({
  title: `${article.title} — Новости — Happiness`,
})

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
  color: #7f7f7f;
}

.article-content {
  max-width: 900px;
  margin: 0 auto 60px;
}

.article-title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  color: var(--primary-orange);
  text-align: center;
  margin: 0 0 16px 0;
  line-height: 1.2;
  text-transform: uppercase;
}

.article-date {
  text-align: center;
  font-size: 16px;
  color: #666;
  margin: 0 0 32px 0;
}

.article-intro {
  font-size: 18px;
  color: #121212;
  line-height: 1.7;
  margin: 0 0 40px 0;
}

.article-image {
  margin-bottom: 24px;
  border-radius: 16px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: auto;
  display: block;
}

.article-image--full {
  margin-bottom: 32px;
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
}

.article-body p {
  margin: 0 0 20px 0;
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
  .article-images-row {
    grid-template-columns: 1fr;
  }
}
</style>
