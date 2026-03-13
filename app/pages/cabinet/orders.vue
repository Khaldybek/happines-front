<template>
  <div>
    <TheHeader />
    <main class="cabinet-page">
      <CabinetBreadcrumbs current="Мои заказы" />

      <div class="container">
        <CabinetPageTitle />
      </div>

      <section class="cabinet-content">
        <div class="container">
          <div class="cabinet-grid">
            <CabinetSidebar active="orders" />

            <section class="orders-section">
              <h2 class="orders-title">МОИ ЗАКАЗЫ</h2>

              <div class="orders-list">
                <CabinetOrderCard
                  status="Обрабатывается"
                  date-time="14.06.24 18:30"
                  total="150 000 ₸"
                  payment="Карта"
                  delivery="Самовывоз"
                  address="Казахстан, г Алматы ул. Эльбека, 61/350, 050000"
                  person="Айнур Мусина"
                  phone="8 747 69 29 453"
                  email="Google@gmail.com"
                  comment="С другой стороны дальнейшее развитие различных форм деятельности"
                  :items="orderItemsA"
                  :highlight="true"
                />

                <CabinetOrderCard
                  status="В пути"
                  date-time="14.06.24 18:30"
                  total="151 000 ₸"
                  payment="Карта"
                  delivery="1000 ₸"
                  address="Казахстан, г Алматы ул. Эльбека, 61/350, 050000"
                  person="Айнур Мусина"
                  phone="8 747 69 29 453"
                  email="Google@gmail.com"
                  comment="С другой стороны дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям."
                  :items="orderItemsB"
                  :collapsed-count="5"
                  :initial-expanded="true"
                />

                <CabinetOrderCard
                  status="Доставлен"
                  date-time="14.06.24 18:30"
                  total="150 000 ₸"
                  payment="Карта"
                  delivery="Самовывоз"
                  address="Казахстан, г Алматы ул. Эльбека, 61/350, 050000"
                  person="Айнур Мусина"
                  phone="8 747 69 29 453"
                  email="Google@gmail.com"
                  comment="С другой стороны дальнейшее развитие различных форм деятельности"
                  :items="orderItemsA"
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
  title: 'Личный кабинет — Мои заказы',
})

const orderItemsA = [
  { image: '/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png', title: 'Дасуаньсу, 35 SV', count: 3, price: '75 000 ₸' },
  { image: '/images/a9af888db3be8853f23ab252ff40884690219e08.png', title: 'Почечный чай', count: 1, price: '25 000 ₸' },
  { image: '/images/dab270cdd863b399b68997a9649feb91f178c56b.png', title: 'Сюе Бань Люй, 50 SV', count: 2, price: '50 000 ₸' },
]

const orderItemsB = [
  ...orderItemsA,
  { image: '/images/ed5e8facaec896ea83ea852ba46deca14cdcf939.png', title: '«Чантун», 22 SV', count: 1, price: '25 000 ₸' },
  { image: '/images/6a7f7a614fda91ca334cc955f4a5290ecd6aa646.png', title: 'Кордицепс «Источник жизненной силы», 60 SV', count: 1, price: '25 000 ₸' },
]
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

.orders-title {
  margin: 10px 0 14px;
  font-size: clamp(40px, 2.1vw, 38px);
  color: #101010;
}

.orders-list {
  display: grid;
  gap: 18px;
}

@media (max-width: 1100px) {
  .cabinet-grid {
    grid-template-columns: 1fr;
  }

  .orders-title {
    margin-top: 0;
  }
}
</style>
