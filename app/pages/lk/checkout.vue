<template>
  <div>
    <TheHeader />
    <main class="cabinet-page">
      <CabinetBreadcrumbs :items="breadcrumbs" />

      <section class="checkout-content">
        <div class="container">
          <h1 class="page-title">ОФОРМЛЕНИЕ ЗАКАЗА</h1>

          <!-- Loading skeleton -->
          <div v-if="pending" class="checkout-grid">
            <div class="checkout-main">
              <div v-for="n in 4" :key="n" class="skeleton-card"></div>
            </div>
            <div class="skeleton-summary"></div>
          </div>

          <div v-else class="checkout-grid">
            <section class="checkout-main">

              <!-- 1. Адрес -->
              <article class="checkout-card">
                <h2 class="step-title">1. Адрес</h2>

                <template v-if="userAddress">
                  <input
                    class="input-line"
                    type="text"
                    :value="formattedAddress"
                    readonly
                  >
                  <NuxtLink to="/lk/profile" class="edit-link">Изменить адрес</NuxtLink>
                </template>
                <div v-else class="no-address">
                  <p class="no-address-text">Адрес доставки не указан</p>
                  <NuxtLink to="/lk/profile" class="edit-link">Добавить адрес в профиле</NuxtLink>
                </div>
              </article>

              <!-- 2. Способ доставки -->
              <article class="checkout-card">
                <h2 class="step-title">2. Способ доставки</h2>
                <div class="option-grid">
                  <label
                    v-for="method in deliveryMethods"
                    :key="method.id"
                    class="option-card"
                    :class="{ active: selectedDelivery === method.id }"
                    @click="selectedDelivery = method.id"
                  >
                    <input
                      type="radio"
                      name="delivery"
                      :value="method.id"
                      :checked="selectedDelivery === method.id"
                    >
                    <span class="check"></span>
                    <div>
                      <p class="option-title">{{ method.title }}</p>
                      <p v-if="method.estimated_time" class="option-text">
                        Время: {{ method.estimated_time }}
                      </p>
                      <!-- Pickup points for самовывоз -->
                      <template v-if="method.type === 'pickup' && method.pickup_points?.length && selectedDelivery === method.id">
                        <div class="pickup-points">
                          <label
                            v-for="point in method.pickup_points"
                            :key="point.id"
                            class="pickup-point"
                            :class="{ active: selectedPickup === point.id }"
                            @click.stop="selectedPickup = point.id"
                          >
                            <input
                              type="radio"
                              name="pickup"
                              :value="point.id"
                              :checked="selectedPickup === point.id"
                            >
                            <span class="pickup-check"></span>
                            <div>
                              <p class="pickup-title">{{ point.title }}</p>
                              <p class="pickup-address">{{ point.address }}</p>
                              <p v-if="point.working_hours" class="pickup-hours">{{ point.working_hours }}</p>
                            </div>
                          </label>
                        </div>
                      </template>
                    </div>
                  </label>
                </div>
              </article>

              <!-- 3. Способ оплаты -->
              <article class="checkout-card">
                <h2 class="step-title">3. Способ оплаты</h2>
                <div class="option-grid">
                  <label
                    v-for="method in paymentMethods"
                    :key="method.id"
                    class="option-card payment-card"
                    :class="{ active: selectedPayment === method.id }"
                    @click="selectedPayment = method.id"
                  >
                    <input
                      type="radio"
                      name="payment"
                      :value="method.id"
                      :checked="selectedPayment === method.id"
                    >
                    <span class="check"></span>
                    <p class="option-title">{{ method.title }}</p>
                    <span v-if="method.image_url" class="payment-icon">
                      <img :src="method.image_url" :alt="method.title">
                    </span>
                    <span v-else class="payment-icon payment-icon-text">
                      {{ method.code === 'kaspi_qr' ? 'Kaspi QR' : method.code === 'card' ? '💳' : method.title }}
                    </span>
                  </label>
                </div>
              </article>

              <!-- 4. Контактная информация -->
              <article class="checkout-card">
                <h2 class="step-title">4. Контактная информация</h2>
                <div class="field-grid">
                  <label class="field-group">
                    <span class="field-label">Имя</span>
                    <input v-model="contactForm.name" type="text" class="input-line" placeholder="Введите ваше имя">
                  </label>

                  <label class="field-group">
                    <span class="field-label">Номер телефона</span>
                    <input v-model="contactForm.phone" type="tel" class="input-line" placeholder="Введите ваш телефон">
                  </label>

                  <label class="field-group field-full">
                    <span class="field-label">Комментарий</span>
                    <textarea v-model="contactForm.comment" class="textarea" placeholder="Введите ваш комментарий"></textarea>
                  </label>
                </div>
              </article>

            </section>

            <!-- Order summary -->
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

              <p v-if="orderError" class="order-error" role="alert">{{ orderError }}</p>
              <p v-if="orderFieldErrors['products']" class="order-error" role="alert">
                {{ orderFieldErrors['products'][0] }}
              </p>

              <button
                type="button"
                class="pay-btn"
                :disabled="orderPending || tiptopPending || !selectedDelivery || !selectedPayment"
                @click="handlePlaceOrder"
              >
                <span class="pay-arrow">
                  <span v-if="orderPending || tiptopPending" class="pay-spinner"></span>
                </span>
                <span>{{ orderPending ? 'ОФОРМЛЯЕМ...' : tiptopPending ? 'ПРОВЕРЯЕМ ОПЛАТУ...' : 'ОПЛАТИТЬ' }}</span>
              </button>

              <div v-if="tiptopActiveOrderId" class="tiptop-status-box">
                <p class="tiptop-status-title">Статус оплаты TipTop</p>
                <p class="tiptop-status-text" :class="`is-${tiptopFlowState}`">{{ tiptopStatusText }}</p>
                <p v-if="tiptopStatusReason" class="tiptop-status-reason">{{ tiptopStatusReason }}</p>
                <div class="tiptop-status-actions">
                  <button
                    type="button"
                    class="tiptop-action"
                    :disabled="tiptopPending"
                    @click="checkTiptopStatus(tiptopActiveOrderId)"
                  >
                    Проверить статус оплаты
                  </button>
                  <button
                    v-if="canRetryTiptop"
                    type="button"
                    class="tiptop-action is-primary"
                    :disabled="tiptopPending"
                    @click="retryTiptopPayment"
                  >
                    Попробовать оплатить снова
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { CheckoutDeliveryMethod, CheckoutPaymentMethod, CheckoutUserAddress } from '~/types/checkoutPage'
import type { PlacedOrder } from '~/types/checkoutPage'
import type { TiptopPaymentStatusResponse } from '~/types/tiptopPay'
import { useCartStore } from '~/stores/useCartStore'

