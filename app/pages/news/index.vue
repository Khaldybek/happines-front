<template>
  <div>
    <TheHeader />
    <main class="news-list-page">
      <section class="breadcrumbs-section">
        <div class="container">
          <nav class="breadcrumbs-list" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="crumb-item">Главная</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <span class="crumb-item active">Новости</span>
          </nav>
        </div>
      </section>

      <div class="container">
        <h1 class="news-list-title">НОВОСТИ</h1>
        <div class="news-grid">
          <NuxtLink
            v-for="(item, i) in items"
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
        <div class="pagination">
          <button type="button" class="page-btn" aria-label="Назад">‹</button>
          <button v-for="p in 5" :key="p" type="button" class="page-num" :class="{ active: p === 3 }">{{ p }}</button>
          <button type="button" class="page-btn" aria-label="Вперёд">›</button>
        </div>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Новости — Happiness',
})

const items = [
  { slug: 'partnery-happiness-v-siane-2025', title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен на путешествие в древний Сиань…', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
  { slug: 'partnery-happiness-v-siane-2025', title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен…', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
  { slug: 'partnery-happiness-v-siane-2025', title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен…', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
  { slug: 'partnery-happiness-v-siane-2025', title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен…', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
  { slug: 'partnery-happiness-v-siane-2025', title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен…', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
  { slug: 'partnery-happiness-v-siane-2025', title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен…', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
]
</script>

<style scoped>
.news-list-page {
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
}

.crumb-item {
  color: #282828;
}

.crumb-item.active {
  color: #7f7f7f;
}

.news-list-title {
  font-size: 48px;
  font-weight: 700;
  color: var(--primary-orange);
  text-align: center;
  margin: 0 0 50px 0;
  text-transform: uppercase;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-bottom: 50px;
}

.news-card {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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
  height: 280px;
  overflow: hidden;
}

.news-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-card-content {
  padding: 28px;
}

.news-card-content h3 {
  font-size: 18px;
  font-weight: 700;
  color: #121212;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  line-height: 1.3;
  transition: color 0.2s;
}

.news-card-content p {
  font-size: 15px;
  color: #121212;
  line-height: 1.5;
  margin: 0 0 16px 0;
}

.news-card-date {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.page-btn,
.page-num {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-num.active {
  background: var(--primary-green);
  border-color: var(--primary-green);
  color: #fff;
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
