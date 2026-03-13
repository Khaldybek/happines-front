<template>
  <div class="long-term-doc-wrapper">
    <TheHeader />
    <main class="long-term-doc-page">
      <section class="breadcrumbs-section">
        <div class="container">
          <nav class="breadcrumbs-list" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="crumb-item">Главная</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <NuxtLink to="/events/promotion" class="crumb-item">Промоушен HAPPINESS</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <NuxtLink to="/events/promotion?tab=long" class="crumb-item">Долгосрочные промоушены</NuxtLink>
            <img src="/images/16_552.svg" alt="">
            <span class="crumb-item active">{{ doc?.titleShort || doc?.title }}</span>
          </nav>
        </div>
      </section>

      <div v-if="doc" class="container long-term-doc-container">
        <h1 class="long-term-doc-title">{{ doc.title }}</h1>
        <p v-if="doc.intro" class="long-term-doc-intro">{{ doc.intro }}</p>
        <p class="long-term-doc-date">
          <span class="date-icon" aria-hidden="true">📅</span>
          {{ doc.date }}
        </p>

        <div class="long-term-doc-brand">
          <img src="/logo.svg" alt="HAPPINESS" class="doc-logo">
          <p class="doc-company">Гонконгская корпорация «Шен Лунг» Happiness</p>
          <p class="doc-contact">+86 400-172-1168</p>
          <p class="doc-contact">support@slhappiness.com</p>
          <p class="doc-contact">https://slhappiness.com</p>
          <h2 class="doc-subtitle">{{ doc.subtitle || doc.title }}</h2>
        </div>

        <div v-if="doc.sections?.length" class="long-term-doc-sections">
          <section v-for="(sec, i) in doc.sections" :key="i" class="doc-section">
            <h3 class="doc-section-title">{{ sec.heading }}</h3>
            <p v-if="sec.text" class="doc-section-text">{{ sec.text }}</p>
            <ul v-if="sec.list?.length" class="doc-section-list">
              <li v-for="(item, j) in sec.list" :key="j">{{ item }}</li>
            </ul>
            <ol v-if="sec.numbered?.length" class="doc-section-ol">
              <li v-for="(item, k) in sec.numbered" :key="k">{{ item }}</li>
            </ol>
          </section>
        </div>

        <div v-if="doc.tables?.length" class="long-term-doc-tables">
          <div v-for="(tbl, ti) in doc.tables" :key="ti" class="doc-table-wrap">
            <h3 class="doc-table-caption">{{ tbl.caption }}</h3>
            <div class="doc-table-scroll">
              <table class="doc-table">
                <thead>
                  <tr>
                    <th v-for="(col, ci) in tbl.headers" :key="ci">{{ col }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, ri) in tbl.rows" :key="ri">
                    <td v-for="(cell, ci) in row" :key="ci">{{ cell }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="long-term-doc-back">
          <NuxtLink to="/events/promotion?tab=long" class="doc-back-link">← Назад к промоушенам</NuxtLink>
        </div>
      </div>

      <div v-else class="container">
        <p class="long-term-doc-notfound">Документ не найден.</p>
        <NuxtLink to="/events/promotion?tab=long" class="doc-back-link">← Назад к промоушенам</NuxtLink>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

interface DocSection {
  heading: string
  text?: string
  list?: string[]
  numbered?: string[]
}

interface DocTable {
  caption: string
  headers: string[]
  rows: string[][]
}

interface LongTermDoc {
  title: string
  titleShort?: string
  subtitle?: string
  intro?: string
  date: string
  sections?: DocSection[]
  tables?: DocTable[]
}

const route = useRoute()
const slug = computed(() => (route.params.slug as string) || '')

const docsBySlug: Record<string, LongTermDoc> = {
  'cashback-848-889': {
    title: 'ГОНКОНГСКАЯ КОРПОРАЦИЯ «ШЕН ЛУНГ» HAPPINESS ПРОМОУШЕН CASHBACK(848-889)',
    titleShort: 'Промоушен Cashback (848-889)',
    subtitle: 'Гонконгская корпорация «Шен Лунг» HAPPINESS Промоушен Cashback',
    intro: 'Кэшбек на покупку автомобиля (800 000 S). Условия для партнёров А и Б, порядок начисления по циклам.',
    date: '27.01.26',
    sections: [
      {
        heading: 'Цель',
        text: 'Кэшбек на покупку автомобиля (800 000 S).',
      },
      {
        heading: 'Период',
        text: '848-889 недели (всего 42 недели).',
      },
      {
        heading: 'Условия',
        text: 'Партнёр А (новый или действующий дистрибьютор) рекомендует партнёра Б (новый контракт): стандартная карта 350 SV для партнёра А, контракт на 450 у.е. для партнёра Б. Партнёр Б закрывает 3-й цикл.',
      },
      {
        heading: 'Порядок начисления',
        numbered: [
          'Начисление кэшбэка партнёрам А и Б по мере закрытия циклов.',
          'После закрытия партнёром Б 3-го цикла сумма кэшбэка партнёру Б — 8000 у.е.',
          'Партнёр А может рекомендовать неограниченное количество новых партнёров Б.',
        ],
      },
      {
        heading: 'Примечание',
        list: [
          'Партнёр Б после закрытия 3-го цикла получает кэшбек 8000 у.е.',
          'Партнёр А может рекомендовать неограниченное количество новых партнёров В.',
          'Условия по вознаграждению лидера уточняются отдельно.',
        ],
      },
    ],
    tables: [
      {
        caption: 'Вознаграждения партнера А',
        headers: ['Вид', 'Этап', 'Основное вознаграждение (у.е.)', 'Дополнительный кэшбек (2 цикл)', 'Дополнительный кэшбек (3 цикл)', 'Примечание'],
        rows: [
          ['Основное', '1', '100', '+50', '+50', 'Партнер А может рекомендовать неограниченное количество новых партнёров В'],
          ['Основное', '2', '200', '+100', '+100', ''],
          ['Основное', '3', '300', '+150', '+150', ''],
          ['Основное', '4', '400', '+200', '+200', ''],
          ['Итого по циклам', '—', '1000', '—', '—', ''],
          ['За закрытие 2 и 3 цикла', '—', '—', '+500', '+500', ''],
        ],
      },
      {
        caption: 'Вознаграждения партнера Б',
        headers: ['Вид', 'Этап', 'Структурное воз.', '2 цикл', '3 цикл'],
        rows: [
          ['Основное', '1', '100', '+100', '+100'],
          ['Основное', '2', '200', '+200', '+200'],
          ['Основное', '3', '300', '+300', '+300'],
          ['Основное', '4', '400', '+400', '+400'],
          ['Итого по циклам', '—', '1000', '—', '—'],
          ['За закрытие 2 и 3 цикла', '—', '—', '+1000', '+8000'],
        ],
      },
    ],
  },
  'q1-2026': {
    title: 'HAPPINESS – промоушен на первый квартал 2026 года',
    intro: 'Промоушен с 847 по 858 р/н (всего 12 недель). Вознаграждение: поездка (1 место), проезд и проживание.',
    date: '20.01.26',
    sections: [
      { heading: 'Период', text: 'С 847 р/н по 858 р/н (всего 12 недель).' },
      {
        heading: 'Условия промоушена',
        list: [
          'Рекомендация не менее установленного количества новых партнёров.',
          'Закрытие новыми партнёрами определённых этапов.',
        ],
      },
      {
        heading: 'Вознаграждения по промоушену',
        text: 'Поездка (1 место) для успешно выполнивших условия. Проезд и проживание включены.',
      },
    ],
  },
  'lisyang-l7-2025': {
    title: 'HAPPINESS – промоушен 2025 "Забери домой свой Лисян L7"',
    intro: 'Условия и порядок начисления по программе. Детали в документе.',
    date: '27.12.24',
    sections: [
      { heading: 'Условия', text: 'Участие в промоушене при выполнении условий компании.' },
      { heading: 'Вознаграждение', text: 'Лисян L7 при выполнении условий.' },
    ],
  },
  'iphone-15-757-766': {
    title: 'Промоушен на IPhone 15 (757-766 р/н)',
    intro: 'Специальная акция на iPhone 15 для партнёров. Сроки и условия в документе.',
    date: '22.04.24',
    sections: [
      { heading: 'Период', text: 'Расчётные недели 757-766.' },
      { heading: 'Условия', text: 'Выполнение условий компании для получения приза iPhone 15.' },
    ],
  },
  'travel-2026': {
    title: 'Промоушен «Поездка» (848-858)',
    intro: 'Вознаграждение поездкой за выполнение условий. 12 недель.',
    date: '27.01.26',
    sections: [
      { heading: 'Период', text: '848-858 р/н (12 недель).' },
      { heading: 'Вознаграждение', text: 'Поездка при выполнении условий.' },
    ],
  },
  'quarter-bonus': {
    title: 'Квартальный бонус 2026',
    intro: 'Дополнительные бонусы за объём в квартале.',
    date: '01.01.26',
    sections: [
      { heading: 'Условия', text: 'Достижение объёмов в квартале. Детали у спонсора.' },
    ],
  },
}

const doc = computed(() => (slug.value ? docsBySlug[slug.value] ?? null : null))

useHead({
  title: () => (doc.value ? `${doc.value.titleShort || doc.value.title} — Промоушен — Happiness` : 'Документ — Промоушен — Happiness'),
})
</script>

<style scoped>
.long-term-doc-page {
  background: #fff;
  padding-bottom: 60px;
}

.breadcrumbs-section {
  padding: 20px 0;
}

.breadcrumbs-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 14px;
}

