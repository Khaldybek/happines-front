<template>
  <div>
    <TheHeader />
    <main class="cabinet-page">
      <CabinetBreadcrumbs current="Мои избранные" />

      <div class="container">
        <CabinetPageTitle />
      </div>

      <section class="cabinet-content">
        <div class="container">
          <div class="cabinet-grid">
            <CabinetSidebar active="favorites" />

            <section class="favorites-section">
              <div class="favorites-head">
                <h2 class="favorites-title">МОИ ИЗБРАННЫЕ</h2>
                <button
                  v-if="!fav.isEmpty.value && !fav.fetchPending.value"
                  type="button"
                  class="clear-btn"
                  @click="fav.clearFavorites()"
                >
                  Очистить всё
                </button>
              </div>

              <!-- Skeleton -->
              <div v-if="fav.fetchPending.value" class="favorites-grid">
                <div v-for="n in 6" :key="n" class="skeleton-card"></div>
              </div>

              <!-- Empty -->
              <div v-else-if="fav.isEmpty.value" class="favorites-empty">
                <p>Вы ещё не добавили ни одного товара в избранное.</p>
                <NuxtLink to="/catalog" class="catalog-btn">
                  <span class="catalog-arrow"></span>
                  <span>ПЕРЕЙТИ В КАТАЛОГ</span>
                </NuxtLink>
              </div>

              <!-- Grid -->
              <template v-else>
                <div class="favorites-grid">
                  <CabinetFavoriteCard
                    v-for="item in fav.items.value"
                    :key="item.favorite_id"
                    :product-id="item.product_id"
                    :title="item.product_name"
                    :price="item.price"
                    :image="item.image"
                    :slug="item.slug"
                    :code="item.code"
                    :has-discount="item.has_discount"
                    :old-price="item.old_price"
                    :in-stock="item.in_stock"
                    :is-in-cart="item.is_in_cart"
                    :is-favorite="true"
                    :loading="fav.isItemLoading(item.product_id)"
                    @favorite-click="fav.removeFavorite(item.product_id)"
                    @add-to-cart="handleAddToCart(item.product_id)"
                    @detail-click="navigateTo(`/products/${item.slug}`)"
                  />
                </div>

                <!-- Pagination -->
                <div v-if="fav.pagination.value.total_pages > 1" class="pagination">
                  <button
                    type="button"
                    class="page-btn"
                    :disabled="currentPage === 1"
                    @click="changePage(currentPage - 1)"
                  >←</button>

                  <button
                    v-for="p in pageRange"
                    :key="p"
                    type="button"
                    class="page-btn"
                    :class="{ active: p === currentPage }"
                    @click="changePage(p)"
                  >{{ p }}</button>

                  <button
                    type="button"
                    class="page-btn"
                    :disabled="currentPage === fav.pagination.value.total_pages"
                    @click="changePage(currentPage + 1)"
                  >→</button>
                </div>
              </template>
            </section>
          </div>
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: 'Личный кабинет — Мои избранные' })

const fav = useFavoritesApi()
const cart = useCartApi()

const currentPage = ref(1)

onMounted(() => {
  fav.fetchFavorites(currentPage.value)
})

const pageRange = computed(() => {
  const total = fav.pagination.value.total_pages
  const current = currentPage.value
  const range: number[] = []
  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    range.push(i)
  }
  return range
})

function changePage(page: number) {
  currentPage.value = page
  fav.fetchFavorites(page)
}

async function handleAddToCart(productId: number) {
  await cart.addItem(productId, 1)
  // Refresh to update is_in_cart flag
  fav.fetchFavorites(currentPage.value)
}
</script>

<style scoped>
.cabinet-page {
  background: #ffffff;
  padding-bottom: 34px;
}

.cabinet-content {
  padding-bottom: 26px;
}

.cabinet-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
  align-items: start;
}

/* ── Header ── */
.favorites-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 100px;
}

.favorites-title {
  margin: 10px 0 0;
  font-size: clamp(40px, 2.1vw, 42px);
  color: #111;
}

.clear-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #aaa;
  font-size: clamp(14px, 0.85vw, 16px);
  font-family: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  padding: 0;
  transition: color 0.2s;
}

.clear-btn:hover {
  color: #e05656;
}

/* ── Skeleton ── */
.skeleton-card {
  height: 390px;
  border-radius: 40px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Empty ── */
.favorites-empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 40px 0;
}

.favorites-empty p {
  margin: 0;
  font-size: clamp(18px, 1.2vw, 22px);
  color: #888;
}

.catalog-btn {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.catalog-arrow {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #e28133;
  position: relative;
  flex-shrink: 0;
}

.catalog-arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: translate(-62%, -50%) rotate(45deg);
}

.catalog-btn span:last-child {
  height: 52px;
  border-radius: 999px;
  background: #e28133;
  color: #fff;
  padding: 0 22px;
  margin-left: -2px;
  display: inline-flex;
  align-items: center;
  font-size: clamp(15px, 0.9vw, 17px);
  font-weight: 800;
  text-transform: uppercase;
}

/* ── Grid ── */
.favorites-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

/* ── Pagination ── */
.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.page-btn {
  min-width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 1.5px solid #d8d8d8;
  background: #fff;
  color: #333;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  padding: 0 8px;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}

.page-btn:hover:not(:disabled) {
  border-color: #e28133;
  color: #e28133;
}

.page-btn.active {
  background: #e28133;
  border-color: #e28133;
  color: #fff;
}

.page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* ── Responsive ── */
@media (max-width: 1300px) {
  .favorites-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1100px) {
  .cabinet-grid {
    grid-template-columns: 1fr;
  }

  .favorites-head {
    margin-bottom: 80px;
  }

  .favorites-title {
    margin-top: 0;
  }
}

@media (max-width: 760px) {
  .favorites-grid {
    grid-template-columns: 1fr;
  }
}
</style>
