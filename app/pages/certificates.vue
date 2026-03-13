<template>
  <div>
    <TheHeader />
    <CompanyCredentialsGallery
      breadcrumb-title="Сертификаты на продукцию"
      hero-image="/images/38562b9948e800cdd8f06f33ced8151c434679ef.png"
      :title-parts="titleParts"
      mode="select"
      :select-options="selectOptions"
      :items="displayedItems"
      :pages="pages"
      :active-page="activePage"
      :grid-columns="3"
      page-variant="light"
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
  title: 'Сертификаты на продукцию — Happiness',
})

const titleParts = [
  { text: 'СЕРТИФИКАТЫ НА' },
  { text: ' ПРОДУКЦИЮ HAPPINESS', accent: true }
]

const selectOptions = [
  'Оздоровительные тампоны «Цин Гун»',
  'Чай «Наслаждение»',
  'Детокс ЖКТ «Чантун»',
  'Сертификат системы безопасности пищевых продуктов'
]

const items = [
  { image: '/images/6a7f7a614fda91ca334cc955f4a5290ecd6aa646.png', title: 'ОЗДОРОВИТЕЛЬНЫЕ ТАМПОНЫ «ЦИН ГУН»' },
  { image: '/images/de731b9c3a7e46a8e126f4fdd2fcaa9a37aaadf6.png', title: 'ЧАЙ "НАСЛАЖДЕНИЕ"' },
  { image: '/images/483aea05be8f2b87843b88343e43a7b7eca18d38.png', title: 'ДЕТОКС ЖКТ "ЧАНТУН"' },
  { image: '/images/2367385390434f350d8b17bd82ee3a6b35a20fac.png', title: 'СЕРТИФИКАТ СИСТЕМЫ БЕЗОПАСНОСТИ ПИЩЕВЫХ ПРОДУКТОВ' },
  { image: '/images/6a7f7a614fda91ca334cc955f4a5290ecd6aa646.png', title: 'ОЗДОРОВИТЕЛЬНЫЕ ТАМПОНЫ «ЦИН ГУН»' },
  { image: '/images/de731b9c3a7e46a8e126f4fdd2fcaa9a37aaadf6.png', title: 'ЧАЙ "НАСЛАЖДЕНИЕ"' },
  { image: '/images/483aea05be8f2b87843b88343e43a7b7eca18d38.png', title: 'ДЕТОКС ЖКТ "ЧАНТУН"' },
  { image: '/images/2367385390434f350d8b17bd82ee3a6b35a20fac.png', title: 'СЕРТИФИКАТ СИСТЕМЫ БЕЗОПАСНОСТИ ПИЩЕВЫХ ПРОДУКТОВ' },
  { image: '/images/6a7f7a614fda91ca334cc955f4a5290ecd6aa646.png', title: 'ОЗДОРОВИТЕЛЬНЫЕ ТАМПОНЫ «ЦИН ГУН»' },
  { image: '/images/de731b9c3a7e46a8e126f4fdd2fcaa9a37aaadf6.png', title: 'ЧАЙ "НАСЛАЖДЕНИЕ"' },
  { image: '/images/483aea05be8f2b87843b88343e43a7b7eca18d38.png', title: 'ДЕТОКС ЖКТ "ЧАНТУН"' },
  { image: '/images/2367385390434f350d8b17bd82ee3a6b35a20fac.png', title: 'СЕРТИФИКАТ СИСТЕМЫ БЕЗОПАСНОСТИ ПИЩЕВЫХ ПРОДУКТОВ' },
]

const activePage = ref(3)
const pages = [1, 2, 3, 4, 5]
const perPage = 9

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
