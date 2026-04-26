<template>
  <section class="about-company-section">
    <div class="container">
      <h2 class="section-title about-section-title">{{ sectionTitle }}</h2>
      <div class="about-card">
        <div class="about-content">
          <div class="about-image">
            <img :src="imageSrc" :alt="imageAlt">
          </div>
          <div class="about-text">
            <h3>{{ secondaryTitle }}</h3>
            <p class="about-desc">{{ description }}</p>
            <NuxtLink
              v-if="cta?.kind === 'internal'"
              :to="cta.to"
              class="btn btn-orange about-catalog-btn"
            >
              <img src="/images/I16_569_132_85696.svg" alt="" class="btn-arrow">
              {{ linkLabel }}
            </NuxtLink>
            <a
              v-else-if="cta?.kind === 'external'"
              :href="cta.href"
              class="btn btn-orange about-catalog-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/I16_569_132_85696.svg" alt="" class="btn-arrow">
              {{ linkLabel }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { normalizeAboutText } from '~/utils/aboutText'
import { resolveAboutCtaLink } from '~/utils/aboutCtaLink'

const props = withDefaults(
  defineProps<{
    sectionTitle?: string | null
    secondaryTitle?: string | null
    description?: string | null
    imageUrl?: string | null
    link?: string | null
    linkName?: string | null
  }>(),
  {
    sectionTitle: 'О КОМПАНИИ',
    secondaryTitle: 'Президент корпорации Шен Лунг HAPPINESS\nЧжоу Вэньцин',
    description: '',
    imageUrl: '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png',
    link: null,
    linkName: 'Перейти в каталог',
  },
)

const sectionTitle = computed(() => String(props.sectionTitle || 'О КОМПАНИИ').trim() || 'О КОМПАНИИ')
const secondaryTitle = computed(() => normalizeAboutText(props.secondaryTitle))
const description = computed(() => normalizeAboutText(props.description))
const imageSrc = computed(() => String(props.imageUrl || '').trim() || '/images/e39744b8aca4253a251f6190e55ee1735b42dbd7.png')
const imageAlt = computed(() => secondaryTitle.value.replace(/\n/g, ' ').slice(0, 120))

const linkLabel = computed(() => String(props.linkName || 'Перейти в каталог').trim() || 'Перейти в каталог')

const cta = computed(() => {
  const resolved = resolveAboutCtaLink(props.link)
  if (resolved) return resolved
  if (props.linkName?.trim() && !props.link?.trim()) {
    return { kind: 'internal' as const, to: '/catalog' }
  }
  return null
})

</script>

<style scoped>
.about-company-section {
  margin-bottom: 100px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(42% 42% at 0% 100%, rgba(75, 147, 215, 0.74) 0%, rgba(75, 147, 215, 0) 70%),
    radial-gradient(34% 34% at 100% 100%, rgba(119, 179, 65, 0.72) 0%, rgba(119, 179, 65, 0) 68%),
    #fff;
  padding: 60px 0 80px;
}

.about-section-title {
  text-align: center;
  margin-bottom: 40px;
}

.about-card {
  background: #fff;
  border-radius: 50px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.about-content {
  display: flex;
  gap: 0;
  align-items: stretch;
}

.about-image {
  flex: 1.2;
  min-width: 0;
}

.about-image img {
  border-radius: 50px 0 0 50px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-text {
  flex: 1;
  padding: 50px 60px 50px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-text h3 {
  font-size: 20px;
  margin: 0 0 10px 0;
  font-weight: 700;
  color: #121212;
  line-height: 1.4;
  white-space: pre-line;
}

.about-desc {
  color: #121212;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;
}

.about-catalog-btn {
  margin-top: 10px;
  align-self: flex-start;
  text-transform: uppercase;
  gap: 12px;
}

.about-catalog-btn .btn-arrow {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}

@media (max-width: 900px) {
  .about-content {
    flex-direction: column;
  }

  .about-image img {
    border-radius: 50px 50px 0 0;
  }

  .about-text {
    padding: 30px 25px 40px;
  }

  .about-catalog-btn {
    align-self: stretch;
    justify-content: center;
  }
}
</style>
