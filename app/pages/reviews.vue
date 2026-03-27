<template>
  <div>
    <TheHeader />
    <main class="reviews-page">
      <section class="breadcrumbs-section">
        <div class="container">
          <nav class="breadcrumbs-list" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="crumb-item">Главная</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <span class="crumb-item active">Отзывы о продукции</span>
          </nav>
        </div>
      </section>

      <div class="container reviews-container">
        <h1 class="reviews-main-title">ОТЗЫВЫ О ПРОДУКЦИИ</h1>
        <p class="reviews-subtitle">Реальные отзывы о продукции HAPPINESS</p>
        <div class="reviews-intro">
          <p>
            Мы ценим доверие наших клиентов и партнёров. Отзывы помогают другим узнать о качестве продукции, улучшении самочувствия и комфорте в ежедневном уходе. Вся продукция HAPPINESS имеет натуральный состав и направлена на комплексный подход к здоровью.
          </p>
        </div>

        <div class="reviews-layout">
          <div class="reviews-main">
            <div class="reviews-filter-row">
              <label class="reviews-filter-label">
                Показать
                <select v-model="filterShow" class="reviews-filter-select">
                  <option value="all">Все</option>
                  <option value="5">5 звёзд</option>
                  <option value="4">4 и выше</option>
                </select>
              </label>
            </div>

            <ul class="reviews-list">
              <li v-for="(r, i) in displayedReviews" :key="i" class="review-card">
                <div class="review-card-header">
                  <img :src="r.avatar" :alt="r.name" class="review-avatar">
                  <div class="review-meta">
                    <strong class="review-name">{{ r.name }}</strong>
                    <div class="review-rating-row">
                      <span class="review-stars" aria-label="Оценка 5 из 5">
                        <span v-for="s in 5" :key="s" class="review-star">★</span>
                      </span>
                      <span class="review-location-date">{{ r.location }}, {{ r.date }}</span>
                    </div>
                  </div>
                </div>
                <p class="review-text">{{ r.text }}</p>
                <div v-if="r.products?.length" class="review-products">
                  <img
                    v-for="(img, j) in r.products"
                    :key="j"
                    :src="img"
                    alt="Продукт"
                    class="review-product-thumb"
                  >
                </div>
              </li>
            </ul>
          </div>

          <aside class="reviews-summary">
            <div class="reviews-summary-box">
              <div class="reviews-summary-top">
                <span class="reviews-summary-count">150 отзывов</span>
                <span class="reviews-summary-rating">Оценка 4,9</span>
              </div>
              <div class="reviews-summary-divider" />
              <button type="button" class="reviews-write-btn" @click="openModal">
                <span class="reviews-write-arrow">→</span>
                НАПИСАТЬ отзыв
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
    <TheFooter />

    <!-- Модалка «Написать отзыв» -->
    <Teleport to="body">
      <div
        v-if="modalOpen"
        class="review-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
        @click.self="closeModal"
      >
        <div class="review-modal">
          <h2 id="review-modal-title" class="review-modal-title">Написать отзыв</h2>
          <button type="button" class="review-modal-close" aria-label="Закрыть" @click="closeModal">×</button>

          <form class="review-modal-form" @submit.prevent="submitReview">
            <div class="review-modal-grid">
              <label class="review-field">
                <span class="review-field-label">Страна</span>
                <select v-model="form.country" class="review-input" required>
                  <option value="" disabled>Выберите страну</option>
                  <option value="kz">Казахстан</option>
                  <option value="ru">Россия</option>
                  <option value="kg">Кыргызстан</option>
                  <option value="uz">Узбекистан</option>
                </select>
              </label>
              <label class="review-field">
                <span class="review-field-label">Город</span>
                <select v-model="form.city" class="review-input" required>
                  <option value="" disabled>Выберите город</option>
                  <option value="almaty">Алматы</option>
                  <option value="astana">Астана</option>
                  <option value="moscow">Москва</option>
                  <option value="bishkek">Бишкек</option>
                </select>
              </label>
            </div>
            <label class="review-field review-field--full">
              <span class="review-field-label">Имя и фамилию</span>
              <input
                v-model="form.name"
                type="text"
                class="review-input review-input--text"
                placeholder="Введите ваше имя и фамилию"
                required
              >
            </label>
            <div class="review-field review-field--full">
              <span class="review-field-label">Оцените *</span>
              <div class="review-rating-input">
                <button
                  v-for="n in 5"
                  :key="n"
                  type="button"
                  class="review-rating-num"
                  :class="{ 'is-active': form.rating >= n }"
                  @click="form.rating = n"
                >
                  {{ n }}
                </button>
              </div>
            </div>
            <label class="review-field review-field--full">
              <span class="review-field-label">Отзыв *</span>
              <textarea
                v-model="form.review"
                class="review-textarea"
                placeholder="Введите ваш отзыв"
                maxlength="400"
                rows="5"
                required
              />
              <span class="review-char-hint">Не более 400 символов</span>
            </label>
            <div class="review-modal-actions">
              <button type="button" class="review-btn review-btn--cancel" @click="closeModal">
                <span class="review-btn-arrow">→</span>
                ОТМЕНИТЬ
              </button>
              <button type="submit" class="review-btn review-btn--submit">
                <span class="review-btn-arrow">→</span>
                ОТПРАВИТЬ
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Отзывы о продукции — Happiness',
})

