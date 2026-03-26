<template>
  <div>
    <TheHeader />
    <main class="cat-page">

      <!-- Хлебные крошки -->
      <nav class="breadcrumbs" aria-label="Хлебные крошки">
        <div class="container">
          <ul class="breadcrumbs-list">
            <li><NuxtLink to="/">Главная</NuxtLink></li>
            <li aria-hidden="true"><img src="/images/16_552.svg" alt=""></li>
            <li><NuxtLink to="/gallery">Галерея</NuxtLink></li>
            <li aria-hidden="true"><img src="/images/16_552.svg" alt=""></li>
            <li class="current">{{ categoryTitle }}</li>
          </ul>
        </div>
      </nav>

      <!-- Загрузка -->
      <div v-if="pageStatus === 'loading'" class="cat-status">
        <p>Загрузка…</p>
      </div>

      <!-- Категория не найдена -->
      <div v-else-if="pageStatus === 'not-found'" class="cat-status">
        <h1 class="cat-title">Категория не найдена</h1>
        <NuxtLink to="/gallery" class="cat-back-link">← Вернуться в галерею</NuxtLink>
      </div>

      <!-- Ошибка загрузки -->
      <div v-else-if="pageStatus === 'error'" class="cat-status">
        <h1 class="cat-title">Не удалось загрузить</h1>
        <NuxtLink to="/gallery" class="cat-back-link">← Вернуться в галерею</NuxtLink>
      </div>

      <!-- Контент -->
      <template v-else>
        <div class="cat-header">
          <div class="container">
            <h1 class="cat-title">{{ categoryTitle }}</h1>
          </div>
        </div>

        <section class="cat-events">
          <div class="container">
            <p v-if="!eventItems.length" class="cat-empty">
              В этой категории пока нет событий.
            </p>
            <template v-else>
              <div class="events-grid">
                <NuxtLink
                  v-for="item in eventItems"
                  :key="item.id"
                  :to="{ path: `/gallery/${encodeURIComponent(categoryParam)}/${item.id}`, query: { title: item.title } }"
                  class="event-link"
                >
                  <article class="event-card">
                    <div class="event-cover">
                      <img :src="item.cover_image" :alt="item.title">
                    </div>
                    <div class="event-body">
                      <p class="event-title">{{ item.title }}</p>
                    </div>
                  </article>
                </NuxtLink>
              </div>

              <div v-if="pagination && pagination.last_page > 1" class="cat-pager">
                <button
                  type="button"
                  class="pager-arrow"
                  aria-label="Предыдущая страница"
                  :disabled="pagination.current_page <= 1"
                  @click="goToPage(pagination.current_page - 1)"
                >
                  ‹
                </button>
                <button
                  v-for="p in pagination.last_page"
                  :key="p"
                  type="button"
                  class="pager-item"
                  :class="{ 'is-active': p === pagination.current_page }"
                  @click="goToPage(p)"
                >
                  {{ p }}
                </button>
                <button
                  type="button"
                  class="pager-arrow"
                  aria-label="Следующая страница"
                  :disabled="pagination.current_page >= pagination.last_page"
                  @click="goToPage(pagination.current_page + 1)"
                >
                  ›
                </button>
              </div>
            </template>
          </div>
        </section>
      </template>

    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import {
  resolvePhotoGalleryApiSlug,
  resolvePhotoGalleryCategory,
} from '~/utils/resolvePhotoGalleryCategory'

definePageMeta({ layout: false })

const route = useRoute()
const router = useRouter()

const categoryParam = computed(() => String(route.params.category || '').trim())

const { data: photoGalleryData, pending: categoriesPending } = usePhotoGalleryPage()

const eventsApiSlug = computed(() =>
  resolvePhotoGalleryApiSlug(categoryParam.value, photoGalleryData.value?.photo_gallery?.categories),
)

const { data: eventsData, pending: eventsPending } = usePhotoGalleryCategoryEvents(eventsApiSlug)

// ─── Статус страницы ──────────────────────────────────────────────────────────

type PageStatus = 'loading' | 'not-found' | 'error' | 'ok'

