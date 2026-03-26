<template>
  <header class="site-header-wrap">
    <div class="container">
      <header class="site-header">
        <NuxtLink to="/" class="logo">
          <img src="/logo.svg" alt="Happiness" class="logo-part">
        </NuxtLink>

        <nav class="main-nav" aria-label="Основное меню">
          <template v-for="item in menuItems" :key="item.key">
            <div
              v-if="item.children?.length"
              class="nav-item-wrap"
              :class="{ 'is-open': openKey === item.key }"
              @mouseenter="openKey = item.key"
              @mouseleave="openKey = null"
            >
              <NuxtLink
                v-if="resolveNavHref(item.href)"
                :to="resolveNavHref(item.href)!"
                class="nav-link"
              >
                {{ item.title }}
              </NuxtLink>
              <span
                v-else
                class="nav-link nav-link--parent"
                role="button"
                tabindex="0"
                @keydown.enter.prevent="openKey = item.key"
                @keydown.space.prevent="openKey = item.key"
              >
                {{ item.title }}
              </span>
              <div class="nav-dropdown">
                <template v-for="child in item.children" :key="child.key">
                  <NuxtLink
                    v-if="resolveNavHref(child.href)"
                    :to="resolveNavHref(child.href)!"
                    class="dropdown-item"
                  >
                    {{ child.title }}
                  </NuxtLink>
                  <span v-else class="dropdown-item dropdown-item--muted">
                    {{ child.title }}
                  </span>
                </template>
              </div>
            </div>
            <NuxtLink
              v-else
              :to="resolveNavHref(item.href) || '/'"
              class="nav-link"
            >
              {{ item.title }}
            </NuxtLink>
          </template>
        </nav>

        <div class="header-actions">
          <NuxtLink to="/catalog" class="icon-btn" aria-label="Поиск и каталог">
            <img src="/images/1_411.svg" alt="">
          </NuxtLink>
          <NuxtLink to="/lk/profile" class="icon-btn" aria-label="Профиль">
            <img src="/images/1_412.svg" alt="">
          </NuxtLink>
          <NuxtLink to="/lk/cart" class="icon-btn" aria-label="Корзина">
            <img src="/images/1_414.svg" alt="">
          </NuxtLink>
          <NuxtLink to="/lk/favorites" class="icon-btn" aria-label="Избранное">
            <img src="/images/1_422.svg" alt="">
          </NuxtLink>

          <div
            class="lang-wrap"
            :class="{ 'is-open': langOpen }"
            @mouseenter="langOpen = true"
            @mouseleave="langOpen = false"
          >
            <button type="button" class="lang-trigger" aria-haspopup="listbox" :aria-expanded="langOpen">
              <span>{{ currentLangShort }}</span>
              <img src="/images/1_430.svg" alt="" class="lang-chevron">
            </button>
            <div class="lang-dropdown" role="listbox">
              <button
                v-for="lang in languageItems"
                :key="lang.code"
                type="button"
                class="lang-option"
                :class="{ active: currentLangCode === lang.code }"
                role="option"
                @click="selectLanguage(lang.code)"
              >
                {{ lang.native }}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { NavItem } from '~/types/navigation'
import { FALLBACK_NAVIGATION } from '~/constants/navFallback'
import { resolveNavHref } from '~/utils/navHref'

const route = useRoute()
const router = useRouter()
const { data: navData } = useNavigation()

const openKey = ref<string | null>(null)
const langOpen = ref(false)

const activeNav = computed(() => {
  if (navData.value?.items?.length) {
    return {
      items: navData.value.items,
      languages: navData.value.languages,
    }
  }
  return {
    items: FALLBACK_NAVIGATION.items,
    languages: FALLBACK_NAVIGATION.languages,
  }
})

/** «Главное» не показываем: на главную ведёт логотип */
const menuItems = computed(() =>
  (activeNav.value.items as NavItem[]).filter((i) => i.key !== 'home'),
)

const languageItems = computed(() => activeNav.value.languages?.items ?? [])

const langParam = computed(() => activeNav.value.languages?.query_param ?? 'lang')

const currentLangCode = computed(() => {
  const q = route.query[langParam.value]
  const fromQuery = Array.isArray(q) ? q[0] : q
  if (typeof fromQuery === 'string' && fromQuery) return fromQuery.toLowerCase()
  return (activeNav.value.languages?.default ?? 'ru').toLowerCase()
})

const currentLangShort = computed(() => currentLangCode.value.slice(0, 2).toUpperCase())

function selectLanguage(code: string) {
  langOpen.value = false
  router.push({
    path: route.path,
    query: { ...route.query, [langParam.value]: code },
  })
}

watch(() => route.path, () => {
  openKey.value = null
  langOpen.value = false
})
</script>

<style scoped>
.site-header-wrap {
  padding: 20px 0;
  background: transparent;
  position: sticky;
  top: 0;
  z-index: 1200;
  border-bottom: none;
}

.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 209px;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: nowrap;
  flex: 1;
  min-width: 0;
  justify-content: center;
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

.nav-link--parent {
  cursor: default;
  user-select: none;
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

.dropdown-item--muted {
  color: #999;
  cursor: default;
}

.dropdown-item--muted:hover {
  color: #999;
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
  opacity: 0.95;
  filter: brightness(0) invert(1);
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 120px;
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
  text-align: left;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-sans);
  color: #121212;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
}

.lang-option:hover {
  background-color: #E28133;
  color: white;
}

.lang-option.active {
  background-color: rgba(226, 129, 51, 0.15);
  color: #E28133;
}
</style>
