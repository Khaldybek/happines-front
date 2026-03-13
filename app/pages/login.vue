<template>
  <AuthPageShell>
    <AuthCard title="Авторизация" size="lg">
      <form class="auth-form" @submit.prevent>
        <AuthInputField label="Email" placeholder="Введите ваш email" type="email" />
        <AuthInputField label="Пароль" placeholder="Введите пароль" type="password" icon="eye" />

        <AuthConsent />

        <div class="cta-wrap">
          <AuthCtaButton label="Войти" />
        </div>

        <p class="link-line"><NuxtLink to="/forgot-password">Забыли пароль?</NuxtLink></p>
        <p class="link-line">Нет аккаунта? <NuxtLink to="/register" class="accent">Зарегистрироваться</NuxtLink></p>
      </form>
    </AuthCard>
  </AuthPageShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({ title: 'Авторизация — Happiness' })
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
