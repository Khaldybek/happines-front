<template>
  <article class="favorite-card" :class="[variant ? `variant-${variant}` : '', { 'is-loading': loading }]">
    <div class="product-image-wrap">
      <component
        :is="slug ? 'NuxtLink' : 'div'"
        :to="slug ? `/products/${slug}` : undefined"
        class="product-image-link"
      >
        <img :src="image" :alt="title" class="product-image">
      </component>
    </div>

    <div class="favorite-content">
      <component :is="slug ? 'NuxtLink' : 'h3'" :to="slug ? `/products/${slug}` : undefined" class="product-title">
        {{ title }}
      </component>
      <p v-if="description" class="product-description">{{ description }}</p>
      <span v-if="code" class="product-code">{{ code }}</span>
      <span v-if="inStock === false" class="out-of-stock">Нет в наличии</span>

      <div class="price-wrap">
        <p class="product-price">{{ displayPrice }}</p>
        <p v-if="hasDiscount && displayOldPrice" class="product-old-price">{{ displayOldPrice }}</p>
      </div>

      <footer class="favorite-actions">
        <button
          type="button"
          class="icon-heart"
          :class="{ 'is-active': isFavorite }"
          :aria-label="isFavorite ? 'Убрать из избранного' : 'В избранное'"
          :disabled="loading"
          @click.stop="$emit('favoriteClick')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20.5c-.3 0-.6-.1-.8-.3C8.4 17.8 4 14.2 4 9.8 4 7.2 6 5 8.6 5c1.4 0 2.7.6 3.6 1.7C13.1 5.6 14.4 5 15.8 5 18.4 5 20.4 7.2 20.4 9.8c0 4.4-4.4 8-7.2 10.4-.3.2-.6.3-1.2.3z" />
          </svg>
        </button>
        <div class="cart-controls">
          <button
            v-if="slug"
            type="button"
            class="icon-arrow"
            aria-label="Подробнее"
            @click.stop="$emit('detailClick')"
          ></button>
          <button
            type="button"
            class="cart-btn"
            :class="{ 'in-cart': isInCart }"
            @click.stop="$emit('addToCart')"
          >
            {{ isInCart ? 'В КОРЗИНЕ' : 'В КОРЗИНУ' }}
          </button>
        </div>
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  productId?: number
  title: string
  description?: string
  /** Строка (старый формат) ИЛИ число (из API) */
  price: string | number
  image: string
  isFavorite?: boolean
  variant?: 'blue' | 'orange'
  /** Новые пропсы из API */
  slug?: string
  code?: string
  hasDiscount?: boolean
  oldPrice?: number | null
  inStock?: boolean
  isInCart?: boolean
  loading?: boolean
}>(), {
  isFavorite: false,
  hasDiscount: false,
  inStock: true,
  isInCart: false,
  loading: false,
})

defineEmits<{
  addToCart: []
  favoriteClick: []
  detailClick: []
}>()

const displayPrice = computed(() =>
  typeof props.price === 'number'
    ? `${props.price.toLocaleString('ru-RU')} ₸`
    : props.price,
)

const displayOldPrice = computed(() =>
  props.oldPrice ? `${props.oldPrice.toLocaleString('ru-RU')} ₸` : null,
)
</script>

<style scoped>
.favorite-card {
  position: relative;
  border-radius: 40px;
  /* Запас под absolute-фото (top:-86, h:168 → низ ~82px): в проде шрифты/субпиксели иначе, чем в dev */
  padding: 120px 18px 16px;
  min-height: 390px;
  background: #ffffff;
  color: #111;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.favorite-card:hover {
  background: #e28133;
  color: #fff;
  border-color: #e28133;
  box-shadow: 0 6px 20px rgba(226, 129, 51, 0.35);
}

.product-image-wrap {
  position: absolute;
  top: -86px;
  left: 50%;
  transform: translateX(-50%);
  width: min(96%, 294px);
  height: 168px;
  border-radius: 2px;
  z-index: 1;
  pointer-events: none;
}

.product-image-link {
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.favorite-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 14px;
  height: 100%;
}

.product-title {
  margin: 0;
  font-size: clamp(24px, 1.45vw, 28px);
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  font-weight: 700;
}

.product-description {
  margin: 0;
  min-height: 84px;
  font-size: clamp(16px, 0.95vw, 20px);
  line-height: 1.14;
  opacity: 0.9;
}

.favorite-card:hover .product-description {
  opacity: 0.96;
}

.price-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.product-price {
  margin: 0;
  font-size: clamp(34px, 2vw, 42px);
  line-height: 1;
  font-weight: 700;
}

.product-old-price {
  margin: 0;
  font-size: clamp(16px, 1vw, 20px);
  text-decoration: line-through;
  opacity: 0.55;
}

.product-code {
  font-size: 12px;
  opacity: 0.6;
  display: block;
  margin-bottom: 2px;
}

.out-of-stock {
  font-size: 12px;
  font-weight: 600;
  color: #e05656;
  display: block;
  margin-bottom: 4px;
}

.favorite-card:hover .out-of-stock {
  color: #ffb3b3;
}

.cart-btn.in-cart {
  opacity: 0.7;
}

.favorite-card.is-loading {
  opacity: 0.55;
  pointer-events: none;
}

