<template>
  <div>
    <TheHeader />
    <div v-if="pending" class="documents-loading" aria-busy="true">
      <div class="container documents-loading-inner">
        <div class="documents-loading-bar" />
      </div>
    </div>
    <p v-else-if="!bundle" class="documents-error container" role="alert">
      Не удалось загрузить страницу. Попробуйте позже.
    </p>
    <CompanyCredentialsGallery
      v-else
      :breadcrumb-title="breadcrumbTitle"
      :hero-image="heroImage"
      :title-parts="titleParts"
      :section-description="sectionDescription"
      mode="years"
      :years="years"
      :active-year="activeYear"
      :items="displayedCredentialItems"
      :pages="pageNumbers"
      :active-page="activePage"
      @update:active-year="activeYear = $event"
      @update:active-page="activePage = $event"
    />
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { CompanyDocumentItem, DocumentsPageData } from '~/types/documentsPage'
import { resolveCredentialPreview, titlePartsFromSectionTitle } from '~/utils/credentialsPage'

definePageMeta({
  layout: false,
})

const HERO_FALLBACK = '/images/11b1d7dd02636b45154d2e2dc04e24e1492536ea.png'
const PER_PAGE = 12

const { data, pending } = useDocumentsPage()

const bundle = computed<DocumentsPageData | null>(() => data.value?.data ?? null)

const section = computed(() => bundle.value?.section ?? null)

const breadcrumbTitle = computed(() => section.value?.title?.trim() || 'Документы компании')

const heroImage = computed(() => section.value?.image_url?.trim() || HERO_FALLBACK)

const sectionDescription = computed(() => section.value?.description ?? '')

const titleParts = computed(() =>
  titlePartsFromSectionTitle(section.value?.title || 'Документы компании', 'ДОКУМЕНТЫ'),
)

const allItems = computed<CompanyDocumentItem[]>(() => bundle.value?.items ?? [])

const years = computed(() => {
  const ys = new Set<number>()
  for (const it of allItems.value) {
    if (typeof it.year === 'number' && !Number.isNaN(it.year)) ys.add(it.year)
  }
  return [...ys].sort((a, b) => b - a)
})

const activeYear = ref<number>(new Date().getFullYear())

watch(
  years,
  (ys) => {
    if (!ys.length) return
    if (!ys.includes(activeYear.value)) activeYear.value = ys[0]
  },
  { immediate: true },
)

const itemsForYear = computed(() => {
  const y = activeYear.value
  return allItems.value
    .filter(it => it.year === y)
    .sort((a, b) => (a.position - b.position) || (a.id - b.id))
})

const activePage = ref(1)

watch([itemsForYear, activeYear], () => {
  activePage.value = 1
})

const totalPages = computed(() => Math.max(1, Math.ceil(itemsForYear.value.length / PER_PAGE)))

const pageNumbers = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))

watch(totalPages, (tp) => {
  if (activePage.value > tp) activePage.value = tp
})

const displayedCredentialItems = computed(() => {
  const start = (activePage.value - 1) * PER_PAGE
  return itemsForYear.value.slice(start, start + PER_PAGE).map(mapDocumentToCredentialItem)
})

const headTitle = computed(() => `${breadcrumbTitle.value} — Happiness`)

useHead({
  title: () => headTitle.value,
})

function mapDocumentToCredentialItem(item: CompanyDocumentItem) {
  const { previewKind, imageSrc } = resolveCredentialPreview(item.file_url, item.is_pdf)
  const title = String(item.description || '').trim().toUpperCase() || `ДОКУМЕНТ ${item.id}`
  return {
    image: imageSrc,
    title,
    fileUrl: item.file_url?.trim() || undefined,
    previewKind,
  }
}
</script>

<style scoped>
.documents-loading {
  padding: clamp(24px, 6vw, 48px) max(16px, env(safe-area-inset-left, 0px)) clamp(40px, 10vw, 80px) max(16px, env(safe-area-inset-right, 0px));
  background: #ededed;
}

.documents-loading-inner {
  max-width: 720px;
}

.documents-loading-bar {
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, #ddd 25%, #ececec 50%, #ddd 75%);
  background-size: 200% 100%;
  animation: documents-shimmer 1.1s ease-in-out infinite;
}

@keyframes documents-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.documents-error {
  padding: clamp(32px, 8vw, 48px) max(16px, env(safe-area-inset-left, 0px)) clamp(48px, 12vw, 80px) max(16px, env(safe-area-inset-right, 0px));
  text-align: center;
  color: #666;
  font-size: clamp(15px, 3.8vw, 17px);
  line-height: 1.45;
  background: #ededed;
}
</style>