const filterShow = ref('all')

const reviews = [
  {
    name: 'Альфия Мусаева',
    avatar: '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png',
    location: 'Алматы',
    date: '06.02.2026',
    text: 'Повседневная практика показывает, что существующая теория представляет собой интересный эксперимент проверки анализа существующих паттернов поведения. С другой стороны, консультация с широким активом в значительной степени обуславливает создание направлений прогрессивного развития.',
    products: ['/images/a9af888db3be8853f23ab252ff40884690219e08.png', '/images/acebc31125238ea02c6f2327a533eed417235ba7.png', '/images/dab270cdd863b399b68997a9649feb91f178c56b.png'],
  },
  {
    name: 'Иван Иванов',
    avatar: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png',
    location: 'Москва',
    date: '05.02.2026',
    text: 'Повседневная практика показывает, что существующая теория представляет собой интересный эксперимент проверки анализа существующих паттернов поведения. С другой стороны, консультация с широким активом в значительной степени обуславливает создание направлений прогрессивного развития.',
    products: ['/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png', '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png'],
  },
  {
    name: 'Альфия Мусаева',
    avatar: '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png',
    location: 'Алматы',
    date: '04.02.2026',
    text: 'Повседневная практика показывает, что существующая теория представляет собой интересный эксперимент проверки анализа существующих паттернов поведения. С другой стороны, консультация с широким активом в значительной степени обуславливает создание направлений прогрессивного развития.',
    products: ['/images/a9af888db3be8853f23ab252ff40884690219e08.png', '/images/acebc31125238ea02c6f2327a533eed417235ba7.png', '/images/dab270cdd863b399b68997a9649feb91f178c56b.png'],
  },
]

const displayedReviews = computed(() => reviews)

const modalOpen = ref(false)
const form = ref({
  country: '',
  city: '',
  name: '',
  rating: 0,
  review: '',
})

function openModal() {
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

function submitReview() {
  closeModal()
  form.value = { country: '', city: '', name: '', rating: 0, review: '' }
}

function onKeydown(e: KeyboardEvent) {
  if (modalOpen.value && e.key === 'Escape') closeModal()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.reviews-page {
  background: #fff;
  padding-bottom: 60px;
}

.breadcrumbs-section {
  padding: 20px 0;
}

.breadcrumbs-list {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.crumb-item {
  color: #282828;
}

.crumb-item.active {
  color: #7f7f7f;
}

.reviews-main-title {
  margin: 0 0 8px;
  text-align: center;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #dd5f05;
}

.reviews-subtitle {
  margin: 0 0 20px;
  text-align: center;
  font-size: 1rem;
  color: #1a1a1a;
}

.reviews-intro {
  max-width: 720px;
  margin: 0 auto 32px;
}

.reviews-intro p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333;
}

.reviews-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
  align-items: start;
}

@media (max-width: 900px) {
  .reviews-layout {
    grid-template-columns: 1fr;
  }

  .reviews-summary-box {
    position: static;
    top: auto;
  }
}

.reviews-filter-row {
  margin-bottom: 24px;
}

.reviews-filter-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
}

.reviews-filter-select {
  padding: 8px 32px 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E") right 10px center no-repeat;
  background-size: 10px;
  cursor: pointer;
  appearance: none;
}

.reviews-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.review-card {
  padding: 24px 0;
  border-bottom: 1px solid #eee;
}

.review-card:last-child {
  border-bottom: none;
}

.review-card-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
}

.review-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.review-meta {
  flex: 1;
  min-width: 0;
}

.review-name {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.review-rating-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.review-stars {
  color: #dd5f05;
  font-size: 1rem;
  letter-spacing: 2px;
}

.review-star {
  display: inline;
}

.review-location-date {
  font-size: 13px;
  color: #888;
}

.review-text {
  margin: 0 0 16px;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333;
}

.review-products {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.review-product-thumb {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
}

/* Зелёный блок справа */
.reviews-summary-box {
  background: #78a435;
  border-radius: 16px;
  padding: 24px;
  color: #fff;
  position: sticky;
  top: 24px;
}

.reviews-summary-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.reviews-summary-count,
.reviews-summary-rating {
  font-size: 1rem;
  font-weight: 600;
}

.reviews-summary-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.4);
  margin-bottom: 20px;
}

