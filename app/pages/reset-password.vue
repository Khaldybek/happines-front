<template>
  <AuthPageShell>
    <AuthCard title="Введите новый пароль" size="md">
      <form class="auth-form" @submit.prevent>
        <AuthInputField label="Введите ваш новый пароль" placeholder="Введите пароль" type="password" icon="eye" />
        <AuthInputField label="Введите еще раз пароль" placeholder="Введите пароль" type="password" icon="eye" />

        <div class="cta-wrap">
          <AuthCtaButton label="Сохранить" to="/reset-success" />
        </div>
      </form>
    </AuthCard>
  </AuthPageShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({ title: 'Новый пароль — Happiness' })
</script>

<style scoped>
.auth-form {
  max-width: 500px;
  margin: 0 auto;
  display: grid;
  gap: 18px;
}

.cta-wrap {
  text-align: center;
  margin-top: 4px;
}
</style>
