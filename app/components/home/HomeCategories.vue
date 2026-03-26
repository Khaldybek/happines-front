<template>
  <section
    ref="sectionRef"
    class="categories-section"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="container">
      <h2 class="categories-title">
        <span class="categories-title-accent">{{ categoriesTitlePrimary }}</span>
        <span>{{ categoriesTitleSecondary }}</span>
      </h2>

      <div class="categories-rows">
        <article
          v-for="(category, index) in displayedCategories"
          :key="category.tag"
          class="category-row"
          :class="{ 'is-reverse': index % 2 === 1 }"
        >
          <div class="category-media">
            <img class="media-main" :src="category.imageMain" :alt="category.title">
            <img class="media-side" :src="category.imageTwo" :alt="category.title">
            <img class="media-side" :src="category.imageThree" :alt="category.title">
          </div>

          <div class="category-content" :style="{ '--category-color': category.color }">
            <p class="category-tag">{{ category.tag }}</p>
            <p class="category-text">
              {{ category.text }}
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
import { resolveNavHref } from '~/utils/navHref'

interface CategoryDisplayItem {
  tag: string
  title: string
  imageMain: string
  imageTwo: string
  imageThree: string
  color: string
  to: string
  text: string
}

const props = withDefaults(defineProps<{
  transitionProgress?: number
  title?: string | null
  categories?: Array<{
    id: number
    slug: string
    category_title: string | null
    category_plural_title: string | null
    href: string | null
    image_one: string | null
    image_two: string | null
    image_three: string | null
  }>
}>(), {
  transitionProgress: 0
})

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  if (!sectionRef.value) return
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) { isVisible.value = true; observer.disconnect() } },
    { threshold: 0.08 }
  )
  observer.observe(sectionRef.value)
})

const FALLBACK_IMAGE = '/images/9e8377ac40899f1b0381dc2db14e9b7cd56c6b20.jpeg'

const defaultCategories: CategoryDisplayItem[] = [
  {
    tag: '#ОЧИЩЕНИЕ',
    title: 'Очищение',
    imageMain: '/images/9e8377ac40899f1b0381dc2db14e9b7cd56c6b20.jpeg',
    imageTwo: '/images/9e8377ac40899f1b0381dc2db14e9b7cd56c6b20.jpeg',
    imageThree: '/images/9e8377ac40899f1b0381dc2db14e9b7cd56c6b20.jpeg',
    color: '#4B93D7',
    to: '/catalog/ocishhenie',
    text: 'Очищение организма от шлаков и токсинов - первый шаг на пути к здоровью и долголетию.',
  },
  {
    tag: '#ВОССТАНОВЛЕНИЕ И ОМОЛОЖЕНИЕ',
    title: 'Восстановление и омоложение',
    imageMain: '/images/c73c8a5ce7b873a9895e9561a5106da110e962d2.png',
    imageTwo: '/images/c73c8a5ce7b873a9895e9561a5106da110e962d2.png',
    imageThree: '/images/c73c8a5ce7b873a9895e9561a5106da110e962d2.png',
    color: '#FF7F1E',
    to: '/catalog/vosstanovlenie-i-omolozenie',
    text: 'Естественный путь к восстановлению и обновлению организма',
  },
  {
    tag: '#ЕЖЕДНЕВНЫЙ УХОД',
    title: 'Ежедневный уход',
    imageMain: '/images/9e8377ac40899f1b0381dc2db14e9b7cd56c6b20.jpeg',
    imageTwo: '/images/9e8377ac40899f1b0381dc2db14e9b7cd56c6b20.jpeg',
    imageThree: '/images/9e8377ac40899f1b0381dc2db14e9b7cd56c6b20.jpeg',
    color: '#79A62F',
    to: '/catalog/ezednevnyi-uxod',
    text: 'Природная косметика для красоты и обновления кожи',
  },
  {
    tag: '#ТОВАРЫ ДЛЯ СЕМЬИ',
    title: 'Товары для семьи',
    imageMain: '/images/dcf565b5ae1c07ff18202d1bb30694776d5b7536.png',
    imageTwo: '/images/dcf565b5ae1c07ff18202d1bb30694776d5b7536.png',
    imageThree: '/images/dcf565b5ae1c07ff18202d1bb30694776d5b7536.png',
    color: '#F2B72B',
    to: '/catalog/tovary-dlia-semi',
    text: 'Товары для семьи',
  }
]

