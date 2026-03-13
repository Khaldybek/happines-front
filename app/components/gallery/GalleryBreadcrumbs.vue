<template>
  <section class="breadcrumbs-section">
    <div class="container">
      <nav class="breadcrumbs-list" aria-label="Хлебные крошки">
        <NuxtLink to="/" class="crumb-item">Главная</NuxtLink>
        <img src="/images/16_552.svg" alt="">
        <span class="crumb-item active">Галерея</span>
      </nav>
    </div>
  </section>
</template>

<style scoped>
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
</style>
