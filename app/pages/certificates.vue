<template>
  <div>
    <TheHeader />
    <div v-if="pending" class="certificates-loading" aria-busy="true">
      <div class="container certificates-loading-inner">
        <div class="certificates-loading-bar" />
      </div>
    </div>
    <p v-else-if="!bundle" class="certificates-error container" role="alert">
      Не удалось загрузить страницу. Попробуйте позже.
    </p>
    <CompanyCredentialsGallery
      v-else
      :breadcrumb-title="breadcrumbTitle"
      :hero-image="heroImage"
      :title-parts="titleParts"
      :section-description="sectionDescription"
      mode="select"
      :select-options="selectOptions"
      :select-value="selectedProductTitle"
      :items="displayedCredentialItems"
      :pages="pageNumbers"
      :active-page="activePage"
      :grid-columns="3"
      page-variant="light"
      @update:select-value="onSelectProduct"
      @update:active-page="activePage = $event"
    />
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { CertificateItem, CertificatesPageData } from '~/types/certificatesPage'
import { resolveCredentialPreview, titlePartsFromSectionTitle } from '~/utils/credentialsPage'

definePageMeta({
  layout: false,
})

const HERO_FALLBACK = '/images/38562b9948e800cdd8f06f33ced8151c434679ef.png'
const PER_PAGE = 9

const { data, pending } = useCertificatesPage()

const bundle = computed<CertificatesPageData | null>(() => data.value?.data ?? null)

const section = computed(() => bundle.value?.section ?? null)

const breadcrumbTitle = computed(
  () => section.value?.title?.trim() || 'Сертификаты на продукцию',
)

const heroImage = computed(() => section.value?.image_url?.trim() || HERO_FALLBACK)

const sectionDescription = computed(() => section.value?.description ?? '')

const titleParts = computed(() =>
  titlePartsFromSectionTitle(
    section.value?.title || 'Сертификаты на продукцию HAPPINESS',
    'СЕРТИФИКАТЫ',
  ),
)

const allItems = computed<CertificateItem[]>(() => bundle.value?.items ?? [])

const selectOptions = computed(() => {
  const s = new Set<string>()
  for (const it of allItems.value) {
    const t = it.product?.title?.trim()
    if (t) s.add(t)
  }
  return [...s].sort((a, b) => a.localeCompare(b, 'ru'))
})

const selectedProductTitle = ref('')

watch(bundle, () => {
  selectedProductTitle.value = ''
})

const itemsFiltered = computed(() => {
  const list = [...allItems.value].sort(
    (a, b) => (a.position - b.position) || (a.id - b.id),
  )
  const s = selectedProductTitle.value.trim()
  if (!s) return list
  return list.filter(it => it.product?.title?.trim() === s)
})

const activePage = ref(1)

watch([itemsFiltered, selectedProductTitle], () => {
  activePage.value = 1
})

const totalPages = computed(() => Math.max(1, Math.ceil(itemsFiltered.value.length / PER_PAGE)))

const pageNumbers = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))

watch(totalPages, (tp) => {
  if (activePage.value > tp) activePage.value = tp
})

const displayedCredentialItems = computed(() => {
  const start = (activePage.value - 1) * PER_PAGE
  return itemsFiltered.value.slice(start, start + PER_PAGE).map(mapCertificateToCredentialItem)
})

const headTitle = computed(() => {
  const t = section.value?.title?.trim()
  return t ? `${t} — Happiness` : 'Сертификаты на продукцию — Happiness'
})

useHead({
  title: () => headTitle.value,
})

function onSelectProduct(value: string) {
  selectedProductTitle.value = value
}

function mapCertificateToCredentialItem(item: CertificateItem) {
  const rawTitle
    = item.description?.trim()
      || item.product?.title?.trim()
      || `Сертификат ${item.id}`
  const title = rawTitle.toUpperCase()
  const { previewKind, imageSrc } = resolveCredentialPreview(item.file_url, item.is_pdf)
  return {
    image: imageSrc,
    title,
    fileUrl: item.file_url?.trim() || undefined,
    previewKind,
  }
}
</script>

<style scoped>
.certificates-loading {
  padding: clamp(24px, 6vw, 48px) max(16px, env(safe-area-inset-left, 0px)) clamp(40px, 10vw, 80px) max(16px, env(safe-area-inset-right, 0px));
  background: #fff;
}

.certificates-loading-inner {
  max-width: 720px;
}

.certificates-loading-bar {
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: certificates-shimmer 1.1s ease-in-out infinite;
}

@keyframes certificates-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.certificates-error {
  padding: clamp(32px, 8vw, 48px) max(16px, env(safe-area-inset-left, 0px)) clamp(48px, 12vw, 80px) max(16px, env(safe-area-inset-right, 0px));
  text-align: center;
  color: #666;
  font-size: clamp(15px, 3.8vw, 17px);
  line-height: 1.45;
  background: #fff;
}
</style>
