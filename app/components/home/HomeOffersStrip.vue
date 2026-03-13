<template>
  <section class="offers-strip-section">
    <div class="container">
      <div class="offers-row">
        <div class="offer-item offer-item--blue-on-hover">
          <div class="offer-icon"><img src="/fire.svg" alt=""></div>
          <span>Выбирай выгодные наборы сейчас</span>
        </div>
        <div class="offer-item offer-item--blue-on-hover">
          <div class="offer-icon"><img src="/fire.svg" alt=""></div>
          <span>Лови лучшие цены недели</span>
        </div>
        <div class="offer-item offer-item--blue-on-hover">
          <div class="offer-icon"><img src="/fire.svg" alt=""></div>
          <span>Покупай качественные товары дешевле</span>
        </div>
        <div class="offer-item offer-item--blue-on-hover">
          <div class="offer-icon"><img src="/fire.svg" alt=""></div>
          <span>Успей забрать свою скидку</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.offers-strip-section {
  padding: 50px 0;
}

.offers-row {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.offer-item {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
}

.offer-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.offer-item--blue-on-hover span {
  color: inherit;
  transition: color 0.2s;
}
.offer-item--blue-on-hover:hover span {
  color: #2a6dbd;
}
</style>
<script setup lang="ts">
</script>
