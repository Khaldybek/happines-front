<template>
  <section
    class="facts-section"
    :class="[
      { 'is-dimmed': dimmed },
      `stage-${revealStage}`
    ]"
    :style="{
      '--facts-progress': String(transitionValue),
      '--facts-exit': String(exitValue)
    }"
  >
    <div class="container">
      <div class="facts-header">
        <h2>{{ factsTitlePrimary }}</h2>
        <h2 class="orange-text">{{ factsTitleAccent }}</h2>
      </div>
      <div class="facts-grid-wrap">
        <div class="facts-grid">
          <div
            v-for="(block, idx) in displayedBlocks"
            :key="`fact-${idx}`"
            class="fact-card"
            :class="{ 'iso-card': isIsoBlock(block) }"
          >
            <div class="fact-bg" :class="{ 'gradient-bg': isIsoBlock(block) }" />
            <div v-if="isIsoBlock(block)" class="fact-content iso-content">
              <div class="iso-title">{{ block.title }}</div>
              <div class="iso-text">{{ block.description }}</div>
            </div>
            <div v-else class="fact-content">
              <div class="fact-number">{{ block.title }}</div>
              <div class="fact-label">{{ block.description }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="facts-decor">
        <img src="/images/1_469.svg" class="decor-left" alt="">
        <img src="/images/1_470.svg" class="decor-right" alt="">
        <img src="/images/1cad86a81d7dea38479f47a38ba56791abfacf98.png" class="decor-img-1" alt="">
        <img src="/images/1cad86a81d7dea38479f47a38ba56791abfacf98.png" class="decor-img-2" alt="">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface FactBlock {
  title: string
  description: string
}

const props = withDefaults(defineProps<{
  dimmed?: boolean
  transitionProgress?: number
  exitProgress?: number
  title?: string | null
  textBlocks?: Array<{ title: string | null, description: string | null }>
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
  if (transitionValue.value < 0.52) return 1
  return 2
})

const exitValue = computed(() => {
  const val = props.exitProgress
  if (Number.isNaN(val)) return 0
  return Math.max(0, Math.min(1, val))
})

const defaultBlocks: FactBlock[] = [
  { title: '10+', description: 'стран' },
  { title: '150+', description: 'регионов' },
  { title: '40+', description: 'натуральных продуктов китайской медицины' },
  { title: '1 млн+', description: 'довольных клиентов в мире' },
  { title: 'ISO', description: 'и другие сертификаты компании' },
]

const displayedBlocks = computed<FactBlock[]>(() => {
  const fromApi = props.textBlocks
    ?.map((item) => ({
      title: String(item?.title || '').trim(),
      description: String(item?.description || '').trim(),
    }))
    .filter((item) => item.title || item.description)

  const base = fromApi?.length ? fromApi.slice(0, 5) : defaultBlocks
  const iso = base.find(isIsoBlock)
  const rest = base.filter((item) => !isIsoBlock(item))
  return iso ? [iso, ...rest] : base
})

const factsTitlePrimary = computed(() => {
  const title = String(props.title || '').trim()
  if (!title) return 'ФАКТЫ'
  return title.split(/\s+/)[0] || 'ФАКТЫ'
})

const factsTitleAccent = computed(() => {
  const title = String(props.title || '').trim()
  if (!title) return 'О HAPPINESS'
  const parts = title.split(/\s+/).slice(1)
  return parts.length ? parts.join(' ') : 'О HAPPINESS'
})

function isIsoBlock(block: FactBlock) {
  return block.title.toUpperCase().includes('ISO')
}

</script>

<style scoped>
.facts-section {
  min-height: calc(100svh - var(--home-header-height, 104px));
  padding: 52px 0;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background:
    radial-gradient(48% 42% at 0% 0%, rgba(75, 147, 215, 0.74) 0%, rgba(75, 147, 215, 0) 70%),
    radial-gradient(44% 38% at 100% 0%, rgba(119, 179, 65, 0.72) 0%, rgba(119, 179, 65, 0) 68%),
    radial-gradient(74% 84% at 100% 100%, rgba(255, 126, 28, 1) 0%, rgba(255, 126, 28, 0) 46%),
    #fff;
  transition: background 0.4s ease;
  --facts-progress: 0;
  --facts-exit: 0;
}

.facts-section .container {
  width: min(1480px, 100%);
  max-width: 1480px;
  padding-left: clamp(18px, 3vw, 36px);
  padding-right: clamp(18px, 3vw, 36px);
  opacity: calc((0.06 + (var(--facts-progress) * 0.94)) * (1 - (var(--facts-exit) * 0.75)));
  transform: translateY(calc(((1 - var(--facts-progress)) * 48px) - (var(--facts-exit) * 30px))) scale(calc(1 - (var(--facts-exit) * 0.02)));
  filter: blur(calc(((1 - var(--facts-progress)) * 3.5px) + (var(--facts-exit) * 2.8px)));
  transition: opacity 0.4s ease, transform 0.5s cubic-bezier(.2,.7,.2,1), filter 0.45s ease;
}

.facts-section.is-dimmed {
  background:
    radial-gradient(48% 42% at 0% 0%, rgba(75, 147, 215, 0.56) 0%, rgba(75, 147, 215, 0) 70%),
    radial-gradient(44% 38% at 100% 0%, rgba(119, 179, 65, 0.5) 0%, rgba(119, 179, 65, 0) 68%),
    radial-gradient(74% 84% at 100% 100%, rgba(255, 126, 28, 0.46) 0%, rgba(255, 126, 28, 0) 46%),
    #fff;
}

.facts-section.is-dimmed .container {
  opacity: 0.45;
  transition: opacity 0.4s ease;
}

.facts-header {
  text-align: center;
  margin-bottom: clamp(36px, 4vw, 64px);
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(34px);
  transition: opacity 0.42s ease, transform 0.54s cubic-bezier(.2,.7,.2,1);
}

.facts-header h2 {
  margin: 0;
  font-size: clamp(54px, 7vw, 98px);
  line-height: 0.96;
  font-weight: 800;
  letter-spacing: -0.025em;
}

.facts-section.stage-1 .facts-header,
.facts-section.stage-2 .facts-header {
  opacity: 1;
  transform: translateY(0);
}

.facts-header .orange-text {
  display: block;
  transform: translateY(18px);
  opacity: 0;
  transition: transform 0.52s cubic-bezier(.2,.7,.2,1), opacity 0.38s ease;
}

.facts-section.stage-2 .facts-header .orange-text {
  opacity: 1;
  transform: translateY(0);
}

.orange-text {
  color: var(--primary-orange);
}

.facts-grid-wrap {
  position: relative;
  z-index: 2;
}

.facts-grid {
  display: grid;
  grid-template-columns: minmax(180px, 240px) repeat(4, minmax(150px, 1fr));
  align-items: end;
  gap: clamp(14px, 2vw, 30px);
  position: relative;
}

.fact-card {
  width: 100%;
  min-height: 190px;
  position: relative;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0;
  transform: translateY(58px);
  filter: blur(5px);
  transition: opacity 0.44s ease, transform 0.58s cubic-bezier(.2,.7,.2,1), filter 0.44s ease;
}

.facts-section.stage-1 .fact-card {
  opacity: 0;
  transform: translateY(58px);
  filter: blur(5px);
}

.facts-section.stage-2 .fact-card {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.facts-section.stage-2 .fact-card:nth-child(1) { transition-delay: 0.08s; }
.facts-section.stage-2 .fact-card:nth-child(2) { transition-delay: 0.2s; }
.facts-section.stage-2 .fact-card:nth-child(3) { transition-delay: 0.32s; }
.facts-section.stage-2 .fact-card:nth-child(4) { transition-delay: 0.44s; }
.facts-section.stage-2 .fact-card:nth-child(5) { transition-delay: 0.56s; }

.fact-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  z-index: -1;
  display: none;
}

.fact-number {
  font-size: clamp(54px, 5.2vw, 92px);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.025em;
  background: linear-gradient(180deg, #67A432 0%, #346F0E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
}

.fact-label {
  font-size: clamp(21px, 1.55vw, 28px);
  line-height: 1.12;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #111;
  text-transform: uppercase;
}

.fact-card:not(.iso-card) .fact-label {
  font-size: clamp(21px, 1.55vw, 28px);
  line-height: 1.12;
}

.fact-card:not(.iso-card) .fact-bg {
  display: none;
}

.fact-card:not(.iso-card) .fact-content {
  width: 100%;
  text-align: left;
  padding: 0 6px 8px 0;
}

.iso-card .gradient-bg {
  display: block;
  background: linear-gradient(135deg, #CED564 0%, #538F20 50%, #346F04 100%);
  border: 1px solid rgba(255,255,255,0.25);
}

.iso-content {
  color: white;
}

.iso-title {
  font-size: clamp(46px, 4vw, 64px);
  font-weight: 800;
}

.iso-text {
  font-size: 15px;
  color: #becab0;
}

@media (max-width: 1200px) {
  .facts-header h2 {
    font-size: clamp(44px, 8vw, 72px);
  }

  .facts-grid {
    grid-template-columns: repeat(3, minmax(150px, 1fr));
    gap: 20px;
  }

  .iso-card {
    grid-column: span 3;
    min-height: 180px;
  }

  .fact-card:not(.iso-card) .fact-content {
    text-align: center;
    padding-right: 0;
  }

  .facts-section.stage-2 .fact-card:nth-child(1),
  .facts-section.stage-2 .fact-card:nth-child(2),
  .facts-section.stage-2 .fact-card:nth-child(3),
  .facts-section.stage-2 .fact-card:nth-child(4),
  .facts-section.stage-2 .fact-card:nth-child(5) {
    transform: translate3d(0, 0, 0) scale(1);
  }

  .fact-label,
  .fact-card:not(.iso-card) .fact-label {
    font-size: clamp(17px, 2.6vw, 24px);
  }
}

@media (max-width: 780px) {
  .facts-grid {
    grid-template-columns: repeat(2, minmax(130px, 1fr));
  }

  .iso-card {
    grid-column: span 2;
  }
}

.facts-decor {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  display: none;
}

.facts-section.stage-2 .facts-decor {
  display: none;
}

.decor-left { position: absolute; left: -100px; top: 0; }
.decor-right { position: absolute; right: -100px; bottom: 0; }
.decor-img-1 { position: absolute; left: 10%; bottom: 10%; width: 150px; filter: blur(5px); }
.decor-img-2 { position: absolute; right: 15%; top: 20%; width: 120px; filter: blur(5px); }
</style>
