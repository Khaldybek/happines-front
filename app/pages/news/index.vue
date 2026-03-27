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
        <div v-if="totalPages > 1" class="pagination">
          <button type="button" class="page-btn" aria-label="Назад" @click="goToPage(currentPage - 1)">‹</button>
          <button
            v-for="p in pageNumbers"
            :key="p"
            type="button"
            class="page-num"
            :class="{ active: p === currentPage }"
            @click="goToPage(p)"
          >
            {{ p }}
          </button>
          <button type="button" class="page-btn" aria-label="Вперёд" @click="goToPage(currentPage + 1)">›</button>
        </div>
      </div>
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
const router = useRouter()
const { data } = useNewsPage()

const pageData = computed(() => data.value?.news ?? null)
const items = computed<NewsItem[]>(() => pageData.value?.items ?? [])
const pagination = computed(() => pageData.value?.pagination ?? null)

const totalPages = computed(() => pagination.value?.last_page || 1)
const currentPage = computed(() => pagination.value?.current_page || 1)

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
  return txt.length > 170 ? `${txt.slice(0, 167)}…` : txt
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

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  router.push({
    path: route.path,
    query: { ...route.query, page: String(page) },
  })
}

const pageNumbers = computed(() =>
  Array.from({ length: totalPages.value }, (_, i) => i + 1),
)

useHead(() => ({
  title: 'Новости — Happiness',
}))
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
  .news-list-page {
    padding-bottom: 40px;
  }

  .breadcrumbs-section {
    padding: 10px 0;
  }

  .breadcrumbs-list {
    font-size: 12px;
    overflow-x: auto;
    white-space: nowrap;
    flex-wrap: nowrap;
    scrollbar-width: none;
  }

  .breadcrumbs-list::-webkit-scrollbar {
    display: none;
  }

  .news-list-title {
    font-size: clamp(26px, 8vw, 34px);
    margin-bottom: 20px;
  }

  .news-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 22px;
  }

  .news-card {
    border-radius: 16px;
  }

  .news-card-img {
    height: 190px;
  }

  .news-card-content {
    padding: 14px;
  }

  .news-card-content h3 {
    font-size: 15px;
    margin-bottom: 8px;
  }

  .news-card-content p {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .news-card-date {
    font-size: 12px;
  }

  .pagination {
    gap: 6px;
  }

  .page-btn,
  .page-num {
    width: 34px;
    height: 34px;
    font-size: 14px;
  }
}
</style>
