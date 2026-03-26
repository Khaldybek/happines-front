<template>
  <div>
    <TheHeader />
    <main class="cabinet-page">
      <CabinetBreadcrumbs :items="breadcrumbs" />

      <section class="payment-content">
        <div class="container">
          <article class="success-card">
            <h1>БЛАГОДАРИМ ЗА ПОКУПКУ!</h1>

            <div class="success-icon" aria-hidden="true">
              <span class="icon-heart">♡</span>
            </div>

            <p v-if="placedOrder">
              Заказ <strong>#{{ placedOrder.id }}</strong> успешно оформлен.<br>
              Вы можете следить за статусом в личном кабинете.
            </p>
            <p v-else>
              Вы можете следить за статусом
              своего заказа в личном кабинете
            </p>

            <NuxtLink to="/lk/orders" class="success-btn">
              <span class="success-arrow"></span>
              <span>ПЕРЕЙТИ В ЛИЧНЫЙ КАБИНЕТ</span>
            </NuxtLink>
          </article>
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { PlacedOrder } from '~/types/checkoutPage'

definePageMeta({ layout: false })
useHead({ title: 'Личный кабинет — Заказ оформлен' })

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Личный кабинет', to: '/lk/orders' },
  { label: 'Моя корзина', to: '/lk/cart' },
  { label: 'Оформление заказа', to: '/lk/checkout' },
  { label: 'Заказ оформлен' },
]

const placedOrder = useState<PlacedOrder | null>('placed-order', () => null)
</script>

<style scoped>
.cabinet-page {
  background: #ffffff;
  padding-bottom: 34px;
}

.payment-content {
  padding: 74px 0 120px;
}

.success-card {
  max-width: 980px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  border-radius: 52px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  text-align: center;
  padding: 84px 20px 76px;
}

.success-card h1 {
  margin: 0;
  color: #dd5f05;
  font-size: clamp(28px, 5vw, 56px);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.success-icon {
  width: 178px;
  height: 178px;
  margin: 34px auto 30px;
  border: 10px solid #73af3e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #73af3e;
  font-size: 106px;
  position: relative;
  background: #ffffff;
}

.success-icon::before,
.success-icon::after {
  content: '';
  position: absolute;
  background: #ffffff;
}

.success-icon::before {
  width: 38px;
  height: 18px;
  top: -7px;
  right: 22px;
  transform: rotate(22deg);
}

.success-icon::after {
  width: 34px;
  height: 20px;
  left: -8px;
  bottom: 18px;
  transform: rotate(-14deg);
}

.icon-heart {
  transform: translateY(-7px);
  font-size: 108px;
  line-height: 1;
}

.success-card p {
  margin: 0 auto;
  max-width: 670px;
  color: #2e4047;
  font-size: clamp(16px, 2.5vw, 28px);
  line-height: 1.4;
  white-space: pre-line;
}

.success-btn {
  margin-top: 22px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  gap: 6px;
}

.success-arrow {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #e28133;
  position: relative;
  flex-shrink: 0;
}

.success-arrow::before {
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

.success-btn span:last-child {
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

@media (max-width: 1100px) {
  .payment-content {
    padding: 48px 0 80px;
  }

  .success-card {
    border-radius: 34px;
    padding: 56px 20px 50px;
  }

  .success-card h1 {
    font-size: clamp(26px, 6vw, 44px);
  }

  .success-icon {
    width: 140px;
    height: 140px;
    border-width: 8px;
    font-size: 80px;
    margin: 24px auto;
  }

  .icon-heart {
    font-size: 80px;
  }

  .success-card p {
    font-size: clamp(17px, 3.5vw, 24px);
  }
}

@media (max-width: 768px) {
  .cabinet-page {
    padding-bottom: 24px;
  }

  .payment-content {
    padding: 32px 0 56px;
  }

  .success-card {
    border-radius: 28px;
    padding: 40px 18px 36px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  }

  .success-card h1 {
    font-size: clamp(22px, 6vw, 32px);
  }

  .success-icon {
    width: 120px;
    height: 120px;
    border-width: 6px;
    margin: 20px auto 18px;
  }

  .icon-heart {
    font-size: 68px;
  }

  .success-card p {
    font-size: clamp(15px, 4vw, 20px);
    max-width: 100%;
  }

  .success-btn {
    margin-top: 18px;
  }

  .success-arrow {
    width: 50px;
    height: 50px;
  }

  .success-btn span:last-child {
    height: 50px;
    padding: 0 20px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .payment-content {
    padding: 24px 0 40px;
  }

  .success-card {
    border-radius: 22px;
    padding: 32px 16px 28px;
  }

  .success-card h1 {
    font-size: 20px;
  }

  .success-icon {
    width: 100px;
    height: 100px;
    border-width: 6px;
    margin: 16px auto 14px;
  }

  .icon-heart {
    font-size: 56px;
  }

  .success-card p {
    font-size: 15px;
  }

  .success-btn {
    width: 100%;
    justify-content: center;
    margin-top: 16px;
  }

  .success-arrow {
    width: 48px;
    height: 48px;
  }

  .success-btn span:last-child {
    height: 48px;
    font-size: 14px;
  }
}
</style>