const categoryColors = ['#4B93D7', '#FF7F1E', '#79A62F', '#F2B72B']

const displayedCategories = computed<CategoryDisplayItem[]>(() => {
  const fromApi = props.categories?.map((c, idx) => ({
    tag: `#${String(c.category_title || '').trim().toUpperCase() || `КАТЕГОРИЯ ${idx + 1}`}`,
    title: String(c.category_title || '').trim() || `Категория ${idx + 1}`,
    imageMain: c.image_one || FALLBACK_IMAGE,
    imageTwo: c.image_two || c.image_one || FALLBACK_IMAGE,
    imageThree: c.image_three || c.image_one || FALLBACK_IMAGE,
    color: categoryColors[idx % categoryColors.length] ?? '#4B93D7',
    to: resolveNavHref(c.href) ?? `/catalog/${encodeURIComponent(c.slug)}`,
    text: String(c.category_plural_title || '').trim() || 'Описание категории',
  }))
  return fromApi?.length ? fromApi : defaultCategories
})

const categoriesTitlePrimary = computed(() => {
  const title = String(props.title || '').trim()
  if (!title) return 'ПОПУЛЯРНЫЕ'
  return title.split(/\s+/)[0]?.toUpperCase() || 'ПОПУЛЯРНЫЕ'
})

const categoriesTitleSecondary = computed(() => {
  const title = String(props.title || '').trim()
  if (!title) return 'КАТЕГОРИИ'
  return title.split(/\s+/).slice(1).join(' ').toUpperCase() || 'КАТЕГОРИИ'
})
</script>

<style scoped>
.categories-section {
  padding: 84px 0 74px;
  background: #fff;
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
  transform: translateY(36px);
  transition: opacity 0.46s ease, transform 0.58s cubic-bezier(.2,.7,.2,1);
}

.categories-section.is-visible .categories-title {
  opacity: 1;
  transform: translateY(0);
}

.categories-title span {
  display: block;
}

.categories-title-accent {
  color: #dd5f05;
  margin-bottom: 6px;
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
  transition: opacity 0.42s ease;
}

.category-row.is-reverse .category-media {
  order: 2;
}

.category-row.is-reverse .category-content {
  order: 1;
}

.category-media,
.category-content {
  opacity: 0;
  transition: opacity 0.44s ease, transform 0.62s cubic-bezier(.2,.7,.2,1);
}

.category-row .category-media {
  transform: translate3d(-56px, 0, 0);
}

.category-row .category-content {
  transform: translate3d(56px, 0, 0);
}

.category-row.is-reverse .category-media {
  transform: translate3d(56px, 0, 0);
}

.category-row.is-reverse .category-content {
  transform: translate3d(-56px, 0, 0);
}

.categories-section.is-visible .category-row {
  opacity: 1;
}

.categories-section.is-visible .category-row .category-media,
.categories-section.is-visible .category-row .category-content {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.categories-section.is-visible .category-row:nth-child(1) .category-media,
.categories-section.is-visible .category-row:nth-child(1) .category-content { transition-delay: 0.12s; }
.categories-section.is-visible .category-row:nth-child(2) .category-media,
.categories-section.is-visible .category-row:nth-child(2) .category-content { transition-delay: 0.24s; }
.categories-section.is-visible .category-row:nth-child(3) .category-media,
.categories-section.is-visible .category-row:nth-child(3) .category-content { transition-delay: 0.36s; }
.categories-section.is-visible .category-row:nth-child(4) .category-media,
.categories-section.is-visible .category-row:nth-child(4) .category-content { transition-delay: 0.48s; }

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
