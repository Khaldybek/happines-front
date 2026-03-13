<template>
  <section class="auth-card" :class="[`size-${size}`, { 'is-center': center }]">
    <h1 v-if="title" class="auth-title">{{ title }}</h1>
    <p v-if="subtitle" class="auth-subtitle">{{ subtitle }}</p>
    <slot />
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  subtitle?: string
  size?: 'md' | 'lg'
  center?: boolean
}>(), {
  title: '',
  subtitle: '',
  size: 'lg',
  center: false,
})
</script>

<style scoped>
.auth-card {
  margin: 0 auto;
  background: #ffffff;
  border-radius: 26px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.14);
  padding: 56px 70px 52px;
}

.auth-card.size-lg {
  max-width: 1040px;
}

.auth-card.size-md {
  max-width: 720px;
}

.auth-card.is-center {
  text-align: center;
}

.auth-title {
  margin: 0 0 28px;
  text-align: center;
  font-size: clamp(34px, 2.4vw, 54px);
  line-height: 1.03;
  color: #2d2d2d;
}

.auth-subtitle {
  margin: 0 auto 30px;
  max-width: 520px;
  text-align: center;
  font-size: clamp(17px, 1vw, 20px);
  line-height: 1.24;
  color: #4a4a4a;
}

@media (max-width: 900px) {
  .auth-card {
    border-radius: 18px;
    padding: 30px 20px 28px;
  }

  .auth-title {
    margin-bottom: 20px;
    font-size: clamp(30px, 8vw, 42px);
  }

  .auth-subtitle {
    margin-bottom: 22px;
    font-size: 16px;
  }
}

@media (max-width: 600px) {
  .auth-card {
    border-radius: 16px;
    padding: 24px 18px 24px;
  }

  .auth-title {
    margin-bottom: 18px;
    font-size: clamp(26px, 7vw, 34px);
  }
}

@media (max-width: 480px) {
  .auth-card {
    border-radius: 14px;
    padding: 20px 16px 22px;
  }

  .auth-title {
    margin-bottom: 16px;
    font-size: 24px;
  }

  .auth-subtitle {
    font-size: 15px;
  }
}
</style>
