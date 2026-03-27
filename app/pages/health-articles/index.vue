<template>
  <div>
    <TheHeader />
    <main class="health-articles-page">
      <section class="breadcrumbs-section">
        <div class="container">
          <nav class="breadcrumbs-list" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="crumb-item">Главная</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <span class="crumb-item active">Статьи о здоровье</span>
          </nav>
        </div>
      </section>

      <div class="container">
        <h1 class="health-articles-title">СТАТЬИ О ЗДОРОВЬЕ</h1>

        <div class="health-articles-grid">
          <NuxtLink
            v-for="(item, i) in displayedArticles"
            :key="`${item.slug}-${i}`"
            :to="`/health-articles/${item.slug}`"
            class="health-article-card"
            @mouseenter="hoveredIndex = i"
            @mouseleave="hoveredIndex = null"
          >
            <div class="health-article-card-img">
              <img :src="item.image" :alt="item.title">
            </div>
            <div class="health-article-card-content">
              <span
                v-if="hoveredIndex === i"
                class="health-article-card-hover-icon"
                aria-hidden="true"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c-.55 0-1 .45-1 1v7H9.5C8.67 10 8 10.67 8 11.5v1h-.5C6.67 12.5 6 13.17 6 14v5c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-5c0-.83-.67-1.5-1.5-1.5H16v-1c0-.83-.67-1.5-1.5-1.5H13V3c0-.55-.45-1-1-1z"/></svg>
              </span>
              <h2
                class="health-article-card-title"
                :class="{ 'is-hovered': hoveredIndex === i }"
              >
                {{ item.title }}
              </h2>
              <p class="health-article-card-excerpt">{{ item.excerpt }}</p>
              <span class="health-article-card-date">{{ item.date }}</span>
            </div>
          </NuxtLink>
        </div>

        <div class="health-articles-pager">
          <button
            type="button"
            class="pager-arrow"
            aria-label="Предыдущая страница"
            :disabled="currentPage <= 1"
            @click="currentPage = Math.max(1, currentPage - 1)"
          >
            ‹
          </button>
          <button
            v-for="p in totalPages"
            :key="p"
            type="button"
            class="pager-num"
            :class="{ 'is-active': p === currentPage }"
            @click="currentPage = p"
          >
            {{ p }}
          </button>
          <button
            type="button"
            class="pager-arrow"
            aria-label="Следующая страница"
            :disabled="currentPage >= totalPages"
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
          >
            ›
          </button>
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
  title: 'Статьи о здоровье — Happiness',
})

const articles = [
  {
    slug: 'immunitet-osenyu',
    title: 'ИММУНИТЕТ ОСЕНЬЮ',
    excerpt: 'На календаре осень, традиционно нас ожидает смена погоды и золотая листва на деревьях. Говорят, что осенью у многих людей падает активность. Это естественная реакци...',
    date: '24 декабря 2025',
    image: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png',
  },
  {
    slug: 'leto-vremya-zdorove-vprok',
    title: 'ЛЕТО – ВРЕМЯ, ЧТОБЫ ПОЗАБОТИТЬСЯ О СВОЕМ ЗДОРОВЬЕ ВПРОК!',
    excerpt: 'Щебетание птиц, солнце, зелень, яркие краски. Июль – разгар лета. Время, чтобы позаботиться о своем здоровье впрок. Ведь от того, как проведешь лето, зависит...',
    date: '24 декабря 2025',
    image: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
  },
  {
    slug: 'immunitet-osenyu',
    title: 'ИММУНИТЕТ ОСЕНЬЮ',
    excerpt: 'На календаре осень, традиционно нас ожидает смена погоды и золотая листва на деревьях. Говорят, что осенью у многих людей падает активность. Это естественная реакци...',
    date: '24 декабря 2025',
    image: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png',
  },
  {
    slug: 'leto-vremya-zdorove-vprok',
    title: 'ЛЕТО – ВРЕМЯ, ЧТОБЫ ПОЗАБОТИТЬСЯ О СВОЕМ ЗДОРОВЬЕ ВПРОК!',
    excerpt: 'Щебетание птиц, солнце, зелень, яркие краски. Июль – разгар лета. Время, чтобы позаботиться о своем здоровье впрок. Ведь от того, как проведешь лето, зависит...',
    date: '24 декабря 2025',
    image: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
  },
  {
    slug: 'immunitet-osenyu',
    title: 'ИММУНИТЕТ ОСЕНЬЮ',
    excerpt: 'На календаре осень, традиционно нас ожидает смена погоды и золотая листва на деревьях. Говорят, что осенью у многих людей падает активность. Это естественная реакци...',
    date: '24 декабря 2025',
    image: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png',
  },
  {
    slug: 'leto-vremya-zdorove-vprok',
    title: 'ЛЕТО – ВРЕМЯ, ЧТОБЫ ПОЗАБОТИТЬСЯ О СВОЕМ ЗДОРОВЬЕ ВПРОК!',
    excerpt: 'Щебетание птиц, солнце, зелень, яркие краски. Июль – разгар лета. Время, чтобы позаботиться о своем здоровье впрок. Ведь от того, как проведешь лето, зависит...',
    date: '24 декабря 2025',
    image: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
  },
]

