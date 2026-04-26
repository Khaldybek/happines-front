<template>
  <section class="happiness-today-section">
    <div class="container">
      <h2 class="happiness-title">
        <span class="happiness-title-accent">{{ titleAccent }}</span>
        <span v-if="titleRest">{{ titleRest }}</span>
      </h2>

      <div v-if="sortedBlocks.length" class="cards-grid">
        <article
          v-for="(block, i) in sortedBlocks"
          :key="block.id"
          class="card"
          :class="cardClass(i)"
        >
          <div v-if="i > 0" class="card-fire">
            <img src="/fire.svg" alt="">
          </div>
          <div class="card-content">
            <h3>{{ block.title }}</h3>
            <p>{{ block.description }}</p>
            <ul v-if="criteriaList(block).length">
              <li v-for="(c, j) in criteriaList(block)" :key="`${block.id}-c-${j}`">{{ c.text }}</li>
            </ul>
          </div>
          <div v-if="ctaFor(block)" class="card-footer">
            <NuxtLink
              v-if="ctaFor(block)!.kind === 'internal'"
              :to="ctaFor(block)!.to"
              class="action-btn"
            >
              <span class="action-arrow" aria-hidden="true" />
              <span>{{ block.link_name || 'Подробнее' }}</span>
            </NuxtLink>
            <a
              v-else-if="ctaFor(block)!.kind === 'external'"
              :href="ctaFor(block)!.href"
              class="action-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="action-arrow" aria-hidden="true" />
              <span>{{ block.link_name || 'Подробнее' }}</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AboutBlock5Card, AboutBlock5Criterion } from '~/types/aboutPage'
import { normalizeAboutText } from '~/utils/aboutText'
import { resolveAboutCtaLink, type AboutCtaResolved } from '~/utils/aboutCtaLink'

const props = withDefaults(
  defineProps<{
    sectionTitle?: string | null
    blocks?: AboutBlock5Card[] | null
  }>(),
  {
    sectionTitle: 'HAPPINESS сегодня',
    blocks: () => [],
  },
)

const titleBits = computed(() => {
  const raw = normalizeAboutText(props.sectionTitle) || 'HAPPINESS сегодня'
  const parts = raw.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return {
      accent: parts[0].toUpperCase(),
      rest: ` ${parts.slice(1).join(' ').toUpperCase()}`,
    }
  }
  return { accent: raw.toUpperCase(), rest: '' }
})

const titleAccent = computed(() => titleBits.value.accent)
const titleRest = computed(() => titleBits.value.rest)

const sortedBlocks = computed(() => {
  const list = props.blocks ?? []
  return [...list].sort((a, b) => a.position - b.position).map(b => ({
    ...b,
    title: normalizeAboutText(b.title),
    description: normalizeAboutText(b.description),
  }))
})

function cardClass(i: number): string {
  const n = (i % 4) + 1
  return `card-${n}`
}

function criteriaList(block: AboutBlock5Card): AboutBlock5Criterion[] {
  const c = block.criteria ?? []
  return [...c].sort((a, b) => a.position - b.position).map(x => ({
    ...x,
    text: normalizeAboutText(x.text),
  }))
}

function ctaFor(block: AboutBlock5Card): AboutCtaResolved | null {
  return resolveAboutCtaLink(block.link)
}
</script>

<style scoped>
.happiness-today-section {
  padding: 74px 0;
}

.happiness-title {
  margin: 0 0 28px;
  text-transform: uppercase;
  line-height: 0.95;
  font-size: clamp(56px, 6.4vw, 94px);
  font-weight: 900;
  letter-spacing: 0.01em;
  color: #080a10;
}

.happiness-title span {
  display: inline-block;
}

.happiness-title-accent {
  color: #dd5f05;
  margin-right: 14px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.card {
  position: relative;
  border-radius: 42px;
  padding: 54px 26px 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 560px;
  box-shadow: 8px 10px 0 rgba(0, 0, 0, 0.14);
}

.card-1,
.card-3 {
  background: #fff;
}

.card-2,
.card-4 {
  background: #d6eff9;
}

.card-fire {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.card-fire img {
  width: 38px;
  height: 38px;
}

.card-content h3 {
  font-size: clamp(27px, 1.75vw, 34px);
  line-height: 1.07;
  margin: 0 0 12px;
  text-transform: uppercase;
}

.card-content p {
  font-size: clamp(14px, 1vw, 18px);
  line-height: 1.21;
  margin: 0 0 14px;
}

.card-content ul {
  margin: 0;
  padding-left: 24px;
  font-size: clamp(14px, 1vw, 18px);
  line-height: 1.22;
}

.card-footer {
  margin-top: 18px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #e28133;
  color: #fff;
  border-radius: 999px;
  padding: 2px 18px 2px 2px;
  font-size: clamp(13px, 0.82vw, 16px);
  font-weight: 800;
  text-transform: uppercase;
  text-decoration: none;
}

.action-arrow {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #e28133;
  border: 2px solid rgba(255, 255, 255, 0.9);
  position: relative;
}

.action-arrow::before {
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

@media (max-width: 1350px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .card {
    min-height: 470px;
  }
}

@media (max-width: 760px) {
  .happiness-today-section {
    padding: 56px 0;
  }

  .happiness-title {
    margin-bottom: 16px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .card {
    border-radius: 28px;
    padding: 52px 18px 18px;
    min-height: 420px;
  }

  .action-btn {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