const pageStatus = computed<PageStatus>(() => {
  const categoriesReady = !categoriesPending.value
  if (!categoriesReady) return 'loading'
  if (eventsApiSlug.value == null) return 'not-found'
  if (eventsPending.value && !eventsData.value) return 'loading'
  if (!eventsData.value?.photo_gallery) return 'error'
  return 'ok'
})

// ─── Данные ───────────────────────────────────────────────────────────────────

const categoryTitle = computed(() => {
  const fromApi = eventsData.value?.photo_gallery?.category?.hashtag
  if (fromApi) return String(fromApi).replace(/^#\s*/, '').trim().toUpperCase()
  const c = resolvePhotoGalleryCategory(categoryParam.value, photoGalleryData.value?.photo_gallery?.categories)
  if (c) return (c.hashtag || '').replace(/^#\s*/, '').trim().toUpperCase() || c.slug.toUpperCase()
  return categoryParam.value.toUpperCase()
})

const eventItems = computed(() =>
  [...(eventsData.value?.photo_gallery?.events?.items ?? [])].sort((a, b) => a.position - b.position),
)

const pagination = computed(() => eventsData.value?.photo_gallery?.events?.pagination ?? null)

useHead({
  title: () =>
    pageStatus.value === 'not-found'
      ? 'Галерея — Happiness'
      : `${categoryTitle.value || 'Галерея'} — Happiness`,
})

function goToPage(p: number) {
  const last = pagination.value?.last_page ?? 1
  if (p < 1 || p > last) return
  router.push({
    path: route.path,
    query: { ...route.query, page: p <= 1 ? undefined : String(p) },
  })
}
</script>

<style scoped>
.cat-page {
  background: #fff;
  padding-bottom: 60px;
}

/* ─── Хлебные крошки ─────────────────────────────────────────────────────── */

.breadcrumbs {
  padding: 20px 0;
}

.breadcrumbs-list {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.breadcrumbs-list a {
  color: #282828;
  text-decoration: none;
}

.breadcrumbs-list a:hover {
  text-decoration: underline;
}

.breadcrumbs-list .current {
  color: #1a1a1a;
  font-weight: 600;
}

/* ─── Статусы (загрузка / ошибка) ────────────────────────────────────────── */

.cat-status {
  padding: 60px 16px;
  text-align: center;
}

.cat-back-link {
  display: inline-block;
  margin-top: 16px;
  color: #dd5f05;
  font-weight: 600;
  text-decoration: none;
}

.cat-back-link:hover {
  text-decoration: underline;
}

/* ─── Заголовок категории ────────────────────────────────────────────────── */

.cat-header {
  padding: 0 0 36px;
}

.cat-title {
  margin: 0;
  text-align: center;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #dd5f05;
}

/* ─── Сетка событий ──────────────────────────────────────────────────────── */

.cat-events {
  padding: 0 0 50px;
}

.cat-empty {
  text-align: center;
  padding: 32px 16px;
  color: #555;
  font-size: 16px;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.event-link {
  text-decoration: none;
  color: inherit;
  display: block;
  min-width: 0;
}

.event-card {
  border-radius: 22px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8eef4;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s, transform 0.2s;
}

.event-link:hover .event-card {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.event-cover {
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #e8eef4;
}

.event-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.25s;
}

.event-link:hover .event-cover img {
  transform: scale(1.04);
}

.event-body {
  flex: 1;
  padding: 16px 18px 20px;
  background: #eef3f8;
}

.event-title {
  margin: 0;
  font-size: 15px;
  line-height: 1.45;
  font-weight: 600;
  color: #1a1a1a;
  transition: color 0.2s;
}

.event-link:hover .event-title {
  color: #dd5f05;
}

/* ─── Пагинация ───────────────────────────────────────────────────────────── */

.cat-pager {
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

/* ─── Адаптив ─────────────────────────────────────────────────────────────── */

@media (max-width: 1200px) {
  .events-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 900px) {
  .events-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .events-grid { grid-template-columns: 1fr; gap: 16px; }
}
</style>
