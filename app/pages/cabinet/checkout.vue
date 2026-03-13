<template>
  <div>
    <TheHeader />
    <main class="cabinet-page">
      <CabinetBreadcrumbs :items="breadcrumbs" />

      <section class="checkout-content">
        <div class="container">
          <h1 class="page-title">ОФОРМЛЕНИЕ ЗАКАЗА</h1>

          <div class="checkout-grid">
            <section class="checkout-main">
              <article class="checkout-card">
                <h2 class="step-title">1. Адрес</h2>
                <input class="input-line" type="text" value="Казахстан, г Алматы ул. Эльбека, 61/350," readonly>
                <button type="button" class="edit-link">Изменить адрес</button>
              </article>

              <article class="checkout-card">
                <h2 class="step-title">2. Способ доставки</h2>
                <div class="option-grid">
                  <label class="option-card active">
                    <input type="radio" name="delivery" checked>
                    <span class="check"></span>
                    <div>
                      <p class="option-title">Доставка</p>
                      <p class="option-text">Время: от 1 до 3 дней</p>
                    </div>
                  </label>

                  <label class="option-card">
                    <input type="radio" name="delivery">
                    <span class="check"></span>
                    <div>
                      <p class="option-title">Самовывоз</p>
                      <p class="option-text">г. Алматы, ул. Сейфуллина 171</p>
                    </div>
                  </label>
                </div>
              </article>

              <article class="checkout-card">
                <h2 class="step-title">3. Способ оплаты</h2>
                <div class="option-grid">
                  <label class="option-card active payment-card">
                    <input type="radio" name="payment" checked>
                    <span class="check"></span>
                    <p class="option-title">Карта</p>
                    <span class="payment-icon payment-icon-card" aria-hidden="true">💳</span>
                  </label>

                  <label class="option-card payment-card">
                    <input type="radio" name="payment">
                    <span class="check"></span>
                    <p class="option-title">Каспи QR</p>
                    <span class="payment-icon payment-icon-kaspi" aria-hidden="true">Kaspi QR</span>
                  </label>
                </div>
              </article>

              <article class="checkout-card">
                <h2 class="step-title">4. Контактная информация</h2>
                <div class="field-grid">
                  <label class="field-group">
                    <span class="field-label">Имя</span>
                    <input type="text" class="input-line" placeholder="Введите ваше имя">
                  </label>

                  <label class="field-group">
                    <span class="field-label">Номер телефона</span>
                    <input type="tel" class="input-line" placeholder="Введите ваш телефон">
                  </label>

                  <label class="field-group field-full">
                    <span class="field-label">Комментарий</span>
                    <textarea class="textarea" placeholder="Введите ваш комментарий"></textarea>
                  </label>
                </div>
              </article>
            </section>

            <aside class="order-summary">
              <h3>Ваш заказ</h3>

              <div class="summary-line">
                <span>Кол-во товаров в корзине</span>
                <strong>{{ itemCount }}</strong>
              </div>
              <div class="summary-line">
                <span>Сумма</span>
                <strong>{{ formatPrice(subtotal) }}</strong>
              </div>
              <div class="summary-line">
                <span>Доставка</span>
                <strong>{{ formatPrice(deliveryCost) }}</strong>
              </div>

              <div class="summary-total">
                <span>Сумма к оплате</span>
                <strong>{{ formatPrice(totalToPay) }}</strong>
              </div>

              <NuxtLink to="/cabinet/payment" class="pay-btn">
                <span class="pay-arrow"></span>
                <span>ОПЛАТИТЬ</span>
              </NuxtLink>
            </aside>
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
  title: 'Личный кабинет — Оформление заказа',
})

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Личный кабинет', to: '/cabinet/orders' },
  { label: 'Моя корзина', to: '/cabinet/cart' },
  { label: 'Оформление заказа' },
]

interface CheckoutCartItem {
  id: number
  image: string
  title: string
  pricePerUnit: number
  qty: number
  total: number
}

const checkoutCart = useState<CheckoutCartItem[]>('checkoutCart', () => [])

const itemCount = computed(() => {
  const n = checkoutCart.value.reduce((sum, it) => sum + it.qty, 0)
  return n > 0 ? n : 2
})

const subtotal = computed(() => {
  const s = checkoutCart.value.reduce((sum, it) => sum + it.total, 0)
  return s > 0 ? s : 9800
})

const deliveryCost = computed(() => 1000)

const totalToPay = computed(() => subtotal.value + deliveryCost.value)

