<template>
  <section
    class="about-section"
    :class="{ 'is-dimmed': dimmed }"
    :style="{ '--about-progress': String(transitionValue) }"
  >
    <div class="container">
      <div class="about-top">
        <div class="about-text">
          <h2 v-if="props.title" class="section-title about-section-title">{{ props.title }}</h2>
          <div class="about-desc">
            <p v-if="props.description1">{{ props.description1 }}</p>
            <p v-if="props.description2">{{ props.description2 }}</p>
          </div>
        </div>
        <div v-if="mainSlider.images.length" class="about-image-main">
          <img
            :src="mainSlider.currentImage"
            :class="{ 'is-fading': mainSlider.isFading }"
            alt=""
          >
          <div v-if="mainSlider.images.length > 1" class="slider-dots slider-dots--main" aria-hidden="true">
            <button
              v-for="(_, idx) in mainSlider.images"
              :key="idx"
              type="button"
              class="slider-dot"
              :class="{ 'is-active': mainSlider.currentIndex === idx }"
              @click="mainSlider.goTo(idx)"
            />
          </div>
        </div>
      </div>
      <div class="about-bottom">
        <div v-if="leftSlider.images.length" class="about-img-group">
          <img
            :src="leftSlider.currentImage"
            :class="{ 'is-fading': leftSlider.isFading }"
            alt=""
          >
          <div v-if="leftSlider.images.length > 1" class="slider-dots" aria-hidden="true">
            <button
              v-for="(_, idx) in leftSlider.images"
              :key="idx"
              type="button"
              class="slider-dot"
              :class="{ 'is-active': leftSlider.currentIndex === idx }"
              @click="leftSlider.goTo(idx)"
            />
          </div>
        </div>
        <div v-if="rightSlider.images.length" class="about-img-group small">
          <img
            :src="rightSlider.currentImage"
            :class="{ 'is-fading': rightSlider.isFading }"
            alt=""
          >
          <div v-if="rightSlider.images.length > 1" class="slider-dots" aria-hidden="true">
            <button
              v-for="(_, idx) in rightSlider.images"
              :key="idx"
              type="button"
              class="slider-dot"
              :class="{ 'is-active': rightSlider.currentIndex === idx }"
              @click="rightSlider.goTo(idx)"
            />
          </div>
        </div>
        <div class="about-text-bottom">
          <p v-if="props.description3">{{ props.description3 }}</p>
          <p v-if="props.description4">{{ props.description4 }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  dimmed?: boolean
  transitionProgress?: number
  title?: string | null
  description1?: string | null
  description2?: string | null
  description3?: string | null
  description4?: string | null
  slider1?: string[]
  slider2?: string[]
  slider3?: string[]
}>(), {
  dimmed: false,
  transitionProgress: 0,
})

const transitionValue = computed(() => {
  const val = props.transitionProgress
  if (Number.isNaN(val)) return 0
  return Math.max(0, Math.min(1, val))
})

const FADE_DURATION_MS = 700

function useAutoSlider(source: () => string[] | undefined) {
  const images = ref<string[]>([])
  const currentIndex = ref(0)
  const isFading = ref(false)
  const currentImage = computed(() => images.value[currentIndex.value] ?? '')

  let fadeTimer: ReturnType<typeof setTimeout> | null = null

  const stop = () => {
    if (fadeTimer) { clearTimeout(fadeTimer); fadeTimer = null }
    isFading.value = false
  }

  const goTo = (idx: number) => {
    const len = images.value.length
    if (len <= 0) return
    const next = ((idx % len) + len) % len
    if (next === currentIndex.value) return
    if (!import.meta.client) {
      currentIndex.value = next
      return
    }
    if (fadeTimer) clearTimeout(fadeTimer)
    isFading.value = true
    fadeTimer = setTimeout(() => {
      currentIndex.value = next
      isFading.value = false
      fadeTimer = null
    }, FADE_DURATION_MS)
  }

  watch(
    () => source(),
    (raw) => {
      const resolved = (raw ?? []).filter(Boolean)
      images.value = resolved
      currentIndex.value = 0
      stop()
    },
    { immediate: true },
  )

  onUnmounted(stop)

  // reactive() нужен чтобы Vue автоматически разворачивал ref-ы в шаблоне
  return reactive({ images, currentImage, currentIndex, isFading, goTo })
}

