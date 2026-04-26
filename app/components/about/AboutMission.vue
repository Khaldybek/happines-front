<template>
  <section class="mission-section">
    <div class="container">
      <div class="mission-content">
        <h2 class="mission-title">
          <span class="title-black">{{ titleFirst }}</span>
          <span class="title-orange">{{ titleRest }}</span>
        </h2>
        <p class="mission-subtitle">{{ secondaryTitle }}</p>
        <p class="mission-desc">{{ description }}</p>

        <div v-if="sortedItems.length" class="benefits-grid">
          <div
            v-for="item in sortedItems"
            :key="item.id"
            class="benefits-col"
          >
            <h3 class="benefits-heading">{{ item.title }}</h3>
            <ul class="benefits-list">
              <li v-for="(row, idx) in sortedDescriptions(item)" :key="`${item.id}-${idx}`">
                <span class="benefit-icon">
                  <img :src="item.icon_url || '/fire.svg'" alt="">
                </span>
                <span>{{ row.text }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AboutBlock3Description, AboutBlock3Item } from '~/types/aboutPage'
import { normalizeAboutText } from '~/utils/aboutText'

const props = withDefaults(
  defineProps<{
    mainTitle?: string | null
    secondaryTitle?: string | null
    description?: string | null
    items?: AboutBlock3Item[] | null
  }>(),
  {
    mainTitle: 'Наша миссия',
    secondaryTitle: '',
    description: '',
    items: () => [],
  },
)

const mainTitleNorm = computed(() => normalizeAboutText(props.mainTitle) || 'Наша миссия')

const titleParts = computed(() => {
  const t = mainTitleNorm.value.toUpperCase()
  const sp = t.indexOf(' ')
  if (sp > 0) {
    return { first: t.slice(0, sp), rest: ` ${t.slice(sp + 1)}` }
  }
  return { first: t, rest: '' }
})

const titleFirst = computed(() => titleParts.value.first)
const titleRest = computed(() => titleParts.value.rest)

const secondaryTitle = computed(() => normalizeAboutText(props.secondaryTitle))
const description = computed(() => normalizeAboutText(props.description))

const sortedItems = computed(() => {
  const list = props.items ?? []
  return [...list].sort((a, b) => a.position - b.position)
})

function sortedDescriptions(item: AboutBlock3Item): AboutBlock3Description[] {
  const rows = item.descriptions ?? []
  return [...rows].sort((a, b) => a.position - b.position).map(d => ({
    ...d,
    text: normalizeAboutText(d.text),
  }))
}
</script>

<style scoped>
.mission-section {
  position: relative;
  padding: 80px 0 100px;
  overflow: hidden;
}

.mission-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.mission-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.title-black {
  color: #121212;
}

.title-orange {
  color: var(--primary-orange);
}

.mission-subtitle {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #121212;
  white-space: pre-line;
}

.mission-desc {
  font-size: 16px;
  color: #121212;
  line-height: 1.6;
  margin: 0 0 50px 0;
  white-space: pre-line;
}

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  text-align: left;
  margin-top: 40px;
}

.benefits-heading {
  font-size: 20px;
  font-weight: 700;
  color: #121212;
  margin: 0 0 24px 0;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefits-list li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.5;
  color: #121212;
}

.benefit-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border: 2px solid var(--primary-orange);
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
}

.benefit-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .mission-title {
    font-size: 36px;
  }
}
</style>
