<template>
  <section class="people-section">
    <div class="container">
      <h2 class="people-title">
        <span class="title-orange">{{ titleAccent }}</span>
        <span class="title-black">{{ titleRest }}</span>
      </h2>
      <p class="people-intro">{{ intro }}</p>

      <div class="people-layout">
        <div class="people-left">
          <h3 class="people-subheading">{{ secondaryTitle }}</h3>
          <p class="people-desc">{{ secondaryDescription }}</p>
          <NuxtLink
            v-if="cta?.kind === 'internal'"
            :to="cta.to"
            class="btn btn-orange people-btn"
          >
            <span class="btn-icon-wrap">
              <img src="/images/I16_569_132_85696.svg" alt="" class="btn-arrow">
            </span>
            {{ linkLabel }}
          </NuxtLink>
          <a
            v-else-if="cta?.kind === 'external'"
            :href="cta.href"
            class="btn btn-orange people-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="btn-icon-wrap">
              <img src="/images/I16_569_132_85696.svg" alt="" class="btn-arrow">
            </span>
            {{ linkLabel }}
          </a>
        </div>

        <div v-if="miniBlocks.length" class="people-blocks">
          <div
            v-for="(mini, i) in miniBlocks"
            :key="mini.key"
            class="people-block"
            :class="miniClass(i)"
          >
            <h4>{{ mini.title }}</h4>
            <p>{{ mini.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AboutBlock6Mini } from '~/types/aboutPage'
import { normalizeAboutText } from '~/utils/aboutText'
import { resolveAboutCtaLink, type AboutCtaResolved } from '~/utils/aboutCtaLink'

const STATIC_MINIS: { title: string, description: string }[] = [
  {
    title: 'R&D И ТЕХНОЛОГИИ',
    description: 'Разрабатываем и совершенствуем формулы, соединяя традиционный опыт и современные решения.',
  },
  {
    title: 'КОНТРОЛЬ КАЧЕСТВА',
    description: 'Проверяем сырьё и продукцию, соблюдаем стандарты и обеспечиваем стабильность качества.',
  },
  {
    title: 'СЕРВИС И ПОДДЕРЖКА',
    description: 'Помогаем с заказами, консультациями и навигацией по сервисам — быстро и по делу.',
  },
  {
    title: 'ОБУЧЕНИЕ ПАРТНЁРОВ',
    description: 'Даём систему обучения, материалы и сопровождение, чтобы партнёр рос уверенно и этично.',
  },
]

const props = withDefaults(
  defineProps<{
    title?: string | null
    description?: string | null
    secondaryTitle?: string | null
    secondaryDescription?: string | null
    link?: string | null
    linkName?: string | null
    minis?: AboutBlock6Mini[] | null
  }>(),
  {
    title: 'Люди и сообщество',
    description: '',
    secondaryTitle: '',
    secondaryDescription: '',
    link: null,
    linkName: 'Подробнее',
    minis: () => [],
  },
)

const titleNorm = computed(() => normalizeAboutText(props.title) || 'Люди и сообщество')

const titleSplit = computed(() => {
  const t = titleNorm.value
  const lower = t.toLowerCase()
  const msgIdx = lower.indexOf('сообщество')
  if (msgIdx > 0) {
    const accent = t.slice(0, msgIdx).trim()
    const rest = t.slice(msgIdx).trim()
    return {
      accent: accent.toUpperCase(),
      rest: ` ${rest.toUpperCase()}`,
    }
  }
  const parts = t.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return {
      accent: parts[0].toUpperCase(),
      rest: ` ${parts.slice(1).join(' ').toUpperCase()}`,
    }
  }
  return { accent: t.toUpperCase(), rest: '' }
})

const titleAccent = computed(() => titleSplit.value.accent)
const titleRest = computed(() => titleSplit.value.rest)

const intro = computed(() => normalizeAboutText(props.description))
const secondaryTitle = computed(() => normalizeAboutText(props.secondaryTitle))
const secondaryDescription = computed(() => normalizeAboutText(props.secondaryDescription))

const linkLabel = computed(() => String(props.linkName || 'Подробнее').trim() || 'Подробнее')

const cta = computed((): AboutCtaResolved | null => resolveAboutCtaLink(props.link))

const miniBlocks = computed(() => {
  const fromApi = (props.minis ?? [])
    .filter(m => m.title?.trim() || m.description?.trim())
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((m, i) => ({
      key: m.id ?? i,
      title: normalizeAboutText(m.title).toUpperCase(),
      description: normalizeAboutText(m.description),
    }))

  if (fromApi.length) return fromApi

  return STATIC_MINIS.map((m, i) => ({
    key: `static-${i}`,
    title: m.title,
    description: m.description,
  }))
})

