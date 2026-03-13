<template>
  <nav class="breadcrumbs" aria-label="Хлебные крошки">
    <NuxtLink to="/" class="crumb-link">Главная</NuxtLink>
    <img src="/images/2_634.svg" alt="">
    <span class="current">{{ currentLabel }}</span>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  currentLabel: string
}>()
</script>

<style scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 20px 25px;
  color: #282828;
  font-size: 14px;
}

.breadcrumbs .current {
  color: #7f7f7f;
}
</style>
