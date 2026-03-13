<template>
  <section class="news-section">
    <div class="container">
      <div class="news-header">
        <h2 class="news-section-title">НОВОСТИ</h2>
        <div class="news-nav">
          <button type="button" class="news-nav-btn prev" aria-label="Назад" @click="scrollPrev">
            <img src="/images/1_791.svg" alt="">
          </button>
          <button type="button" class="news-nav-btn next" aria-label="Вперёд" @click="scrollNext">
            <img src="/images/1_796.svg" alt="">
          </button>
        </div>
      </div>
      <div ref="carouselRef" class="news-carousel">
        <NuxtLink v-for="(item, i) in items" :key="i" :to="`/news/${item.slug}`" class="news-item">
          <div class="news-img">
            <img :src="item.image" :alt="item.title">
          </div>
          <div class="news-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.excerpt }}</p>
            <span class="news-date">{{ item.date }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const carouselRef = ref<HTMLElement | null>(null)
const items = [
  { slug: 'partnery-happiness-v-siane-2025', title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен…', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
  { slug: 'partnery-happiness-v-siane-2025', title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен на путешествие в древний Сиань…', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
  { slug: 'partnery-happiness-v-siane-2025', title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен…', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
]
function scrollPrev() {
  if (carouselRef.value) carouselRef.value.scrollBy({ left: -380, behavior: 'smooth' })
}
function scrollNext() {
  if (carouselRef.value) carouselRef.value.scrollBy({ left: 380, behavior: 'smooth' })
}
</script>

<style scoped>
.news-section {
  padding: 100px 0;
  background-color: #77B341;
}

.news-section-title {
  font-size: 48px;
  font-weight: 800;
  text-transform: uppercase;
  text-align: left;
  color: #2d5a27;
  margin: 0;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.news-nav {
  display: flex;
  gap: 12px;
}

.news-nav-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--primary-orange, #DD5F05);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.news-nav-btn img {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}

.news-carousel {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 8px 0 24px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.news-carousel::-webkit-scrollbar {
  display: none;
}

.news-item {
  flex: 0 0 360px;
  background: #cbe3b3;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  scroll-snap-align: start;
  cursor: pointer;
  transition: background 0.25s, box-shadow 0.25s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.news-item:hover {
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.news-item:hover .news-content h3 {
  color: var(--primary-orange, #e28133);
}

.news-img {
  height: 220px;
  overflow: hidden;
}

.news-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.news-item:hover .news-img img {
  opacity: 1;
}

.news-content {
  padding: 24px;
  text-align: left;
}

.news-content h3 {
  font-size: 16px;
  font-weight: 700;
  color: #121212;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  line-height: 1.3;
  transition: color 0.2s;
}

.news-content p {
  font-size: 14px;
  font-weight: 400;
  color: #121212;
  line-height: 1.5;
  margin: 0 0 16px 0;
}

.news-date {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #121212;
}
</style>
