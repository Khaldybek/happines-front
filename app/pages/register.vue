<template>
  <AuthPageShell>
    <AuthCard title="Регистрация" size="lg">
      <form class="auth-form" novalidate @submit.prevent="handleSubmit">
        <AuthInputField
          v-model="form.full_name"
          label="ФИО"
          placeholder="Введите ваше ФИО"
          :error="fieldError('full_name')"
        />

        <div class="grid-2">
          <CountryCitySelect
            v-model:country-id="countryId"
            v-model:city-id="cityId"
            :countries="countries"
            :loading="countriesPending"
          />
        </div>

        <div class="grid-2">
          <AuthInputField
            v-model="form.phone"
            label="Номер телефона"
            placeholder="Введите ваш телефон"
            type="tel"
            :error="fieldError('phone')"
          />
          <AuthInputField
            v-model="form.email"
            label="Email"
            placeholder="Введите ваш email"
            type="email"
            :error="fieldError('email')"
          />
        </div>

        <div class="grid-2">
          <AuthInputField
            v-model="form.password"
            label="Пароль"
            placeholder="Придумайте пароль"
            type="password"
            icon="eye"
            :error="fieldError('password')"
          />
          <AuthInputField
            v-model="form.password_confirmation"
            label="Повторите пароль"
            placeholder="Повторите пароль"
            type="password"
            icon="eye"
            :error="fieldError('password_confirmation')"
          />
        </div>

        <AuthConsent v-model="form.agree" />

        <p v-if="clientError || authStore.error" class="form-error" role="alert">
          {{ clientError || authStore.error }}
        </p>

        <div class="cta-wrap">
          <AuthCtaButton
            label="Зарегистрироваться"
            loading-label="Регистрируем..."
            type="submit"
            :loading="authStore.pending"
          />
        </div>

        <p class="bottom-text">Уже есть аккаунт? <NuxtLink to="/login">Войти</NuxtLink></p>
      </form>
    </AuthCard>
  </AuthPageShell>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore'

definePageMeta({ layout: false })

useHead({ title: 'Регистрация — Happiness' })

const authStore = useAuthStore()
const router = useRouter()

const { data: countriesData, pending: countriesPending } = useCountries()
const countries = computed(() => countriesData.value?.data ?? [])

const countryId = ref<number | null>(null)
const cityId = ref<number | null>(null)

const form = reactive({
  full_name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  agree: false,
})

const clientError = ref('')

function fieldError(field: string): string {
  return authStore.fieldErrors[field]?.[0] ?? ''
}

async function handleSubmit() {
  clientError.value = ''
  authStore.clearErrors()

  if (!form.agree) {
    clientError.value = 'Нужно согласие на обработку персональных данных'
    return
  }

  if (form.password !== form.password_confirmation) {
    clientError.value = 'Пароли не совпадают'
    return
  }

  const ok = await authStore.register({
    full_name: form.full_name,
    email: form.email,
    phone: form.phone,
    password: form.password,
    password_confirmation: form.password_confirmation,
    country_id: countryId.value,
    city_id: cityId.value,
  })

  if (ok) {
    await router.push('/lk/profile')
  }
}
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
