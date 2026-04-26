<template>
  <div>
    <TheHeader />
    <main>
      <AboutBreadcrumbs />

      <div v-if="pending" class="about-loading" aria-busy="true">
        <div class="container about-loading-inner">
          <div class="about-loading-bar" />
        </div>
      </div>

      <p v-else-if="!page" class="about-page-error container" role="alert">
        Не удалось загрузить страницу. Попробуйте позже.
      </p>

      <template v-else>
        <AboutHero :video-url="heroVideoUrl" />
        <AboutCompany
          :section-title="block2?.title"
          :secondary-title="block2?.secondary_title"
          :description="block2?.description"
          :image-url="block2?.image_url"
          :link="block2?.link"
          :link-name="block2?.link_name"
        />
        <AboutMission
          :main-title="block3?.main_title"
          :secondary-title="block3?.secondary_title"
          :description="block3?.description"
          :items="block3?.items"
        />
        <AboutGeography
          :name="block4?.name"
          :image-url="block4?.image_url"
        />
        <AboutHappinessToday
          :section-title="block5?.section_title"
          :blocks="block5?.blocks"
        />
        <AboutPeople
          :title="block6?.title"
          :description="block6?.description"
          :secondary-title="block6?.secondary_title"
          :secondary-description="block6?.secondary_description"
          :link="block6?.link"
          :link-name="block6?.link_name"
          :minis="block6?.minis"
        />
        <AboutDistributors v-if="showDistributorsSection" />
        <AboutContactForm />
      </template>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AboutUsPage } from '~/types/aboutPage'

definePageMeta({
  layout: false,
})

const { data, pending } = useAboutPage()

const page = computed<AboutUsPage | null>(() => data.value?.aboutUsPage ?? null)
const seo = computed(() => data.value?.seoPage ?? null)
const aboutContent = computed(() => data.value?.aboutUsContent ?? null)

const block2 = computed(() => page.value?.block2 ?? null)
const block3 = computed(() => page.value?.block3 ?? null)
const block4 = computed(() => page.value?.block4 ?? null)
const block5 = computed(() => page.value?.block5 ?? null)
const block6 = computed(() => page.value?.block6 ?? null)

const heroVideoUrl = computed(() => {
  const p = page.value
  if (!p) return null
  const fromBlock = p.block1?.video_url?.trim()
  if (fromBlock) return p.block1!.video_url
  return p.video_url?.trim() ? p.video_url : null
})

const showDistributorsSection = computed(() => {
  const pts = aboutContent.value?.points
  return Array.isArray(pts) && pts.length > 0
})

const headTitle = computed(() => {
  const t = seo.value?.meta_title?.trim()
  return t ? `${t} — Happiness` : 'О нас — Happiness'
})

useHead({
  title: () => headTitle.value,
  meta: [
    {
      name: 'description',
      content: () => seo.value?.meta_description?.trim() || 'О компании HAPPINESS.',
    },
    {
      name: 'keywords',
      content: () => seo.value?.meta_keyword?.trim() || '',
    },
  ],
})
</script>

<style scoped>
.about-loading {
  padding: 48px 0 80px;
}

.about-loading-inner {
  max-width: 720px;
}

.about-loading-bar {
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, #eee 25%, #e8e8e8 50%, #eee 75%);
  background-size: 200% 100%;
  animation: about-shimmer 1.1s ease-in-out infinite;
}

@keyframes about-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.about-page-error {
  padding: 48px 16px 80px;
  text-align: center;
  color: #666;
  font-size: 17px;
}
</style>
