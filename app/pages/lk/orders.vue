<template>
  <div>
    <TheHeader />
    <main class="cabinet-page">
      <CabinetBreadcrumbs current="Мои заказы" />

      <div class="container">
        <CabinetPageTitle />
      </div>

      <section class="cabinet-content">
        <div class="container">
          <div class="cabinet-grid">
            <CabinetSidebar active="orders" />

            <section class="orders-section">
              <h2 class="orders-title">МОИ ЗАКАЗЫ</h2>

              <!-- Loading -->
              <div v-if="pending" class="orders-list">
                <div v-for="n in 3" :key="n" class="skeleton-order"></div>
              </div>

              <!-- Empty -->
              <div v-else-if="!orders.length" class="orders-empty">
                <p>У вас пока нет заказов</p>
                <NuxtLink to="/catalog" class="empty-btn">
                  <span class="empty-arrow"></span>
                  <span>ПЕРЕЙТИ В КАТАЛОГ</span>
                </NuxtLink>
              </div>

              <!-- Orders list -->
              <template v-else>
                <div class="orders-list">
                  <CabinetOrderCard
                    v-for="order in orders"
                    :key="order.id"
                    :order="order"
                    :collapsed-count="3"
                  />
                </div>

                <!-- Pagination -->
                <div v-if="lastPage > 1" class="pagination">
                  <button
                    type="button"
                    class="page-btn"
                    :disabled="currentPage === 1"
                    @click="currentPage--"
                  >
                    ←
                  </button>

                  <button
                    v-for="p in pageRange"
                    :key="p"
                    type="button"
                    class="page-btn"
                    :class="{ active: p === currentPage }"
                    @click="currentPage = p"
                  >
                    {{ p }}
                  </button>

                  <button
                    type="button"
                    class="page-btn"
                    :disabled="currentPage === lastPage"
                    @click="currentPage++"
                  >
                    →
                  </button>
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
useHead({ title: 'Личный кабинет — Мои заказы' })

const currentPage = ref(1)
const { data, pending } = useMyOrders(currentPage)

const orders = computed(() => data.value?.orders ?? [])
const lastPage = computed(() => data.value?.pagination?.total_pages ?? 1)

const pageRange = computed(() => {
  const total = lastPage.value
  const current = currentPage.value
  const delta = 2
  const range: number[] = []

  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i)
  }
  return range
})
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

.orders-title {
  margin: 10px 0 18px;
  font-size: clamp(38px, 2.1vw, 42px);
  color: #101010;
}

/* ── List ── */
.orders-list {
  display: grid;
  gap: 18px;
}

/* ── Skeleton ── */
.skeleton-order {
  height: 220px;
  border-radius: 30px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Empty ── */
.orders-empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 40px 0;
}

.orders-empty p {
  margin: 0;
  font-size: clamp(18px, 1.2vw, 22px);
  color: #888;
}

.empty-btn {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  gap: 0;
}

.empty-arrow {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #e28133;
  position: relative;
  flex-shrink: 0;
}

.empty-arrow::before {
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

.empty-btn span:last-child {
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

/* ── Pagination ── */
.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
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
@media (max-width: 1100px) {
  .cabinet-grid {
    grid-template-columns: 1fr;
  }

  .orders-title {
    margin-top: 0;
  }
}
</style>
