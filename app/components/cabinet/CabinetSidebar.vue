<template>
  <aside class="cabinet-sidebar">
    <nav class="cabinet-menu" aria-label="Меню личного кабинета">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.key"
        :to="item.to"
        class="menu-item"
        :class="{ active: active === item.key }"
      >
        <span class="menu-icon" aria-hidden="true">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <button class="logout-btn" type="button">
      <span class="logout-arrow"></span>
      <span>ВЫЙТИ</span>
    </button>
  </aside>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  active?: 'orders' | 'favorites' | 'cart' | 'profile'
}>(), {
  active: 'orders',
})

const menuItems = [
  { key: 'orders', label: 'Мои заказы', to: '/cabinet/orders', icon: '◫' },
  { key: 'favorites', label: 'Мои избранные', to: '/cabinet/favorites', icon: '♡' },
  { key: 'cart', label: 'Моя корзина', to: '/cabinet/cart', icon: '🛒' },
  { key: 'profile', label: 'Профиль', to: '/cabinet/profile', icon: '◌' },
] as const
</script>

<style scoped>
.cabinet-menu {
  border: 1px solid #d7d7d7;
  border-radius: 28px;
  overflow: hidden;
  background: #ffffff;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 58px;
  padding: 0 16px;
  border-bottom: 1px solid #dfdfdf;
  color: #202020;
  font-size: clamp(20px, 1.25vw, 36px);
  font-weight: 600;
  text-decoration: none;
}

.menu-item:last-child {
  border-bottom: 0;
}

.menu-item.active {
  background: #e28133;
  color: #fff;
}

.menu-icon {
  width: 24px;
  text-align: center;
  font-size: 23px;
  line-height: 1;
}

.logout-btn {
  margin-top: 20px;
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}

.logout-arrow {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #e28133;
  position: relative;
}

.logout-arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: translate(-62%, -50%) rotate(45deg);
}

.logout-btn span:last-child {
  margin-left: -2px;
  height: 52px;
  border-radius: 999px;
  background: #e28133;
  color: #fff;
  padding: 0 20px;
  display: inline-flex;
  align-items: center;
  font-size: clamp(18px, 0.95vw, 20px);
  font-weight: 800;
}

@media (max-width: 1100px) {
  .cabinet-sidebar {
    margin-bottom: 24px;
  }

  .menu-item {
    min-height: 54px;
    font-size: clamp(16px, 5vw, 22px);
  }
}
</style>
