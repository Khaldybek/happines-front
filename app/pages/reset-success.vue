<template>
  <AuthPageShell>
    <AuthCard size="md" center>
      <div class="success-icon" aria-hidden="true">✓</div>
      <h1 class="success-title">Ваш пароль был успешно изменен</h1>

      <div class="cta-wrap">
        <AuthCtaButton label="Перейти в личный кабинет" to="/" />
      </div>
    </AuthCard>
  </AuthPageShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({ title: 'Пароль изменен — Happiness' })
</script>

<style scoped>
.success-icon {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  margin: 0 auto 18px;
  background: #74bb39;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 58px;
  line-height: 1;
}

.success-title {
  margin: 0;
  text-align: center;
  font-size: clamp(42px, 2.15vw, 48px);
  line-height: 1.08;
  color: #2e2e2e;
}

.cta-wrap {
  text-align: center;
  margin-top: 28px;
}

@media (max-width: 900px) {
  .success-icon {
    width: 62px;
    height: 62px;
    font-size: 42px;
  }

  .success-title {
    font-size: clamp(28px, 7vw, 38px);
  }
}
</style>
