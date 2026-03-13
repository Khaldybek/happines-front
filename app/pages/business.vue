<template>
  <div>
    <TheHeader />
    <main class="business-page">
      <BusinessBreadcrumbs />

      <section class="business-hero">
        <div class="container">
          <div class="hero-wrapper">
            <img src="/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png" alt="Команда HAPPINESS" class="hero-img">
            <button type="button" class="play-btn" aria-label="Смотреть видео">
              <img src="/images/16_561.svg" alt="" class="play-icon">
            </button>
          </div>
        </div>
      </section>

      <section class="business-intro">
        <div class="container">
          <h1 class="business-title">БИЗНЕС C HAPPINESS —<br>ИНВЕСТИЦИИ В ЗДОРОВЬЕ И ДОХОД!</h1>
          <p class="business-desc">Становитесь участником маркетинговой программы HAPPINESS. Приобретайте продукцию для здоровья всей семьи и получайте доход!</p>
        </div>
      </section>

      <section class="benefits-section">
        <div class="container">
          <div class="benefits-grid">
            <div class="benefit-card benefit-card--blue">
              <div class="benefit-icon"><img src="/images/16_586.svg" alt=""></div>
              <span>ЕЖЕНЕДЕЛЬНЫЕ ВЫПЛАТЫ</span>
            </div>
            <div class="benefit-card benefit-card--orange">
              <div class="benefit-icon"><img src="/images/16_586.svg" alt=""></div>
              <span>ДЕНЕЖНОЕ, А НЕ ТОВАРНОЕ ВОЗНАГРАЖДЕНИЕ</span>
            </div>
            <div class="benefit-card benefit-card--green">
              <div class="benefit-icon"><img src="/images/16_586.svg" alt=""></div>
              <span>БОНУСЫ И ПООЩРЕНИЕ</span>
            </div>
            <div class="benefit-card benefit-card--yellow">
              <div class="benefit-icon"><img src="/images/16_586.svg" alt=""></div>
              <span>НЕТ ОБЯЗАТЕЛЬНОЙ ЕЖЕМЕСЯЧНОЙ АКТИВНОСТИ</span>
            </div>
            <div class="benefit-card benefit-card--blue">
              <div class="benefit-icon"><img src="/images/16_586.svg" alt=""></div>
              <span>ЛИЧНОСТНЫЙ И КАРЬЕРНЫЙ РОСТ</span>
            </div>
          </div>
        </div>
      </section>

      <section class="partners-section">
        <div class="container">
          <h2 class="partners-title">ПАРТНЕРЫ, КОТОРЫЕ УЖЕ СДЕЛАЛИ СВОЙ ПЕРВЫЙ ШАГ К HAPPINESS!</h2>
          <div class="partners-cta-row">
            <p class="partners-desc">Бизнес с HAPPINESS — это личное оздоровление, долголетие и успех. Становитесь частью нашей команды и несите в мир HAPPINESS!</p>
            <NuxtLink to="/contacts" class="btn partners-btn">
              <span class="partners-btn-icon">
                <img src="/images/I16_569_132_85696.svg" alt="" class="btn-arrow">
              </span>
              УЗНАТЬ БОЛЬШЕ О БИЗНЕС-ВОЗМОЖНОСТЯХ
            </NuxtLink>
          </div>
          <div class="video-blocks-wrap">
            <div class="video-grid">
              <div v-for="(video, i) in videoItems" :key="i" class="video-thumb">
                <img :src="video.img" :alt="video.title" class="video-thumb-img">
                <span class="video-thumb-overlay" aria-hidden="true"></span>
                <button type="button" class="video-play" aria-label="Смотреть видео"></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="reviews-section">
        <div class="container">
          <h2 class="reviews-title">
            <span class="heading-line">ОТЗЫВЫ О БИЗНЕСЕ С</span>
            <span class="heading-line">HAPPINESS</span>
          </h2>
          <div class="reviews-green-block">
            <button type="button" class="reviews-nav reviews-nav--prev" aria-label="Назад" @click="prevReview">
              <img src="/images/I16_569_132_85695.svg" alt="">
            </button>
            <div class="review-card">
              <div class="review-body">
                <div class="review-content">
                  <div class="review-stars">★★★★★</div>
                  <p class="review-text">{{ reviews[currentReview].text }}</p>
                </div>
                <div class="review-author">
                  <img :src="reviews[currentReview].photo" :alt="reviews[currentReview].name" class="review-photo">
                  <strong class="review-name">{{ reviews[currentReview].name }}</strong>
                  <span class="review-location">{{ reviews[currentReview].location }}</span>
                </div>
              </div>
            </div>
            <button type="button" class="reviews-nav reviews-nav--next" aria-label="Вперёд" @click="nextReview">
              <img src="/images/I16_569_132_85696.svg" alt="">
            </button>
          </div>
        </div>
      </section>

      <section class="faq-section">
        <div class="container">
          <h2 class="section-heading section-heading--orange">
            <span class="heading-line">ЧАСТО ЗАДАВАЕМЫЕ</span>
            <span class="heading-line">ВОПРОСЫ</span>
          </h2>
          <div class="faq-wrapper">
            <div class="faq-list">
              <div
                v-for="(item, index) in faqItems"
                :key="index"
                class="faq-item"
                :class="{ 'faq-item--open': openFaq === index }"
              >
                <button type="button" class="faq-question" @click="toggleFaq(index)">
                  <span>{{ item.question }}</span>
                  <span class="faq-toggle">{{ openFaq === index ? '−' : '+' }}</span>
                </button>
                <div v-show="openFaq === index" class="faq-answer">
                  <p>{{ item.answer }}</p>
                </div>
              </div>
            </div>
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
  title: 'Бизнес — Happiness',
})

