<template>
  <component
    :is="to ? 'NuxtLink' : 'button'"
    :to="to || undefined"
    :type="to ? undefined : type"
    :disabled="loading || undefined"
    class="auth-cta"
    :class="{ 'is-loading': loading }"
  >
    <span class="auth-cta-arrow">
      <svg
        v-if="loading"
        class="auth-cta-spinner"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.35)" stroke-width="2.5"/>
        <path d="M12 3a9 9 0 019 9" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    </span>
    <span class="auth-cta-label">{{ loading ? loadingLabel : label }}</span>
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  to?: string
  type?: 'submit' | 'button' | 'reset'
  loading?: boolean
  loadingLabel?: string
}>(), {
  to: '',
  type: 'submit',
  loading: false,
  loadingLabel: 'Загрузка...',
})
</script>

<style scoped>
.auth-cta {
  display: inline-flex;
  align-items: center;
  gap: 0;
  cursor: pointer;
  text-decoration: none;
  border: none;
  background: none;
  padding: 0;
}

.auth-cta:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-cta-spinner {
  animation: auth-spin 0.8s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes auth-spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
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
