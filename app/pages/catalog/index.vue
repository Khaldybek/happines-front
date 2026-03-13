<template>
  <div>
    <TheHeader />
    <main>
      <CatalogHero
        category-title="Очищение"
        hero-image="/images/1ae1a66818f50d31f8b471b4238a7ac2c17b847f.png"
        lead="Очищение организма от шлаков и токсинов – первый шаг на пути к здоровью и долголетию."
        description="Продукция HAPPINESS способствует эффективной очистке печени, почек, кишечника, сосудов. Программа детоксикации, подобранная консультантом, поможет вывести из организма токсины, шлаки, метаболиты. Очищение организма от продуктов распада снижает риск инфарктов, инсультов, онкологии, диабета, паразитарной инвазии, аутоиммунных заболеваний. Очистка организма продукцией HAPPINESS особенно эффективна при комплексном применении."
      />
      <CatalogProductGrid
        :products="products"
        :current-page="currentPage"
        :total-pages="totalPages"
        :use-green="false"
        @update:current-page="currentPage = $event"
        @add-to-cart="onAddToCart"
      />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({ title: 'Каталог — Очищение | Happiness' })

const currentPage = ref(1)
const totalPages = 5

const products = [
  {
    id: '1',
    title: 'почечный чай',
    description: 'Мягкая поддержка естественного очищения',
    price: '5 000₸',
    image: '/images/a9af888db3be8853f23ab252ff40884690219e08.png',
    arrowIcon: '/images/I2_653_132_85696.svg',
    tealBtn: false,
    showTap: false,
  },
  {
    id: '2',
    title: 'Чантун, 22 SV',
    description: 'Детокс желудочно-кишечного тракта',
    price: '5 000₸',
    image: '/images/2367385390434f350d8b17bd82ee3a6b35a20fac.png',
    arrowIcon: '/images/I2_672_132_85696.svg',
    tealBtn: false,
    showTap: true,
  },
  {
    id: '3',
    title: 'Цинвэнь, 35 SV',
    description: 'Помогающий бороться с основными причинами симптомов простуды.',
    price: '5 000₸',
    image: '/images/d4ccbbebc73dbb4afdce032ce6fb6ef270a6d447.png',
    arrowIcon: '/images/I2_686_168_9224.svg',
    tealBtn: true,
    showTap: true,
  },
  {
    id: '4',
    title: 'Сюе Бань Люй, 50 SV',
    description: 'Натуральное фитосредство с подтверждённой эффективностью и безопасностью.',
    price: '5 000₸',
    image: '/images/d4ccbbebc73dbb4afdce032ce6fb6ef270a6d447.png',
    arrowIcon: '/images/I2_696_132_85696.svg',
    tealBtn: true,
    showTap: false,
  },
  {
    id: '5',
    title: '«Чантун», 22 SV',
    description: 'Детокс желудочно-кишечного тракта',
    price: '5 000₸',
    image: '/images/a9af888db3be8853f23ab252ff40884690219e08.png',
    arrowIcon: '/images/I2_707_168_9224.svg',
    tealBtn: true,
    showTap: false,
  },
  {
    id: '6',
    title: 'Цинвэнь, 35 SV',
    description: 'Помогающий бороться с основными причинами симптомов простуды.',
    price: '5 000₸',
    image: '/images/2367385390434f350d8b17bd82ee3a6b35a20fac.png',
    arrowIcon: '/images/I2_718_132_85696.svg',
    tealBtn: false,
    showTap: false,
  },
  {
    id: '7',
    title: 'Сюе Бань Люй, 50 SV',
    description: 'Натуральное фитосредство с подтверждённой эффективностью и безопасностью.',
    price: '5 000₸',
    image: '/images/d4ccbbebc73dbb4afdce032ce6fb6ef270a6d447.png',
    arrowIcon: '/images/I2_729_132_85696.svg',
    tealBtn: false,
    showTap: false,
  },
  {
    id: '8',
    title: 'почечный чай',
    description: 'Мягкая поддержка естественного очищения',
    price: '5 000₸',
    image: '/images/a9af888db3be8853f23ab252ff40884690219e08.png',
    arrowIcon: '/images/I2_740_132_85696.svg',
    tealBtn: false,
    showTap: false,
  },
  {
    id: '9',
    title: 'Цинвэнь, 35 SV',
    description: 'Помогающий бороться с основными причинами симптомов простуды.',
    price: '5 000₸',
    image: '/images/a9af888db3be8853f23ab252ff40884690219e08.png',
    arrowIcon: '/images/I2_749_132_85696.svg',
    tealBtn: false,
    showTap: false,
  },
  {
    id: '10',
    title: 'почечный чай',
    description: 'Мягкая поддержка естественного очищения',
    price: '5 000₸',
    image: '/images/a9af888db3be8853f23ab252ff40884690219e08.png',
    arrowIcon: '/images/I2_761_132_85696.svg',
    tealBtn: false,
    showTap: false,
  },
  {
    id: '11',
    title: 'Сюе Бань Люй, 50 SV',
    description: 'Натуральное фитосредство с подтверждённой эффективностью и безопасностью.',
    price: '5 000₸',
    image: '/images/d4ccbbebc73dbb4afdce032ce6fb6ef270a6d447.png',
    arrowIcon: '/images/I2_769_132_85696.svg',
    tealBtn: false,
    showTap: false,
  },
  {
    id: '12',
    title: '«Чантун», 22 SV',
    description: 'Детокс желудочно-кишечного тракта',
    price: '5 000₸',
    image: '/images/2367385390434f350d8b17bd82ee3a6b35a20fac.png',
    arrowIcon: '/images/I2_779_168_9224.svg',
    tealBtn: true,
    showTap: false,
  },
]

function onAddToCart(_product: unknown) {
  // TODO: интеграция с корзиной
}
</script>