function miniClass(i: number): string {
  const classes = ['block-blue', 'block-orange', 'block-green', 'block-yellow']
  return classes[i % classes.length]
}
</script>

<style scoped>
.people-section {
  padding: clamp(72px, 8vw, 116px) 0;
  background: #fff;
}

.people-title {
  font-size: clamp(48px, 6.4vw, 92px);
  font-weight: 800;
  margin: 0 0 clamp(18px, 2.4vw, 30px);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.95;
}

.title-orange {
  color: var(--primary-orange);
}

.title-black {
  color: #121212;
}

.people-intro {
  font-size: clamp(28px, 2.15vw, 41px);
  color: #121212;
  font-weight: 600;
  line-height: 1.03;
  margin: 0 auto clamp(42px, 4.4vw, 62px);
  max-width: 980px;
  text-align: center;
  letter-spacing: -0.01em;
  white-space: pre-line;
}

.people-layout {
  display: grid;
  grid-template-columns: minmax(340px, 1.05fr) minmax(520px, 1fr);
  gap: clamp(34px, 4vw, 70px);
  align-items: start;
}

.people-left {
  padding-right: clamp(8px, 1.2vw, 20px);
}

.people-subheading {
  font-size: clamp(36px, 3.35vw, 58px);
  font-weight: 700;
  color: #121212;
  margin: 0 0 clamp(12px, 1.6vw, 20px);
  line-height: 0.98;
  letter-spacing: -0.02em;
  max-width: 620px;
  white-space: pre-line;
}

.people-desc {
  font-size: clamp(24px, 1.85vw, 32px);
  color: #121212;
  line-height: 1.12;
  margin: 0 0 clamp(24px, 2.8vw, 42px);
  max-width: 640px;
  letter-spacing: -0.01em;
  white-space: pre-line;
}

.people-btn {
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 20px 8px 8px;
  border-radius: 999px;
  font-size: clamp(18px, 1.2vw, 24px);
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1;
  text-decoration: none;
}

.btn-icon-wrap {
  width: clamp(42px, 2.7vw, 54px);
  height: clamp(42px, 2.7vw, 54px);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-arrow {
  width: clamp(18px, 1.3vw, 24px);
  height: clamp(18px, 1.3vw, 24px);
  filter: brightness(0) invert(1);
}

.people-blocks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(16px, 1.7vw, 24px);
}

.people-block {
  border-radius: clamp(26px, 2.1vw, 34px);
  padding: clamp(24px, 2.1vw, 34px) clamp(22px, 1.9vw, 30px);
  color: #fff;
  min-height: clamp(180px, 15.6vw, 245px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.people-block h4 {
  font-size: clamp(30px, 1.95vw, 37px);
  font-weight: 700;
  margin: 0 0 clamp(8px, 0.9vw, 14px);
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 1.02;
}

.people-block p {
  font-size: clamp(26px, 1.55vw, 30px);
  font-weight: 500;
  line-height: 1.08;
  margin: 0;
  letter-spacing: -0.01em;
}

.block-blue {
  background-color: #4B92D1;
}

.block-orange {
  background-color: #F9A43E;
}

.block-green {
  background-color: #77B341;
}

.block-yellow {
  background-color: #F5CF5D;
  color: #121212;
}

.block-yellow h4 {
  color: #121212;
}

.block-yellow p {
  color: #121212;
}

@media (max-width: 968px) {
  .people-layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .people-left {
    padding-right: 0;
  }

  .people-intro {
    max-width: 760px;
  }

  .people-subheading,
  .people-desc {
    max-width: none;
  }

  .people-blocks {
    gap: 20px;
  }

  .people-block {
    min-height: 200px;
  }
}

@media (max-width: 600px) {
  .people-section {
    padding: 58px 0 64px;
  }

  .people-blocks {
    grid-template-columns: 1fr;
  }

  .people-title {
    font-size: clamp(34px, 11vw, 52px);
  }

  .people-intro {
    font-size: clamp(20px, 6.1vw, 30px);
    line-height: 1.12;
    margin-bottom: 28px;
  }

  .people-subheading {
    font-size: clamp(30px, 8.8vw, 42px);
    line-height: 1.04;
  }

  .people-desc {
    font-size: clamp(18px, 5.2vw, 24px);
    line-height: 1.2;
    margin-bottom: 22px;
  }

  .people-btn {
    font-size: 16px;
    padding: 7px 16px 7px 7px;
  }

  .btn-icon-wrap {
    width: 38px;
    height: 38px;
  }

  .people-block {
    min-height: 172px;
    text-align: center;
  }

  .people-block h4 {
    font-size: clamp(24px, 7vw, 32px);
  }

  .people-block p {
    font-size: clamp(20px, 5.8vw, 28px);
    line-height: 1.12;
  }
}
</style>
