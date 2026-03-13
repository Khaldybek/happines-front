<template>
  <div>
    <TheHeader />
    <main class="gallery-category-page">
      <section class="breadcrumbs-section">
        <div class="container">
          <nav class="breadcrumbs-list" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="crumb-item">Главная</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <NuxtLink to="/gallery" class="crumb-item">Галерея</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <span class="crumb-item active">{{ categoryTitle }}</span>
          </nav>
        </div>
      </section>

      <section class="gallery-category-intro">
        <div class="container">
          <h1 class="gallery-category-title">{{ categoryTitle }}</h1>
        </div>
      </section>

      <section class="gallery-category-grid-section">
        <div class="container">
          <div class="gallery-cards-grid">
            <NuxtLink
              v-for="(item, i) in displayedItems"
              :key="i"
              :to="`/gallery/${category}/${item.slug}`"
              class="gallery-card-link"
            >
              <article class="gallery-card">
                <div class="gallery-card-img-wrap">
                  <img :src="item.image" :alt="item.title" class="gallery-card-img">
                </div>
                <p class="gallery-card-desc">{{ item.description }}</p>
              </article>
            </NuxtLink>
          </div>

          <div class="gallery-category-pager">
            <button type="button" class="pager-arrow" aria-label="Предыдущая страница" @click="prevPage">‹</button>
            <button
              v-for="p in totalPages"
              :key="p"
              type="button"
              class="pager-item"
              :class="{ 'is-active': p === currentPage }"
              @click="currentPage = p"
            >
              {{ p }}
            </button>
            <button type="button" class="pager-arrow" aria-label="Следующая страница" @click="nextPage">›</button>
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
const category = computed(() => (route.params.category as string) || 'travel')

const categoryMeta: Record<string, { title: string }> = {
  travel: { title: 'ПУТЕШЕСТВИЯ' },
  training: { title: 'ОБУЧЕНИЯ И МЕРОПРИЯТИЯ' },
  anniversary: { title: 'ГОДОВЩИНЫ' },
}

const categoryTitle = computed(() => categoryMeta[category.value]?.title ?? category.value.toUpperCase())

useHead({
  title: () => `${categoryTitle.value} — Галерея — Happiness`,
})

const currentPage = ref(3)
const perPage = 9
const totalPages = 5

const placeholderItems = [
  {
    slug: 'sanya-2024',
    image: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png',
    title: 'Тур 1',
    description: '10-й тур российских дистрибьюторов Компания Шэнлун из Гонконга в Санью (7-13 июня 2024 года).',
  },
  {
    slug: 'hainan-2023',
    image: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
    title: 'Тур 2',
    description: '10-е путешествие на о. Хайнань, г. Санья, для дистрибьюторов Гонконгской корпорации Шен Лунг (12 ноября 2023 - 20 ноября 2023).',
  },
  {
    slug: 'china-factory',
    image: '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png',
    title: 'Тур 3',
    description: 'Путешествие на завод компании Happiness в Китае.',
  },
  {
    slug: 'hainan',
    image: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png',
    title: 'Тур 4',
    description: 'Путешествие на о. Хайнань, г. Санья.',
  },
  {
    slug: 'sanya-2024-2',
    image: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
    title: 'Тур 5',
    description: '10-й тур российских дистрибьюторов Компания Шэнлун из Гонконга в Санью (7-13 июня 2024 года).',
  },
  {
    slug: 'china-factory-2',
    image: '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png',
    title: 'Тур 6',
    description: 'Путешествие на завод компании Happiness в Китае.',
  },
  {
    slug: 'hainan-2023-2',
    image: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png',
    title: 'Тур 7',
    description: '10-е путешествие на о. Хайнань, г. Санья (12 ноября 2023 - 20 ноября 2023).',
  },
  {
    slug: 'hainan-2',
    image: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
    title: 'Тур 8',
    description: 'Путешествие на о. Хайнань, г. Санья.',
  },
  {
    slug: 'sanya-2024-3',
    image: '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png',
    title: 'Тур 9',
    description: '10-й тур российских дистрибьюторов Компания Шэнлун из Гонконга в Санью (7-13 июня 2024 года).',
  },
]

const allItems = computed(() => {
  const list = [...placeholderItems]
  while (list.length < perPage * totalPages) list.push(...placeholderItems)
  return list
})

const displayedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return allItems.value.slice(start, start + perPage)
})

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
  if (currentPage.value < totalPages) currentPage.value++
}
</script>

<style scoped>
.gallery-category-page {
  background: #fff;
  padding-bottom: 60px;
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
  color: #1a1a1a;
  font-weight: 600;
}

.gallery-category-intro {
  padding: 0 0 36px;
}

.gallery-category-title {
  margin: 0;
  text-align: center;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #dd5f05;
}

.gallery-category-grid-section {
  padding: 0 0 50px;
}

.gallery-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.gallery-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.gallery-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
}

.gallery-card-img-wrap {
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #f5f5f5;
}

.gallery-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-card-desc {
  margin: 0;
  padding: 16px 18px;
  font-size: 15px;
  line-height: 1.5;
  color: #1a1a1a;
}

.gallery-category-pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
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

.pager-item.is-active {
  border-color: #8bc34a;
  background: #8bc34a;
  color: #fff;
}

@media (max-width: 1024px) {
  .gallery-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .gallery-cards-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
