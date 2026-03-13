<template>
  <div>
    <TheHeader />
    <main class="distributors-page">
      <DistributorsBreadcrumbs />

      <section class="distributors-hero">
        <div class="container">
          <div class="hero-image-wrap">
            <img src="/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png" alt="Выдающиеся дистрибьюторы" class="hero-image">
          </div>

          <h1 class="distributors-title">
            <span class="title-line">ВЫДАЮЩИЕСЯ</span>
            <span class="title-line">ДИСТРИБЬЮТОРЫ</span>
          </h1>
          <p class="distributors-subtitle">Стандарты качества и надёжности</p>
          <p class="distributors-desc">
            Мы сотрудничаем с ведущими дистрибьюторами, которые зарекомендовали себя надёжными партнёрами на рынке. Их опыт, стандарты качества и профессионализм позволяют нам обеспечивать стабильные поставки и высокий уровень сервиса для наших клиентов.
          </p>
        </div>
      </section>

      <section class="distributors-cards">
        <div class="container">
          <div class="dist-cards-grid">
            <article v-for="(item, i) in displayedDistributors" :key="`${item.name}-${i}`" class="dist-card">
              <div class="dist-card-photo-wrap">
                <img :src="item.image" :alt="item.name" class="dist-card-photo">
              </div>
              <h3 class="dist-card-name">{{ item.name }}</h3>
              <p class="dist-card-location">{{ item.location }}</p>
              <p class="dist-card-role">{{ item.role }}</p>
              <p class="dist-card-contribution-title">Вклад</p>
              <ul class="dist-card-contribution-list">
                <li v-for="(point, idx) in item.contribution" :key="idx">{{ point }}</li>
              </ul>
            </article>
          </div>

          <div class="dist-pager">
            <button type="button" class="dist-pager-arrow" aria-label="Предыдущая страница" @click="prevPage">‹</button>
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
            <button type="button" class="dist-pager-arrow" aria-label="Следующая страница" @click="nextPage">›</button>
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

useHead({
  title: 'Выдающиеся дистрибьюторы — Happiness',
})

const baseDistributor = {
  name: 'Кудайбергенова Карима',
  location: 'Турция, Стамбул',
  role: 'Лидер сообщества / Топ-дистрибьютор',
  contribution: [
    'Обеспечивает логистику на локальном уровне',
    'Обучение продавцов/консультантов',
    'Организация офлайн/онлайн акций'
  ],
  image: '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png'
}

const distributors = Array.from({ length: 8 }, () => ({ ...baseDistributor }))

const currentPage = ref(1)
const perPage = 8
const totalPages = 5

const displayedDistributors = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return distributors.slice(0, perPage)
})

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
  if (currentPage.value < totalPages) currentPage.value++
}
</script>

<style scoped>
.distributors-page {
  background: #fff;
  padding-bottom: 60px;
}

.distributors-hero {
  padding: 0 0 48px;
}

.hero-image-wrap {
  border-radius: 0 0 24px 24px;
  overflow: hidden;
  margin-bottom: 32px;
}

.hero-image {
  width: 100%;
  height: clamp(220px, 28vw, 380px);
  object-fit: cover;
}

.distributors-title {
  margin: 0 0 16px;
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
  border: 1px solid #eee;
  text-align: center;
}

.dist-card-photo-wrap {
  width: 120px;
  height: 120px;
  margin: 0 auto 16px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e8e8e8;
}

.dist-card-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dist-card-name {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.dist-card-location {
  margin: 0 0 4px;
  font-size: 15px;
  color: #555;
}

.dist-card-role {
  margin: 0 0 16px;
  font-size: 14px;
  color: #555;
}

.dist-card-contribution-title {
  margin: 0 0 10px;
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: left;
}

.dist-card-contribution-list {
  margin: 0;
  padding-left: 20px;
  text-align: left;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.dist-card-contribution-list li {
  margin-bottom: 6px;
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
  .dist-cards-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
