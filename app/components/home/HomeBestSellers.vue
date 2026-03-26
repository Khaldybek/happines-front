<template>
  <section class="bestseller-section">
    <div class="container">
      <h2 class="bs-section-title">
        <span class="bs-title-orange">{{ titlePrimary }}</span>
        <span class="bs-title-black"> {{ titleSecondary }}</span>
      </h2>

      <div class="bestseller-layout">
        <div class="bs-showcase">
          <img class="bs-pack bs-pack-main" :src="showcaseImage" :alt="showcaseTitle">
        </div>

        <div class="bs-nav">
          <button class="bs-nav-btn is-prev" aria-label="Предыдущий товар" @click="showPrev"></button>
          <button class="bs-nav-btn is-next" aria-label="Следующий товар" @click="showNext"></button>
        </div>

        <div class="bs-details-card">
          <div class="bs-card-content">
            <h3>{{ showcaseTitle }}</h3>
            <p>{{ showcaseDescription }}</p>
            <div class="bs-actions">
              <div class="bs-price">Цена: {{ showcasePrice }}</div>
              <div class="quantity-selector">
                <button type="button" @click="quantity = Math.max(0, quantity - 1)">−</button>
                <span>{{ quantity }}</span>
                <button type="button" @click="quantity++">+</button>
              </div>
              <button type="button" class="bs-cart-btn">
                <span class="bs-cart-arrow" aria-hidden="true"></span>
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HomeEighthItem } from '~/types/homePage'

const quantity = ref(0)
const currentIndex = ref(0)

const props = defineProps<{
  title?: string | null
  items?: HomeEighthItem[]
}>()

const fallbackShowcase = {
  title: 'ШЕНЛУНГСКИЙ ЧАЙ «БАЛАНС+»',
  description: 'Травяной чай на основе красного бурят-монгольского риса и чёрного горного гречиха. Помогает мягко поддерживать пищеварение, улучшает тонус и способствует общему балансу организма.',
  price: '5 000 ₸',
  image: '/images/85c8bf8dc68bb639314f07e0e6692e7fcf1c80d9.png',
}

function formatPrice(value: number | null | undefined) {
  const n = Number(value)
  if (!Number.isFinite(n)) return fallbackShowcase.price
  return `${new Intl.NumberFormat('ru-RU').format(n)} ₸`
}

const normalizedItems = computed(() => {
  const fromApi = props.items
    ?.map((item) => {
      const product = item?.product
      if (!product) return null
      return {
        title: (product.short_title || product.title || fallbackShowcase.title).toUpperCase(),
        description: product.card_description || product.short_description || product.description || fallbackShowcase.description,
        price: formatPrice(product.discount_price > 0 ? product.discount_price : product.price),
        image: item.block_image || product.image_orig || product.image || fallbackShowcase.image,
      }
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  return fromApi?.length ? fromApi : [fallbackShowcase]
})

watch(normalizedItems, (items) => {
  if (!items.length) {
    currentIndex.value = 0
    return
  }
  if (currentIndex.value > items.length - 1) currentIndex.value = 0
}, { immediate: true })

const showcase = computed(() => {
  const items = normalizedItems.value
  if (!items.length) return fallbackShowcase
  const safeIndex = Math.max(0, Math.min(items.length - 1, currentIndex.value))
  return items[safeIndex] || fallbackShowcase
})

function showPrev() {
  const total = normalizedItems.value.length
  if (total <= 1) return
  currentIndex.value = (currentIndex.value - 1 + total) % total
}

function showNext() {
  const total = normalizedItems.value.length
  if (total <= 1) return
  currentIndex.value = (currentIndex.value + 1) % total
}

watch(currentIndex, () => {
  quantity.value = 0
})

const showcaseTitle = computed(() => showcase.value.title)
const showcaseDescription = computed(() => showcase.value.description)
const showcasePrice = computed(() => showcase.value.price)
const showcaseImage = computed(() => showcase.value.image)

const titlePrimary = computed(() => {
  const title = String(props.title || '').trim()
  if (!title) return 'ХИТЫ'
  return title.split(/\s+/)[0]?.toUpperCase() || 'ХИТЫ'
})

const titleSecondary = computed(() => {
  const title = String(props.title || '').trim()
  if (!title) return 'ПРОДАЖ'
  return title.split(/\s+/).slice(1).join(' ').toUpperCase() || 'ПРОДАЖ'
})
</script>

<style scoped>
.bestseller-section {
  padding: 92px 0 96px;
  background: #ededed;
  overflow: hidden;
}

.bs-section-title {
  font-size: clamp(56px, 6.3vw, 86px);
  line-height: 1;
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.01em;
  margin-bottom: 24px;
}

.bs-title-orange {
  color: #dd5f05;
}

.bs-title-black {
  color: #121212;
}

.bestseller-layout {
  position: relative;
  padding-top: 34px;
  min-height: 975px;
}

.bs-showcase {
  position: relative;
  z-index: 2;
  height: 540px;
}

.bs-pack {
  position: absolute;
  display: block;
  user-select: none;
  pointer-events: none;
}

.bs-pack-main {
  width: min(66vw, 820px);
  left: 52%;
  top: 130px;
  transform: translateX(-56%) rotate(-5deg);
}

.bs-pack-back-1 {
  width: min(31vw, 420px);
  right: clamp(100px, 10vw, 168px);
  top: 0;
  transform: rotate(-12deg);
}

.bs-pack-back-2 {
  width: min(30vw, 405px);
  right: clamp(10px, 2.5vw, 40px);
  top: 4px;
  transform: rotate(8deg);
}

.bs-nav {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 14px 0 20px;
}

.bs-nav-btn {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
}

.bs-nav-btn::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
}

.bs-nav-btn.is-prev {
  border: 1px solid #e28133;
  color: #e28133;
  background: #fff;
}

.bs-nav-btn.is-prev::before {
  transform: translate(-38%, -50%) rotate(-135deg);
}

.bs-nav-btn.is-next {
  color: #fff;
  background: #e28133;
}

.bs-nav-btn.is-next::before {
  transform: translate(-62%, -50%) rotate(45deg);
}

.bs-details-card {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(100%, 1080px);
  background: var(--primary-orange);
  border-radius: 46px;
  padding: 34px 36px 30px;
  color: white;
  z-index: 4;
}

.bs-card-content h3 {
  font-size: clamp(42px, 3.5vw, 58px);
  line-height: 1.06;
  margin-bottom: 16px;
  letter-spacing: 0.01em;
}

.bs-card-content p {
  font-size: clamp(24px, 1.6vw, 34px);
  line-height: 1.2;
  max-width: 92%;
}

.bs-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 26px;
  background: #fff;
  padding: 10px 14px 10px 28px;
  border-radius: 50px;
  gap: 16px;
}

