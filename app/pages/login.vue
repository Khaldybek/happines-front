<template>
  <AuthPageShell>
    <AuthCard title="Авторизация" size="lg">
      <form class="auth-form" novalidate @submit.prevent="handleSubmit">
        <AuthInputField
          v-model="form.email"
          label="Email"
          placeholder="Введите ваш email"
          type="email"
          :error="fieldError('email')"
        />
        <AuthInputField
          v-model="form.password"
          label="Пароль"
          placeholder="Введите пароль"
          type="password"
          icon="eye"
          :error="fieldError('password')"
        />

        <AuthConsent />

        <p v-if="authStore.error" class="form-error" role="alert">
          {{ authStore.error }}
        </p>

        <div class="cta-wrap">
          <AuthCtaButton
            label="Войти"
            loading-label="Входим..."
            type="submit"
            :loading="authStore.pending"
          />
        </div>

        <p class="link-line"><NuxtLink to="/forgot-password">Забыли пароль?</NuxtLink></p>
        <p class="link-line">Нет аккаунта? <NuxtLink to="/register" class="accent">Зарегистрироваться</NuxtLink></p>
      </form>
    </AuthCard>
  </AuthPageShell>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore'

definePageMeta({ layout: false })

useHead({ title: 'Авторизация — Happiness' })

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = reactive({
  email: '',
  password: '',
})

function fieldError(field: string): string {
  return authStore.fieldErrors[field]?.[0] ?? ''
}

async function handleSubmit() {
  authStore.clearErrors()

  const ok = await authStore.loginByEmail(form.email, form.password)

  if (ok) {
    const redirectTo = (route.query.redirect as string) || '/lk/profile'
    await router.push(redirectTo)
  }
}
</script>

<style scoped>
.auth-form {
  max-width: 560px;
  margin: 0 auto;
  display: grid;
  gap: 16px;
}

.cta-wrap {
  text-align: center;
  margin-top: 4px;
}

.form-error {
  margin: 0;
  padding: 12px 18px;
  border-radius: 12px;
  background: #fff0f0;
  border: 1px solid #f5c6c6;
  color: #c0392b;
  font-size: clamp(14px, 0.85vw, 16px);
  text-align: center;
}

.link-line {
  margin: 2px 0 0;
  text-align: center;
  font-size: clamp(17px, 0.96vw, 20px);
  color: #3f3f3f;
}

.link-line a {
  color: #333;
}

.link-line .accent {
  color: #e28133;
  font-weight: 700;
}

@media (max-width: 900px) {
  .auth-form {
    gap: 14px;
  }

  .link-line {
    font-size: 16px;
  }
}
</style>