const currentPage = ref(3)
const perPage = 4
const totalPages = 5
const hoveredIndex = ref<number | null>(null)

const displayedArticles = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const list = [...articles]
  while (list.length < perPage * totalPages) list.push(...articles)
  return list.slice(start, start + perPage)
})
</script>

<style scoped>
.health-articles-page {
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
  color: #7f7f7f;
}

.health-articles-title {
  margin: 0 0 40px;
  text-align: center;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #dd5f05;
}

.health-articles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-bottom: 48px;
}

.health-article-card {
  display: block;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: box-shadow 0.25s ease;
}

.health-article-card:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.health-article-card-img {
  height: 260px;
  overflow: hidden;
}

.health-article-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.health-article-card:hover .health-article-card-img img {
  transform: scale(1.03);
}

.health-article-card-content {
  padding: 24px 20px;
  position: relative;
}

.health-article-card-hover-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 24px;
  height: 24px;
  color: #dd5f05;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: health-article-wave 0.5s ease;
}

@keyframes health-article-wave {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}

.health-article-card-title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
  color: #121212;
  transition: color 0.2s ease;
}

.health-article-card-title.is-hovered {
  color: #dd5f05;
}

.health-article-card:hover .health-article-card-title {
  color: #dd5f05;
}

.health-article-card-excerpt {
  margin: 0 0 16px;
  font-size: 15px;
  line-height: 1.5;
  color: #555;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.health-article-card-date {
  font-size: 14px;
  font-weight: 500;
  color: #888;
}

.health-articles-pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.pager-arrow,
.pager-num {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.pager-arrow:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: #ccc;
}

.pager-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pager-num:hover {
  background: #f5f5f5;
  border-color: #78a435;
}

.pager-num.is-active {
  background: #78a435;
  border-color: #78a435;
  color: #fff;
}

@media (max-width: 768px) {
  .health-articles-page {
    padding-bottom: 34px;
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

  .health-articles-title {
    margin-bottom: 18px;
    font-size: clamp(26px, 8vw, 34px);
  }

  .health-articles-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 20px;
  }

  .health-article-card-content {
    padding: 14px 12px;
  }

  .health-article-card-img {
    height: 180px;
  }

  .health-article-card-title {
    font-size: 15px;
    margin-bottom: 8px;
  }

  .health-article-card-excerpt {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .health-article-card-date {
    font-size: 12px;
  }

  .health-articles-pager {
    gap: 6px;
  }

  .pager-arrow,
  .pager-num {
    width: 34px;
    height: 34px;
    font-size: 14px;
  }
}
</style>