.favorite-actions {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.icon-heart {
  border: 0;
  background: transparent;
  color: #e28133;
  width: 28px;
  height: 28px;
  padding: 0;
  cursor: pointer;
  transition: color 0.25s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-heart svg {
  width: 100%;
  height: 100%;
}

.icon-heart path {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: fill 0.2s ease;
}

.icon-heart.is-active path {
  fill: currentColor;
}

.favorite-card:hover .icon-heart {
  color: #fff;
}

.cart-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon-arrow {
  width: 49px;
  height: 49px;
  border: 0;
  border-radius: 999px;
  background: #e28133;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.icon-arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: translate(-62%, -50%) rotate(45deg);
  transition: border-color 0.25s ease;
}

.favorite-card:hover .icon-arrow {
  background: #fff;
}

.favorite-card:hover .icon-arrow::before {
  border-color: #16c3b2;
}

.cart-btn {
  border: 0;
  border-radius: 999px;
  height: 49px;
  padding: 0 24px;
  font-size: clamp(15px, 0.8vw, 18px);
  font-weight: 700;
  color: #e28133;
  background: #fff;
  border: 2px solid #e28133;
  cursor: pointer;
  transition: color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
}

.favorite-card:hover .cart-btn {
  color: #16c3b2;
  background: #fff;
  border-color: #16c3b2;
}

/* Вариант: синяя карточка (как на горячих предложениях / каталоге), фото выходит за верх карточки как в избранном */
.favorite-card.variant-blue {
  /* Фото h:200, top:-86 → низ ~114px; 112px давало почти ноль зазора и наезды в проде */
  padding: 132px 18px 16px;
  min-height: 390px;
  position: relative;
  background: #4b93d7;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #fff;
  overflow: visible;
}

.favorite-card.variant-blue .product-image-wrap {
  position: absolute;
  top: -86px;
  left: 50%;
  transform: translateX(-50%);
  width: min(100%, 320px);
  height: 200px;
  background: transparent;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.favorite-card.variant-blue .product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
}

.favorite-card.variant-blue .favorite-content {
  padding: 0;
  flex: 1;
  background: transparent;
  gap: 14px;
}

.favorite-card.variant-blue .product-title,
.favorite-card.variant-blue .product-description,
.favorite-card.variant-blue .product-price {
  color: #fff;
}

.favorite-card.variant-blue .product-description {
  opacity: 0.95;
}

.favorite-card.variant-blue .icon-heart {
  color: #fff;
}

.favorite-card.variant-blue .icon-arrow {
  background: var(--primary-orange, #e28133);
}

.favorite-card.variant-blue .cart-btn {
  background: var(--primary-orange, #e28133);
  color: #fff;
  border-color: var(--primary-orange, #e28133);
}

.favorite-card.variant-blue:hover {
  background: #4b93d7;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.favorite-card.variant-blue:hover .icon-heart,
.favorite-card.variant-blue:hover .cart-btn {
  color: #fff;
}

.favorite-card.variant-blue:hover .icon-arrow {
  background: #c96f28;
}

/* Вариант: оранжевый акцент (каталог), фото выходит за верх карточки как в избранном */
.favorite-card.variant-orange {
  padding: 132px 18px 16px;
  min-height: 390px;
  position: relative;
  background: #4b93d7;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #fff;
  overflow: visible;
}

.favorite-card.variant-orange .product-image-wrap {
  position: absolute;
  top: -86px;
  left: 50%;
  transform: translateX(-50%);
  width: min(100%, 320px);
  height: 200px;
  background: transparent;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.favorite-card.variant-orange .product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
}

.favorite-card.variant-orange .favorite-content {
  padding: 0;
  flex: 1;
  background: transparent;
  gap: 14px;
}

.favorite-card.variant-orange .product-title,
.favorite-card.variant-orange .product-description,
.favorite-card.variant-orange .product-price {
  color: #fff;
}

.favorite-card.variant-orange .product-description {
  opacity: 0.95;
}

.favorite-card.variant-orange .icon-heart {
  color: #fff;
}

.favorite-card.variant-orange .icon-arrow {
  background: var(--primary-orange, #e28133);
}

.favorite-card.variant-orange .cart-btn {
  background: #2cb9a2;
  color: #fff;
  border-color: #2cb9a2;
}

.favorite-card.variant-orange:hover {
  background: #4b93d7;
}

.favorite-card.variant-orange:hover .cart-btn {
  background: #26a392;
  border-color: #26a392;
}

@media (max-width: 1300px) {
  .favorite-card {
    min-height: 360px;
  }

}

@media (max-width: 900px) {
  .favorite-card {
    min-height: 340px;
    /* низ фото ~80px при top:-72, h:152 */
    padding-top: 108px;
  }

  .product-image-wrap {
    top: -72px;
    height: 152px;
  }

  .favorite-card.variant-blue,
  .favorite-card.variant-orange {
    /* низ фото ~108px при h:180 — раньше padding 102 давал перекрытие заголовка */
    padding-top: 124px;
  }

  .favorite-card.variant-blue .product-image-wrap,
  .favorite-card.variant-orange .product-image-wrap {
    top: -72px;
    height: 180px;
    width: min(100%, 280px);
  }

  .product-title {
    font-size: clamp(20px, 6vw, 30px);
  }

  .product-price {
    font-size: clamp(32px, 9vw, 42px);
  }
}
</style>
