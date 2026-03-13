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
            <span class="crumb-item active">{{ article.title }}</span>
          </nav>
        </div>
      </section>

      <article class="health-article-content">
        <div class="container container--narrow">
          <div class="health-article-hero">
            <img :src="article.image" :alt="article.title" class="health-article-hero-img">
          </div>
          <h1 class="health-article-title">{{ article.title }}</h1>
          <p class="health-article-date">{{ article.date }}</p>

          <div class="health-article-body">
            <p v-for="(p, i) in article.introParagraphs" :key="`intro-${i}`">{{ p }}</p>
            <h3 class="health-article-subtitle">ЛЕТОМ РЕКОМЕНДУЕТСЯ:</h3>
            <ul class="health-article-list">
              <li>Избегать переутомлений</li>
              <li>Поддерживать водный баланс</li>
              <li>Не переедать</li>
              <li>Меньше находиться под прямыми солнечными лучами. Поддерживать организм изнутри.</li>
            </ul>
            <p v-for="(p, i) in article.bodyParagraphs" :key="`body-${i}`">{{ p }}</p>
          </div>
        </div>
      </article>

      <section class="recommended-products-section">
        <div class="container">
          <div class="recommended-header">
            <h2 class="recommended-title">РЕКОМЕНДУЕМЫЕ ТОВАРЫ</h2>
            <div class="recommended-nav">
              <button type="button" class="recommended-nav-btn" aria-label="Назад" @click="scrollPrev">
                <span class="nav-arrow">‹</span>
              </button>
              <button type="button" class="recommended-nav-btn" aria-label="Вперёд" @click="scrollNext">
                <span class="nav-arrow">›</span>
              </button>
            </div>
          </div>
          <div ref="carouselRef" class="recommended-carousel">
            <article v-for="product in recommendedProducts" :key="product.id" class="recommended-card">
              <NuxtLink :to="`/catalog/${product.id}`" class="recommended-card-link">
                <div class="recommended-card-img-wrap">
                  <img :src="product.image" :alt="product.title" class="recommended-card-img">
                </div>
                <h3 class="recommended-card-title">{{ product.title }}</h3>
                <p class="recommended-card-desc">{{ product.description }}</p>
                <p class="recommended-card-price">{{ product.price }}</p>
                <button type="button" class="recommended-fav-btn" aria-label="В избранное">♡</button>
                <span class="recommended-cart-btn">
                  В КОРЗИНУ
                  <span class="recommended-cart-arrow">→</span>
                </span>
              </NuxtLink>
            </article>
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
const slug = computed(() => (route.params.slug as string) || '')

const articlesBySlug: Record<string, {
  title: string
  date: string
  image: string
  introParagraphs: string[]
  bodyParagraphs: string[]
}> = {
  'immunitet-osenyu': {
    title: 'ИММУНИТЕТ ОСЕНЬЮ',
    date: '24 декабря 2025',
    image: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png',
    introParagraphs: [
      'На календаре осень, традиционно нас ожидает смена погоды и золотая листва на деревьях. Говорят, что осенью у многих людей падает активность. Это естественная реакция организма на сокращение светового дня и похолодание.',
    ],
    bodyParagraphs: [
      'Чтобы поддержать иммунитет, важно соблюдать режим сна, питаться разнообразно и включать в рацион продукты, богатые витаминами и минералами. Продукция HAPPINESS может стать частью комплексного подхода к укреплению здоровья в осенний период.',
    ],
  },
  'leto-vremya-zdorove-vprok': {
    title: 'ЛЕТО – ВРЕМЯ, ЧТОБЫ ПОЗАБОТИТЬСЯ О СВОЕМ ЗДОРОВЬЕ ВПРОК!',
    date: '24 декабря 2025',
    image: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
    introParagraphs: [
      'Щебетание птиц, солнце, зелень, яркие краски. Июль – разгар лета. Время, чтобы позаботиться о своем здоровье впрок. Ведь от того, как проведешь лето, зависит запас сил на осень и зиму.',
    ],
    bodyParagraphs: [
      'Летом особенно важно не перегружать организм, пить достаточно воды и не переедать. Меньше времени под прямыми солнечными лучами и больше – поддержка организма изнутри с помощью натуральных средств. HAPPINESS предлагает продукты, которые помогают сохранять баланс и энергию в жаркий сезон.',
    ],
  },
}

