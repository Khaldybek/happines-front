<template>
  <article class="favorite-card" :class="variant ? `variant-${variant}` : ''">
    <div class="product-image-wrap">
      <img :src="image" :alt="title" class="product-image">
    </div>

    <div class="favorite-content">
      <h3 class="product-title">{{ title }}</h3>
      <p class="product-description">{{ description }}</p>
      <p class="product-price">{{ price }}</p>

      <footer class="favorite-actions">
        <button type="button" class="icon-heart" aria-label="В избранное" @click="$emit('favoriteClick')">♡</button>
        <div class="cart-controls">
          <button type="button" class="icon-arrow" aria-label="Подробнее" @click="$emit('detailClick')"></button>
          <button type="button" class="cart-btn" @click="$emit('addToCart')">В КОРЗИНУ</button>
        </div>
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  price: string
  image: string
  variant?: 'blue' | 'orange'
}>()
defineEmits<{
  addToCart: []
  favoriteClick: []
  detailClick: []
}>()
</script>

<style scoped>
.favorite-card {
  position: relative;
  border-radius: 40px;
  padding: 112px 18px 16px;
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
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.favorite-content {
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

.product-price {
  margin: 0;
  font-size: clamp(40px, 2.1vw, 42px);
  line-height: 1;
  font-weight: 700;
}

.favorite-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.icon-heart {
  border: 0;
  background: transparent;
  color: #e28133;
  width: 24px;
  height: 24px;
  font-size: 34px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
  transition: color 0.25s ease;
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
  padding: 112px 18px 16px;
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
  padding: 112px 18px 16px;
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
    padding-top: 102px;
  }

  .product-image-wrap {
    top: -72px;
    height: 152px;
  }

  .favorite-card.variant-blue,
  .favorite-card.variant-orange {
    padding-top: 102px;
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
