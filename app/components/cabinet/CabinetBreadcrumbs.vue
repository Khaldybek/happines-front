<template>
  <section class="breadcrumbs-section">
    <div class="container">
      <nav class="breadcrumbs-list" aria-label="Хлебные крошки">
        <template v-for="(item, index) in resolvedItems" :key="`${item.label}-${index}`">
          <NuxtLink v-if="item.to && index < resolvedItems.length - 1" :to="item.to" class="crumb-item">
            {{ item.label }}
          </NuxtLink>
          <span v-else class="crumb-item" :class="{ active: index === resolvedItems.length - 1 }">
            {{ item.label }}
          </span>

          <img
            v-if="index < resolvedItems.length - 1"
            src="/images/16_552.svg"
            alt=""
          >
        </template>
      </nav>
    </div>
  </section>
</template>

<script setup lang="ts">
type BreadcrumbItem = {
  label: string
  to?: string
}

const props = withDefaults(defineProps<{
  current?: string
  items?: BreadcrumbItem[]
}>(), {
  current: 'Мои заказы',
})

const resolvedItems = computed<BreadcrumbItem[]>(() => {
  if (props.items?.length) {
    return props.items
  }

  return [
    { label: 'Главная', to: '/' },
    { label: 'Личный кабинет', to: '/cabinet/orders' },
    { label: props.current },
  ]
})
</script>

<style scoped>
.breadcrumbs-section {
  padding: 10px 0 8px;
}

.breadcrumbs-list {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  flex-wrap: wrap;
}

.crumb-item {
  color: #292929;
}

.crumb-item.active {
  color: #8d8d8d;
}
</style>
