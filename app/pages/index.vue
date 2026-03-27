<template>
  <div class="home-page" :style="{ '--home-header-height': `${headerHeight}px` }">
    <TheHeader />
    <main>
      <HomeHero :gallery="homeContent?.hero?.gallery" />
      <div ref="aboutRef" class="section-view-wrap">
        <HomeAbout
          :dimmed="aboutDimmed"
          :transition-progress="aboutTransitionProgress"
          :title="homeContent?.second_block?.title"
          :description1="homeContent?.second_block?.description_1"
          :description2="homeContent?.second_block?.description_2"
          :description3="homeContent?.second_block?.description_3"
          :description4="homeContent?.second_block?.description_4"
          :slider1="homeContent?.second_block?.slider_1"
          :slider2="homeContent?.second_block?.slider_2"
          :slider3="homeContent?.second_block?.slider_3"
        />
      </div>
      <div ref="factsRef" class="section-view-wrap">
        <ClientOnly>
          <HomeFacts
            :dimmed="factsDimmed"
            :transition-progress="factsRevealProgress"
            :exit-progress="factsExitProgress"
            :title="homeContent?.third_block?.title"
            :text-blocks="homeContent?.third_block?.text_blocks"
          />
        </ClientOnly>
      </div>
      <div ref="advantagesRef" class="section-view-wrap">
        <HomeAdvantages
          :dimmed="advantagesDimmed"
          :transition-progress="advantagesRevealProgress"
          :exit-progress="advantagesExitProgress"
          :title="homeContent?.fourth_block?.title"
          :cards="homeContent?.fourth_block?.cards"
        />
      </div>
      <div ref="categoriesRef" class="section-view-wrap section-view-wrap--auto">
        <HomeCategories
          :transition-progress="categoriesTransitionProgress"
          :title="homeContent?.fifth_block?.title"
          :categories="homeContent?.fifth_block?.categories"
        />
      </div>
      <HomeOffersStrip :icon="homeContent?.sixth_block?.icon" :links="homeContent?.sixth_block?.links" />
      <HomeHotOffers :products="homeContent?.seventh_block?.products" />
      <HomeBestSellers :title="homeContent?.eighth_block?.title" :items="homeContent?.eighth_block?.items" />
      <HomeNews :title="homeContent?.ninth_block?.title" :news-items="homeContent?.ninth_block?.news" />
      <HomeVideoGallery
        :title="homeContent?.tenth_block?.title"
        :subtitle="homeContent?.tenth_block?.subtitle"
        :description="homeContent?.tenth_block?.description"
        :videos="homeContent?.tenth_block?.videos"
      />
      <HomeContact :background-image="homeContent?.eleventh_block?.image" />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { HomeContentPayload } from '~/types/homePage'

definePageMeta({
  layout: false,
})

const { data: homePageData } = useHomePage()
const homeContent = computed<HomeContentPayload | null>(() => homePageData.value?.homeContent ?? null)

const aboutRef = ref<HTMLElement | null>(null)
const factsRef = ref<HTMLElement | null>(null)
const advantagesRef = ref<HTMLElement | null>(null)
const categoriesRef = ref<HTMLElement | null>(null)
const aboutDimmed = ref(false)
const factsDimmed = ref(false)
const advantagesDimmed = ref(false)
const categoriesDimmed = ref(true)
const aboutRatio = ref(1)
const factsRatio = ref(0)
const advantagesRatio = ref(0)
const categoriesRatio = ref(0)
// reveal: 1 когда активна (всё видно), ratio когда неактивна
// exit: 0 когда активна (нет blur), ratio от следующей когда неактивна
const aboutTransitionProgress = computed(() => aboutDimmed.value ? Math.max(0, Math.min(1, (1 - aboutRatio.value) * 2)) : 0)
const factsRevealProgress = computed(() => factsDimmed.value ? Math.max(0, Math.min(1, factsRatio.value * 2)) : 1)
const factsExitProgress = computed(() => factsDimmed.value ? Math.max(0, Math.min(1, advantagesRatio.value * 2)) : 0)
const advantagesRevealProgress = computed(() => advantagesDimmed.value ? Math.max(0, Math.min(1, advantagesRatio.value * 2)) : 1)
const advantagesExitProgress = computed(() => advantagesDimmed.value ? Math.max(0, Math.min(1, categoriesRatio.value * 2)) : 0)
const categoriesTransitionProgress = computed(() => categoriesDimmed.value ? Math.max(0, Math.min(1, categoriesRatio.value * 2)) : 1)
const headerHeight = ref(104)
let headerResizeObserver: ResizeObserver | null = null
const sectionNodes = ref<HTMLElement[]>([])
const isSectionSwitching = ref(false)
let switchUnlockTimer: ReturnType<typeof setTimeout> | null = null
const SECTION_SWITCH_LOCK_MS = 760
const LAST_SNAP_SECTION_INDEX = 4 // 0=Hero ... 4=Categories
let sectionSyncRaf = 0

const observerOptions = { root: null, rootMargin: '0px', threshold: [0.25, 0.5] }
const transitionObserverOptions = {
  root: null,
  rootMargin: '-12% 0px -22% 0px',
  threshold: Array.from({ length: 21 }, (_, idx) => idx / 20)
}

function getCurrentSectionIndex() {
  const nodes = sectionNodes.value
  if (!nodes.length) return 0
  const anchor = headerHeight.value + 10
  let nearestIdx = 0
  let nearestDistance = Number.POSITIVE_INFINITY

  nodes.forEach((el, idx) => {
    const distance = Math.abs(el.getBoundingClientRect().top - anchor)
    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestIdx = idx
    }
  })

  return nearestIdx
}

