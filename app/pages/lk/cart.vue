<template>
  <div>
    <TheHeader />
    <main class="cabinet-page">
      <CabinetBreadcrumbs current="Моя корзина" />

      <div class="container">
        <CabinetPageTitle />
      </div>

      <section class="cabinet-content">
        <div class="container">
          <div class="cabinet-grid">
            <CabinetSidebar active="cart" />

            <section class="cart-section">
              <h2 class="section-title">МОЯ КОРЗИНА</h2>

              <article class="cart-table">
                <header class="table-head">
                  <span>Товар</span>
                  <span>Кол-во</span>
                  <span>Стоимость</span>
                  <span>Итог</span>
                  <span></span>
                </header>

                <!-- Loading skeleton -->
                <div v-if="cart.fetchPending" class="table-body">
                  <div v-for="n in 3" :key="n" class="skeleton-row"></div>
                </div>

                <!-- Empty -->
                <div v-else-if="cart.isEmpty" class="table-body">
                  <p class="cart-empty">Ваша корзина пуста.</p>
                </div>

                <!-- Items -->
                <div v-else class="table-body">
                  <div
                    v-for="item in cart.items"
                    :key="item.cart_item_id"
                    class="cart-row"
                    :class="{ 'is-loading': cart.isItemLoading(item.product_id) }"
                  >
                    <!-- Product -->
                    <div class="product-col">
                      <NuxtLink :to="`/products/${item.slug}`" class="product-img-wrap">
                        <img :src="item.image" :alt="item.product_name" class="product-image">
                      </NuxtLink>
                      <div class="product-info">
                        <NuxtLink :to="`/products/${item.slug}`" class="product-name">
                          {{ item.product_name }}
                        </NuxtLink>
                        <span v-if="item.code" class="product-code">{{ item.code }}</span>
                        <span v-if="!item.in_stock" class="out-of-stock">Нет в наличии</span>
                      </div>
                    </div>

                    <!-- Quantity -->
                    <div class="qty-col" @click.stop>
                      <button
                        type="button"
                        class="qty-btn"
                        aria-label="Уменьшить"
                        :disabled="item.quantity <= 1 || cart.isItemLoading(item.product_id)"
                        @click="cart.changeQty(item.product_id, -1)"
                      >−</button>
                      <span class="qty-value">{{ item.quantity }}</span>
                      <button
                        type="button"
                        class="qty-btn"
                        aria-label="Увеличить"
                        :disabled="item.quantity >= item.stock_quantity || cart.isItemLoading(item.product_id)"
                        @click="cart.changeQty(item.product_id, 1)"
                      >+</button>
                    </div>

                    <!-- Price -->
                    <div class="price-col">
                      <span class="price-current">{{ formatPrice(item.price) }}</span>
                      <span v-if="item.has_discount && item.old_price" class="price-old">
                        {{ formatPrice(item.old_price) }}
                      </span>
                    </div>

                    <!-- Total -->
                    <p class="total-col">{{ formatPrice(item.item_total) }}</p>

                    <!-- Remove -->
                    <button
                      type="button"
                      class="remove-btn"
                      aria-label="Удалить товар"
                      :disabled="cart.isItemLoading(item.product_id)"
                      @click="cart.removeItem(item.product_id)"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Footer -->
                <footer class="table-footer">
                  <div class="actions-left">
                    <NuxtLink to="/catalog" class="outline-btn">
                      <span class="outline-arrow"></span>
                      <span>ПРОДОЛЖИТЬ ПОКУПКИ</span>
                    </NuxtLink>

                    <button
                      v-if="!cart.isEmpty"
                      type="button"
                      class="solid-btn"
                      :disabled="cart.mutating"
                      @click="goToCheckout"
                    >
                      <span class="solid-arrow"></span>
                      <span>ОФОРМИТЬ ЗАКАЗ</span>
                    </button>

                    <button
                      v-if="!cart.isEmpty"
                      type="button"
                      class="clear-btn"
                      :disabled="cart.mutating"
                      @click="cart.clearCart()"
                    >
                      Очистить корзину
                    </button>
                  </div>

                  <p v-if="!cart.isEmpty" class="grand-total">
                    Итого без доставки:
                    <strong>{{ formatPrice(cart.summary.subtotal) }}</strong>
                  </p>
                </footer>
              </article>
            </section>
          </div>
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { CartApiItem } from '~/types/cartApi'

