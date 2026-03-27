<template>
  <div>
    <TheHeader />
    <main class="business-page">
      <BusinessBreadcrumbs />

      <section class="business-hero">
        <div class="container">
          <div class="hero-wrapper">
            <video
              v-if="heroVideoUrl"
              :src="heroVideoUrl"
              class="hero-img hero-video"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            />
            <img v-else :src="heroImage" alt="Команда HAPPINESS" class="hero-img">
            <button v-if="!heroVideoUrl" type="button" class="play-btn" aria-label="Смотреть видео">
              <img src="/images/16_561.svg" alt="" class="play-icon">
            </button>
          </div>
        </div>
      </section>

      <section class="business-intro">
        <div class="container">
          <h1 class="business-title">{{ mainTitle }}</h1>
          <p class="business-desc">{{ mainDescription }}</p>
        </div>
      </section>

      <section class="benefits-section">
        <div class="container">
          <div class="benefits-grid">
            <div
              v-for="(feature, i) in features"
              :key="`feature-${i}`"
              class="benefit-card"
              :class="featureClass(i)"
            >
              <div class="benefit-icon">
                <img :src="feature.icon_url || '/images/16_586.svg'" alt="">
              </div>
              <span class="benefit-title">{{ feature.title }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="partners-section">
        <div class="container">
          <h2 class="partners-title">{{ sectionTitle }}</h2>
          <div class="partners-cta-row">
            <p class="partners-desc">{{ sectionDescription }}</p>
            <NuxtLink to="/contacts" class="btn partners-btn">
              <span class="partners-btn-icon">
                <img src="/images/I16_569_132_85696.svg" alt="" class="btn-arrow">
              </span>
              УЗНАТЬ БОЛЬШЕ О БИЗНЕС-ВОЗМОЖНОСТЯХ
            </NuxtLink>
          </div>
          <div class="video-blocks-wrap">
            <div class="video-grid">
              <div
                v-for="(video, i) in videoItems"
                :key="i"
                class="video-thumb"
                :class="videoThumbClass(i)"
              >
                <video
                  v-if="video.url"
                  :src="video.url"
                  class="video-thumb-img"
                  autoplay
                  loop
                  muted
                  playsinline
                  preload="metadata"
                />
                <img
                  v-else
                  src="/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png"
                  alt="Видео превью"
                  class="video-thumb-img"
                >
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
            <span class="heading-line">{{ faqTitle }}</span>
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

const { data } = useBusinessPage()
const pageData = computed(() => data.value?.data ?? null)

const HERO_PLACEHOLDER = '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png'

const heroImage = computed(() => {
  const raw = pageData.value?.hero_image_url || ''
  if (!raw) return HERO_PLACEHOLDER
  return /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(raw) ? raw : HERO_PLACEHOLDER
})

const heroVideoUrl = computed(() => {
  const raw = String(pageData.value?.hero_video_url || '').trim()
  return raw || ''
})

const mainTitle = computed(
  () => pageData.value?.main_title || 'БИЗНЕС C HAPPINESS — ИНВЕСТИЦИИ В ЗДОРОВЬЕ И ДОХОД!',
)
const mainDescription = computed(
  () => pageData.value?.main_description || 'Становитесь участником маркетинговой программы HAPPINESS. Приобретайте продукцию для здоровья всей семьи и получайте доход!',
)
const sectionTitle = computed(
  () => pageData.value?.section_title || 'ПАРТНЕРЫ, КОТОРЫЕ УЖЕ СДЕЛАЛИ СВОЙ ПЕРВЫЙ ШАГ К HAPPINESS!',
)
const sectionDescription = computed(
  () => pageData.value?.section_description || 'Бизнес с HAPPINESS — это личное оздоровление, долголетие и успех. Становитесь частью нашей команды и несите в мир HAPPINESS!',
)

const fallbackFeatures = [
  { icon_url: null, title: 'ЕЖЕНЕДЕЛЬНЫЕ ВЫПЛАТЫ' },
  { icon_url: null, title: 'ДЕНЕЖНОЕ, А НЕ ТОВАРНОЕ ВОЗНАГРАЖДЕНИЕ' },
  { icon_url: null, title: 'БОНУСЫ И ПООЩРЕНИЕ' },
  { icon_url: null, title: 'НЕТ ОБЯЗАТЕЛЬНОЙ ЕЖЕМЕСЯЧНОЙ АКТИВНОСТИ' },
  { icon_url: null, title: 'ЛИЧНОСТНЫЙ И КАРЬЕРНЫЙ РОСТ' },
]

const features = computed(() =>
  pageData.value?.features?.length ? pageData.value.features : fallbackFeatures,
)

function featureClass(index: number) {
  const classes = ['benefit-card--blue', 'benefit-card--orange', 'benefit-card--green', 'benefit-card--yellow']
  return classes[index % classes.length]
}

function videoThumbClass(index: number) {
  const pattern = index % 4
  if (pattern === 1) return 'video-thumb--lg video-thumb--rt'
  if (pattern === 2) return 'video-thumb--lg video-thumb--lb'
  if (pattern === 0) return 'video-thumb--sm video-thumb--lt'
  return 'video-thumb--sm video-thumb--rb'
}

const videoItems = computed(() => {
  const list = pageData.value?.videos ?? []
  if (!list.length) {
    return [
      { url: '' },
      { url: '' },
      { url: '' },
      { url: '' },
    ]
  }
  return list.map((url) => ({ url }))
})

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

const fallbackFaqItems = [
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

const faqItems = computed(() =>
  pageData.value?.faq?.length ? pageData.value.faq : fallbackFaqItems,
)

const faqTitle = computed(() => pageData.value?.faq_title || 'ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ')

useHead(() => ({
  title: 'Бизнес — Happiness',
}))

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

.hero-video {
  display: block;
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
  gap: 18px;
}

.benefit-card {
  position: relative;
  border-radius: 32px;
  padding: 90px 24px 28px;
  min-height: 210px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.2;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.benefit-card::before,
.benefit-card::after {
  content: "";
  position: absolute;
  top: 26px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: inherit;
  z-index: 0;
}

.benefit-card::before {
  left: -18px;
}

.benefit-card::after {
  right: -18px;
}

.benefit-icon {
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  width: 96px;
  height: 96px;
  border-radius: 24px;
  border: 6px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  z-index: 1;
  background: inherit;
}

.benefit-icon img {
  width: 44px;
  height: 44px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.benefit-title {
  position: relative;
  z-index: 1;
  display: block;
  color: #fff;
  letter-spacing: 0.01em;
}

.benefit-card--blue { background: var(--primary-blue); }
.benefit-card--orange { background: #dd5f05; }
.benefit-card--green { background: var(--primary-green); }
.benefit-card--yellow { background: #f4c43f; }

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
  max-width: 1220px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-auto-rows: 62px;
  gap: 20px;
  align-items: stretch;
}

.video-thumb {
  position: relative;
  border-radius: 32px;
  overflow: hidden;
  background: #d7d7d7;
  height: 100%;
}

.video-thumb--lt {
  grid-column: 1 / span 6;
  grid-row: 1 / span 5;
}

.video-thumb--rt {
  grid-column: 7 / span 6;
  grid-row: 1 / span 6;
}

.video-thumb--lb {
  grid-column: 1 / span 6;
  grid-row: 6 / span 6;
}

.video-thumb--rb {
  grid-column: 7 / span 6;
  grid-row: 7 / span 5;
}

.video-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
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
  width: 56px;
  height: 56px;
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
  padding: 76px 0;
  margin-bottom: 70px;
}

.reviews-title {
  font-size: clamp(30px, 3.6vw, 48px);
  font-weight: 700;
  text-align: center;
  margin: 0 0 52px 0;
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
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: center;
  max-width: 1220px;
  margin: 0 auto;
  background: #bce084;
  border-radius: 56px;
  padding: 42px 96px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.reviews-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 108px;
  height: 108px;
  border-radius: 50%;
  background: #78a435;
  border: 6px solid #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background 0.2s;
  z-index: 2;
}

.reviews-nav:hover {
  background: #6a9230;
}

.reviews-nav--prev {
  left: -52px;
}

.reviews-nav--next {
  right: -52px;
}

.reviews-nav img {
  display: none;
}

.reviews-nav::before {
  content: "";
  width: 18px;
  height: 18px;
  border-top: 3px solid #fff;
  border-right: 3px solid #fff;
  transform: rotate(45deg);
}

.reviews-nav--prev::before {
  transform: rotate(-135deg);
}

.review-card {
  width: min(100%, 860px);
  background: #fff;
  border: none;
  border-radius: 30px;
  padding: 40px 34px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.review-body {
  display: flex;
  gap: 34px;
  align-items: flex-start;
}

.review-content {
  flex: 1;
  min-width: 0;
}

.review-stars {
  color: #dd5f05;
  font-size: 24px;
  letter-spacing: 4px;
  margin-bottom: 18px;
}

.review-text {
  font-size: 17px;
  color: #1a1a1a;
  line-height: 1.55;
  margin: 0;
}

.review-author {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}

.review-photo {
  width: 192px;
  height: 132px;
  border-radius: 16px;
  object-fit: cover;
}

.review-name {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.review-location {
  font-size: 16px;
  color: #555;
}

.faq-section {
  background: #fff;
  padding: 60px 0 80px;
  margin-bottom: 0;
}

.faq-section .section-heading {
  margin-bottom: 52px;
}

.faq-wrapper {
  max-width: 1120px;
  margin: 0 auto;
}

.faq-list {
  background: #4b93d7;
  border-radius: 48px;
  overflow: hidden;
  padding: 34px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.faq-item {
  margin-bottom: 16px;
}

.faq-item:last-child {
  margin-bottom: 0;
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 24px 34px;
  background: #fff;
  border: none;
  cursor: pointer;
  font-size: clamp(20px, 1.9vw, 28px);
  font-weight: 700;
  color: #1a1a1a;
  text-align: left;
  border-radius: 999px;
  transition: background 0.2s, color 0.2s;
}

.faq-question > span:first-child {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

.faq-question:hover {
  background: #f8f8f8;
}

.faq-item--open .faq-question {
  background: #dd5f05;
  color: #fff;
  border-radius: 30px 30px 0 0;
}

.faq-item--open .faq-question:hover {
  background: #c75404;
}

.faq-toggle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #dd5f05;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  line-height: 1;
  flex-shrink: 0;
  font-weight: 300;
}

.faq-item--open .faq-toggle {
  background: rgba(255, 255, 255, 0.3);
}

.faq-answer {
  padding: 34px 36px;
  background: #4b93d7;
}

.faq-item:last-child .faq-answer {
  border-radius: 0 0 30px 30px;
}

.faq-answer p {
  margin: 0;
  font-size: clamp(16px, 1.1vw, 19px);
  color: rgba(255, 255, 255, 0.96);
  line-height: 1.55;
  overflow-wrap: anywhere;
}

@media (max-width: 1024px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .reviews-section {
    padding: 62px 0;
    margin-bottom: 58px;
  }

  .reviews-title {
    margin-bottom: 40px;
  }

  .reviews-green-block {
    max-width: 980px;
    border-radius: 44px;
    padding: 28px 40px;
  }

  .reviews-nav {
    width: 74px;
    height: 74px;
    border-width: 6px;
  }

  .reviews-nav--prev {
    left: -26px;
  }

  .reviews-nav--next {
    right: -26px;
  }

  .review-card {
    border-radius: 24px;
    padding: 28px 24px;
  }

  .review-body {
    gap: 24px;
    align-items: flex-start;
  }

  .review-stars {
    font-size: 20px;
    margin-bottom: 14px;
  }

  .review-text {
    font-size: 16px;
  }

  .review-photo {
    width: 150px;
    height: 104px;
    border-radius: 12px;
  }

  .review-name {
    font-size: 17px;
  }

  .review-location {
    font-size: 14px;
  }

  .faq-wrapper {
    max-width: 920px;
  }

  .faq-list {
    border-radius: 36px;
    padding: 26px;
  }

  .faq-question {
    padding: 20px 26px;
    font-size: 21px;
  }

  .faq-toggle {
    width: 42px;
    height: 42px;
    font-size: 26px;
  }

  .faq-answer {
    padding: 24px 28px;
  }
}

@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .benefit-card {
    min-height: 220px;
    max-width: 560px;
    margin: 0 auto;
    border-radius: 40px;
    padding-top: 104px;
  }

  .benefit-icon {
    top: -30px;
  }

  .benefit-card::before,
  .benefit-card::after {
    display: none;
  }

  .partners-cta-row {
    flex-direction: column;
    align-items: stretch;
  }

  .video-blocks-wrap {
    padding: 0;
  }

  .video-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 14px;
  }

  .video-thumb {
    aspect-ratio: 16/10;
    min-height: 200px;
    grid-column: auto !important;
    grid-row: auto !important;
  }

  .review-body {
    flex-direction: column;
    gap: 18px;
  }

  .reviews-green-block {
    border-radius: 32px;
    padding: 16px;
  }

  .reviews-nav {
    position: static;
    transform: none;
    width: 46px;
    height: 46px;
    border-width: 4px;
  }

  .reviews-nav--prev,
  .reviews-nav--next {
    left: auto;
    right: auto;
  }

  .reviews-nav img {
    width: 20px;
    height: 20px;
  }

  .review-card {
    border-radius: 20px;
    padding: 22px 20px;
  }

  .review-stars {
    font-size: 18px;
    letter-spacing: 3px;
  }

  .review-text {
    font-size: 15px;
  }

  .review-photo {
    width: 86px;
    height: 86px;
  }

  .review-name {
    font-size: 16px;
  }

  .review-location {
    font-size: 13px;
  }

  .faq-section .section-heading {
    margin-bottom: 30px;
  }

  .faq-list {
    border-radius: 30px;
    padding: 18px;
  }

  .faq-question {
    padding: 16px 18px;
    font-size: 18px;
  }

  .faq-toggle {
    width: 34px;
    height: 34px;
    font-size: 22px;
  }

  .faq-answer {
    padding: 18px 20px;
  }
}

@media (max-width: 480px) {
  .business-hero {
    margin-bottom: 24px;
  }

  .hero-wrapper {
    height: 220px;
    border-radius: 14px;
  }

  .play-btn {
    width: 52px;
    height: 52px;
  }

  .play-icon {
    width: 24px;
    height: 24px;
  }

  .business-intro {
    margin-bottom: 26px;
  }

  .business-title {
    margin-bottom: 12px;
    font-size: clamp(22px, 8vw, 30px);
  }

  .business-desc {
    font-size: 14px;
    line-height: 1.4;
  }

  .benefits-section,
  .partners-section {
    margin-bottom: 30px;
  }

  .benefit-card {
    min-height: 184px;
    border-radius: 24px;
    padding: 84px 14px 16px;
    font-size: 12px;
  }

  .benefit-icon {
    width: 72px;
    height: 72px;
    border-width: 4px;
  }

  .benefit-icon img {
    width: 34px;
    height: 34px;
  }

  .partners-title {
    font-size: 22px;
    margin-bottom: 14px;
  }

  .partners-cta-row {
    gap: 14px;
    margin-bottom: 18px;
  }

  .partners-desc {
    min-width: 0;
    font-size: 14px;
    line-height: 1.4;
  }

  .partners-btn {
    width: 100%;
    justify-content: center;
    padding: 10px 14px;
    font-size: 12px;
  }

  .video-thumb {
    min-height: 156px;
    border-radius: 16px;
  }

  .video-play {
    width: 44px;
    height: 44px;
  }

  .video-play::before {
    border-left-width: 11px;
    border-top-width: 7px;
    border-bottom-width: 7px;
  }

  .reviews-section {
    padding: 36px 0;
    margin-bottom: 30px;
  }

  .reviews-title {
    margin-bottom: 18px;
  }

  .reviews-green-block {
    padding: 10px;
    border-radius: 20px;
  }

  .review-card {
    padding: 14px 12px;
    border-radius: 14px;
  }

  .review-text {
    font-size: 14px;
    line-height: 1.45;
  }

  .faq-section {
    padding: 28px 0 36px;
  }

  .faq-list {
    border-radius: 20px;
    padding: 10px;
  }

  .faq-question {
    padding: 12px 14px;
    font-size: 15px;
    border-radius: 16px;
  }

  .faq-toggle {
    width: 28px;
    height: 28px;
    font-size: 18px;
  }

  .faq-answer {
    padding: 12px 14px;
  }

  .faq-item:last-child .faq-answer,
  .faq-item--open .faq-question {
    border-radius: 12px;
  }

  .faq-answer p {
    font-size: 14px;
    line-height: 1.45;
  }
}
</style>
