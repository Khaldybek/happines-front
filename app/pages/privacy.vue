<template>
  <div>
    <TheHeader />
    <main class="privacy-page">
      <PrivacyBreadcrumbs />
      <div class="container">
        <div v-if="pending" class="privacy-skeleton" aria-busy="true">
          <div class="sk-title" />
          <div v-for="n in 6" :key="n" class="sk-line" />
        </div>

        <template v-else-if="page">
          <h1 class="privacy-title">
            <span class="title-line title-black">{{ titleFirst }}</span>
            <span v-if="titleRest" class="title-line title-orange">{{ titleRest }}</span>
          </h1>

          <div class="privacy-blocks">
            <article
              v-for="block in sortedBlocks"
              :key="block.id"
              class="privacy-block"
            >
              <h2 v-if="block.title?.trim()" class="privacy-block-title">{{ block.title }}</h2>
              <div
                class="privacy-prose"
                v-html="block.description"
              />
            </article>
          </div>
        </template>

        <p v-else class="privacy-fallback" role="alert">
          Не удалось загрузить политику конфиденциальности. Попробуйте обновить страницу позже.
        </p>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { PrivacyPolicyBlock, PrivacyPolicyPageData } from '~/types/privacyPolicyPage'

definePageMeta({
  layout: false,
})

const { data, pending } = usePrivacyPolicyPage()

const page = computed<PrivacyPolicyPageData | null>(() => data.value?.data ?? null)

const sortedBlocks = computed<PrivacyPolicyBlock[]>(() => {
  const blocks = page.value?.blocks ?? []
  return [...blocks].sort((a, b) => a.position - b.position)
})

/** Двухстрочный заголовок как раньше: первое слово + остаток. */
const titleFirst = computed(() => {
  const t = page.value?.main_title?.trim() ?? ''
  if (!t) return 'ПОЛИТИКА'
  const i = t.indexOf(' ')
  if (i <= 0) return t.toUpperCase()
  return t.slice(0, i).toUpperCase()
})

const titleRest = computed(() => {
  const t = page.value?.main_title?.trim() ?? ''
  const i = t.indexOf(' ')
  if (i <= 0) return ''
  return t.slice(i + 1).trim().toUpperCase()
})

const headTitle = computed(() => {
  const t = page.value?.main_title?.trim()
  return t ? `${t} — Happiness` : 'Политика конфиденциальности — Happiness'
})

useHead({
  title: () => headTitle.value,
})
</script>

<style scoped>
.privacy-page {
  background: #fff;
  min-height: 100vh;
  padding-bottom: 60px;
}

.privacy-skeleton {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 0;
}

.sk-title {
  height: 52px;
  border-radius: 8px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: sk-shimmer 1.2s ease-in-out infinite;
  margin-bottom: 32px;
}

.sk-line {
  height: 14px;
  border-radius: 4px;
  margin-bottom: 12px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: sk-shimmer 1.2s ease-in-out infinite;
}

.sk-line:nth-child(3n) {
  width: 92%;
}

.sk-line:nth-child(3n + 1) {
  width: 100%;
}

.sk-line:nth-child(3n + 2) {
  width: 85%;
}

@keyframes sk-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.privacy-title {
  font-size: 48px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 50px 0;
  letter-spacing: 0.02em;
  line-height: 1.2;
}

.title-line {
  display: block;
}

.title-black {
  color: #121212;
}

.title-orange {
  color: var(--primary-orange);
}

.privacy-blocks {
  max-width: 900px;
  margin: 0 auto;
  color: #121212;
  font-size: 16px;
  line-height: 1.7;
}

.privacy-block {
  margin-bottom: 40px;
}

.privacy-block:last-child {
  margin-bottom: 0;
}

.privacy-block-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #121212;
}

.privacy-block:first-child .privacy-block-title {
  margin-top: 0;
}

.privacy-fallback {
  text-align: center;
  color: #666;
  padding: 48px 16px;
  font-size: 17px;
}

/* HTML из API */
.privacy-prose :deep(p) {
  margin: 0 0 16px 0;
}

.privacy-prose :deep(p:last-child) {
  margin-bottom: 0;
}

.privacy-prose :deep(ul),
.privacy-prose :deep(ol) {
  margin: 0 0 16px 0;
  padding-left: 24px;
}

.privacy-prose :deep(li) {
  margin-bottom: 8px;
}

.privacy-prose :deep(strong) {
  font-weight: 700;
}

.privacy-prose :deep(a) {
  color: var(--primary-orange);
  text-decoration: underline;
}

.privacy-prose :deep(a:hover) {
  opacity: 0.9;
}

.privacy-prose :deep(br) {
  line-height: inherit;
}

@media (max-width: 900px) {
  .privacy-title {
    font-size: 36px;
    margin-bottom: 24px;
  }
}

@media (max-width: 600px) {
  .privacy-page {
    padding-bottom: 30px;
  }

  .privacy-title {
    font-size: 26px;
    line-height: 1.1;
    margin-bottom: 16px;
  }

  .privacy-blocks {
    font-size: 14px;
    line-height: 1.5;
  }

  .privacy-block-title {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .privacy-prose :deep(ul),
  .privacy-prose :deep(ol) {
    padding-left: 18px;
  }
}
</style>