function scrollToSection(index: number) {
  const nodes = sectionNodes.value
  if (!nodes.length) return
  const safeIndex = Math.max(0, Math.min(nodes.length - 1, index))
  const target = nodes[safeIndex]
  if (!target) return

  isSectionSwitching.value = true
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })

  if (switchUnlockTimer) clearTimeout(switchUnlockTimer)
  switchUnlockTimer = setTimeout(() => {
    isSectionSwitching.value = false
    switchUnlockTimer = null
    syncSectionDimmedState()
  }, SECTION_SWITCH_LOCK_MS)
}

function syncSectionDimmedState() {
  const idx = getCurrentSectionIndex()
  // main children order: 0=Hero, 1=About, 2=Facts, 3=Advantages, 4=Categories, ...
  aboutDimmed.value = idx !== 1
  factsDimmed.value = idx !== 2
  advantagesDimmed.value = idx !== 3
  categoriesDimmed.value = idx !== 4
}

function scheduleSectionSync() {
  if (sectionSyncRaf) return
  sectionSyncRaf = requestAnimationFrame(() => {
    sectionSyncRaf = 0
    syncSectionDimmedState()
  })
}

function handleWheel(event: WheelEvent) {
  if (window.innerWidth <= 1024) return
  if (Math.abs(event.deltaY) < 12) return
  if (event.ctrlKey || event.metaKey) return

  const currentIdx = getCurrentSectionIndex()
  if (currentIdx > LAST_SNAP_SECTION_INDEX) return
  if (isSectionSwitching.value) {
    event.preventDefault()
    return
  }

  const direction = event.deltaY > 0 ? 1 : -1
  const nextIdx = currentIdx + direction
  if (nextIdx > LAST_SNAP_SECTION_INDEX) return
  if (nextIdx < 0 || nextIdx >= sectionNodes.value.length) return

  event.preventDefault()
  scrollToSection(nextIdx)
}

onMounted(() => {
  const mainEl = document.querySelector('.home-page main') as HTMLElement | null
  sectionNodes.value = mainEl
    ? Array.from(mainEl.children).filter((node): node is HTMLElement => node instanceof HTMLElement)
    : []

  const updateHeaderHeight = () => {
    const headerEl = document.querySelector('.site-header-wrap') as HTMLElement | null
    if (!headerEl) return
    const next = Math.round(headerEl.getBoundingClientRect().height)
    if (next > 0) headerHeight.value = next
  }

  updateHeaderHeight()
  const headerEl = document.querySelector('.site-header-wrap') as HTMLElement | null
  if (headerEl && typeof ResizeObserver !== 'undefined') {
    headerResizeObserver = new ResizeObserver(() => updateHeaderHeight())
    headerResizeObserver.observe(headerEl)
  }
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('scroll', scheduleSectionSync, { passive: true })
  window.addEventListener('resize', scheduleSectionSync)
  syncSectionDimmedState()

  const refs = [aboutRef.value, factsRef.value, advantagesRef.value, categoriesRef.value].filter(Boolean)
  if (refs.length === 0) return
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      void entry
    })
  }, observerOptions)
  aboutRef.value && observer.observe(aboutRef.value)
  factsRef.value && observer.observe(factsRef.value)
  advantagesRef.value && observer.observe(advantagesRef.value)
  categoriesRef.value && observer.observe(categoriesRef.value)

  const transitionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === aboutRef.value) aboutRatio.value = entry.intersectionRatio
      if (entry.target === factsRef.value) factsRatio.value = entry.intersectionRatio
      if (entry.target === advantagesRef.value) advantagesRatio.value = entry.intersectionRatio
      if (entry.target === categoriesRef.value) categoriesRatio.value = entry.intersectionRatio
    })
  }, transitionObserverOptions)

  aboutRef.value && transitionObserver.observe(aboutRef.value)
  factsRef.value && transitionObserver.observe(factsRef.value)
  advantagesRef.value && transitionObserver.observe(advantagesRef.value)
  categoriesRef.value && transitionObserver.observe(categoriesRef.value)
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('scroll', scheduleSectionSync)
  window.removeEventListener('resize', scheduleSectionSync)
  if (sectionSyncRaf) {
    cancelAnimationFrame(sectionSyncRaf)
    sectionSyncRaf = 0
  }
  if (switchUnlockTimer) {
    clearTimeout(switchUnlockTimer)
    switchUnlockTimer = null
  }
  if (headerResizeObserver) {
    headerResizeObserver.disconnect()
    headerResizeObserver = null
  }
})
</script>

<style scoped>
.home-page main > * {
  min-height: calc(100dvh - var(--home-header-height));
  scroll-margin-top: var(--home-header-height);
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.home-page main {
  scroll-snap-type: y mandatory;
}

.home-page main > :nth-child(n+6) {
  scroll-snap-align: none;
  scroll-snap-stop: normal;
}

.section-view-wrap {
  min-height: calc(100dvh - var(--home-header-height));
}

.section-view-wrap--auto {
  min-height: auto;
}

@media (max-width: 1024px) {
  .home-page main {
    scroll-snap-type: none;
  }

  .home-page main > * {
    min-height: auto;
    scroll-snap-align: none;
    scroll-snap-stop: normal;
  }

  .section-view-wrap {
    min-height: auto;
  }
}
</style>