function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₸`
}
</script>

<style scoped>
.cabinet-page {
  background: #ffffff;
  padding-bottom: 34px;
}

.checkout-content {
  padding-bottom: 26px;
}

.page-title {
  margin: 10px 0 24px;
  color: #dd5f05;
  font-size: clamp(28px, 5vw, 54px);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  align-items: start;
}

.checkout-main {
  display: grid;
  gap: 20px;
}

.checkout-card,
.order-summary {
  border: 1px solid #d2d2d2;
  border-radius: 28px;
  background: #ffffff;
}

.checkout-card {
  padding: 20px 20px 22px;
}

.step-title {
  margin: 0 0 12px;
  font-size: clamp(20px, 4vw, 35px);
  font-weight: 700;
  color: #181818;
}

.input-line,
.textarea {
  width: 100%;
  border: 2px solid #bfbfbf;
  border-radius: 999px;
  background: #ffffff;
  padding: 0 16px;
  font-size: clamp(15px, 2.2vw, 18px);
  color: #242424;
  outline: none;
}

.input-line {
  height: 54px;
}

.edit-link {
  margin-top: 12px;
  margin-left: auto;
  display: block;
  color: #e28133;
  border: 0;
  background: transparent;
  font-size: clamp(14px, 2.2vw, 18px);
  text-decoration: underline;
  cursor: pointer;
}

.option-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.option-card {
  min-width: 300px;
  min-height: 98px;
  padding: 14px 12px;
  border: 1px solid #d5d5d5;
  border-radius: 12px;
  background: #ffffff;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  position: relative;
}

.option-card input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.check {
  width: 24px;
  height: 24px;
  border: 2px solid #cbcbcb;
  border-radius: 8px;
  margin-top: 2px;
  flex: 0 0 auto;
  position: relative;
}

.option-card.active .check {
  border-color: #e28133;
  background: #e28133;
}

.option-card.active .check::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 10px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: translate(-50%, -60%) rotate(45deg);
}

.option-title {
  margin: 0;
  font-size: clamp(15px, 2.2vw, 18px);
  font-weight: 600;
  color: #171717;
}

.option-text {
  margin: 8px 0 0;
  font-size: clamp(14px, 2vw, 18px);
  color: #1a1a1a;
}

.payment-card {
  align-items: center;
  min-height: 82px;
}

.payment-icon {
  margin-left: auto;
  min-width: 72px;
  height: 40px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  background: #fff;
  color: #444;
  font-size: 16px;
  font-weight: 600;
}

.payment-icon-kaspi {
  font-size: 14px;
  color: #d71920;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-full {
  grid-column: span 2;
}

.field-label {
  font-size: clamp(14px, 2.2vw, 20px);
  color: #151515;
  font-weight: 600;
}

.textarea {
  border-radius: 24px;
  min-height: 160px;
  padding: 14px 16px;
  resize: vertical;
}

.order-summary {
  padding: 22px 20px;
}

.order-summary h3 {
  margin: 0 0 16px;
  color: #dd5f05;
  font-size: clamp(24px, 4vw, 38px);
  font-weight: 700;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 14px;
  color: #343434;
  font-size: clamp(15px, 2.2vw, 20px);
}

.summary-line strong {
  font-weight: 600;
}

.summary-total {
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid #d2d2d2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  color: #232323;
}

.summary-total span {
  font-size: clamp(18px, 3vw, 27px);
  font-weight: 600;
}

.summary-total strong {
  font-size: clamp(28px, 5vw, 42px);
}

.pay-btn {
  margin-top: 18px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  gap: 6px;
}

.pay-arrow {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #e28133;
  position: relative;
  flex-shrink: 0;
}

.pay-arrow::before {
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

.pay-btn span:last-child {
  height: 58px;
  border-radius: 999px;
  background: #e28133;
  color: #fff;
  padding: 0 24px;
  display: inline-flex;
  align-items: center;
  font-size: clamp(14px, 2.2vw, 18px);
  font-weight: 800;
}

@media (max-width: 1280px) {
  .checkout-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .order-summary {
    max-width: 100%;
  }
}

@media (max-width: 850px) {
  .field-grid {
    grid-template-columns: 1fr;
  }

  .field-full {
    grid-column: auto;
  }
}

@media (max-width: 768px) {
  .cabinet-page {
    padding-bottom: 24px;
  }

  .checkout-content {
    padding-bottom: 20px;
  }

  .page-title {
    margin: 8px 0 20px;
    font-size: clamp(24px, 6vw, 32px);
  }

  .checkout-card {
    padding: 16px 18px 18px;
    border-radius: 20px;
  }

  .step-title {
    margin-bottom: 10px;
    font-size: clamp(18px, 4.5vw, 24px);
  }

  .input-line {
    height: 50px;
    font-size: 16px;
  }

  .order-summary {
    padding: 18px 16px;
    border-radius: 20px;
  }

  .order-summary h3 {
    margin-bottom: 14px;
    font-size: clamp(22px, 5vw, 28px);
  }

  .summary-line {
    font-size: 15px;
    margin-bottom: 12px;
  }

  .summary-total span {
    font-size: 16px;
  }

  .summary-total strong {
    font-size: clamp(24px, 6vw, 32px);
  }

  .pay-arrow {
    width: 50px;
    height: 50px;
  }

  .pay-btn span:last-child {
    height: 50px;
    padding: 0 20px;
    font-size: 15px;
  }
}

@media (max-width: 600px) {
  .checkout-grid {
    gap: 16px;
  }

  .checkout-main {
    gap: 16px;
  }

  .option-grid {
    gap: 10px;
  }

  .option-card {
    min-width: 100%;
    min-height: 88px;
    padding: 12px 14px;
  }

  .payment-card {
    min-height: 72px;
  }

  .payment-icon {
    min-width: 60px;
    height: 36px;
    font-size: 14px;
  }

  .field-grid {
    gap: 12px;
  }

  .textarea {
    min-height: 140px;
    padding: 12px 14px;
  }
}

@media (max-width: 480px) {
  .page-title {
    margin: 6px 0 16px;
    font-size: 22px;
  }

  .checkout-card {
    padding: 14px 16px 16px;
    border-radius: 16px;
  }

  .step-title {
    font-size: 18px;
  }

  .order-summary {
    padding: 16px 14px;
    border-radius: 16px;
  }

  .order-summary h3 {
    font-size: 20px;
  }

  .summary-total strong {
    font-size: 24px;
  }

  .pay-btn {
    width: 100%;
    justify-content: center;
    margin-top: 16px;
  }

  .pay-arrow {
    width: 48px;
    height: 48px;
  }

  .pay-btn span:last-child {
    height: 48px;
    font-size: 14px;
  }
}
</style>
