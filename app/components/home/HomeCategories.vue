<template>
  <section
    class="categories-section"
    :class="`stage-${revealStage}`"
    :style="{ '--cat-progress': String(transitionValue) }"
  >
    <div class="container">
      <h2 class="categories-title">
        <span class="categories-title-accent">ПОПУЛЯРНЫЕ</span>
        <span>КАТЕГОРИИ</span>
      </h2>

      <div class="categories-rows">
        <article
          v-for="(category, index) in categories"
          :key="category.tag"
          class="category-row"
          :class="{ 'is-reverse': index % 2 === 1 }"
        >
          <div class="category-media">
            <img class="media-main" :src="category.image" :alt="category.title">
            <img class="media-side" :src="category.image" :alt="category.title">
            <img class="media-side" :src="category.image" :alt="category.title">
          </div>

          <div class="category-content" :style="{ '--category-color': category.color }">
            <p class="category-tag">{{ category.tag }}</p>
            <p class="category-text">
              Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала
              XVI века. В то время некий Lorem Ipsum является
            </p>
            <NuxtLink :to="category.to" class="category-more">
              <span class="more-arrow"></span>
              подробнее
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ transitionProgress?: number }>(), {
  transitionProgress: 0
})

const transitionValue = computed(() => {
  const val = props.transitionProgress
  if (Number.isNaN(val)) return 0
  return Math.max(0, Math.min(1, val))
})

const revealStage = computed(() => {
  if (transitionValue.value < 0.2) return 0
  if (transitionValue.value < 0.52) return 1
  return 2
})

const categories = [
  {
    tag: '#ОЧИЩЕНИЕ',
    title: 'Очищение',
    image: '/images/9e8377ac40899f1b0381dc2db14e9b7cd56c6b20.jpeg',
    color: '#4B93D7',
    to: '/products/cleansing'
  },
  {
    tag: '#ВОССТАНОВЛЕНИЕ И ОМОЛОЖЕНИЕ',
    title: 'Восстановление и омоложение',
    image: '/images/c73c8a5ce7b873a9895e9561a5106da110e962d2.png',
    color: '#FF7F1E',
    to: '/products/recovery'
  },
  {
    tag: '#ЕЖЕДНЕВНЫЙ УХОД',
    title: 'Ежедневный уход',
    image: '/images/9e8377ac40899f1b0381dc2db14e9b7cd56c6b20.jpeg',
    color: '#79A62F',
    to: '/products/daily-care'
  },
  {
    tag: '#ТОВАРЫ ДЛЯ СЕМЬИ',
    title: 'Товары для семьи',
    image: '/images/dcf565b5ae1c07ff18202d1bb30694776d5b7536.png',
    color: '#F2B72B',
    to: '/products/family'
  }
]
</script>

<style scoped>
.categories-section {
  padding: 84px 0 74px;
  background: #fff;
  --cat-progress: 0;
}

.categories-section .container {
  opacity: calc(0.08 + (var(--cat-progress) * 0.92));
  transform: translateY(calc((1 - var(--cat-progress)) * 42px));
  filter: blur(calc((1 - var(--cat-progress)) * 3.4px));
  transition: opacity 0.42s ease, transform 0.5s cubic-bezier(.2,.7,.2,1), filter 0.45s ease;
}

.categories-section.stage-2 .container {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.categories-title {
  margin: 0 0 30px;
  text-align: center;
  text-transform: uppercase;
  line-height: 0.98;
  font-size: clamp(54px, 6.3vw, 88px);
  font-weight: 900;
  letter-spacing: 0.01em;
  color: #0f1117;
  opacity: 0;
  transform: translateY(24px) scale(0.93);
  transition: opacity 0.42s ease, transform 0.52s cubic-bezier(.2,.7,.2,1);
}

.categories-title span {
  display: block;
}

.categories-title-accent {
  color: #dd5f05;
  margin-bottom: 6px;
}

.categories-section.stage-1 .categories-title,
.categories-section.stage-2 .categories-title {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.categories-rows {
  display: grid;
  gap: 20px;
}

.category-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: stretch;
  opacity: 0;
  transform: translateY(38px) scale(0.96);
  transition: opacity 0.45s ease, transform 0.58s cubic-bezier(.2,.7,.2,1);
}

.category-row.is-reverse .category-media {
  order: 2;
}

.category-row.is-reverse .category-content {
  order: 1;
}

.categories-section.stage-1 .category-row {
  opacity: 0.24;
  transform: translateY(20px) scale(0.98);
}

.categories-section.stage-2 .category-row {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.categories-section.stage-2 .category-row:nth-child(1) { transition-delay: 0.06s; }
.categories-section.stage-2 .category-row:nth-child(2) { transition-delay: 0.14s; }
.categories-section.stage-2 .category-row:nth-child(3) { transition-delay: 0.22s; }
.categories-section.stage-2 .category-row:nth-child(4) { transition-delay: 0.3s; }

.category-media {
  min-height: 224px;
  display: grid;
  grid-template-columns: 1.45fr 0.95fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
}

.category-media img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 30px;
}

.media-main {
  grid-row: 1 / 3;
}

.category-content {
  min-height: 224px;
  background: var(--category-color);
  border-radius: 30px;
  color: #fff;
  padding: 22px 26px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.category-tag {
  font-size: clamp(17px, 1vw, 20px);
  font-weight: 800;
  letter-spacing: 0.02em;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.category-text {
  font-size: clamp(17px, 1.3vw, 42px);
  line-height: 1.2;
  margin-bottom: 16px;
}

.category-more {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #2ab7a4;
  color: #fff;
  border-radius: 999px;
  text-transform: uppercase;
  font-weight: 800;
  font-size: clamp(12px, 0.72vw, 14px);
  padding: 6px 14px 6px 8px;
}

.more-arrow {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #2ab7a4;
  border: 2px solid rgba(255, 255, 255, 0.92);
  position: relative;
}

.more-arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: translate(-62%, -50%) rotate(45deg);
}

@media (max-width: 1100px) {
  .category-row {
    grid-template-columns: 1fr;
  }

  .category-row.is-reverse .category-media,
  .category-row.is-reverse .category-content {
    order: initial;
  }

  .category-media,
  .category-content {
    min-height: 200px;
  }

  .category-content {
    padding: 18px;
  }
}

@media (max-width: 700px) {
  .categories-section {
    padding: 64px 0 56px;
  }

  .categories-rows {
    gap: 14px;
  }

  .category-row {
    gap: 12px;
  }

  .category-media {
    gap: 6px;
    min-height: 160px;
    grid-template-columns: 1.2fr 0.8fr;
  }

  .category-media img,
  .category-content {
    border-radius: 20px;
  }

  .category-tag {
    margin-bottom: 8px;
  }

  .category-text {
    margin-bottom: 12px;
  }
}
</style>