.reviews-write-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  background: #8bc34a;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background 0.2s;
}

.reviews-write-btn:hover {
  background: #7cb342;
}

.reviews-write-arrow {
  color: #dd5f05;
  font-size: 1.1em;
}

/* Модалка */
.review-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
}

.review-modal {
  position: relative;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
  padding: 32px 36px 28px;
}

.review-modal-title {
  margin: 0 0 24px;
  font-size: 1.35rem;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
}

.review-modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border: none;
  background: #f0f0f0;
  border-radius: 50%;
  font-size: 1.5rem;
  line-height: 1;
  color: #666;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.review-modal-close:hover {
  background: #e0e0e0;
  color: #1a1a1a;
}

.review-modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.review-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.review-field--full {
  grid-column: 1 / -1;
}

.review-modal-grid .review-field {
  grid-column: span 1;
}

.review-field-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.review-input,
.review-textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 15px;
  color: #1a1a1a;
  font-family: inherit;
  background: #fff;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px;
}

.review-input--text,
.review-textarea {
  background-image: none;
}

.review-textarea {
  resize: vertical;
  min-height: 120px;
  background-image: none;
}

.review-char-hint {
  font-size: 12px;
  color: #999;
}

.review-rating-input {
  display: flex;
  gap: 8px;
}

.review-rating-num {
  width: 44px;
  height: 44px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  color: #999;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.review-rating-num:hover,
.review-rating-num.is-active {
  background: #dd5f05;
  border-color: #dd5f05;
  color: #fff;
}

.review-modal-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 8px;
}

.review-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.review-btn-arrow {
  font-size: 1rem;
}

.review-btn--cancel {
  background: #ffe0cc;
  border: 2px solid #dd5f05;
  color: #c25404;
}

.review-btn--cancel:hover {
  background: #ffd4b8;
}

.review-btn--submit {
  background: #dd5f05;
  border: 2px solid #dd5f05;
  color: #fff;
}

.review-btn--submit:hover {
  background: #c25404;
  border-color: #c25404;
  color: #fff;
}

@media (max-width: 768px) {
  .breadcrumbs-section {
    padding: 10px 0;
  }

  .breadcrumbs-list {
    font-size: 12px;
    overflow-x: auto;
    white-space: nowrap;
    flex-wrap: nowrap;
    scrollbar-width: none;
  }

  .breadcrumbs-list::-webkit-scrollbar {
    display: none;
  }

  .reviews-main-title {
    font-size: clamp(22px, 8vw, 30px);
  }

  .reviews-subtitle {
    margin-bottom: 12px;
  }

  .reviews-intro {
    margin-bottom: 18px;
  }

  .reviews-filter-row {
    margin-bottom: 12px;
  }

  .review-card {
    padding: 16px 0;
  }

  .review-product-thumb {
    width: 68px;
    height: 68px;
  }

  .reviews-summary-box {
    border-radius: 12px;
    padding: 16px;
  }
}

@media (max-width: 600px) {
  .reviews-page {
    padding-bottom: 36px;
  }

  .review-card-header {
    gap: 10px;
    margin-bottom: 8px;
  }

  .review-avatar {
    width: 40px;
    height: 40px;
  }

  .review-name {
    font-size: 15px;
  }

  .review-rating-row {
    gap: 8px;
  }

  .review-location-date {
    font-size: 12px;
  }

  .review-text {
    font-size: 14px;
    margin-bottom: 12px;
  }

  .review-modal-overlay {
    padding: 12px;
  }

  .review-modal {
    border-radius: 12px;
    padding: 18px 14px 14px;
    max-height: 94vh;
  }

  .review-modal-title {
    margin-bottom: 12px;
    font-size: 18px;
  }

  .review-modal-close {
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    font-size: 20px;
  }

  .review-modal-form {
    gap: 12px;
  }

  .review-modal-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .review-input,
  .review-textarea {
    padding: 10px 12px;
    font-size: 14px;
  }

  .review-textarea {
    min-height: 98px;
  }

  .review-rating-num {
    width: 36px;
    height: 36px;
    font-size: 15px;
  }

  .review-modal-actions {
    flex-direction: column;
    gap: 8px;
    margin-top: 2px;
  }

  .review-btn {
    width: 100%;
    justify-content: center;
    padding: 10px 14px;
    font-size: 12px;
  }
}
</style>
