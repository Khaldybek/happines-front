<template>
  <article class="order-card" :class="{ 'is-highlight': highlight }">
    <header class="order-head">
      <p class="order-status"><span>Статус:</span> {{ status }} {{ dateTime }}</p>
      <p class="order-sum"><span>Сумма:</span> {{ total }}</p>
    </header>

    <div class="order-body">
      <section class="order-products">
        <div class="products-head">
          <span>Название товара</span>
          <span>Количество</span>
          <span>Цена</span>
        </div>

        <div class="product-row" v-for="(item, i) in visibleItems" :key="`${item.title}-${i}`">
          <div class="prod-name">
            <img :src="item.image" :alt="item.title">
            <span>{{ item.title }}</span>
          </div>
          <span class="prod-count">{{ item.count }}</span>
          <span class="prod-price">{{ item.price }}</span>
        </div>

        <button class="expand-btn" type="button" @click="isExpanded = !isExpanded">
          {{ isExpanded ? 'Свернуть' : 'Развернуть' }}
          <span class="expand-arrow" :class="{ up: isExpanded }">⌃</span>
        </button>
      </section>

      <aside class="order-details">
        <p><strong>Способ оплаты:</strong> {{ payment }}</p>
        <p><strong>Доставка:</strong> {{ delivery }}</p>
        <p class="detail-title">Адрес</p>
        <p>{{ address }}</p>
        <p>{{ person }}</p>
        <p>{{ phone }}</p>
        <p>{{ email }}</p>
        <p class="detail-title">Комментарий к заказу</p>
        <p>{{ comment }}</p>
      </aside>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface OrderItem {
  image: string
  title: string
  count: number
  price: string
}

const props = defineProps<{
  status: string
  dateTime: string
  total: string
  payment: string
  delivery: string
  address: string
  person: string
  phone: string
  email: string
  comment: string
  items: OrderItem[]
  collapsedCount?: number
  initialExpanded?: boolean
  highlight?: boolean
}>()

const isExpanded = ref(Boolean(props.initialExpanded))

const visibleItems = computed(() => {
  const collapsedCount = props.collapsedCount ?? 3
  return isExpanded.value ? props.items : props.items.slice(0, collapsedCount)
})
</script>

<style scoped>
.order-card {
  border: 1px solid #d2d2d2;
  border-radius: 30px;
  overflow: hidden;
  background: #ffffff;
}

.order-card.is-highlight {
  border: 1px solid #d2d2d2;
}

.order-head {
  min-height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d8d8d8;
}

.order-status,
.order-sum {
  margin: 0;
  font-size: clamp(15px, 0.95vw, 17px);
  color: #171717;
}

.order-status span,
.order-sum span {
  color: #6b6b6b;
}

.order-body {
  display: grid;
  grid-template-columns: 1.95fr 1fr;
}

.order-products {
  padding: 14px 16px 12px;
}

.products-head {
  display: grid;
  grid-template-columns: 1fr 120px 120px;
  font-size: clamp(15px, 0.9vw, 16px);
  color: #666;
  margin-bottom: 8px;
}

.product-row {
  display: grid;
  grid-template-columns: 1fr 120px 120px;
  align-items: center;
  min-height: 64px;
}

.prod-name {
  display: flex;
  align-items: center;
  gap: 12px;
}

.prod-name img {
  width: 62px;
  height: 48px;
  object-fit: cover;
  border-radius: 10px;
}

.prod-name span {
  font-size: clamp(15px, 0.9vw, 16px);
  font-weight: 700;
  color: #202020;
}

.prod-count,
.prod-price {
  font-size: clamp(15px, 0.9vw, 16px);
  color: #242424;
  font-weight: 700;
}

.expand-btn {
  display: block;
  margin: 2px auto 0;
  color: #3f3f3f;
  font-size: clamp(15px, 0.9vw, 16px);
}

.expand-arrow {
  display: inline-block;
  color: #e28133;
  margin-left: 6px;
  transform: rotate(180deg);
}

.expand-arrow.up {
  transform: rotate(0deg);
}

.order-details {
  border-left: 1px solid #d8d8d8;
  padding: 14px 16px;
}

.order-details p {
  margin: 0 0 6px;
  font-size: clamp(14px, 0.85vw, 15px);
  line-height: 1.26;
  color: #5a5a5a;
}

.order-details p strong {
  color: #2f2f2f;
}

.detail-title {
  font-size: clamp(24px, 1.22vw, 21px) !important;
  font-weight: 800;
  color: #2d2d2d !important;
  margin: 8px 0 4px !important;
}

@media (max-width: 1050px) {
  .order-body {
    grid-template-columns: 1fr;
  }

  .order-details {
    border-left: 0;
    border-top: 1px solid #d8d8d8;
  }
}

@media (max-width: 720px) {
  .products-head,
  .product-row {
    grid-template-columns: 1fr 80px 90px;
  }

  .prod-name span {
    font-size: 14px;
  }

  .prod-name img {
    width: 52px;
    height: 42px;
  }
}
</style>
