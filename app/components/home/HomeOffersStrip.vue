<template>
  <section class="offers-strip-section">
    <div class="container">
      <div class="offers-row">
        <component
          :is="item.link ? 'a' : 'div'"
          v-for="(item, idx) in displayedLinks"
          :key="`offer-${idx}`"
          class="offer-item offer-item--blue-on-hover"
          :href="item.link || undefined"
          :target="item.link ? '_blank' : undefined"
          :rel="item.link ? 'noopener noreferrer' : undefined"
        >
          <div class="offer-icon"><img :src="displayedIcon" alt=""></div>
          <span>{{ item.title }}</span>
        </component>
      </div>
    </div>
  </section>
</template>

<style scoped>
.offers-strip-section {
  padding: 50px 0;
}

.offers-row {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.offer-item {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
}

.offer-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.offer-item--blue-on-hover span {
  color: inherit;
  transition: color 0.2s;
}
.offer-item--blue-on-hover:hover span {
  color: #2a6dbd;
}
</style>
<script setup lang="ts">
const props = defineProps<{
  icon?: string | null
  links?: Array<{ title: string | null, link: string | null }>
}>()

const displayedIcon = computed(() => props.icon || '/fire.svg')

const displayedLinks = computed(() => {
  const fromApi = props.links
    ?.map((link) => ({
      title: String(link?.title || '').trim(),
      link: link?.link || null,
    }))
    .filter((link) => link.title)
  if (fromApi?.length) return fromApi
  return [
    { title: 'Выбирай выгодные наборы сейчас', link: null },
    { title: 'Лови лучшие цены недели', link: null },
    { title: 'Покупай качественные товары дешевле', link: null },
    { title: 'Успей забрать свою скидку', link: null },
  ]
})
</script>
