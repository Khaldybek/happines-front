<template>
  <section class="news-section">
    <div class="container">
      <div class="news-header">
        <h2 class="news-section-title">{{ sectionTitle }}</h2>
        <div class="news-nav">
          <button type="button" class="news-nav-btn prev" aria-label="Назад" @click="scrollPrev">
            <span class="news-nav-arrow" aria-hidden="true"></span>
          </button>
          <button type="button" class="news-nav-btn next" aria-label="Вперёд" @click="scrollNext">
            <span class="news-nav-arrow" aria-hidden="true"></span>
          </button>
        </div>
      </div>
      <div ref="carouselRef" class="news-carousel">
        <NuxtLink v-for="(item, i) in items" :key="i" :to="`/news/${item.id}`" class="news-item">
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
import type { NewsItem } from '~/types/newsPage'

const carouselRef = ref<HTMLElement | null>(null)

const props = defineProps<{
  title?: string | null
  newsItems?: NewsItem[]
}>()

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

const sectionTitle = computed(() => String(props.title || '').trim().toUpperCase() || 'НОВОСТИ')

const fallbackItems = [
  { id: 2, title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен…', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
  { id: 3, title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен на путешествие в древний Сиань…', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
  { id: 4, title: 'ПАРТНЕРЫ HAPPINESS В СИАНЕ 2025Г.', excerpt: '2025 год уже стал для партнеров HAPPINESS по-настоящему ярким и запоминающимся! 21 партнёр успешно завершили промоушен…', date: '24 декабря 2025', image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png' },
]

const items = computed(() => {
  const fromApi = props.newsItems?.map((item) => ({
    id: item.id,
    title: item.title,
    excerpt: excerpt(item),
    date: formatDate(item.display_date),
    image: item.main_image || '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png',
  }))
  return fromApi?.length ? fromApi : fallbackItems
})
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
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid #e28133;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.news-nav-btn.next {
  background: var(--primary-orange, #DD5F05);
  border-color: var(--primary-orange, #DD5F05);
}

.news-nav-arrow {
  width: 12px;
  height: 12px;
  border-top: 2px solid #e28133;
  border-right: 2px solid #e28133;
  display: block;
}

.news-nav-btn.prev .news-nav-arrow {
  transform: rotate(-135deg) translate(-1px, -1px);
}

.news-nav-btn.next .news-nav-arrow {
  transform: rotate(45deg) translate(-1px, 1px);
  border-color: #fff;
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
  flex: 0 0 430px;
  min-height: 420px;
  background: #cbe3b3;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: none;
  scroll-snap-align: start;
  cursor: pointer;
  transition: background 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
}

.news-item:hover,
.news-item:focus-visible {
  background: #ffffff;
  box-shadow: 0 14px 30px rgba(39, 50, 34, 0.2);
  transform: translateY(-2px);
}

.news-item:hover .news-content h3,
.news-item:focus-visible .news-content h3 {
  color: var(--primary-orange, #e28133);
}

.news-img {
  height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-12px);
  transition: height 0.34s cubic-bezier(.2,.7,.2,1), opacity 0.24s ease, transform 0.34s cubic-bezier(.2,.7,.2,1);
}

.news-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-content {
  padding: 30px 28px 24px;
  text-align: left;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.news-item:hover .news-img,
.news-item:focus-visible .news-img {
  height: 240px;
  opacity: 1;
  transform: translateY(0);
}

.news-content h3 {
  font-size: 38px;
  font-weight: 800;
  color: #121212;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  line-height: 1.12;
  transition: color 0.22s ease;
}

.news-content p {
  font-size: 36px;
  font-weight: 500;
  color: #263124;
  line-height: 1.22;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-date {
  display: block;
  margin-top: auto;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #293327;
}

.news-item:hover .news-content h3,
.news-item:focus-visible .news-content h3 {
  font-size: 26px;
  margin-bottom: 12px;
}

.news-item:hover .news-content p,
.news-item:focus-visible .news-content p {
  font-size: 18px;
  line-height: 1.32;
  -webkit-line-clamp: 4;
}

.news-item:hover .news-date,
.news-item:focus-visible .news-date {
  font-size: 28px;
  color: #232323;
}

@media (max-width: 1200px) {
  .news-item {
    flex-basis: 380px;
    min-height: 390px;
  }

  .news-content h3 {
    font-size: 30px;
  }

  .news-content p {
    font-size: 26px;
  }

  .news-date {
    font-size: 19px;
  }
}

@media (max-width: 800px) {
  .news-section {
    padding: 70px 0;
  }

  .news-header {
    margin-bottom: 28px;
  }

  .news-item {
    flex-basis: 82%;
    min-height: 380px;
    border-radius: 24px;
  }

  .news-img {
    transition-duration: 0.28s;
  }

  .news-item:hover .news-img,
  .news-item:focus-visible .news-img {
    height: 180px;
  }

  .news-content {
    padding: 22px 18px 18px;
  }

  .news-content h3,
  .news-item:hover .news-content h3,
  .news-item:focus-visible .news-content h3 {
    font-size: 20px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .news-content p,
  .news-item:hover .news-content p,
  .news-item:focus-visible .news-content p {
    font-size: 14px;
    line-height: 1.35;
    -webkit-line-clamp: 4;
  }

  .news-date,
  .news-item:hover .news-date,
  .news-item:focus-visible .news-date {
    font-size: 14px;
  }
}
</style>
