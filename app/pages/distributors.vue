<template>
  <div>
    <TheHeader />
    <main class="distributors-page">
      <section class="page-hero-catalog">
        <div class="container">
          <DistributorsBreadcrumbs />

          <div v-if="pending" class="hero-content">
            <p class="distributors-status">Загрузка…</p>
          </div>

          <div v-else-if="!pagePayload" class="hero-content">
            <p class="distributors-status">
              Не удалось загрузить страницу. Попробуйте обновить позже.
            </p>
          </div>

          <div v-else class="hero-content">
            <div class="hero-image-container">
              <img
                :src="heroImageSrc"
                :alt="mainTitle"
                class="hero-bg-img"
              >
            </div>

            <h1 class="distributors-title">
              <span class="title-line">{{ mainTitle }}</span>
            </h1>
            <p v-if="subtitle" class="distributors-subtitle">{{ subtitle }}</p>
            <p v-if="description" class="distributors-desc">
              {{ description }}
            </p>
          </div>
        </div>
      </section>

      <section v-if="pagePayload && !pending" class="distributors-cards">
          <div class="container">
            <p v-if="!distributorsList.length" class="distributors-empty">
              Список дистрибьюторов пока пуст.
            </p>
            <template v-else>
              <div class="dist-cards-grid">
                <article
                  v-for="item in displayedDistributors"
                  :key="item.id"
                  class="dist-card"
                >
                  <div class="dist-card-photo-wrap">
                    <img
                      :src="item.image_url || FALLBACK_CARD"
                      :alt="item.name"
                      class="dist-card-photo"
                    >
                  </div>
                  <div class="dist-card-text">
                    <h3 class="dist-card-name">{{ item.name }}</h3>
                    <p class="dist-card-location">{{ item.place_of_work }}</p>
                    <p class="dist-card-role">{{ item.position_title }}</p>
                  </div>
                  <template v-if="item.contributions?.length">
                    <div class="dist-card-contributions">
                      <p class="dist-card-contribution-title">Вклад</p>
                      <ul class="dist-card-contribution-list">
                        <li v-for="(c, idx) in item.contributions" :key="idx">{{ c.text }}</li>
                      </ul>
                    </div>
                  </template>
                </article>
              </div>

              <div v-if="totalPages > 1" class="dist-pager">
                <button
                  type="button"
                  class="dist-pager-arrow"
                  aria-label="Предыдущая страница"
                  :disabled="currentPage <= 1"
                  @click="prevPage"
                >
                  ‹
                </button>
                <button
                  v-for="p in totalPages"
                  :key="p"
                  type="button"
                  class="dist-pager-item"
                  :class="{ 'is-active': p === currentPage }"
                  @click="currentPage = p"
                >
                  {{ p }}
                </button>
                <button
                  type="button"
                  class="dist-pager-arrow"
                  aria-label="Следующая страница"
                  :disabled="currentPage >= totalPages"
                  @click="nextPage"
                >
                  ›
                </button>
              </div>
            </template>
          </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { DistributorItem } from '~/types/distributorsPage'

definePageMeta({
  layout: false,
})

const FALLBACK_HERO = '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png'
const FALLBACK_CARD = '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png'
const PER_PAGE = 8

const { data, pending } = useDistributorsPage()

const pagePayload = computed(() => data.value?.data ?? null)

const mainTitle = computed(
  () => pagePayload.value?.main_title?.trim() || 'Выдающиеся дистрибьюторы',
)
const subtitle = computed(() => pagePayload.value?.title?.trim() ?? '')
const description = computed(() => pagePayload.value?.description?.trim() ?? '')
const heroImageSrc = computed(
  () => pagePayload.value?.main_image_url?.trim() || FALLBACK_HERO,
)

const distributorsList = computed<DistributorItem[]>(
  () => pagePayload.value?.distributors ?? [],
)

const currentPage = ref(1)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(distributorsList.value.length / PER_PAGE)),
)

const displayedDistributors = computed(() => {
  const list = distributorsList.value
  const start = (currentPage.value - 1) * PER_PAGE
  return list.slice(start, start + PER_PAGE)
})

watch(pagePayload, () => {
  currentPage.value = 1
})

watch([totalPages, distributorsList], () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }
})

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

useHead({
  title: () => `${mainTitle.value} — Happiness`,
})
</script>

<style scoped>
.distributors-page {
  background: #fff;
  padding-bottom: 60px;
}

.distributors-status {
  margin: 0;
  padding: 24px 0 48px;
  text-align: center;
  font-size: 16px;
  color: #555;
}

.distributors-empty {
  margin: 0;
  text-align: center;
  padding: 32px 16px;
  color: #555;
  font-size: 16px;
}

.distributors-title {
  margin: 30px 0 16px;
  text-align: center;
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 800;
  text-transform: uppercase;
  line-height: 1.1;
  letter-spacing: 0.02em;
  color: #dd5f05;
}

.title-line {
  display: block;
}

.distributors-subtitle {
  margin: 0 0 20px;
  text-align: center;
  font-size: clamp(18px, 1.2vw, 22px);
  font-weight: 700;
  color: #1a1a1a;
}

.distributors-desc {
  margin: 0 auto;
  max-width: 800px;
  text-align: center;
  font-size: 16px;
  line-height: 1.65;
  color: #333;
}

.distributors-cards {
  padding: 0 0 50px;
}

.dist-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.dist-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8e8;
  text-align: left;
}

.dist-card-photo-wrap {
  width: 120px;
  height: 120px;
  margin: 0 auto 18px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e8e8e8;
}

.dist-card-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dist-card-text {
  text-align: left;
}

.dist-card-name {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.35;
  color: #1a1a1a;
}

/* Место работы — вторичная серая строка */
.dist-card-location {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.45;
  color: #7f7f7f;
}

/* Должность — отдельно от «места», основной тёмный текст (не как серая подпись) */
.dist-card-role {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #1a1a1a;
}

.dist-card-contributions {
  margin-top: 22px;
  padding-top: 2px;
}

.dist-card-contribution-title {
  margin: 0 0 10px;
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
}

.dist-card-contribution-list {
  margin: 0;
  padding-left: 1.1em;
  list-style-type: disc;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.55;
  color: #1a1a1a;
}

.dist-card-contribution-list li {
  margin-bottom: 6px;
}

.dist-card-contribution-list li::marker {
  color: #1a1a1a;
}

.dist-pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.dist-pager-arrow,
.dist-pager-item {
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

.dist-pager-arrow:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.dist-pager-item.is-active {
  border-color: #8bc34a;
  background: #8bc34a;
  color: #fff;
}

@media (max-width: 1200px) {
  .dist-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .distributors-title {
    margin: 22px 0 14px;
  }

  .dist-cards-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
