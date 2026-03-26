<template>
  <article class="order-card">
    <header class="order-head">
      <div class="order-head-left">
        <span class="order-id">#{{ order.id }}</span>
        <span class="order-date">{{ order.created_at }}</span>
        <span
          class="order-status-badge"
          :style="{ background: statusBg, color: order.status.color }"
        >
          {{ order.status.name }}
        </span>
      </div>
      <p class="order-sum">
        <span>Итого:</span>
        {{ formatPrice(order.grand_total) }}
      </p>
    </header>

    <div class="order-body">
      <!-- Products -->
      <section class="order-products">
        <div class="products-head">
          <span>Название товара</span>
          <span>Кол-во</span>
          <span>Цена</span>
        </div>

        <div v-for="item in visibleItems" :key="item.id" class="product-row">
          <div class="prod-name">
            <img :src="item.image" :alt="item.product_name">
            <span>{{ item.product_name }}</span>
          </div>
          <span class="prod-count">{{ item.quantity }}</span>
          <span class="prod-price">{{ formatPrice(item.total_price) }}</span>
        </div>

        <button
          v-if="order.products.length > collapsedCount"
          class="expand-btn"
          type="button"
          @click="isExpanded = !isExpanded"
        >
          {{ isExpanded ? 'Свернуть' : `Ещё ${order.products.length - collapsedCount}` }}
          <span class="expand-arrow" :class="{ up: isExpanded }">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1l5 5 5-5" stroke="#e28133" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>

        <div class="products-total">
          <span>Товары</span>
          <span>{{ formatPrice(order.products_total) }}</span>
        </div>
      </section>

      <!-- Details -->
      <aside class="order-details">
        <p class="detail-section-title">Доставка</p>
        <p>{{ order.delivery.title }}</p>
        <p v-if="order.delivery.estimated_time" class="detail-muted">{{ order.delivery.estimated_time }}</p>
        <p>
          {{ order.delivery.is_free ? 'Бесплатно' : formatPrice(order.delivery_price) }}
        </p>

        <p class="detail-section-title">Оплата</p>
        <p>{{ order.payment_method.title }}</p>

        <p class="detail-section-title">Адрес</p>
        <p>{{ order.address }}</p>
        <p>{{ order.name }}</p>
        <p>{{ order.phone }}</p>

        <template v-if="order.comment">
          <p class="detail-section-title">Комментарий</p>
          <p>{{ order.comment }}</p>
        </template>
      </aside>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { MyOrder } from '~/types/ordersPage'

const props = withDefaults(defineProps<{
  order: MyOrder
  collapsedCount?: number
  initialExpanded?: boolean
}>(), {
  collapsedCount: 3,
  initialExpanded: false,
})

const isExpanded = ref(props.initialExpanded)

const visibleItems = computed(() =>
  isExpanded.value ? props.order.products : props.order.products.slice(0, props.collapsedCount),
)

/** Полупрозрачная заливка из цвета статуса */
const statusBg = computed(() => `${props.order.status.color}1a`)

function formatPrice(value: number): string {
  return `${value.toLocaleString('ru-RU')} ₸`
}
</script>

<style scoped>
.order-card {
  border: 1px solid #d2d2d2;
  border-radius: 30px;
  overflow: hidden;
  background: #ffffff;
}

/* ── Header ── */
.order-head {
  min-height: 60px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid #d8d8d8;
  flex-wrap: wrap;
}

.order-head-left {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.order-id {
  font-size: clamp(16px, 1vw, 18px);
  font-weight: 800;
  color: #181818;
}

.order-date {
  font-size: clamp(14px, 0.9vw, 15px);
  color: #8a8a8a;
}

.order-status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: clamp(13px, 0.85vw, 15px);
  font-weight: 600;
  border: 1px solid currentColor;
}

.order-sum {
  margin: 0;
  font-size: clamp(15px, 0.95vw, 17px);
  color: #171717;
  font-weight: 700;
  white-space: nowrap;
}

.order-sum span {
  color: #6b6b6b;
  font-weight: 400;
  margin-right: 4px;
}

/* ── Body ── */
.order-body {
  display: grid;
  grid-template-columns: 1.95fr 1fr;
}

/* ── Products ── */
.order-products {
  padding: 14px 16px 12px;
}

.products-head {
  display: grid;
  grid-template-columns: 1fr 100px 120px;
  font-size: clamp(13px, 0.85vw, 15px);
  color: #888;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid #f0f0f0;
}

.product-row {
  display: grid;
  grid-template-columns: 1fr 100px 120px;
  align-items: center;
  min-height: 64px;
  border-bottom: 1px solid #f5f5f5;
}

.product-row:last-of-type {
  border-bottom: none;
}

.prod-name {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 8px;
}

.prod-name img {
  width: 62px;
  height: 48px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
}

.prod-name span {
  font-size: clamp(14px, 0.88vw, 15px);
  font-weight: 600;
  color: #202020;
  line-height: 1.3;
}

.prod-count,
.prod-price {
  font-size: clamp(14px, 0.88vw, 15px);
  color: #242424;
  font-weight: 600;
}

.expand-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 8px 0 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: #3f3f3f;
  font-size: clamp(14px, 0.88vw, 15px);
  font-family: inherit;
  padding: 0;
}

.expand-arrow {
  display: flex;
  align-items: center;
  transition: transform 0.2s;
}

.expand-arrow.up svg {
  transform: rotate(180deg);
}

.products-total {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  margin-top: 4px;
  border-top: 1px solid #e8e8e8;
  font-size: clamp(14px, 0.9vw, 15px);
  color: #555;
  font-weight: 600;
}

/* ── Details ── */
.order-details {
  border-left: 1px solid #d8d8d8;
  padding: 14px 16px;
}

.order-details p {
  margin: 0 0 5px;
  font-size: clamp(14px, 0.85vw, 15px);
  line-height: 1.4;
  color: #5a5a5a;
}

.detail-section-title {
  font-size: clamp(15px, 0.95vw, 17px) !important;
  font-weight: 700;
  color: #2d2d2d !important;
  margin: 12px 0 4px !important;
}

.detail-section-title:first-child {
  margin-top: 0 !important;
}

.detail-muted {
  color: #999 !important;
  font-size: 13px !important;
}

/* ── Responsive ── */
@media (max-width: 1050px) {
  .order-body {
    grid-template-columns: 1fr;
  }

  .order-details {
    border-left: none;
    border-top: 1px solid #d8d8d8;
  }
}

@media (max-width: 720px) {
  .products-head,
  .product-row {
    grid-template-columns: 1fr 70px 90px;
  }

  .prod-name img {
    width: 48px;
    height: 38px;
  }
}

@media (max-width: 520px) {
  .order-head {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 16px;
    gap: 8px;
  }

  .products-head,
  .product-row {
    grid-template-columns: 1fr 60px 80px;
  }
}
</style>