.bs-price {
  color: #893900;
  font-weight: 900;
  font-size: clamp(48px, 2.5vw, 54px);
}

.quantity-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 156px;
  height: 48px;
  border: 1px solid var(--primary-orange);
  padding: 0 12px;
  border-radius: 24px;
  color: black;
}

.quantity-selector button {
  width: 28px;
  height: 28px;
  font-size: 24px;
  line-height: 1;
  color: #5a5a5a;
}

.quantity-selector span {
  font-size: 28px;
  line-height: 1;
}

.bs-cart-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #27b7a3;
  color: #fff;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 28px;
  padding: 14px 26px 14px 18px;
  border-radius: 30px;
  white-space: nowrap;
}

.bs-cart-arrow {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.9);
}

.bs-cart-arrow::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 9px;
  height: 9px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: translate(-66%, -50%) rotate(45deg);
}

@media (max-width: 1200px) {
  .bestseller-layout {
    min-height: 825px;
  }

  .bs-showcase {
    height: 440px;
  }

  .bs-pack-main {
    width: min(78vw, 720px);
    top: 92px;
  }

  .bs-pack-back-1,
  .bs-pack-back-2 {
    width: min(34vw, 350px);
  }

  .bs-card-content p {
    max-width: 100%;
  }
}

@media (max-width: 900px) {
  .bestseller-section {
    padding: 70px 0 68px;
  }

  .bestseller-layout {
    min-height: unset;
    padding-top: 10px;
  }

  .bs-showcase {
    height: 300px;
    margin-bottom: 26px;
  }

  .bs-pack-main {
    width: min(90vw, 600px);
    top: 75px;
  }

  .bs-pack-back-1,
  .bs-pack-back-2 {
    display: none;
  }

  .bs-details-card {
    position: static;
    transform: none;
    width: 100%;
    border-radius: 30px;
    padding: 24px 20px;
  }

  .bs-card-content h3 {
    font-size: clamp(26px, 6.2vw, 42px);
  }

  .bs-card-content p {
    font-size: clamp(17px, 3.9vw, 24px);
  }

  .bs-actions {
    flex-wrap: wrap;
    border-radius: 24px;
    padding: 12px;
  }

  .bs-price {
    width: 100%;
    font-size: clamp(34px, 8vw, 48px);
  }

  .quantity-selector {
    flex: 1;
    min-width: 120px;
  }

  .bs-cart-btn {
    font-size: 20px;
    padding: 12px 16px;
  }

  .bs-cart-arrow {
    width: 32px;
    height: 32px;
  }
}
</style>
