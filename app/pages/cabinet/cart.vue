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
                </header>

                <div class="table-body">
                  <div
                    v-for="item in cartItems"
                    :key="item.id"
                    class="cart-row"
                    role="button"
                    tabindex="0"
                    @click="goToCheckout"
                    @keydown.enter.prevent="goToCheckout"
                    @keydown.space.prevent="goToCheckout"
                  >
                    <div class="product-col">
                      <img :src="item.image" :alt="item.title" class="product-image">
                      <p class="product-name">{{ item.title }}</p>
                    </div>

                    <div class="qty-col" @click.stop>
                      <button type="button" class="qty-btn" aria-label="Уменьшить" @click="changeQty(item, -1)">−</button>
                      <span class="qty-value">{{ item.qty }}</span>
                      <button type="button" class="qty-btn" aria-label="Увеличить" @click="changeQty(item, 1)">+</button>
                    </div>

                    <p class="price-col">{{ formatPrice(item.pricePerUnit) }}</p>
                    <p class="total-col">{{ formatPrice(item.total) }}</p>
                  </div>
                </div>

                <footer class="table-footer">
                  <div class="actions-left">
                    <NuxtLink to="/catalog" class="outline-btn">
                      <span class="outline-arrow"></span>
                      <span>ПРОДОЛЖИТЬ ПОКУПКИ</span>
                    </NuxtLink>
                    <NuxtLink to="/cabinet/checkout" class="solid-btn" @click="goToCheckout">
                      <span class="solid-arrow"></span>
                      <span>ОФОРМИТЬ ЗАКАЗ</span>
                    </NuxtLink>
                  </div>

                  <p class="grand-total">Итого без доставки: <strong>{{ formatPrice(grandTotal) }}</strong></p>
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
definePageMeta({
  layout: false,
})

useHead({
  title: 'Личный кабинет — Моя корзина',
})

interface CartItem {
  id: number
  image: string
  title: string
  pricePerUnit: number
  qty: number
  total: number
}

const cartItems = ref<CartItem[]>([
  {
    id: 1,
    image: '/images/6a7f7a614fda91ca334cc955f4a5290ecd6aa646.png',
    title: 'Кордицепс «Источник жизненной силы», 60 SV',
    pricePerUnit: 5400,
    qty: 2,
    total: 10800,
  },
  {
    id: 2,
    image: '/images/6a7f7a614fda91ca334cc955f4a5290ecd6aa646.png',
    title: 'Кордицепс «Источник жизненной силы», 60 SV',
    pricePerUnit: 5400,
    qty: 2,
    total: 10800,
  },
  {
    id: 3,
    image: '/images/6a7f7a614fda91ca334cc955f4a5290ecd6aa646.png',
    title: 'Кордицепс «Источник жизненной силы», 60 SV',
    pricePerUnit: 5400,
    qty: 2,
    total: 10800,
  },
])

function changeQty(item: CartItem, delta: number) {
  const newQty = Math.max(1, item.qty + delta)
  item.qty = newQty
  item.total = item.pricePerUnit * newQty
}

const grandTotal = computed(() =>
  cartItems.value.reduce((sum, it) => sum + it.total, 0)
)

