<template>
  <div>
    <TheHeader />
    <main class="cabinet-page">
      <CabinetBreadcrumbs current="Мои избранные" />

      <div class="container">
        <CabinetPageTitle />
      </div>

      <section class="cabinet-content">
        <div class="container">
          <div class="cabinet-grid">
            <CabinetSidebar active="favorites" />

            <section class="favorites-section">
              <h2 class="favorites-title">МОИ ИЗБРАННЫЕ</h2>

              <div class="favorites-grid">
                <CabinetFavoriteCard
                  v-for="item in favoriteProducts"
                  :key="item.id"
                  :title="item.title"
                  :description="item.description"
                  :price="item.price"
                  :image="item.image"
                />
              </div>
            </section>
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
  title: 'Личный кабинет — Мои избранные',
})

const favoriteProducts = [
  {
    id: 1,
    title: 'Почечный чай',
    description: 'Мягкая поддержка естественного очищения',
    price: '5 000₸',
    image: '/images/a9af888db3be8853f23ab252ff40884690219e08.png',
    variant: 'blue',
  },
  {
    id: 2,
    title: 'Чантун, 22 SV',
    description: 'Детокс желудочно-кишечного тракта',
    price: '5 000₸',
    image: '/images/ed5e8facaec896ea83ea852ba46deca14cdcf939.png',
    variant: 'orange',
  },
  {
    id: 3,
    title: 'Цинвэнь, 35 SV',
    description: 'Помогающий бороться с основными причинами симптомов простуды.',
    price: '5 000₸',
    image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png',
    variant: 'blue',
  },
  {
    id: 4,
    title: 'Почечный чай',
    description: 'Мягкая поддержка естественного очищения',
    price: '5 000₸',
    image: '/images/a9af888db3be8853f23ab252ff40884690219e08.png',
    variant: 'blue',
  },
  {
    id: 5,
    title: 'Цинвэнь, 35 SV',
    description: 'Помогающий бороться с основными причинами симптомов простуды.',
    price: '5 000₸',
    image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png',
    variant: 'blue',
  },
  {
    id: 6,
    title: 'Чантун, 22 SV',
    description: 'Детокс желудочно-кишечного тракта',
    price: '5 000₸',
    image: '/images/ed5e8facaec896ea83ea852ba46deca14cdcf939.png',
    variant: 'orange',
  },
] as const
</script>

<style scoped>
.cabinet-page {
  background: #ffffff;
  padding-bottom: 34px;
}

.cabinet-content {
  padding-bottom: 26px;
}

.cabinet-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
  align-items: start;
}

.favorites-title {
  margin: 10px 0 100px;
  font-size: clamp(40px, 2.1vw, 42px);
  color: #111;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 1300px) {
  .favorites-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1100px) {
  .cabinet-grid {
    grid-template-columns: 1fr;
  }

  .favorites-title {
    margin-top: 0;
  }
}

@media (max-width: 760px) {
  .favorites-grid {
    grid-template-columns: 1fr;
  }
}
</style>
