<template>
  <section class="hot-offers-section">
    <div class="container">
      <h2 class="hot-offers-title">
        <span class="hot-offers-title-orange">ГОРЯЩИЕ</span>
        <span class="hot-offers-title-black">ПРЕДЛОЖЕНИЯ</span>
      </h2>

      <div class="hot-offers-wrapper">
        <button type="button" class="nav-arrow prev" aria-label="Назад" @click="scrollPrev"></button>
        <button type="button" class="nav-arrow next" aria-label="Вперёд" @click="scrollNext"></button>

        <div ref="carouselRef" class="products-carousel">
          <div v-for="product in products" :key="product.image" class="carousel-item">
            <CabinetFavoriteCard
              :title="product.title"
              :description="product.description"
              price="5 000Т"
              :image="product.image"
              variant="blue"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const carouselRef = ref<HTMLElement | null>(null)

const products = [
  {
    image: '/images/a9af888db3be8853f23ab252ff40884690219e08.png',
    title: 'ПОЧЕЧНЫЙ ЧАЙ',
    description: 'Мягкая поддержка естественного очищения'
  },
  {
    image: '/images/acebc31125238ea02c6f2327a533eed417235ba7.png',
    title: 'ПОЧЕЧНЫЙ ЧАЙ',
    description: 'Мягкая поддержка естественного очищения'
  },
  {
    image: '/images/dab270cdd863b399b68997a9649feb91f178c56b.png',
    title: 'ПОЧЕЧНЫЙ ЧАЙ',
    description: 'Мягкая поддержка естественного очищения'
  }
]

function scrollPrev() {
  if (carouselRef.value) carouselRef.value.scrollBy({ left: -380, behavior: 'smooth' })
}

function scrollNext() {
  if (carouselRef.value) carouselRef.value.scrollBy({ left: 380, behavior: 'smooth' })
}
</script>

<style scoped>
.hot-offers-section {
  padding: 76px 0 96px;
  background-color: #fff;
}

.hot-offers-title {
  text-align: center;
  margin-bottom: 32px;
  font-size: clamp(54px, 6vw, 86px);
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1.02;
}

.hot-offers-title-orange {
  color: var(--primary-orange);
  display: block;
}

.hot-offers-title-black {
  color: #121212;
  display: block;
}

.hot-offers-wrapper {
  position: relative;
  padding: 56px 112px 42px;
  background: #8ab1d8;
  border-radius: 44px;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background: #4b93d7;
  border: 10px solid #fff;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.nav-arrow::before {
  content: "";
  width: 28px;
  height: 28px;
  border-top: 3px solid #fff;
  border-right: 3px solid #fff;
}

.nav-arrow.prev::before {
  transform: translateX(6px) rotate(-135deg);
}

.nav-arrow.next::before {
  transform: translateX(-6px) rotate(45deg);
}

.nav-arrow.prev {
  left: -40px;
}

.nav-arrow.next {
  right: -40px;
}

.products-carousel {
  display: flex;
  gap: 36px;
  overflow-x: auto;
  overflow-y: visible;
  padding: 90px 0 0;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.products-carousel::-webkit-scrollbar {
  display: none;
}

.carousel-item {
  flex: 0 0 calc((100% - 72px) / 3);
  min-width: 300px;
  max-width: 360px;
  scroll-snap-align: start;
  overflow: visible;
}

.carousel-item :deep(.favorite-card) {
  height: 100%;
  overflow: visible;
}

@media (max-width: 1200px) {
  .hot-offers-wrapper {
    padding: 38px 22px 28px;
  }

  .products-carousel {
    gap: 18px;
  }

  .carousel-item {
    flex-basis: calc((100% - 18px) / 2);
    min-width: 280px;
  }

  .nav-arrow {
    width: 84px;
    height: 84px;
    border-width: 7px;
  }

  .nav-arrow.prev {
    left: -24px;
  }

  .nav-arrow.next {
    right: -24px;
  }
}

@media (max-width: 820px) {
  .hot-offers-section {
    padding: 56px 0 70px;
  }

  .hot-offers-wrapper {
    padding: 24px 16px 18px;
    border-radius: 28px;
  }

  .products-carousel {
    gap: 12px;
  }

  .carousel-item {
    flex-basis: 86%;
    min-width: 260px;
  }

  .nav-arrow {
    width: 60px;
    height: 60px;
    border-width: 4px;
    top: auto;
    bottom: -30px;
    transform: none;
  }

  .nav-arrow::before {
    width: 14px;
    height: 14px;
  }

  .nav-arrow.prev {
    left: 30%;
  }

  .nav-arrow.next {
    right: 30%;
  }
}

@media (max-width: 520px) {
  .carousel-item {
    min-width: 240px;
  }
}
</style>