definePageMeta({ layout: false })
useHead({ title: 'Личный кабинет — Оформление заказа' })

const router = useRouter()

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Личный кабинет', to: '/lk/orders' },
  { label: 'Моя корзина', to: '/lk/cart' },
  { label: 'Оформление заказа' },
]

// ── Checkout data ─────────────────────────────────────────────────────────────
const { data: checkoutData, pending } = useCheckoutData()

const userAddress = computed<CheckoutUserAddress | null>(
  () => checkoutData.value?.user_address ?? null,
)

const deliveryMethods = computed<CheckoutDeliveryMethod[]>(
  () => checkoutData.value?.delivery_methods ?? [],
)

const paymentMethods = computed<CheckoutPaymentMethod[]>(
  () => checkoutData.value?.payment_methods ?? [],
)

// ── Formatted address ─────────────────────────────────────────────────────────
const formattedAddress = computed(() => {
  const a = userAddress.value
  if (!a) return ''
  const parts = [
    a.country?.title,
    a.city ? `г. ${a.city.title}` : null,
    a.street,
    a.house_number,
  ].filter(Boolean)
  return parts.join(', ')
})

// ── Selections ────────────────────────────────────────────────────────────────
const selectedDelivery = ref<number | null>(null)
const selectedPickup = ref<number | null>(null)
const selectedPayment = ref<number | null>(null)