function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₸`
}

const checkoutCartState = useState<CartItem[]>('checkoutCart', () => [])

function goToCheckout() {
  checkoutCartState.value = JSON.parse(JSON.stringify(cartItems.value))
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

.cart-table {
  border: 1px solid #d0d0d0;
  border-radius: 44px;
  overflow: hidden;
  background: #ffffff;
}

.table-head,
.cart-row {
  display: grid;
  grid-template-columns: 1fr 160px 140px 140px;
  align-items: center;
  gap: 20px;
}

.table-head {
  min-height: 64px;
  padding: 0 28px;
  border-bottom: 1px solid #d8d8d8;
  background: #ffffff;
  color: #3c3c3c;
  font-size: clamp(17px, 1.1vw, 20px);
  font-weight: 600;
}

.cart-row {
  min-height: 100px;
  padding: 16px 28px;
  border-bottom: 1px solid #e8e8e8;
  background: #ffffff;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.cart-row:hover {
  background: #fafafa;
}

.product-col {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.product-image {
  width: 74px;
  height: 74px;
  border-radius: 14px;
  object-fit: cover;
  flex: 0 0 auto;
}

.product-name {
  margin: 0;
  font-size: clamp(16px, 1vw, 22px);
  font-weight: 700;
  color: #111;
  line-height: 1.2;
  transition: color 0.2s ease;
}

.product-name:hover,
.cart-row:hover .product-name {
  color: #e28133;
}

.qty-col {
  width: 140px;
  height: 48px;
  border: 1px solid #d0d0d0;
  border-radius: 999px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  background: #ffffff;
  overflow: hidden;
}

.qty-btn {
  width: 100%;
  height: 100%;
  border: 0;
  background: #ffffff;
  font-size: 28px;
  line-height: 1;
  color: #1a1a1a;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn:hover {
  background: #fff5ef;
  color: #e28133;
}

.qty-btn:active {
  background: #ffebe0;
}

.qty-value {
  font-size: clamp(18px, 1.1vw, 22px);
  font-weight: 600;
  color: #14223e;
  min-width: 2ch;
  text-align: center;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  padding: 0 4px;
}

.price-col,
.total-col {
  margin: 0;
  font-size: clamp(18px, 1.1vw, 22px);
  color: #2d2d2d;
  font-weight: 600;
  white-space: nowrap;
}

.table-footer {
  min-height: 132px;
  padding: 0 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: #ffffff;
}

.actions-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.outline-btn,
.solid-btn {
  height: 72px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 26px 0 0;
  font-size: clamp(16px, 0.9vw, 19px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

/* ПРОДОЛЖИТЬ ПОКУПКИ — контурная кнопка: белый фон, оранжевая обводка и текст */
.outline-btn {
  color: #e28133;
  background: #ffffff;
  border: 2px solid #e28133;
}

.outline-btn:hover {
  background: #e28133;
  color: #fff;
  border-color: #e28133;
}

.outline-btn:hover .outline-arrow {
  border-color: #fff;
  background: transparent;
}

.outline-btn:hover .outline-arrow::before {
  border-color: #fff;
}

/* ОФОРМИТЬ ЗАКАЗ — заливка оранжевым, белый текст */
.solid-btn {
  color: #fff;
  background: #e28133;
  border: 2px solid #e28133;
}

.solid-btn:hover {
  background: #d97428;
  border-color: #d97428;
}

/* Круг со стрелкой слева */
.outline-arrow,
.solid-arrow {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.outline-arrow {
  border: 2px solid #e28133;
  background: #ffffff;
}

.solid-arrow {
  background: #e28133;
  border: 2px solid transparent;
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

.grand-total {
  margin: 0;
  font-size: clamp(18px, 1.05vw, 22px);
  color: #343434;
  white-space: nowrap;
}

.grand-total strong {
  color: #131313;
  white-space: nowrap;
}

@media (max-width: 1500px) {
  .table-head,
  .cart-row {
    grid-template-columns: 1fr 140px 120px 120px;
    gap: 16px;
  }

  .qty-col {
    width: 130px;
    height: 44px;
  }

  .qty-btn {
    font-size: 24px;
  }

  .outline-btn,
  .solid-btn {
    height: 62px;
    font-size: clamp(13px, 1vw, 16px);
  }

  .outline-arrow,
  .solid-arrow {
    width: 62px;
    height: 62px;
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
    grid-template-columns: 1fr;
    gap: 10px;
    min-height: 0;
    padding: 14px 14px;
  }

  .product-col {
    padding-right: 0;
  }

  .table-footer {
    min-height: 0;
    padding: 16px 14px;
    flex-direction: column;
    align-items: flex-start;
  }

  .actions-left {
    flex-wrap: wrap;
  }
}
</style>