const videoItems = [
  { img: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png', title: 'Видео 1' },
  { img: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png', title: 'Видео 2' },
  { img: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png', title: 'Видео 3' },
  { img: '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png', title: 'Видео 4' },
]

const reviews = [
  {
    text: 'С HAPPINESS с 2013 года. За это время — еженедельные вознаграждения, поездки в 5 стран, призы, подарки, улучшение здоровья, финансовая защита, покупка автомобилей и квартир. Цель компании — сделать людей здоровыми и обеспеченными. Присоединяйтесь к HAPPINESS!',
    name: 'Салахова Рушания',
    location: 'г. Лениногорск, Россия',
    photo: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
  },
  {
    text: 'Отличная компания и честные условия. Рекомендую всем, кто думает о своём здоровье и доходе.',
    name: 'Иванов Иван',
    location: 'г. Москва, Россия',
    photo: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
  },
]

const currentReview = ref(0)
function prevReview() {
  currentReview.value = currentReview.value === 0 ? reviews.length - 1 : currentReview.value - 1
}
function nextReview() {
  currentReview.value = currentReview.value === reviews.length - 1 ? 0 : currentReview.value + 1
}

const faqItems = [
  {
    question: 'Lorem Ipsum - это текст-"рыба"?',
    answer: 'Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.',
  },
  {
    question: 'Где взять текст для блоков?',
    answer: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию.',
  },
  {
    question: 'Почему он используется?',
    answer: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.',
  },
  {
    question: 'Откуда он появился?',
    answer: 'Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже.',
  },
  {
    question: 'Есть ли русская версия?',
    answer: 'Для русского языка существуют варианты «Рыба-текст» с аналогичной структурой.',
  },
]

const openFaq = ref(0)
function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? -1 : index
}
</script>

<style scoped>
.business-page {
  background: #fff;
  min-height: 100vh;
}

.business-hero {
  margin-bottom: 50px;
}

.hero-wrapper {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  height: 420px;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--primary-blue);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.play-icon {
  width: 36px;
  height: 36px;
  filter: brightness(0) invert(1);
}

.business-intro {
  margin-bottom: 50px;
}

.business-title {
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 700;
  color: #dd5f05;
  text-align: center;
  margin: 0 0 24px 0;
  line-height: 1.2;
  text-transform: uppercase;
}

.business-desc {
  font-size: 18px;
  color: #121212;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.benefits-section {
  margin-bottom: 60px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.benefit-card {
  border-radius: 20px;
  padding: 28px 20px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.3;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.benefit-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
}

.benefit-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.benefit-card--blue { background: var(--primary-blue); }
.benefit-card--orange { background: #dd5f05; }
.benefit-card--green { background: var(--primary-green); }
.benefit-card--yellow { background: #F5CF5D; color: #121212; }
.benefit-card--yellow .benefit-icon img { filter: none; }

.partners-section {
  margin-bottom: 60px;
}

.partners-title {
  font-size: 28px;
  font-weight: 700;
  color: #dd5f05;
  text-align: center;
  margin: 0 0 24px 0;
  text-transform: uppercase;
}

.partners-cta-row {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.partners-desc {
  flex: 1;
  min-width: 280px;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin: 0;
}

.partners-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background-color: #dd5f05;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.02em;
  padding: 14px 28px;
  border-radius: 999px;
}

.partners-btn-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.partners-btn .btn-arrow {
  width: 18px;
  height: 18px;
  filter: brightness(0) invert(1);
}

.video-blocks-wrap {
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.video-thumb {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 16/10;
  max-height: 220px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.video-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  pointer-events: none;
}

.video-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #1e90ff;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1;
}

.video-play::before {
  content: "";
  position: absolute;
  left: 54%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-left: 14px solid #fff;
  border-top: 9px solid transparent;
  border-bottom: 9px solid transparent;
}

.reviews-section {
  padding: 60px 0;
  margin-bottom: 60px;
}

.reviews-title {
  font-size: clamp(26px, 3.2vw, 38px);
  font-weight: 700;
  text-align: center;
  margin: 0 0 40px 0;
  text-transform: uppercase;
  line-height: 1.15;
  letter-spacing: 0.02em;
  color: #dd5f05;
}

.reviews-title .heading-line {
  display: block;
}

.section-heading {
  font-size: clamp(26px, 3.2vw, 38px);
  font-weight: 700;
  text-align: center;
  margin: 0 0 48px 0;
  text-transform: uppercase;
  line-height: 1.15;
  letter-spacing: 0.02em;
}

.section-heading--orange {
  color: #dd5f05;
}

.heading-line {
  display: block;
}

.reviews-green-block {
  display: flex;
  align-items: center;
  gap: 24px;
  max-width: 960px;
  margin: 0 auto;
  background: #bce084;
  border-radius: 48px;
  padding: 28px 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.reviews-nav {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #78a435;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background 0.2s;
}

.reviews-nav:hover {
  background: #6a9230;
}

.reviews-nav img {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
}

.reviews-nav--prev img {
  transform: rotate(180deg);
}

.review-card {
  flex: 1;
  background: #fff;
  border: none;
  border-radius: 24px;
  padding: 36px 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.review-body {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.review-content {
  flex: 1;
  min-width: 0;
}

.review-stars {
  color: #dd5f05;
  font-size: 20px;
  letter-spacing: 3px;
  margin-bottom: 16px;
}

.review-text {
  font-size: 16px;
  color: #1a1a1a;
  line-height: 1.65;
  margin: 0;
}

.review-author {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.review-photo {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
}

.review-name {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.review-location {
  font-size: 14px;
  color: #555;
}

.faq-section {
  background: #fff;
  padding: 60px 0 80px;
  margin-bottom: 0;
}

.faq-section .section-heading {
  margin-bottom: 40px;
}

.faq-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.faq-list {
  background: #4b93d7;
  border-radius: 32px;
  overflow: hidden;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.faq-item {
  margin-bottom: 12px;
}

.faq-item:last-child {
  margin-bottom: 0;
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 28px;
  background: #fff;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  text-align: left;
  border-radius: 999px;
  transition: background 0.2s, color 0.2s;
}

.faq-question:hover {
  background: #f8f8f8;
}

.faq-item--open .faq-question {
  background: #dd5f05;
  color: #fff;
  border-radius: 24px 24px 0 0;
}

.faq-item--open .faq-question:hover {
  background: #c75404;
}

.faq-toggle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #dd5f05;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  line-height: 1;
  flex-shrink: 0;
  font-weight: 300;
}

.faq-item--open .faq-toggle {
  background: rgba(255, 255, 255, 0.3);
}

.faq-answer {
  padding: 28px 32px;
  background: #4b93d7;
}

.faq-item:last-child .faq-answer {
  border-radius: 0 0 24px 24px;
}

.faq-answer p {
  margin: 0;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 1.65;
}

@media (max-width: 1024px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .partners-cta-row {
    flex-direction: column;
    align-items: stretch;
  }

  .video-blocks-wrap {
    padding: 20px;
  }

  .video-grid {
    grid-template-columns: 1fr;
  }

  .review-body {
    flex-direction: column;
  }
}
</style>
