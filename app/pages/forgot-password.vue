<template>
  <AuthPageShell>
    <AuthCard
      title="Забыли пароль?"
      subtitle="Укажите свой Email. На ваш email будет отправлен код подтверждения"
      size="md"
    >
      <form class="auth-form" @submit.prevent>
        <AuthInputField label="Email" placeholder="Введите ваш email" type="email" />

        <div class="cta-wrap">
          <AuthCtaButton label="Продолжить" to="/verify-code" />
        </div>
      </form>
    </AuthCard>
  </AuthPageShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({ title: 'Восстановление пароля — Happiness' })
</script>

<style scoped>
.auth-form {
  max-width: 470px;
  margin: 0 auto;
  display: grid;
  gap: 18px;
}

.cta-wrap {
  text-align: center;
  margin-top: 6px;
}
</style>
