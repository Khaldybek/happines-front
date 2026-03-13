<template>
  <AuthPageShell>
    <AuthCard title="Введите код" subtitle="Введите код отправленный на вашу электронную почту" size="md">
      <form class="auth-form" @submit.prevent>
        <AuthOtp :length="6" />

        <div class="cta-wrap">
          <AuthCtaButton label="Продолжить" to="/reset-password" />
        </div>
      </form>
    </AuthCard>
  </AuthPageShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({ title: 'Подтверждение кода — Happiness' })
</script>

<style scoped>
.auth-form {
  max-width: 470px;
  margin: 0 auto;
  display: grid;
  gap: 20px;
}

.cta-wrap {
  text-align: center;
}
</style>