const article = computed(() => {
  const a = slug.value ? articlesBySlug[slug.value] : null
  if (a) return a
  return {
    title: 'Статья о здоровье',
    date: '24 декабря 2025',
    image: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
    introParagraphs: ['Текст статьи.'],
    bodyParagraphs: [],
  }
})

const recommendedProducts = [
  { id: '1', title: 'ПОЧЕЧНЫЙ ЧАЙ', description: 'Мягкая поддержка естественного очищения', price: '5 000₸', image: '/images/a9af888db3be8853f23ab252ff40884690219e08.png' },
  { id: '2', title: 'ЧАНТУН, 22 SV', description: 'Детокс желудочно-кишечного тракта', price: '5 000₸', image: '/images/acebc31125238ea02c6f2327a533eed417235ba7.png' },
  { id: '3', title: 'ЦИНВЭНЬ, 35 SV', description: 'Помогающий бороться с основными причинами симптомов простуды.', price: '5 000₸', image: '/images/dab270cdd863b399b68997a9649feb91f178c56b.png' },
  { id: '4', title: 'СЮЕ БАНЬ ЛЮЙ, 50 SV', description: 'Натуральное фитосредство с подтверждённой эффективностью.', price: '5 000₸', image: '/images/dab270cdd863b399b68997a9649feb91f178c56b.png' },
]

const carouselRef = ref<HTMLElement | null>(null)

function scrollPrev() {
  if (carouselRef.value) carouselRef.value.scrollBy({ left: -320, behavior: 'smooth' })
}

function scrollNext() {
  if (carouselRef.value) carouselRef.value.scrollBy({ left: 320, behavior: 'smooth' })
}

useHead({
  title: () => `${article.value.title} — Статьи о здоровье — Happiness`,
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

.container--narrow {
  max-width: 800px;
  margin: 0 auto;
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
  text-transform: uppercase;
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
  font-size: 1rem;
  line-height: 1.65;
  color: #1a1a1a;
}

.health-article-body p {
  margin: 0 0 16px;
}

.health-article-subtitle {
  margin: 24px 0 12px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
}

.health-article-list {
  margin: 0 0 20px;
  padding-left: 1.5rem;
}

.health-article-list li {
  margin-bottom: 8px;
}

/* Рекомендуемые товары */
.recommended-products-section {
  padding: 48px 0 60px;
  background: #f8f8f8;
}

.recommended-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.recommended-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #1a1a1a;
}

.recommended-nav {
  display: flex;
  gap: 8px;
}

.recommended-nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: #dd5f05;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.15s;
}

.recommended-nav-btn:hover {
  background: #c25404;
}

.nav-arrow {
  line-height: 1;
}

.recommended-carousel {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  padding: 4px 0;
}

.recommended-card {
  flex: 0 0 280px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.recommended-card-link {
  display: block;
  padding: 0 0 20px;
  text-decoration: none;
  color: inherit;
}

.recommended-card-img-wrap {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #4b93d7 0%, #2d6ba8 100%);
  border-radius: 16px 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.recommended-card-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.recommended-card-title {
  margin: 12px 20px 8px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #1a1a1a;
}

.recommended-card-desc {
  margin: 0 20px 12px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: #555;
}

.recommended-card-price {
  margin: 0 20px 12px;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
}

.recommended-fav-btn {
  margin: 0 20px 12px;
  padding: 0;
  border: none;
  background: none;
  font-size: 1.2rem;
  color: #999;
  cursor: pointer;
  display: block;
}

.recommended-cart-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 20px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  background: #dd5f05;
  color: #fff;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  border: 2px solid transparent;
}

.recommended-card-link:hover .recommended-cart-btn {
  background: #e8f5e9;
  color: #2e7d32;
  border-color: #2e7d32;
}

.recommended-cart-arrow {
  font-size: 1rem;
}
</style>