const TIPTOP_PENDING_ORDER_KEY = 'tiptop-pending-order-id'
const tiptopMethod = computed(() => paymentMethods.value.find(m => m.code === 'tiptop') ?? null)
const selectedPaymentMethod = computed(
  () => paymentMethods.value.find(m => m.id === selectedPayment.value) ?? null,
)
const isTiptopSelected = computed(() => selectedPaymentMethod.value?.code === 'tiptop')

watch(deliveryMethods, (methods) => {
  if (methods.length && selectedDelivery.value === null) {
    selectedDelivery.value = methods[0].id
  }
}, { immediate: true })

watch(paymentMethods, (methods) => {
  if (methods.length && selectedPayment.value === null) {
    selectedPayment.value = methods[0].id
  }
}, { immediate: true })

watch(selectedDelivery, () => {
  selectedPickup.value = null
})

// ── Contact form ──────────────────────────────────────────────────────────────
const contactForm = reactive({ name: '', phone: '', comment: '' })

// ── Cart data ─────────────────────────────────────────────────────────────────
interface CheckoutCartItem {
  id: number
  image: string
  title: string
  pricePerUnit: number
  qty: number
  total: number
}

const checkoutCart = useState<CheckoutCartItem[]>('checkoutCart', () => [])
const cartStore = useCartStore()

const itemCount = computed(() =>
  checkoutCart.value.reduce((sum, it) => sum + it.qty, 0) || 2,
)

const subtotal = computed(() =>
  checkoutCart.value.reduce((sum, it) => sum + it.total, 0) || 9800,
)

const deliveryCost = computed(() => 1000)
const totalToPay = computed(() => subtotal.value + deliveryCost.value)

