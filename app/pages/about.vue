<template>
  <div>
    <TheHeader />
    <main>
      <AboutBreadcrumbs />
      <AboutHero />
      <AboutCompany />
      <AboutMission />
      <AboutBenefits />
      <AboutGeography />
      <AboutHappinessToday />
      <AboutPeople />
      <AboutDistributors />
      <AboutContactForm />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'О нас — Happiness',
})
</script>
