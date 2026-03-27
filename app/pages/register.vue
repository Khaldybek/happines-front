<template>
  <AuthPageShell>
    <AuthCard title="Регистрация" size="lg">
      <form class="auth-form" @submit.prevent>
        <AuthInputField label="ФИО" placeholder="Введите ваше ФИО" />

        <div class="grid-2">
          <CountryCitySelect
            v-model:country-id="countryId"
            v-model:city-id="cityId"
            :countries="countries"
            :loading="countriesPending"
          />
        </div>

        <div class="grid-2">
          <AuthInputField label="Номер телефона" placeholder="Введите ваш телефон" type="tel" />
          <AuthInputField label="Email" placeholder="Введите ваш email" type="email" />
        </div>

        <AuthConsent />

        <div class="cta-wrap">
          <AuthCtaButton label="Зарегистрироваться" />
        </div>

        <p class="bottom-text">Уже есть аккаунт? <NuxtLink to="/login">Войти</NuxtLink></p>
      </form>
    </AuthCard>
  </AuthPageShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({ title: 'Регистрация — Happiness' })

const { data: countriesData, pending: countriesPending } = useCountries()
const countries = computed(() => countriesData.value?.data ?? [])

const countryId = ref<number | null>(null)
const cityId = ref<number | null>(null)
</script>

<style scoped>
.auth-form {
  max-width: 700px;
  margin: 0 auto;
  display: grid;
  gap: 16px;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.grid-2 :deep(.cc-group) {
  margin-bottom: 0;
}

.cta-wrap {
  text-align: center;
  margin-top: 6px;
}

.bottom-text {
  margin: 4px 0 0;
  text-align: center;
  font-size: clamp(17px, 0.96vw, 20px);
  color: #3f3f3f;
}

.bottom-text a {
  color: #e28133;
  font-weight: 700;
}

@media (max-width: 900px) {
  .grid-2 {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .auth-form {
    gap: 14px;
  }

  .bottom-text {
    font-size: 16px;
  }
}

@media (max-width: 600px) {
  .auth-form {
    gap: 12px;
    max-width: 100%;
  }

  .grid-2 {
    gap: 10px;
  }

  .cta-wrap {
    margin-top: 4px;
  }
}

@media (max-width: 480px) {
  .auth-form {
    gap: 10px;
  }

  .grid-2 {
    gap: 8px;
  }

  .cta-wrap :deep(.auth-cta) {
    width: 100%;
    justify-content: center;
  }

  .bottom-text {
    font-size: 15px;
  }
}
</style>
