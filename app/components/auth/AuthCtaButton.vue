<template>
  <component :is="to ? 'NuxtLink' : 'button'" :to="to" class="auth-cta">
    <span class="auth-cta-arrow"></span>
    <span class="auth-cta-label">{{ label }}</span>
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  to?: string
}>(), {
  to: '',
})
</script>

<style scoped>
.auth-cta {
  display: inline-flex;
  align-items: center;
  gap: 0;
}

.auth-cta-arrow {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: #e28133;
  position: relative;
}

.auth-cta-arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: translate(-62%, -50%) rotate(45deg);
}

.auth-cta-label {
  height: 62px;
  padding: 0 30px;
  margin-left: -2px;
  border-radius: 999px;
  background: #e28133;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: clamp(21px, 1.05vw, 23px);
  font-weight: 800;
  letter-spacing: 0.01em;
}

@media (max-width: 900px) {
  .auth-cta-arrow {
    width: 52px;
    height: 52px;
  }

  .auth-cta-label {
    height: 52px;
    padding: 0 20px;
    font-size: 17px;
  }
}

@media (max-width: 480px) {
  .auth-cta {
    width: 100%;
    justify-content: center;
  }

  .auth-cta-arrow {
    width: 48px;
    height: 48px;
  }

  .auth-cta-label {
    height: 48px;
    padding: 0 16px;
    font-size: 15px;
  }
}
</style>
