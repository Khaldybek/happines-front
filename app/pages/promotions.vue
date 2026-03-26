<script setup lang="ts">
definePageMeta({ layout: false })
const route = useRoute()
await navigateTo({ path: '/events/promotion', query: route.query }, { replace: true })
</script>
<template>
  <div />
</template>
