<template>
  <nav class="page-hero-breadcrumbs learning-breadcrumbs-nav" aria-label="Хлебные крошки">
    <NuxtLink to="/" class="crumb-item">Главная</NuxtLink>
    <img src="/images/16_552.svg" alt="">
    <span class="crumb-item active">Онлайн обучение</span>
  </nav>
</template>

<style scoped>
.crumb-item {
  color: #282828;
}

.crumb-item.active {
  color: #dd5f05;
}
</style>
