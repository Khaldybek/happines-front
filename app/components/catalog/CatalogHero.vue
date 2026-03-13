<template>
  <section class="catalog-hero">
    <div class="container">
      <CatalogBreadcrumbs :current-label="categoryTitle" />
      <div class="hero-content">
        <h1 class="hero-title">{{ categoryTitle }}</h1>
        <div class="hero-image-container">
          <img :src="heroImage" :alt="categoryTitle" class="hero-bg-img">
        </div>
        <div class="hero-text">
          <p class="hero-lead">{{ lead }}</p>
          <p class="hero-desc">{{ description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  categoryTitle: string
  heroImage: string
  lead: string
  description: string
}>()
</script>

<style scoped>
.catalog-hero {
  padding-bottom: 40px;
}

.hero-content {
  position: relative;
  text-align: center;
  padding: 0 25px;
}

.hero-title {
  color: #dd5f05;
  font-size: 64px;
  font-weight: 800;
  text-transform: uppercase;
  margin: 40px 0;
}

.hero-image-container {
  width: 100%;
  height: 456px;
  border-radius: 50px;
  overflow: hidden;
  margin-bottom: 40px;
}

.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-text {
  max-width: 1258px;
  margin: 0 auto;
  text-align: left;
}

.hero-lead {
  font-weight: 700;
  margin-bottom: 10px;
}

.hero-desc {
  line-height: 1.6;
}
</style>
