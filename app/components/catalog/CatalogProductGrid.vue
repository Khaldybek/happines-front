<template>
  <section class="products-section">
    <div class="container">
      <div class="product-grid">
        <CabinetFavoriteCard
          v-for="(product, index) in products"
          :key="product.id ?? index"
          :title="product.title"
          :description="product.description"
          :price="product.price"
          :image="product.image"
          :variant="product.tealBtn ? 'orange' : 'blue'"
          @add-to-cart="onAddToCart(product)"
        />
      </div>
      <div class="pagination">
        <button type="button" class="page-nav" aria-label="Назад" @click="goPrev">
          <img src="/images/2_788.svg" alt="prev">
        </button>
        <div class="page-numbers">
          <button
            v-for="n in totalPages"
            :key="n"
            type="button"
            class="page-num"
            :class="{ active: n === currentPage, green: n === currentPage && useGreen }"
            @click="goTo(n)"
          >
            {{ n }}
          </button>
        </div>
        <button type="button" class="page-nav" aria-label="Вперёд" @click="goNext">
          <img src="/images/2_802.svg" alt="next">
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Product {
  id?: string
  title: string
  description: string
  price: string
  image: string
  arrowIcon?: string
  tealBtn?: boolean
  showTap?: boolean
}

const props = withDefaults(
  defineProps<{
    products: Product[]
    currentPage?: number
    totalPages?: number
    useGreen?: boolean
  }>(),
  { currentPage: 1, totalPages: 5, useGreen: false }
)

const emit = defineEmits<{
  'update:currentPage': [number]
  addToCart: [Product]
}>()

function goTo(page: number) {
  emit('update:currentPage', page)
}

function goPrev() {
  if (props.currentPage > 1) emit('update:currentPage', props.currentPage - 1)
}

function goNext() {
  if (props.currentPage < props.totalPages) emit('update:currentPage', props.currentPage + 1)
}

function onAddToCart(product: Product) {
  emit('addToCart', product)
}
</script>

<style scoped>
.products-section {
  padding: 96px 0 40px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 25px;
  row-gap: 96px;
  margin-bottom: 50px;
}

.product-grid :deep(.favorite-card) {
  height: 100%;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.page-nav {
  width: 34px;
  height: 24px;
  border-radius: 145px;
  border: 1px solid #a4a4a4;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.page-numbers {
  display: flex;
  gap: 9px;
}

.page-num {
  width: 39px;
  height: 27px;
  border-radius: 85px;
  border: 1px solid #a4a4a4;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1e1e1e;
  font: inherit;
}

.page-num.active {
  background: #1e1e1e;
  color: white;
  border-color: #1e1e1e;
}

.page-num.green {
  background: var(--primary-green);
  color: white;
  border-color: var(--primary-green);
}

@media (max-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 82px;
  }
}

@media (max-width: 900px) {
  .products-section {
    padding-top: 72px;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 68px;
  }
}

@media (max-width: 600px) {
  .products-section {
    padding-top: 56px;
  }

  .product-grid {
    grid-template-columns: 1fr;
    row-gap: 54px;
  }
}
</style>
