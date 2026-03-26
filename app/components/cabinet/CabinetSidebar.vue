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
        <span class="menu-icon" aria-hidden="true">
          <component :is="item.icon" />
        </span>
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <button class="logout-btn" type="button" @click="handleLogout">
      <span class="logout-arrow"></span>
      <span>ВЫЙТИ</span>
    </button>
  </aside>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'

withDefaults(defineProps<{
  active?: 'orders' | 'favorites' | 'cart' | 'profile'
}>(), {
  active: 'orders',
})

const authStore = useAuthStore()
const router = useRouter()

async function handleLogout() {
  authStore.logout()
  await router.push('/login')
}

function svgIcon(paths: string[]) {
  return defineComponent({
    render() {
      return h(
        'svg',
        { viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': 'true' },
        paths.map(d => h('path', { d, stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })),
      )
    },
  })
}

const IconOrders = svgIcon([
  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2',
  'M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  'M9 12h6M9 16h4',
])

const IconHeart = defineComponent({
  render() {
    return h(
      'svg',
      { viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': 'true' },
      [
        h('path', {
          d: 'M12 20.5C8.4 17.8 4 14.2 4 9.8 4 7.2 6 5 8.6 5c1.4 0 2.7.6 3.6 1.7C13.1 5.6 14.4 5 15.8 5 18.4 5 20.4 7.2 20.4 9.8c0 4.4-4.4 8-7.2 10.4-.6.5-1.2.3-1.2.3z',
          stroke: 'currentColor',
          'stroke-width': '1.8',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ],
    )
  },
})

const IconCart = svgIcon([
  'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z',
  'M3 6h18',
  'M16 10a4 4 0 01-8 0',
])

const IconProfile = svgIcon([
  'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2',
  'M12 11a4 4 0 100-8 4 4 0 000 8z',
])

const menuItems = [
  { key: 'orders', label: 'Мои заказы', to: '/lk/orders', icon: IconOrders },
  { key: 'favorites', label: 'Мои избранные', to: '/lk/favorites', icon: IconHeart },
  { key: 'cart', label: 'Моя корзина', to: '/lk/cart', icon: IconCart },
  { key: 'profile', label: 'Профиль', to: '/lk/profile', icon: IconProfile },
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
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.menu-icon :deep(svg) {
  width: 22px;
  height: 22px;
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
