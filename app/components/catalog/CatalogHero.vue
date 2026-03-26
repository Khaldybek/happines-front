<template>
  <section class="catalog-hero">
    <div class="container">
      <CatalogBreadcrumbs :current-label="categoryTitle" />
      <div class="hero-content">
        <div class="hero-image-container">
          <img :src="heroImage" :alt="categoryTitle" class="hero-bg-img">
        </div>
        <h1 class="hero-title">{{ categoryTitle }}</h1>
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
  font-size: clamp(44px, 6vw, 84px);
  font-weight: 800;
  text-transform: uppercase;
  margin: 30px 0 18px;
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
  text-align: center;
}

.hero-lead {
  font-weight: 700;
  font-size: clamp(20px, 2.2vw, 32px);
  line-height: 1.25;
  margin: 0 auto 18px;
  max-width: 1100px;
}

.hero-desc {
  font-size: clamp(14px, 1.15vw, 16px);
  line-height: 1.65;
  margin: 0 auto;
  max-width: 1120px;
}

@media (max-width: 768px) {
  .hero-content {
    padding: 0 16px;
  }

  .hero-title {
    margin: 22px 0 14px;
  }
}
</style>
