<template>
  <section
    class="adv-section"
    :class="[
      { 'is-dimmed': dimmed },
      `stage-${revealStage}`
    ]"
    :style="{
      '--adv-progress': String(transitionValue),
      '--adv-exit': String(exitValue)
    }"
  >
    <div class="adv-bg" />
    <div class="container">
      <h2 class="section-title adv-section-title">{{ sectionTitle }}</h2>
      <div class="adv-grid">
        <div v-for="(card, idx) in displayedCards" :key="`adv-${idx}`" class="adv-card">
          <div class="adv-header">
            <h3>{{ card.title }}</h3>
            <div class="adv-icon-wrapper">
              <img :src="card.icon || '/images/1_522.svg'" alt="Icon">
            </div>
          </div>
          <div class="adv-image">
            <img :src="card.image || '/images/69cf93d5c69623a31e7db4dd8ccc43d122c79be6.png'" :alt="card.title">
          </div>
          <p class="adv-desc">{{ card.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface AdvantageCard {
  title: string
  description: string
  image: string | null
  icon: string | null
}

const props = withDefaults(defineProps<{
  dimmed?: boolean
  transitionProgress?: number
  exitProgress?: number
  title?: string | null
  cards?: Array<{ title: string | null, description: string | null, image: string | null, icon: string | null }>
}>(), {
  dimmed: false,
  transitionProgress: 0,
  exitProgress: 0,
})

const transitionValue = computed(() => {
  const val = props.transitionProgress
  if (Number.isNaN(val)) return 0
  return Math.max(0, Math.min(1, val))
})

const revealStage = computed(() => {
  if (transitionValue.value < 0.2) return 0
  if (transitionValue.value < 0.5) return 1
  return 2
})

const exitValue = computed(() => {
  const val = props.exitProgress
  if (Number.isNaN(val)) return 0
  return Math.max(0, Math.min(1, val))
})

const defaultCards: AdvantageCard[] = [
  { title: 'Контроль качества', description: 'Производство соответствует международным стандартам безопасности.', image: '/images/69cf93d5c69623a31e7db4dd8ccc43d122c79be6.png', icon: '/images/1_522.svg' },
  { title: 'Восточные традиции', description: 'Основаны на многовековом опыте и натуральных ингредиентах.', image: '/images/69cf93d5c69623a31e7db4dd8ccc43d122c79be6.png', icon: '/images/1_522.svg' },
  { title: 'Натуральный состав', description: 'Без лишних добавок - только тщательно отобранные компоненты.', image: '/images/acebc31125238ea02c6f2327a533eed417235ba7.png', icon: '/images/1_522.svg' },
  { title: 'Поддержка организма', description: 'Продукция направлена на общее благополучие и жизненный тонус.', image: '/images/acebc31125238ea02c6f2327a533eed417235ba7.png', icon: '/images/1_522.svg' },
]

const displayedCards = computed<AdvantageCard[]>(() => {
  const fromApi = props.cards
    ?.map((card) => ({
      title: String(card?.title || '').trim(),
      description: String(card?.description || '').trim(),
      image: card?.image || null,
      icon: card?.icon || null,
    }))
    .filter((card) => card.title || card.description)
  return fromApi?.length ? fromApi.slice(0, 4) : defaultCards
})

const sectionTitle = computed(() => {
  const title = String(props.title || '').trim()
  return title ? title.replace(/\s{2,}/g, ' ').toUpperCase() : 'НАШИ ПРЕИМУЩЕСТВА'
})
</script>

<style scoped>
.adv-section {
  padding: 100px 0;
  position: relative;
  background-color: #ff9d2c;
  overflow: hidden;
  transition: background 0.4s ease;
  --adv-progress: 0;
  --adv-exit: 0;
}

.adv-section.is-dimmed {
  background: #fff;
}

.adv-section.is-dimmed .container {
  opacity: 0.45;
  transition: opacity 0.4s ease;
}

.adv-section .container {
  width: min(1480px, 100%);
  max-width: 1480px;
  padding-left: clamp(18px, 3vw, 36px);
  padding-right: clamp(18px, 3vw, 36px);
  opacity: calc((0.08 + (var(--adv-progress) * 0.92)) * (1 - (var(--adv-exit) * 0.9)));
  transform: translateY(calc(((1 - var(--adv-progress)) * 52px) - (var(--adv-exit) * 26px))) scale(calc(1 - (var(--adv-exit) * 0.06)));
  filter: blur(calc(((1 - var(--adv-progress)) * 3.8px) + (var(--adv-exit) * 5px)));
  transition: opacity 0.4s ease, transform 0.5s cubic-bezier(.2,.7,.2,1), filter 0.45s ease;
  position: relative;
  z-index: 2;
}

.adv-section::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(420px, 62vw, 980px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: #ff9d2c;
  opacity: calc(var(--adv-exit) * 0.95);
  transform: translate(-50%, -50%) scale(calc(0.08 + (var(--adv-exit) * 0.95)));
  filter: blur(calc((1 - var(--adv-exit)) * 10px));
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.45s ease, transform 0.55s cubic-bezier(.2,.7,.2,1), filter 0.55s ease;
}

.adv-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/images/1_512.svg') no-repeat center;
  background-size: cover;
  opacity: 0.5;
}

.adv-section-title {
  color: #dd5f05;
  margin-bottom: clamp(34px, 4vw, 60px);
  font-size: clamp(40px, 5vw, 72px);
  line-height: 0.98;
  letter-spacing: -0.02em;
  opacity: 0;
  transform: translateY(36px) scale(0.92);
  transition: opacity 0.42s ease, transform 0.52s cubic-bezier(.2,.7,.2,1);
}

.adv-section.stage-1 .adv-section-title,
.adv-section.stage-2 .adv-section-title {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.adv-grid {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: clamp(14px, 1.6vw, 26px);
  position: relative;
  z-index: 2;
  perspective: 1200px;
  padding: 40px 0 20px;
  min-height: 420px;
}

.adv-card {
  flex: 1 1 0;
  min-width: 0;
  background: #e4f8ff;
  border-radius: 50px;
  padding: clamp(20px, 2vw, 30px);
  box-shadow: 30px 16px 4px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  gap: 18px;
  opacity: 0;
  transform: translateY(80px) rotateY(-12deg);
  transition: opacity 0.56s ease-out, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transform-style: preserve-3d;
}

.adv-section.stage-1 .adv-card {
  opacity: 0.32;
  transform: translateY(44px) scale(0.92) rotateY(0);
}

.adv-card:nth-child(1) { transition-delay: 0.06s; }
.adv-section.stage-2 .adv-card:nth-child(1) {
  opacity: 1;
  transform: translateY(-35px) rotateY(-8deg);
}

.adv-card:nth-child(2) { transition-delay: 0.14s; }
.adv-section.stage-2 .adv-card:nth-child(2) {
  opacity: 1;
  transform: translateY(-55px) rotateY(-3deg);
}

.adv-card:nth-child(3) { transition-delay: 0.22s; }
.adv-section.stage-2 .adv-card:nth-child(3) {
  opacity: 1;
  transform: translateY(-55px) rotateY(3deg);
}

.adv-card:nth-child(4) { transition-delay: 0.3s; }
.adv-section.stage-2 .adv-card:nth-child(4) {
  opacity: 1;
  transform: translateY(-35px) rotateY(8deg);
}

.adv-section.stage-2 .adv-grid {
  animation: wheel-drift 18s ease-in-out infinite;
}

@keyframes wheel-drift {
  0%, 100% { transform: rotateY(-2deg); }
  50% { transform: rotateY(2deg); }
}

@media (max-width: 1200px) {
  .adv-grid {
    flex-wrap: wrap;
    justify-content: center;
    min-height: auto;
  }

  .adv-section.stage-2 .adv-card:nth-child(1),
  .adv-section.stage-2 .adv-card:nth-child(2),
  .adv-section.stage-2 .adv-card:nth-child(3),
  .adv-section.stage-2 .adv-card:nth-child(4) {
    opacity: 1;
    transform: translateY(0) rotateY(0);
  }

  .adv-section.stage-2 .adv-grid {
    animation: none;
  }
}

.adv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.adv-header h3 {
  font-size: clamp(22px, 1.65vw, 30px);
  line-height: 1.08;
  letter-spacing: -0.01em;
  max-width: 70%;
}

.adv-icon-wrapper {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.adv-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 30px;
}

.adv-desc {
  font-size: clamp(16px, 1.12vw, 20px);
  line-height: 1.32;
  color: #1f1f1f;
}
</style>