function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₸`
}

// ── Order placement ───────────────────────────────────────────────────────────
const { pending: orderPending, error: orderError, fieldErrors: orderFieldErrors, placeOrder } = useOrderPlace()
const { getWidgetConfig, getPaymentStatus, launchWidget } = useTiptopPay()

const placedOrder = useState<PlacedOrder | null>('placed-order', () => null)
const tiptopPending = ref(false)
const tiptopStatusReason = ref('')
const tiptopFlowState = ref<'idle' | 'order_created' | 'payment_pending' | 'paid' | 'failed'>('idle')
const tiptopActiveOrderId = ref<number | null>(null)

const canRetryTiptop = computed(
  () => !!tiptopActiveOrderId.value && (tiptopFlowState.value === 'failed' || tiptopFlowState.value === 'payment_pending'),
)

const tiptopStatusText = computed(() => {
  switch (tiptopFlowState.value) {
    case 'order_created':
      return 'Заказ создан. Запускаем оплату.'
    case 'payment_pending':
      return 'Оплата не завершена. Проверьте статус или повторите попытку.'
    case 'paid':
      return 'Оплата подтверждена.'
    case 'failed':
      return 'Оплата не прошла или была отменена.'
    default:
      return 'Ожидание оплаты.'
  }
})

if (import.meta.client) {
  const saved = Number(localStorage.getItem(TIPTOP_PENDING_ORDER_KEY) || '')
  if (Number.isFinite(saved) && saved > 0) {
    tiptopActiveOrderId.value = saved
    tiptopFlowState.value = 'payment_pending'
  }
}

onMounted(async () => {
  if (!tiptopActiveOrderId.value) return
  await checkTiptopStatus(tiptopActiveOrderId.value)
})

function persistTiptopOrderId(orderId: number | null) {
  if (!import.meta.client) return
  if (orderId && orderId > 0) localStorage.setItem(TIPTOP_PENDING_ORDER_KEY, String(orderId))
  else localStorage.removeItem(TIPTOP_PENDING_ORDER_KEY)
}

function tiptopReasonFromStatus(status: TiptopPaymentStatusResponse | null): string {
  return (
    status?.payment?.reason
    || status?.payment?.message
    || status?.reason
    || status?.message
    || ''
  )
}

async function finalizePaidOrderAndNavigate(order: PlacedOrder) {
  placedOrder.value = order
  tiptopFlowState.value = 'paid'
  tiptopStatusReason.value = ''
  tiptopActiveOrderId.value = null
  persistTiptopOrderId(null)
  cartStore.clear()
  checkoutCart.value = []
  await router.push('/lk/payment')
}

async function checkTiptopStatus(orderId: number): Promise<boolean> {
  tiptopPending.value = true
  try {
    const status = await getPaymentStatus(orderId)
    if (!status) {
      tiptopFlowState.value = 'failed'
      tiptopStatusReason.value = 'Не удалось получить статус оплаты. Проверьте сеть и повторите.'
      return false
    }
    if (status.paid === 'yes') {
      tiptopFlowState.value = 'paid'
      tiptopStatusReason.value = ''
      return true
    }
    tiptopFlowState.value = 'payment_pending'
    tiptopStatusReason.value = tiptopReasonFromStatus(status) || 'Платеж пока не подтвержден.'
    return false
  }
  finally {
    tiptopPending.value = false
  }
}

async function startTiptopPayment(order: PlacedOrder) {
  tiptopPending.value = true
  tiptopFlowState.value = 'order_created'
  tiptopStatusReason.value = ''
  tiptopActiveOrderId.value = order.id
  persistTiptopOrderId(order.id)

  try {
    const widgetConfig = await getWidgetConfig(order.id)
    if (!widgetConfig?.success) {
      tiptopFlowState.value = 'failed'
      tiptopStatusReason.value = 'Не удалось запустить TipTop. Проверьте статус оплаты и повторите.'
      return
    }

    const launched = await launchWidget(widgetConfig.widget_url, widgetConfig.config || {})
    if (!launched.opened) {
      tiptopFlowState.value = 'failed'
      tiptopStatusReason.value = 'Виджет TipTop не открылся. Нажмите «Проверить статус оплаты».'
      return
    }

    tiptopFlowState.value = 'payment_pending'
    // Не считаем callback окончательным: обязательно подтверждаем через backend status.
    const paidNow = await checkTiptopStatus(order.id)
    if (paidNow) await finalizePaidOrderAndNavigate(order)
  }
  finally {
    tiptopPending.value = false
  }
}

async function retryTiptopPayment() {
  if (!tiptopActiveOrderId.value) return
  tiptopPending.value = true
  try {
    const widgetConfig = await getWidgetConfig(tiptopActiveOrderId.value)
    if (!widgetConfig?.success) {
      tiptopFlowState.value = 'failed'
      tiptopStatusReason.value = 'Не удалось повторно открыть TipTop.'
      return
    }
    const launched = await launchWidget(widgetConfig.widget_url, widgetConfig.config || {})
    if (!launched.opened) {
      tiptopFlowState.value = 'failed'
      tiptopStatusReason.value = 'Виджет TipTop не открылся.'
      return
    }
    tiptopFlowState.value = 'payment_pending'
    await checkTiptopStatus(tiptopActiveOrderId.value)
  }
  finally {
    tiptopPending.value = false
  }
}

async function handlePlaceOrder() {
  if (!selectedDelivery.value || !selectedPayment.value) return
  if (isTiptopSelected.value && !tiptopMethod.value) {
    orderError.value = 'Метод оплаты TipTop сейчас недоступен.'
    return
  }

  const sourceItems = checkoutCart.value.length
    ? checkoutCart.value
    : cartStore.items.map(i => ({ id: i.id, qty: i.qty, total: i.pricePerUnit * i.qty }))

  const products = sourceItems.map(it => ({ id: it.id, quantity: it.qty }))
  if (!products.length) {
    orderError.value = 'Корзина пуста'
    return
  }

  const result = await placeOrder({
    name: contactForm.name,
    phone: contactForm.phone,
    comment: contactForm.comment || undefined,
    address: formattedAddress.value,
    delivery_method_id: selectedDelivery.value,
    pickup_point_id: selectedPickup.value,
    payment_method_id: selectedPayment.value,
    products,
  })

  if (!result) return

  if (isTiptopSelected.value) {
    await startTiptopPayment(result.order)
    return
  }

  await finalizePaidOrderAndNavigate(result.order)
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

/* ── Skeletons ── */
.skeleton-card {
  height: 160px;
  border-radius: 28px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

.skeleton-summary {
  height: 340px;
  border-radius: 28px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Cards ── */
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

/* ── Inputs ── */
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
  font-family: inherit;
  transition: border-color 0.2s;
}

.input-line {
  height: 54px;
}

.input-line:focus,
.textarea:focus {
  border-color: #e28133;
}

/* ── Address ── */
.no-address {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.no-address-text {
  margin: 0;
  color: #888;
  font-size: clamp(15px, 2vw, 18px);
}

.edit-link {
  margin-top: 8px;
  display: inline-block;
  color: #e28133;
  border: 0;
  background: transparent;
  font-size: clamp(14px, 2.2vw, 18px);
  text-decoration: underline;
  cursor: pointer;
  font-family: inherit;
  text-underline-offset: 3px;
}

/* ── Option cards ── */
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
  cursor: pointer;
  transition: border-color 0.2s;
}

.option-card:hover {
  border-color: #e28133;
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
  transition: background 0.2s, border-color 0.2s;
}

.option-card.active {
  border-color: #e28133;
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

/* ── Pickup points ── */
.pickup-points {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pickup-point {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.pickup-point:hover,
.pickup-point.active {
  border-color: #e28133;
}

.pickup-point input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.pickup-check {
  width: 18px;
  height: 18px;
  border: 2px solid #cbcbcb;
  border-radius: 50%;
  flex: 0 0 auto;
  margin-top: 2px;
  position: relative;
  transition: border-color 0.2s;
}

.pickup-point.active .pickup-check {
  border-color: #e28133;
}

.pickup-point.active .pickup-check::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: #e28133;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.pickup-title {
  margin: 0 0 2px;
  font-size: 14px;
  font-weight: 600;
  color: #181818;
}

.pickup-address,
.pickup-hours {
  margin: 0;
  font-size: 13px;
  color: #666;
}

/* ── Payment cards ── */
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
  overflow: hidden;
}

.payment-icon img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.payment-icon-text {
  color: #444;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
}

/* ── Field grid ── */
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

/* ── Order summary ── */
.order-summary {
  padding: 22px 20px;
  position: sticky;
  top: 100px;
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

/* ── Order error ── */
.order-error {
  margin: 0 0 10px;
  padding: 10px 16px;
  border-radius: 12px;
  background: #fff0f0;
  border: 1px solid #f5c6c6;
  color: #c0392b;
  font-size: clamp(14px, 1.8vw, 16px);
}

.tiptop-status-box {
  margin-top: 14px;
  padding: 12px;
  border: 1px solid #e6e6e6;
  border-radius: 14px;
  background: #fafafa;
}

.tiptop-status-title {
  margin: 0 0 4px;
  font-size: 14px;
  color: #222;
  font-weight: 700;
}

.tiptop-status-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.35;
  color: #444;
}

.tiptop-status-text.is-paid {
  color: #2f8f3a;
}

.tiptop-status-text.is-failed {
  color: #c0392b;
}

.tiptop-status-text.is-order_created,
.tiptop-status-text.is-payment_pending {
  color: #8a5a1f;
}

.tiptop-status-reason {
  margin: 6px 0 0;
  font-size: 13px;
  color: #666;
}

.tiptop-status-actions {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tiptop-action {
  border: 1px solid #cfcfcf;
  background: #fff;
  color: #333;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 13px;
  cursor: pointer;
}

.tiptop-action:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tiptop-action.is-primary {
  border-color: #e28133;
  background: #e28133;
  color: #fff;
}

/* ── Pay button ── */
.pay-btn {
  margin-top: 18px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  gap: 6px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
}

.pay-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
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

.pay-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.35);
  border-top-color: #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: pay-spin 0.7s linear infinite;
}

@keyframes pay-spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.pay-btn:not(:disabled) .pay-arrow::before {
  content: '';
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

/* ── Responsive ── */
@media (max-width: 1280px) {
  .checkout-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .order-summary {
    max-width: 100%;
    position: static;
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

@media (max-width: 600px) {
  .option-card {
    min-width: 100%;
    min-height: 88px;
    padding: 12px 14px;
  }

  .payment-card {
    min-height: 72px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 22px;
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
