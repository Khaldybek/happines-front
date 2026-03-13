<template>
  <div>
    <TheHeader />
    <CompanyCredentialsGallery
      breadcrumb-title="Документы компании"
      hero-image="/images/11b1d7dd02636b45154d2e2dc04e24e1492536ea.png"
      :title-parts="titleParts"
      mode="years"
      :years="years"
      :active-year="activeYear"
      :items="displayedItems"
      :pages="pages"
      :active-page="activePage"
      @update:active-year="activeYear = $event"
      @update:active-page="activePage = $event"
    />
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Документы компании — Happiness',
})

const titleParts = [
  { text: 'ДОКУМЕНТЫ', accent: true },
  { text: 'КОМПАНИИ', accent: true }
]

const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016]
const activeYear = ref(2014)
const activePage = ref(3)
const pages = [1, 2, 3, 4, 5]
const perPage = 12

const items = [
  { image: '/images/037d67360995ebc205d9a69566bc4c35098968e3.png', title: 'СЛАВА ЭКОНОМИКИ КАЗАХСТАНА, АСТАНА, 2014' },
  { image: '/images/70fa936acde0ac54ca841009961e9a5a08a43d1b.png', title: 'ТОО HAPPINESS НАГРАЖДЕНА НАЦИОНАЛЬНЫМ СЕРТИФИКАТОМ «ЛИДЕР ОТРАСЛИ 2014»' },
  { image: '/images/de731b9c3a7e46a8e126f4fdd2fcaa9a37aaadf6.png', title: 'ПОЧЕТНАЯ ГРАМОТА. ШАКИБАЕВА Р.О. МЕЖДУНАРОДНЫЙ ОРГКОМИТЕТ ПО ОБЩЕСТВЕННЫМ НАГРАДАМ' },
  { image: '/images/6a7f7a614fda91ca334cc955f4a5290ecd6aa646.png', title: 'ТОО HAPPINESS НАГРАЖДЕНА НАЦИОНАЛЬНЫМ СЕРТИФИКАТОМ «ЛИДЕР ОТРАСЛИ 2014»' },
  { image: '/images/037d67360995ebc205d9a69566bc4c35098968e3.png', title: 'СЛАВА ЭКОНОМИКИ КАЗАХСТАНА, АСТАНА, 2014' },
  { image: '/images/70fa936acde0ac54ca841009961e9a5a08a43d1b.png', title: 'ТОО HAPPINESS НАГРАЖДЕНА НАЦИОНАЛЬНЫМ СЕРТИФИКАТОМ «ЛИДЕР ОТРАСЛИ 2014»' },
  { image: '/images/de731b9c3a7e46a8e126f4fdd2fcaa9a37aaadf6.png', title: 'ПОЧЕТНАЯ ГРАМОТА. ШАКИБАЕВА Р.О. МЕЖДУНАРОДНЫЙ ОРГКОМИТЕТ ПО ОБЩЕСТВЕННЫМ НАГРАДАМ' },
  { image: '/images/6a7f7a614fda91ca334cc955f4a5290ecd6aa646.png', title: 'ТОО HAPPINESS НАГРАЖДЕНА НАЦИОНАЛЬНЫМ СЕРТИФИКАТОМ «ЛИДЕР ОТРАСЛИ 2014»' },
  { image: '/images/037d67360995ebc205d9a69566bc4c35098968e3.png', title: 'СЛАВА ЭКОНОМИКИ КАЗАХСТАНА, АСТАНА, 2014' },
  { image: '/images/70fa936acde0ac54ca841009961e9a5a08a43d1b.png', title: 'ТОО HAPPINESS НАГРАЖДЕНА НАЦИОНАЛЬНЫМ СЕРТИФИКАТОМ «ЛИДЕР ОТРАСЛИ 2014»' },
  { image: '/images/de731b9c3a7e46a8e126f4fdd2fcaa9a37aaadf6.png', title: 'ПОЧЕТНАЯ ГРАМОТА. ШАКИБАЕВА Р.О. МЕЖДУНАРОДНЫЙ ОРГКОМИТЕТ ПО ОБЩЕСТВЕННЫМ НАГРАДАМ' },
  { image: '/images/6a7f7a614fda91ca334cc955f4a5290ecd6aa646.png', title: 'ТОО HAPPINESS НАГРАЖДЕНА НАЦИОНАЛЬНЫМ СЕРТИФИКАТОМ «ЛИДЕР ОТРАСЛИ 2014»' },
]

const allItems = computed(() => {
  const list = [...items]
  while (list.length < perPage * pages.length) list.push(...items)
  return list
})

const displayedItems = computed(() => {
  const start = (activePage.value - 1) * perPage
  return allItems.value.slice(start, start + perPage)
})
</script>
