<template>
  <div>
    <TheHeader />
    <main class="health-article-page">
      <section class="breadcrumbs-section">
        <div class="container">
          <nav class="breadcrumbs-list" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="crumb-item">Главная</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <NuxtLink to="/health-articles" class="crumb-item">Статьи о здоровье</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <span class="crumb-item active crumb-title-active">{{ crumbTitle }}</span>
          </nav>
        </div>
      </section>

      <div v-if="pending" class="container container--narrow article-skeleton" aria-busy="true">
        <div class="sk-hero" />
        <div class="sk-line sk-line--title" />
        <div v-for="n in 8" :key="n" class="sk-line" />
      </div>

      <p v-else-if="!article" class="article-not-found" role="alert">
        Статья не найдена.
        <NuxtLink to="/health-articles" class="article-back-link">К списку статей</NuxtLink>
      </p>

      <article v-else class="health-article-content">
        <div class="container container--narrow">
          <div class="health-article-hero">
            <img :src="article.image_url" :alt="article.title" class="health-article-hero-img">
          </div>
          <h1 class="health-article-title">{{ article.title }}</h1>
          <p class="health-article-date">{{ formatDate(article.display_date) }}</p>

          <div class="health-article-body health-article-prose" v-html="article.description" />

          <template v-if="sortedRecommendations.length">
            <h2 class="health-article-subtitle">{{ recommendationHeading }}</h2>
            <div
              v-for="(block, idx) in sortedRecommendations"
              :key="`${block.position}-${idx}`"
              class="health-recommendation-block"
            >
              <h3 v-if="block.title?.trim()" class="health-recommendation-title">{{ block.title }}</h3>
              <div
                class="health-article-prose health-recommendation-desc"
                v-html="block.description"
              />
            </div>
          </template>
        </div>
      </article>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { HealthArticleDetail, HealthArticleRecommendationBlock } from '~/types/healthArticlesPage'
import { formatHealthArticleDisplayDate } from '~/utils/healthArticleText'

definePageMeta({
  layout: false,
})

const route = useRoute()
const rawId = computed(() => String(route.params.id ?? '').trim())

const { data, pending } = useHealthArticleDetail(rawId)

const article = computed<HealthArticleDetail | null>(() => data.value?.health_article ?? null)

const sortedRecommendations = computed<HealthArticleRecommendationBlock[]>(() => {
  const blocks = article.value?.recommendation_blocks ?? []
  return [...blocks].sort((a, b) => a.position - b.position)
})

const recommendationHeading = computed(() => {
  const t = article.value?.recommendation_section_title?.trim()
  return t || 'Рекомендации'
})

const crumbTitle = computed(() => {
  const t = article.value?.title?.trim() ?? ''
  if (t.length <= 56) return t
  return `${t.slice(0, 53)}…`
})

function formatDate(iso: string) {
  return formatHealthArticleDisplayDate(iso)
}

const headTitle = computed(() => {
  const t = article.value?.title?.trim()
  return t ? `${t} — Статьи о здоровье — Happiness` : 'Статья — Статьи о здоровье — Happiness'
})

useHead({
  title: () => headTitle.value,
})
</script>

<style scoped>
.health-article-page {
  background: #fff;
  padding-bottom: 60px;
}

.breadcrumbs-section {
  padding: 20px 0;
}

.breadcrumbs-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 14px;
}

.crumb-item {
  color: #282828;
}

.crumb-item.active {
  color: #7f7f7f;
}

.crumb-title-active {
  max-width: min(100%, 520px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.container--narrow {
  max-width: 800px;
  margin: 0 auto;
}

.article-skeleton {
  padding: 12px 0 40px;
}

.sk-hero {
  height: 280px;
  border-radius: 16px;
  margin-bottom: 24px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: sk-shimmer 1.2s ease-in-out infinite;
}

.sk-line {
  height: 14px;
  border-radius: 4px;
  margin-bottom: 12px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: sk-shimmer 1.2s ease-in-out infinite;
}

.sk-line--title {
  height: 36px;
  width: 85%;
  margin-bottom: 20px;
}

@keyframes sk-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.article-not-found {
  text-align: center;
  padding: 48px 16px;
  color: #555;
  font-size: 17px;
}

.article-back-link {
  display: block;
  margin-top: 16px;
  color: #dd5f05;
  font-weight: 600;
}

.health-article-hero {
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
}

.health-article-hero-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  max-height: 420px;
}

.health-article-title {
  margin: 0 0 12px;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #dd5f05;
  line-height: 1.25;
}

.health-article-date {
  margin: 0 0 28px;
  font-size: 1rem;
  color: #333;
}

.health-article-body {
  margin-bottom: 8px;
}

.health-article-subtitle {
  margin: 32px 0 16px;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #1a1a1a;
}

.health-recommendation-block {
  margin-bottom: 28px;
}

.health-recommendation-title {
  margin: 0 0 10px;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
}

.health-recommendation-desc {
  font-size: 1rem;
  line-height: 1.65;
  color: #1a1a1a;
}

.health-article-prose {
  font-size: 1rem;
  line-height: 1.65;
  color: #1a1a1a;
}

.health-article-prose :deep(p) {
  margin: 0 0 16px;
}

.health-article-prose :deep(p:last-child) {
  margin-bottom: 0;
}

.health-article-prose :deep(ul),
.health-article-prose :deep(ol) {
  margin: 0 0 16px;
  padding-left: 1.5rem;
}

.health-article-prose :deep(li) {
  margin-bottom: 8px;
}

.health-article-prose :deep(strong) {
  font-weight: 700;
}

.health-article-prose :deep(a) {
  color: #dd5f05;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .breadcrumbs-section {
    padding: 10px 0;
  }

  .breadcrumbs-list {
    font-size: 12px;
    flex-wrap: nowrap;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
  }

  .breadcrumbs-list::-webkit-scrollbar {
    display: none;
  }

  .health-article-page {
    padding-bottom: 30px;
  }

  .health-article-hero {
    margin-bottom: 14px;
  }

  .health-article-title {
    font-size: clamp(22px, 8vw, 30px);
    margin-bottom: 8px;
  }

  .health-article-date {
    font-size: 13px;
    margin-bottom: 14px;
  }

  .health-article-prose,
  .health-recommendation-desc {
    font-size: 14px;
    line-height: 1.5;
  }

  .health-article-subtitle {
    margin-top: 22px;
    margin-bottom: 10px;
    font-size: 15px;
  }
}
</style>
