<template>
  <header class="site-header-wrap">
    <div class="container">
      <header class="site-header">
        <NuxtLink to="/" class="logo">
          <img src="/logo.svg" alt="Happiness" class="logo-part">
        </NuxtLink>

        <nav class="main-nav">
          <!-- О компании + dropdown -->
          <div
            class="nav-item-wrap"
            :class="{ 'is-open': aboutOpen }"
            @mouseenter="aboutOpen = true"
            @mouseleave="aboutOpen = false"
          >
            <NuxtLink to="/about" class="nav-link">О компании</NuxtLink>
            <div class="nav-dropdown">
              <NuxtLink to="/about" class="dropdown-item">О нас</NuxtLink>
              <NuxtLink to="/documents" class="dropdown-item">Документы компании</NuxtLink>
              <NuxtLink to="/certificates" class="dropdown-item">Сертификаты на продукцию</NuxtLink>
              <NuxtLink to="/privacy" class="dropdown-item">Политика конфиденциальности</NuxtLink>
            </div>
          </div>

          <!-- Продукция + dropdown -->
          <div
            class="nav-item-wrap"
            :class="{ 'is-open': productsOpen }"
            @mouseenter="productsOpen = true"
            @mouseleave="productsOpen = false"
          >
            <NuxtLink to="/catalog" class="nav-link">Продукция</NuxtLink>
            <div class="nav-dropdown">
              <NuxtLink to="/catalog" class="dropdown-item">Очищение</NuxtLink>
              <NuxtLink to="/catalog" class="dropdown-item">Восстановление и омоложение</NuxtLink>
              <NuxtLink to="/catalog" class="dropdown-item">Ежедневный уход</NuxtLink>
              <NuxtLink to="/catalog" class="dropdown-item">Товары для семьи</NuxtLink>
              <NuxtLink to="/reviews" class="dropdown-item">Отзывы о продукции</NuxtLink>
              <NuxtLink to="/diagnostic" class="dropdown-item">Диагностический тест</NuxtLink>
              <NuxtLink to="/health-articles" class="dropdown-item">Статьи о здоровье</NuxtLink>
            </div>
          </div>

          <NuxtLink to="/learning" class="nav-link">Онлайн обучение</NuxtLink>

          <div
            class="nav-item-wrap"
            :class="{ 'is-open': eventsOpen }"
            @mouseenter="eventsOpen = true"
            @mouseleave="eventsOpen = false"
          >
            <NuxtLink to="/events" class="nav-link">События</NuxtLink>
            <div class="nav-dropdown">
              <NuxtLink to="/events/promotion" class="dropdown-item">Промоушен</NuxtLink>
              <NuxtLink to="/gallery" class="dropdown-item">Галерея</NuxtLink>
              <NuxtLink to="/distributors" class="dropdown-item">Выдающиеся дистрибьюторы</NuxtLink>
              <NuxtLink to="/news" class="dropdown-item">Новости</NuxtLink>
            </div>
          </div>

          <NuxtLink to="/business" class="nav-link">Бизнес</NuxtLink>
          <NuxtLink to="/contacts" class="nav-link">Контакты</NuxtLink>
        </nav>

        <div class="header-actions">
          <NuxtLink to="/catalog" class="icon-btn" aria-label="Поиск и каталог">
            <img src="/images/1_411.svg" alt="">
          </NuxtLink>
          <NuxtLink to="/cabinet/profile" class="icon-btn" aria-label="Профиль">
            <img src="/images/1_412.svg" alt="">
          </NuxtLink>
          <NuxtLink to="/cabinet/cart" class="icon-btn" aria-label="Корзина">
            <img src="/images/1_414.svg" alt="">
          </NuxtLink>
          <NuxtLink to="/cabinet/favorites" class="icon-btn" aria-label="Избранное">
            <img src="/images/1_422.svg" alt="">
          </NuxtLink>

          <div
            class="lang-wrap"
            :class="{ 'is-open': langOpen }"
            @mouseenter="langOpen = true"
            @mouseleave="langOpen = false"
          >
            <button type="button" class="lang-trigger" aria-haspopup="listbox" aria-expanded="langOpen">
              <span>{{ currentLang }}</span>
              <img src="/images/1_430.svg" alt="" class="lang-chevron">
            </button>
            <div class="lang-dropdown" role="listbox">
              <button
                v-for="opt in langOptions"
                :key="opt"
                type="button"
                class="lang-option"
                :class="{ active: currentLang === opt }"
                role="option"
                @click="currentLang = opt; langOpen = false"
              >
                {{ opt }}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const aboutOpen = ref(false)
const productsOpen = ref(false)
const eventsOpen = ref(false)
const langOpen = ref(false)
const currentLang = ref('RU')
const langOptions = ['RU', 'KZ', 'EN', 'UZ', 'DE']

watch(() => route.path, () => {
  aboutOpen.value = false
  productsOpen.value = false
  eventsOpen.value = false
  langOpen.value = false
})
</script>

<style scoped>
.site-header-wrap {
  padding: 20px 0;
  background: #fff;
}

.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  width: 209px;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: nowrap;
}

.main-nav .nav-link {
  display: block;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-transform: uppercase;
  color: #121212;
  text-decoration: none;
  border-radius: 999px;
  transition: background 0.2s, color 0.2s;
}

.main-nav .nav-link:hover,
.nav-item-wrap.is-open .nav-link {
  background-color: #E28133;
  color: white;
}

.nav-item-wrap {
  position: relative;
}

.nav-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 240px;
  background: white;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.1);
  padding: 8px 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
  z-index: 100;
}

.nav-item-wrap.is-open .nav-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 10px 16px;
  font-size: 14px;
  color: #121212;
  text-decoration: none;
  transition: color 0.2s;
}

.dropdown-item:hover {
  color: #E28133;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-btn {
  padding: 6px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
}

.icon-btn img {
  width: 24px;
  height: 24px;
}

.lang-wrap {
  position: relative;
}

.lang-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #E28133;
  color: white;
  padding: 8px 14px;
  border-radius: 999px;
  border: none;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  font-family: var(--font-sans);
}

.lang-trigger .lang-chevron {
  width: 14px;
  height: 14px;
  opacity: 0.9;
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 56px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.1);
  padding: 6px 8px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
  z-index: 100;
}

.lang-wrap.is-open .lang-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.lang-option {
  display: block;
  width: 100%;
  padding: 8px 16px;
  margin: 2px 0;
  text-align: center;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  font-family: var(--font-sans);
  color: #121212;
  border-radius: 999px;
  transition: background 0.2s, color 0.2s;
}

.lang-option:hover {
  background-color: #E28133;
  color: white;
}
</style>
