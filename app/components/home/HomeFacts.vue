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
        <h2>ФАКТЫ</h2>
        <h2 class="orange-text">О HAPPINESS</h2>
      </div>
      <div class="facts-grid-wrap">
        <div class="facts-sweep" :class="{ run: sweepRun }" />
        <div class="facts-grid">
        <div class="fact-card">
          <div class="fact-bg" />
          <div class="fact-content">
            <div class="fact-number">10+</div>
            <div class="fact-label">стран</div>
          </div>
        </div>
        <div class="fact-card">
          <div class="fact-bg" />
          <div class="fact-content">
            <div class="fact-number">150+</div>
            <div class="fact-label">регионов</div>
          </div>
        </div>
        <div class="fact-card">
          <div class="fact-bg" />
          <div class="fact-content">
            <div class="fact-number">40+</div>
            <div class="fact-label">натуральных продуктов<br>китайской медицины</div>
          </div>
        </div>
        <div class="fact-card">
          <div class="fact-bg" />
          <div class="fact-content">
            <div class="fact-number">1 млн+</div>
            <div class="fact-label">довольных клиентов<br>в мире</div>
          </div>
        </div>
        <div class="fact-card iso-card">
          <div class="fact-bg gradient-bg" />
          <div class="fact-content iso-content">
            <div class="iso-title">ISO</div>
            <div class="iso-text">и другие<br>сертификаты<br>компании</div>
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
const props = withDefaults(defineProps<{ dimmed?: boolean, transitionProgress?: number, exitProgress?: number }>(), {
  dimmed: false,
  transitionProgress: 0,
  exitProgress: 0
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

const sweepRun = ref(false)

watch(revealStage, (stage) => {
  if (stage !== 2) return
  sweepRun.value = false
  requestAnimationFrame(() => {
    setTimeout(() => { sweepRun.value = true }, 120)
  })
})
</script>

<style scoped>
.facts-section {
  padding: 100px 0;
  position: relative;
  overflow: hidden;
  transition: background 0.4s ease;
  --facts-progress: 0;
  --facts-exit: 0;
}

.facts-section .container {
  opacity: calc((0.06 + (var(--facts-progress) * 0.94)) * (1 - (var(--facts-exit) * 0.75)));
  transform: translateY(calc(((1 - var(--facts-progress)) * 48px) - (var(--facts-exit) * 30px))) scale(calc(1 - (var(--facts-exit) * 0.02)));
  filter: blur(calc(((1 - var(--facts-progress)) * 3.5px) + (var(--facts-exit) * 2.8px)));
  transition: opacity 0.4s ease, transform 0.5s cubic-bezier(.2,.7,.2,1), filter 0.45s ease;
}

.facts-section.is-dimmed {
  background: #fff;
}

.facts-section.is-dimmed .container {
  opacity: 0.45;
  transition: opacity 0.4s ease;
}

.facts-header {
  text-align: center;
  margin-bottom: 60px;
  text-transform: uppercase;
  font-size: 48px;
  line-height: 1.2;
  opacity: 0;
  transform: translateY(36px) scale(0.9) rotateX(22deg);
  transform-origin: center 100%;
  transition: opacity 0.42s ease, transform 0.52s cubic-bezier(.2,.7,.2,1);
}

.facts-section.stage-1 .facts-header,
.facts-section.stage-2 .facts-header {
  opacity: 1;
  transform: translateY(0) scale(1) rotateX(0);
}

.facts-header .orange-text {
  display: inline-block;
  transform: translateY(12px) rotate(-4deg);
  transition: transform 0.52s cubic-bezier(.2,.7,.2,1);
}

.facts-section.stage-2 .facts-header .orange-text {
  transform: translateY(0) rotate(0);
}

.orange-text {
  color: var(--primary-orange);
}

.facts-grid-wrap {
  position: relative;
  z-index: 2;
}

.facts-sweep {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 120px;
  background: linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.15), transparent);
  border-radius: 8px;
  pointer-events: none;
  z-index: 5;
  transform: translateX(-100%);
  transition: none;
}
.facts-sweep.run {
  transform: translateX(0);
  animation: sweep-right 1.8s ease-in-out forwards;
}
@keyframes sweep-right {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(calc(100% + 140px)); }
}

.facts-grid {
  display: grid;
  grid-template-columns: minmax(170px, 240px) repeat(4, minmax(130px, 1fr));
  align-items: end;
  gap: 20px;
  position: relative;
}

.fact-card {
  width: 100%;
  min-height: 220px;
  position: relative;
  border-radius: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0;
  transform: translateY(42px) scale(0.86);
  transition: opacity 0.42s ease, transform 0.54s cubic-bezier(.2,.7,.2,1);
}

.facts-section.stage-1 .fact-card {
  opacity: 0.35;
  transform: translateY(24px) scale(0.92);
}

.facts-section.stage-2 .fact-card {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.facts-section.stage-2 .fact-card:nth-child(1) { transition-delay: 0.03s; }
.facts-section.stage-2 .fact-card:nth-child(2) { transition-delay: 0.1s; }
.facts-section.stage-2 .fact-card:nth-child(3) { transition-delay: 0.17s; }
.facts-section.stage-2 .fact-card:nth-child(4) { transition-delay: 0.24s; }
.facts-section.stage-2 .fact-card:nth-child(5) { transition-delay: 0s; }

.facts-section.stage-2 .iso-card {
  transition-delay: 0.16s;
}

.fact-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 38px;
  background: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.08);
  z-index: -1;
}

.fact-number {
  font-size: 64px;
  font-weight: 800;
  background: linear-gradient(180deg, #67A432 0%, #346F0E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
}

.fact-label {
  font-size: 18px;
  line-height: 1.2;
}

.iso-card .gradient-bg {
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
  font-size: 16px;
  color: #becab0;
}

@media (max-width: 1200px) {
  .facts-grid {
    grid-template-columns: repeat(3, minmax(150px, 1fr));
  }

  .iso-card {
    grid-column: span 3;
    min-height: 180px;
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
  opacity: 0;
  transform: scale(1.08);
  transition: opacity 0.55s ease, transform 0.7s cubic-bezier(.2,.7,.2,1);
}

.facts-section.stage-2 .facts-decor {
  opacity: 1;
  transform: scale(1);
}

.decor-left { position: absolute; left: -100px; top: 0; }
.decor-right { position: absolute; right: -100px; bottom: 0; }
.decor-img-1 { position: absolute; left: 10%; bottom: 10%; width: 150px; filter: blur(5px); }
.decor-img-2 { position: absolute; right: 15%; top: 20%; width: 120px; filter: blur(5px); }
</style>
