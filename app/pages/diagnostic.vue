<template>
  <div>
    <TheHeader />
    <main class="diagnostic-page">
      <section class="breadcrumbs-section">
        <div class="container">
          <nav class="breadcrumbs-list" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="crumb-item">Главная</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <span class="crumb-item active">Диагностический тест</span>
          </nav>
        </div>
      </section>

      <section class="diagnostic-hero">
        <div class="diagnostic-hero-bg">
          <svg class="diagnostic-hero-svg" viewBox="0 0 800 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <!-- Тёмно-зелёный лист (форма сердца) -->
            <path
              class="diagnostic-leaf"
              d="M400 80c-40-60-120-40-140 20-20 60 20 100 140 160 120-60 160-100 140-160-20-60-100-80-140-20z"
              fill="#2E7D32"
            />
            <!-- Белая линия ЭКГ (сердцебиение) -->
            <path
              class="diagnostic-ecg"
              d="M80 140h60l20-30l20 60l30-90l30 60h60l40-20l30 40l20-30h80"
              stroke="white"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
              stroke-dasharray="0"
            />
          </svg>
        </div>
      </section>

      <div class="container diagnostic-content">
        <h1 class="diagnostic-title">
          <span class="diagnostic-title-line">ДИАГНОСТИЧЕСКИЙ</span>
          <span class="diagnostic-title-line">ТЕСТ</span>
        </h1>
        <p class="diagnostic-intro">
          Данный тест создан для самостоятельной оценки состояния вашего организма. Ответьте «да» или «нет» на 48 вопросов, описывающих ваше самочувствие сегодня. Прохождение теста займёт около 5-7 минут.
        </p>

        <!-- Экран вопроса -->
        <div v-if="!isComplete" class="diagnostic-card">
          <div class="diagnostic-card-top">
            <NuxtLink
              v-if="currentIndex > 0"
              to="#"
              class="diagnostic-back"
              @click.prevent="goBack"
            >
              ← НАЗАД
            </NuxtLink>
            <span v-else class="diagnostic-back diagnostic-back--placeholder">← НАЗАД</span>
            <div class="diagnostic-progress-label">
              Вопрос {{ currentIndex + 1 }} из 48
            </div>
          </div>
          <div class="diagnostic-progress-bar">
            <div class="diagnostic-progress-track">
              <div
                class="diagnostic-progress-fill"
                :style="{ width: progressPercent + '%' }"
              />
            </div>
          </div>
          <p class="diagnostic-question">{{ currentQuestion.text }}</p>
          <div class="diagnostic-buttons">
            <button
              type="button"
              class="diagnostic-btn diagnostic-btn--no"
              :class="{ 'is-selected': currentAnswer === false }"
              @click="answer(false)"
            >
              <span class="diagnostic-btn-arrow">→</span>
              НЕТ
            </button>
            <button
              type="button"
              class="diagnostic-btn diagnostic-btn--yes"
              :class="{ 'is-selected': currentAnswer === true }"
              @click="answer(true)"
            >
              <span class="diagnostic-btn-arrow">→</span>
              ДА
            </button>
          </div>
        </div>

        <!-- Экран завершения -->
        <div v-else class="diagnostic-card diagnostic-card--result">
          <h2 class="diagnostic-result-title">Тест пройден</h2>
          <p class="diagnostic-result-text">
            Спасибо за прохождение диагностического теста. На основе ваших ответов вы можете обсудить состояние организма с консультантом HAPPINESS для персональных рекомендаций.
          </p>
          <NuxtLink to="/contacts" class="diagnostic-result-link">Связаться с нами</NuxtLink>
        </div>
      </div>

      <div class="diagnostic-footer-bar" aria-hidden="true" />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Диагностический тест — Happiness',
})

const QUESTIONS = [
  'Частые головные боли?',
  'Заболевания более 2-х раз в год?',
  'Беспокойный или неглубокий сон?',
  'Повышенная утомляемость?',
  'Снижение работоспособности?',
  'Дискомфорт в области желудка или кишечника?',
  'Ощущение тяжести после еды?',
  'Склонность к запорам или нерегулярный стул?',
  'Отёки или пастозность по утрам?',
  'Дискомфорт в области печени или правого подреберья?',
  'Сухость или шелушение кожи?',
  'Ломкость ногтей или выпадение волос?',
  'Снижение остроты зрения или усталость глаз?',
  'Частые простуды или ОРВИ?',
  'Ощущение нехватки энергии в течение дня?',
  'Раздражительность или перепады настроения?',
  'Сложности с концентрацией внимания?',
  'Боли или дискомфорт в суставах?',
  'Ощущение онемения в конечностях?',
  'Повышенная чувствительность к холоду?',
  'Учащённое сердцебиение при небольшой нагрузке?',
  'Одышка при подъёме по лестнице?',
  'Головокружения при смене положения?',
  'Шум или звон в ушах?',
  'Частая жажда или сухость во рту?',
  'Повышенный аппетит или тяга к сладкому?',
  'Набор или потеря веса без явной причины?',
  'Потливость без нагрузки?',
  'Склонность к аллергическим реакциям?',
  'Длительное восстановление после нагрузок?',
  'Мышечная слабость или быстрая усталость мышц?',
  'Судороги в ногах (особенно ночью)?',
  'Хруст или дискомфорт в суставах при движении?',
  'Чувство напряжения или скованности в шее и спине?',
  'Проблемы с памятью или забывчивость?',
  'Тревожность или беспокойство без причины?',
  'Сезонное ухудшение самочувствия?',
  'Приём лекарств на постоянной основе?',
  'Недавно перенесённые операции или болезни?',
  'Хронические заболевания?',
  'Нерегулярное питание или перекусы на ходу?',
  'Недостаток сна (менее 7 часов)?',
  'Малоподвижный образ жизни?',
  'Работа за компьютером более 6 часов в день?',
  'Курение или частое нахождение в прокуренных помещениях?',
  'Редкое пребывание на свежем воздухе?',
  'Стрессовые ситуации на работе или дома?',
]

