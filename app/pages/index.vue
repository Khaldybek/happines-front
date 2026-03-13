<template>
  <div>
    <TheHeader />
    <main>
      <HomeHero />
      <div ref="aboutRef" class="section-view-wrap">
        <HomeAbout :dimmed="aboutDimmed" :transition-progress="factsTransitionProgress" />
      </div>
      <div ref="factsRef" class="section-view-wrap">
        <HomeFacts
          :dimmed="factsDimmed"
          :transition-progress="factsTransitionProgress"
          :exit-progress="advantagesTransitionProgress"
        />
      </div>
      <div ref="advantagesRef" class="section-view-wrap">
        <HomeAdvantages
          :dimmed="advantagesDimmed"
          :transition-progress="advantagesTransitionProgress"
          :exit-progress="categoriesTransitionProgress"
        />
      </div>
      <div ref="categoriesRef" class="section-view-wrap">
        <HomeCategories :transition-progress="categoriesTransitionProgress" />
      </div>
      <HomeOffersStrip />
      <HomeHotOffers />
      <HomeBestSellers />
      <HomeNews />
      <HomeVideoGallery />
      <HomeContact />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const aboutRef = ref<HTMLElement | null>(null)
const factsRef = ref<HTMLElement | null>(null)
const advantagesRef = ref<HTMLElement | null>(null)
const categoriesRef = ref<HTMLElement | null>(null)
const aboutDimmed = ref(false)
const factsDimmed = ref(false)
const advantagesDimmed = ref(false)
const factsRatio = ref(0)
const advantagesRatio = ref(0)
const categoriesRatio = ref(0)
const factsTransitionProgress = computed(() => Math.max(0, Math.min(1, factsRatio.value * 2)))
const advantagesTransitionProgress = computed(() => Math.max(0, Math.min(1, advantagesRatio.value * 2)))
const categoriesTransitionProgress = computed(() => Math.max(0, Math.min(1, categoriesRatio.value * 2)))

const observerOptions = { root: null, rootMargin: '0px', threshold: [0.25, 0.5] }
const transitionObserverOptions = {
  root: null,
  rootMargin: '-12% 0px -22% 0px',
  threshold: Array.from({ length: 21 }, (_, idx) => idx / 20)
}

onMounted(() => {
  const refs = [aboutRef.value, factsRef.value, advantagesRef.value, categoriesRef.value].filter(Boolean)
  if (refs.length === 0) return
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target
      const ratio = entry.intersectionRatio
      if (target === aboutRef.value) aboutDimmed.value = ratio < 0.16
      if (target === factsRef.value) factsDimmed.value = ratio < 0.16
      if (target === advantagesRef.value) advantagesDimmed.value = ratio < 0.16
    })
  }, observerOptions)
  aboutRef.value && observer.observe(aboutRef.value)
  factsRef.value && observer.observe(factsRef.value)
  advantagesRef.value && observer.observe(advantagesRef.value)
  categoriesRef.value && observer.observe(categoriesRef.value)

  const transitionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === factsRef.value) factsRatio.value = entry.intersectionRatio
      if (entry.target === advantagesRef.value) advantagesRatio.value = entry.intersectionRatio
      if (entry.target === categoriesRef.value) categoriesRatio.value = entry.intersectionRatio
    })
  }, transitionObserverOptions)

  factsRef.value && transitionObserver.observe(factsRef.value)
  advantagesRef.value && transitionObserver.observe(advantagesRef.value)
  categoriesRef.value && transitionObserver.observe(categoriesRef.value)
})
</script>

<style scoped>
.section-view-wrap {
  min-height: 0;
}
</style>
