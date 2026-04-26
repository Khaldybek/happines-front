<template>
  <section class="geography-section">
    <div class="container">
      <h2 class="section-title">{{ heading }}</h2>
      <div class="map-container">
        <img :src="mapSrc" :alt="heading" class="map-img">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name?: string | null
    imageUrl?: string | null
  }>(),
  {
    name: 'География',
    imageUrl: '/map.png',
  },
)

const heading = computed(() => String(props.name || 'География').trim() || 'География')
const mapSrc = computed(() => String(props.imageUrl || '').trim() || '/map.png')
</script>

<style scoped>
.geography-section {
  padding: 60px 0;
}

.map-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.map-img {
  width: 100%;
  height: auto;
}
</style>