const currentIndex = ref(0)
const answers = ref<(boolean | null)[]>(Array(48).fill(null))
const isComplete = ref(false)

const currentQuestion = computed(() => ({
  text: QUESTIONS[currentIndex.value],
}))

const currentAnswer = computed(() => answers.value[currentIndex.value])

const progressPercent = computed(() => ((currentIndex.value + 1) / 48) * 100)

function answer(value: boolean) {
  answers.value[currentIndex.value] = value
  if (currentIndex.value < 47) {
    currentIndex.value++
  } else {
    isComplete.value = true
  }
}

function goBack() {
  if (currentIndex.value > 0) currentIndex.value--
}
</script>

<style scoped>
.diagnostic-page {
  background: #fff;
  padding-bottom: 0;
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

/* Hero: зелёный фон, лист + ЭКГ */
.diagnostic-hero {
  margin-bottom: 32px;
}

.diagnostic-hero-bg {
  background: #66BB6A;
  border-radius: 0 0 24px 24px;
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.diagnostic-hero-svg {
  width: 100%;
  max-width: 800px;
  height: auto;
  min-height: 240px;
}

.diagnostic-leaf {
  transform: translate(50%, 20%);
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

.diagnostic-ecg {
  transform: translate(0, 80px);
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
}

/* Заголовок и описание */
.diagnostic-content {
  max-width: 720px;
  margin: 0 auto 48px;
}

.diagnostic-title {
  margin: 0 0 20px;
  text-align: center;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #dd5f05;
  line-height: 1.15;
}

.diagnostic-title-line {
  display: block;
}

.diagnostic-intro {
  margin: 0 0 36px;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  text-align: center;
}

/* Карточка вопроса */
.diagnostic-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 28px 32px 36px;
}

.diagnostic-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.diagnostic-back {
  font-size: 14px;
  font-weight: 700;
  color: #dd5f05;
  text-decoration: none;
  transition: opacity 0.2s;
}
.diagnostic-back:hover {
  opacity: 0.85;
}
.diagnostic-back--placeholder {
  color: #bbb;
  cursor: default;
  pointer-events: none;
}

.diagnostic-progress-label {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.diagnostic-progress-bar {
  margin-bottom: 32px;
}

.diagnostic-progress-track {
  height: 10px;
  background: #dd5f05;
  border-radius: 999px;
  overflow: hidden;
}

.diagnostic-progress-fill {
  height: 100%;
  background: #f0a060;
  border-radius: 999px;
  transition: width 0.3s ease;
}

.diagnostic-question {
  margin: 0 0 36px;
  font-size: clamp(18px, 2.2vw, 24px);
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  line-height: 1.35;
}

.diagnostic-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.diagnostic-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  border: 2px solid #dd5f05;
  background: #fff;
  color: #dd5f05;
}

.diagnostic-btn-arrow {
  font-size: 1.1em;
  line-height: 1;
}

.diagnostic-btn--no:hover,
.diagnostic-btn--no.is-selected {
  background: #dd5f05;
  color: #fff;
}

.diagnostic-btn--yes {
  background: #dd5f05;
  color: #fff;
}
.diagnostic-btn--yes:hover {
  background: #c25404;
  border-color: #c25404;
}
.diagnostic-btn--yes.is-selected {
  background: #dd5f05;
  color: #fff;
}

/* Экран результата */
.diagnostic-card--result {
  text-align: center;
  padding: 48px 32px;
}

.diagnostic-result-title {
  margin: 0 0 16px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #dd5f05;
  text-transform: uppercase;
}

.diagnostic-result-text {
  margin: 0 0 24px;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

.diagnostic-result-link {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  background: #dd5f05;
  color: #fff;
  text-decoration: none;
  transition: background 0.2s;
}
.diagnostic-result-link:hover {
  background: #c25404;
  color: #fff;
}

/* Зелёная полоса внизу */
.diagnostic-footer-bar {
  height: 8px;
  background: #66BB6A;
}
</style>