definePageMeta({ layout: false })
useHead({ title: 'Личный кабинет — Моя корзина' })

// ── Cart API ──────────────────────────────────────────────────────────────────
const cart = useCartApi()

onMounted(() => {
  cart.fetchCart()
})

// ── Checkout transition ────────────────────────────────────────────────────────
interface CheckoutCartItem {
  id: number
  image: string
  title: string
  pricePerUnit: number
  qty: number
  total: number
}

const checkoutCart = useState<CheckoutCartItem[]>('checkoutCart', () => [])

function goToCheckout() {
  checkoutCart.value = cart.items.map((i: CartApiItem) => ({
    id: i.product_id,
    image: i.image,
    title: i.product_name,
    pricePerUnit: i.price,
    qty: i.quantity,
    total: i.item_total,
  }))
  navigateTo('/lk/checkout')
}

function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₸`
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

.section-title {
  margin: 8px 0 24px;
  font-size: clamp(32px, 2vw, 40px);
  font-weight: 700;
  color: #101010;
  letter-spacing: 0.02em;
}

/* ── Table ── */
.cart-table {
  border: 1px solid #d0d0d0;
  border-radius: 44px;
  overflow: hidden;
  background: #ffffff;
}

.table-head,
.cart-row {
  display: grid;
  grid-template-columns: 1fr 160px 140px 140px 44px;
  align-items: center;
  gap: 16px;
}

.table-head {
  min-height: 64px;
  padding: 0 24px;
  border-bottom: 1px solid #d8d8d8;
  color: #3c3c3c;
  font-size: clamp(15px, 1vw, 18px);
  font-weight: 600;
}

/* ── Skeleton ── */
.skeleton-row {
  height: 100px;
  margin: 0 24px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(90deg, #f8f8f8 25%, #efefef 50%, #f8f8f8 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 8px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Empty ── */
.cart-empty {
  padding: 48px 28px;
  margin: 0;
  font-size: 18px;
  color: #888;
  text-align: center;
}

/* ── Row ── */
.cart-row {
  min-height: 100px;
  padding: 14px 24px;
  border-bottom: 1px solid #eeeeee;
  transition: background 0.15s;
}

.cart-row:hover {
  background: #fafafa;
}

.cart-row.is-loading {
  opacity: 0.55;
  pointer-events: none;
}

/* ── Product col ── */
.product-col {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.product-img-wrap {
  flex-shrink: 0;
}

.product-image {
  width: 74px;
  height: 74px;
  border-radius: 14px;
  object-fit: cover;
  display: block;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.product-name {
  margin: 0;
  font-size: clamp(15px, 0.95vw, 20px);
  font-weight: 700;
  color: #111;
  line-height: 1.2;
  text-decoration: none;
  transition: color 0.2s;
}

.product-name:hover {
  color: #e28133;
}

.product-code {
  font-size: 12px;
  color: #aaa;
}

.out-of-stock {
  font-size: 12px;
  font-weight: 600;
  color: #e05656;
}

/* ── Qty col ── */
.qty-col {
  width: 140px;
  height: 48px;
  border: 1px solid #d0d0d0;
  border-radius: 999px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  overflow: hidden;
}

.qty-btn {
  width: 100%;
  height: 100%;
  border: 0;
  background: #fff;
  font-size: 26px;
  line-height: 1;
  color: #1a1a1a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
}

.qty-btn:hover:not(:disabled) {
  background: #fff5ef;
  color: #e28133;
}

.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-value {
  font-size: clamp(16px, 1vw, 20px);
  font-weight: 600;
  color: #14223e;
  min-width: 2ch;
  text-align: center;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  padding: 0 4px;
}

/* ── Price col ── */
.price-col {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.price-current {
  font-size: clamp(16px, 1vw, 20px);
  color: #2d2d2d;
  font-weight: 600;
  white-space: nowrap;
}

.price-old {
  font-size: clamp(13px, 0.8vw, 15px);
  color: #aaa;
  text-decoration: line-through;
  white-space: nowrap;
}

/* ── Total col ── */
.total-col {
  margin: 0;
  font-size: clamp(16px, 1vw, 20px);
  color: #2d2d2d;
  font-weight: 700;
  white-space: nowrap;
}

/* ── Remove btn ── */
.remove-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #d8d8d8;
  border-radius: 50%;
  background: #fff;
  color: #aaa;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
  flex-shrink: 0;
}

.remove-btn:hover:not(:disabled) {
  border-color: #e05656;
  color: #e05656;
}

.remove-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* ── Footer ── */
.table-footer {
  min-height: 120px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.actions-left {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

/* ── Buttons ── */
.outline-btn,
.solid-btn {
  height: 66px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 0;
  padding: 0 24px 0 0;
  font-size: clamp(14px, 0.88vw, 17px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.outline-btn {
  color: #e28133;
  background: #fff;
  border: 2px solid #e28133;
}

.outline-btn:hover {
  background: #e28133;
  color: #fff;
}

.outline-btn:hover .outline-arrow::before {
  border-color: #fff;
}

.solid-btn {
  color: #fff;
  background: #e28133;
  border: 2px solid #e28133;
}

.solid-btn:hover:not(:disabled) {
  background: #d97428;
  border-color: #d97428;
}

.solid-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
  transition: color 0.2s;
  padding: 0;
}

.clear-btn:hover:not(:disabled) {
  color: #e05656;
}

.clear-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ── Arrows ── */
.outline-arrow,
.solid-arrow {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
}

.outline-arrow {
  border: 2px solid #e28133;
  background: #fff;
}

.solid-arrow {
  background: rgba(255,255,255,0.18);
}

.outline-arrow::before,
.solid-arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  border-top: 2px solid #e28133;
  border-right: 2px solid #e28133;
  transform: translate(-62%, -50%) rotate(45deg);
}

.solid-arrow::before {
  border-color: #fff;
}

.outline-btn:hover .outline-arrow {
  border-color: #fff;
  background: transparent;
}

/* ── Grand total ── */
.grand-total {
  margin: 0;
  font-size: clamp(17px, 1vw, 21px);
  color: #343434;
  white-space: nowrap;
}

.grand-total strong {
  color: #131313;
  font-size: clamp(20px, 1.2vw, 24px);
}

/* ── Responsive ── */
@media (max-width: 1400px) {
  .table-head,
  .cart-row {
    grid-template-columns: 1fr 140px 120px 120px 36px;
    gap: 12px;
  }

  .qty-col {
    width: 130px;
    height: 44px;
  }
}

@media (max-width: 1100px) {
  .cabinet-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    margin-top: 0;
  }

  .cart-table {
    border-radius: 26px;
  }

  .table-head {
    display: none;
  }

  .cart-row {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto auto;
    gap: 8px;
    padding: 14px;
  }

  .product-col {
    grid-column: 1 / 2;
    grid-row: 1;
  }

  .qty-col {
    grid-column: 1 / 2;
    grid-row: 2;
    width: 130px;
  }

  .price-col {
    grid-column: 1 / 2;
    grid-row: 3;
  }

  .total-col {
    grid-column: 1 / 2;
    grid-row: 3;
    display: none;
  }

  .remove-btn {
    grid-column: 2;
    grid-row: 1;
    align-self: start;
  }

  .table-footer {
    min-height: 0;
    padding: 16px 14px;
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .outline-btn,
  .solid-btn {
    height: 56px;
    font-size: 13px;
  }

  .outline-arrow,
  .solid-arrow {
    width: 56px;
    height: 56px;
  }
}
</style>