const mainSlider = useAutoSlider(() => props.slider1)
const leftSlider = useAutoSlider(() => props.slider2)
const rightSlider = useAutoSlider(() => props.slider3)
</script>

<style scoped>
.about-section {
  padding: 100px 0;
  background:
    radial-gradient(62% 54% at 0% 100%, rgba(75, 147, 215, 0.88) 0%, rgba(75, 147, 215, 0) 72%),
    radial-gradient(58% 50% at 100% 100%, rgba(119, 179, 65, 0.84) 0%, rgba(119, 179, 65, 0) 70%),
    #fff;
  transition: background 0.4s ease;
  --about-progress: 0;
}

.about-section .container {
  opacity: calc(1 - (var(--about-progress) * 0.78));
  transform: translateY(calc(var(--about-progress) * -34px)) scale(calc(1 - (var(--about-progress) * 0.015)));
  filter: blur(calc(var(--about-progress) * 3.4px));
  transition: opacity 0.32s ease, transform 0.42s cubic-bezier(.2,.7,.2,1), filter 0.42s ease;
}

.about-section.is-dimmed {
  background: #fff;
}

.about-section.is-dimmed .container {
  opacity: 0.45;
  transition: opacity 0.4s ease;
}

.about-section-title {
  text-align: left;
  font-weight: 800;
  font-size: clamp(2rem, 4vw, 56px);
}

.about-top {
  display: flex;
  gap: 50px;
  margin-bottom: 50px;
  transform: translateY(calc(var(--about-progress) * -14px));
  transition: transform 0.42s cubic-bezier(.2,.7,.2,1);
}

.about-text {
  flex: 0 0 40%;
}

.about-desc {
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-size: 20px;
  line-height: 1.6;
}

.about-desc p {
  margin: 0;
}

.about-image-main {
  flex: 1;
  position: relative;
  height: 440px;
  overflow: hidden;
  border-radius: 50px;
}

.about-image-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50px;
  display: block;
  transform: scale(1);
  filter: saturate(1);
  transition: opacity 700ms ease-in-out, transform 900ms ease, filter 900ms ease;
}

.about-bottom {
  position: relative;
  display: flex;
  gap: 30px;
  align-items: center;
  padding: 40px 40px 40px 50px;
  background: transparent;
  border-radius: 0 50px 50px 0;
  transform: translateY(calc(var(--about-progress) * 26px));
  transition: transform 0.42s cubic-bezier(.2,.7,.2,1);
}

.about-img-group {
  position: relative;
  flex: 0 0 28%;
  height: 280px;
  overflow: hidden;
  border-radius: 50px;
}

.about-img-group img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50px;
  transform: scale(1);
  filter: saturate(1);
  transition: opacity 700ms ease-in-out, transform 900ms ease, filter 900ms ease;
}

.about-img-group.small {
  flex: 0 0 18%;
  height: 280px;
}

.about-image-main img.is-fading,
.about-img-group img.is-fading {
  opacity: 0;
  transform: scale(1.04);
  filter: saturate(1.08);
}

.slider-dots {
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 2;
}

.slider-dots--main {
  bottom: 18px;
}

.slider-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.slider-dot.is-active {
  background: #e28133;
  transform: scale(1.35);
}

.about-text-bottom {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
}

.about-text-bottom p {
  margin: 0;
  padding: 20px 24px;
  border-radius: 0 24px 24px 0;
  background: white;
}

</style>