.crumb-item {
  color: #282828;
}

.crumb-item.active {
  color: #7f7f7f;
}

.long-term-doc-container {
  max-width: 900px;
  margin: 0 auto;
}

.long-term-doc-title {
  margin: 0 0 16px;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #dd5f05;
  line-height: 1.25;
}

.long-term-doc-intro {
  margin: 0 0 12px;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
}

.long-term-doc-date {
  margin: 0 0 32px;
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-icon {
  font-size: 1.1rem;
}

.long-term-doc-brand {
  background: #f5f5f5;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
}

.doc-logo {
  height: 36px;
  width: auto;
  margin-bottom: 12px;
  display: block;
}

.doc-company {
  margin: 0 0 12px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
}

.doc-contact {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}

.doc-subtitle {
  margin: 24px 0 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

.long-term-doc-sections {
  margin-bottom: 32px;
}

.doc-section {
  margin-bottom: 24px;
}

.doc-section-title {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 700;
  color: #dd5f05;
}

.doc-section-text {
  margin: 0 0 8px;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #333;
}

.doc-section-list,
.doc-section-ol {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333;
}

.long-term-doc-tables {
  margin-bottom: 32px;
}

.doc-table-wrap {
  margin-bottom: 28px;
}

.doc-table-caption {
  margin: 0 0 12px;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
}

.doc-table-scroll {
  overflow-x: auto;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
}

.doc-table {
  width: 100%;
  min-width: 500px;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.doc-table th,
.doc-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.doc-table th {
  background: #f5f5f5;
  font-weight: 600;
  color: #1a1a1a;
}

.doc-table tbody tr:last-child td {
  border-bottom: none;
}

.long-term-doc-back {
  padding-top: 16px;
}

.doc-back-link {
  font-size: 0.95rem;
  font-weight: 600;
  color: #78a435;
  text-decoration: none;
}
.doc-back-link:hover {
  text-decoration: underline;
}

.long-term-doc-notfound {
  margin: 0 0 16px;
  font-size: 1rem;
  color: #666;
}
</style>
