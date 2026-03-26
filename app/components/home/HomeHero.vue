<template>
  <section class="hero-section">
    <div class="hero-slider">
      <div class="hero-slider-track" :style="trackStyle">
        <div
          v-for="(image, idx) in renderedImages"
          :key="`${idx}-${image}`"
          class="hero-slide"
        >
          <img :src="image" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  gallery?: string[]
}>()

const FALLBACK_IMAGE = '/images/home/img.png'
const SLIDE_INTERVAL_MS = 4600
const SLIDE_ANIMATION_MS = 820

const galleryImages = computed(() => {
  const images = props.gallery?.filter(Boolean) ?? []
  return images.length > 0 ? images : [FALLBACK_IMAGE]
})

const currentIndex = ref(0)
const isTransitionEnabled = ref(true)
const renderedImages = computed(() => {
  const images = galleryImages.value
  if (images.length <= 1) return images
  return [...images, images[0]]
})

let sliderInterval: ReturnType<typeof setInterval> | null = null
let resetTimeout: ReturnType<typeof setTimeout> | null = null

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
  transition: isTransitionEnabled.value ? `transform ${SLIDE_ANIMATION_MS}ms ease-in-out` : 'none',
}))

const stopSlider = () => {
  if (sliderInterval) {
    clearInterval(sliderInterval)
    sliderInterval = null
  }
  if (resetTimeout) {
    clearTimeout(resetTimeout)
    resetTimeout = null
  }
}

const nextSlide = () => {
  const total = galleryImages.value.length
  if (total <= 1) return

  currentIndex.value += 1
  if (currentIndex.value < total) return

  if (resetTimeout) clearTimeout(resetTimeout)
  resetTimeout = setTimeout(() => {
    isTransitionEnabled.value = false
    currentIndex.value = 0
    requestAnimationFrame(() => {
      isTransitionEnabled.value = true
    })
  }, SLIDE_ANIMATION_MS + 20)
}

const startSlider = () => {
  if (!import.meta.client) return

  stopSlider()
  currentIndex.value = 0
  isTransitionEnabled.value = true
  if (galleryImages.value.length <= 1) return
  sliderInterval = setInterval(nextSlide, SLIDE_INTERVAL_MS)
}

watch(galleryImages, () => {
  startSlider()
}, { immediate: true })

onUnmounted(() => {
  stopSlider()
})
</script>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
  min-height: calc(100svh - var(--home-header-height, 104px));
  padding: 16px 24px 24px;
  display: flex;
  box-sizing: border-box;
}

.hero-slider {
  flex: 1;
  overflow: hidden;
  border-radius: 36px;
}

.hero-slider-track {
  display: flex;
  width: 100%;
  height: 100%;
}

.hero-slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
}

.hero-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 640px) {
  .hero-section {
    padding: 10px 10px 14px;
  }

  .hero-slider {
    border-radius: 22px;
  }
}
</style>
