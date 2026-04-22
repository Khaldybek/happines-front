<template>
  <div>
    <TheHeader />
    <main class="cabinet-page">
      <CabinetBreadcrumbs current="Профиль" />

      <div class="container">
        <CabinetPageTitle />
      </div>

      <section class="cabinet-content">
        <div class="container">
          <div class="cabinet-grid">
            <CabinetSidebar active="profile" />

            <section class="profile-section">
              <h2 class="section-title">МОИ ДАННЫЕ</h2>

              <!-- Avatar -->
              <div class="avatar-wrap">
                <img
                  :src="avatarPreview || '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png'"
                  alt="Аватар"
                  class="avatar-image"
                >
                <button
                  type="button"
                  class="avatar-edit"
                  aria-label="Изменить фото"
                  @click="photoInputRef?.click()"
                ></button>
                <input
                  ref="photoInputRef"
                  type="file"
                  accept="image/*"
                  class="photo-input-hidden"
                  @change="onPhotoChange"
                >
              </div>

              <!-- Loading state -->
              <div v-if="fetchPending" class="form-skeleton">
                <div v-for="n in 6" :key="n" class="skeleton-row"></div>
              </div>

              <!-- Profile form -->
              <form v-else class="profile-form" novalidate @submit.prevent="handleSubmit">
                <!-- Full name -->
                <label class="field-group field-full">
                  <span class="field-label">ФИО</span>
                  <input
                    v-model="form.full_name"
                    type="text"
                    placeholder="Введите ваше ФИО"
                    class="field-input"
                    :class="{ 'field-error': fieldErr('full_name') }"
                  >
                  <span v-if="fieldErr('full_name')" class="field-hint-error">{{ fieldErr('full_name') }}</span>
                </label>

                <!-- Phone -->
                <label class="field-group">
                  <span class="field-label">Номер телефона</span>
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="Введите ваш телефон"
                    class="field-input"
                    :class="{ 'field-error': fieldErr('phone') }"
                  >
                  <span v-if="fieldErr('phone')" class="field-hint-error">{{ fieldErr('phone') }}</span>
                </label>

                <!-- Email -->
                <label class="field-group">
                  <span class="field-label">Email</span>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="Введите ваш email"
                    class="field-input"
                    :class="{ 'field-error': fieldErr('email') }"
                  >
                  <span v-if="fieldErr('email')" class="field-hint-error">{{ fieldErr('email') }}</span>
                </label>

                <!-- Address heading -->
                <h3 class="address-title">АДРЕС</h3>

                <!-- Country -->
                <label class="field-group">
                  <span class="field-label">Страна</span>
                  <span class="select-wrap">
                    <select
                      v-model="form.country_id"
                      class="field-input"
                      :class="{ 'field-error': fieldErr('country_id') }"
                      :disabled="countriesPending"
                      @change="onCountryChange"
                    >
                      <option :value="null" disabled>
                        {{ countriesPending ? 'Загрузка...' : 'Выберите страну' }}
                      </option>
                      <option
                        v-for="c in countriesList"
                        :key="c.id"
                        :value="c.id"
                      >
                        {{ c.name }}
                      </option>
                    </select>
                  </span>
                  <span v-if="fieldErr('country_id')" class="field-hint-error">{{ fieldErr('country_id') }}</span>
                </label>

                <!-- City -->
                <label class="field-group">
                  <span class="field-label">Город</span>
                  <span class="select-wrap">
                    <select
                      v-model="form.city_id"
                      class="field-input"
                      :class="{ 'field-error': fieldErr('city_id') }"
                      :disabled="countriesPending || !availableCities.length"
                    >
                      <option :value="null" disabled>
                        {{ !form.country_id ? 'Сначала выберите страну' : 'Выберите город' }}
                      </option>
                      <option
                        v-for="city in availableCities"
                        :key="city.id"
                        :value="city.id"
                      >
                        {{ city.name }}
                      </option>
                    </select>
                  </span>
                  <span v-if="fieldErr('city_id')" class="field-hint-error">{{ fieldErr('city_id') }}</span>
                </label>

                <!-- Street -->
                <label class="field-group">
                  <span class="field-label">Улица</span>
                  <input
                    v-model="form.street"
                    type="text"
                    placeholder="Введите улицу"
                    class="field-input"
                    :class="{ 'field-error': fieldErr('street') }"
                  >
                  <span v-if="fieldErr('street')" class="field-hint-error">{{ fieldErr('street') }}</span>
                </label>

                <!-- House number -->
                <label class="field-group">
                  <span class="field-label">Номер дома</span>
                  <input
                    v-model="form.house_number"
                    type="text"
                    placeholder="Введите номер дома"
                    class="field-input"
                    :class="{ 'field-error': fieldErr('house_number') }"
                  >
                  <span v-if="fieldErr('house_number')" class="field-hint-error">{{ fieldErr('house_number') }}</span>
                </label>

                <!-- Password change -->
                <div class="field-group field-full">
                  <button
                    type="button"
                    class="password-toggle"
                    @click="showPassword = !showPassword"
                  >
                    {{ showPassword ? '− Скрыть смену пароля' : '+ Сменить пароль' }}
                  </button>
                  <template v-if="showPassword">
                    <input
                      v-model="form.password"
                      type="password"
                      placeholder="Новый пароль"
                      class="field-input"
                      style="margin-top: 10px"
                      :class="{ 'field-error': fieldErr('password') }"
                    >
                    <span v-if="fieldErr('password')" class="field-hint-error">{{ fieldErr('password') }}</span>
                  </template>
                </div>

                <!-- Global API error -->
                <p v-if="updateError" class="form-error" role="alert">{{ updateError }}</p>

                <!-- Success message -->
                <p v-if="updateSuccess" class="form-success" role="status">Профиль успешно обновлён</p>

                <!-- Submit -->
                <div class="form-actions field-full">
                  <button type="submit" class="save-btn" :disabled="updatePending">
                    <span v-if="updatePending" class="save-btn-spinner"></span>
                    {{ updatePending ? 'Сохранение...' : 'Сохранить изменения' }}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { Country } from '~/types/countries'

definePageMeta({ layout: false })
useHead({ title: 'Личный кабинет — Профиль' })

// ── Profile API ──────────────────────────────────────────────────────────────
const {
  profile,
  fetchPending,
  updatePending,
  updateError,
  updateFieldErrors,
  updateSuccess,
  updateProfile,
  clearUpdateStatus,
} = useProfile()

// ── Countries ────────────────────────────────────────────────────────────────
const { data: countriesData, pending: countriesPending } = useCountries()
const countriesList = computed<Country[]>(() => countriesData.value?.countries ?? [])

const availableCities = computed(() => {
  if (!form.country_id) return []
  return countriesList.value.find(c => c.id === form.country_id)?.cities ?? []
})

// ── Form state ───────────────────────────────────────────────────────────────
const form = reactive({
  full_name: '',
  phone: '',
  email: '',
  country_id: null as number | null,
  city_id: null as number | null,
  street: '',
  house_number: '',
  password: '',
})

const showPassword = ref(false)
const photoFile = ref<File | null>(null)
const avatarPreview = ref<string | null>(null)
const photoInputRef = ref<HTMLInputElement | null>(null)

// Fill form when profile loads
watch(profile, (p) => {
  if (!p) return
  form.full_name = p.full_name ?? ''
  form.phone = p.phone ?? ''
  form.email = p.email ?? ''
  form.country_id = p.country?.id ?? null
  form.city_id = p.city?.id ?? null
  form.street = p.street ?? ''
  form.house_number = p.house_number ?? ''
  avatarPreview.value = p.photo ?? null
}, { immediate: true })

function onCountryChange() {
  form.city_id = null
}

function onPhotoChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  photoFile.value = file
  avatarPreview.value = URL.createObjectURL(file)
}

function fieldErr(field: string): string {
  return updateFieldErrors.value[field]?.[0] ?? ''
}

// ── Submit ───────────────────────────────────────────────────────────────────
async function handleSubmit() {
  clearUpdateStatus()

  const payload: Record<string, unknown> = {
    full_name: form.full_name,
    phone: form.phone,
    email: form.email,
    country_id: form.country_id,
    city_id: form.city_id,
    street: form.street,
    house_number: form.house_number,
  }

  if (showPassword.value && form.password) {
    payload.password = form.password
  }

  if (photoFile.value) {
    payload.photo = photoFile.value
  }

  const ok = await updateProfile(payload as Parameters<typeof updateProfile>[0])

  if (ok) {
    form.password = ''
    showPassword.value = false
    photoFile.value = null
  }
}
</script>

<style scoped>
.cabinet-page {
  background: #ffffff;
  padding-bottom: 34px;
}

.cabinet-content {
  padding-bottom: 26px;
}

.cabinet-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
  align-items: start;
}

/* ── Section title ── */
.section-title {
  margin: 12px 0 16px;
  font-size: clamp(40px, 2.1vw, 42px);
  color: #101010;
}

/* ── Avatar ── */
.avatar-wrap {
  position: relative;
  width: 130px;
  height: 130px;
  margin-bottom: 14px;
}

.avatar-image {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-edit {
  position: absolute;
  right: -8px;
  bottom: 0;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 50%;
  background: #e28133;
  cursor: pointer;
  transition: background 0.2s;
}

.avatar-edit:hover {
  background: #c96e22;
}

.avatar-edit::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 11px;
  height: 11px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
  transform: translate(-56%, -62%) rotate(45deg);
}

.photo-input-hidden {
  display: none;
}

/* ── Skeleton ── */
.form-skeleton {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 18px;
  max-width: 980px;
}

.skeleton-row {
  height: 86px;
  border-radius: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.4s infinite;
}

.skeleton-row:first-child {
  grid-column: span 2;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Form ── */
.profile-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 18px;
  max-width: 980px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-full {
  grid-column: span 2;
}

.field-label {
  font-size: clamp(24px, 1.35vw, 30px);
  color: #131313;
  font-weight: 600;
}

.field-input {
  width: 100%;
  height: 66px;
  border-radius: 999px;
  border: 2px solid #bfbfbf;
  background: #ffffff;
  padding: 0 24px;
  font-size: clamp(16px, 0.95vw, 22px);
  color: #242424;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s;
}

.field-input:focus {
  border-color: #e28133;
}

.field-input::placeholder {
  color: #ababab;
}

.field-input.field-error {
  border-color: #e05656;
}

.field-hint-error {
  padding-left: 14px;
  font-size: 13px;
  color: #e05656;
}

select.field-input {
  appearance: none;
  color: #242424;
  cursor: pointer;
}

select.field-input:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* select placeholder option */
select.field-input option[value='null'],
select.field-input option:disabled {
  color: #ababab;
}

.select-wrap {
  position: relative;
}

.select-wrap::after {
  content: '';
  position: absolute;
  right: 24px;
  top: 50%;
  width: 8px;
  height: 8px;
  border-right: 2px solid #acacac;
  border-bottom: 2px solid #acacac;
  transform: translateY(-70%) rotate(45deg);
  pointer-events: none;
}

.address-title {
  grid-column: span 2;
  margin: 18px 0 4px;
  font-size: clamp(42px, 2.2vw, 46px);
  line-height: 1;
  color: #101010;
}

/* ── Password toggle ── */
.password-toggle {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: clamp(16px, 0.9vw, 18px);
  color: #e28133;
  font-weight: 600;
  font-family: inherit;
  text-align: left;
}

/* ── Feedback ── */
.form-error {
  grid-column: span 2;
  margin: 0;
  padding: 12px 18px;
  border-radius: 12px;
  background: #fff0f0;
  border: 1px solid #f5c6c6;
  color: #c0392b;
  font-size: clamp(14px, 0.85vw, 16px);
}

.form-success {
  grid-column: span 2;
  margin: 0;
  padding: 12px 18px;
  border-radius: 12px;
  background: #f0fff4;
  border: 1px solid #b2dfcc;
  color: #1e7e4a;
  font-size: clamp(14px, 0.85vw, 16px);
}

/* ── Submit button ── */
.form-actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}

.save-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 62px;
  padding: 0 36px;
  border-radius: 999px;
  border: none;
  background: #e28133;
  color: #fff;
  font-size: clamp(18px, 1vw, 22px);
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: background 0.2s, opacity 0.2s;
}

.save-btn:hover:not(:disabled) {
  background: #c96e22;
}

.save-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.save-btn-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: btn-spin 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .cabinet-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    margin-top: 0;
  }

  .profile-form,
  .form-skeleton {
    grid-template-columns: 1fr;
    max-width: 100%;
  }

  .field-full,
  .address-title,
  .form-error,
  .form-success {
    grid-column: auto;
  }

  .field-label {
    font-size: clamp(18px, 5vw, 24px);
  }

  .field-input {
    height: 56px;
    font-size: 16px;
  }

  .address-title {
    font-size: clamp(30px, 8vw, 42px);
  }

  .save-btn {
    height: 54px;
    font-size: 16px;
  }
}

@media (max-width: 760px) {
  .section-title {
    margin: 4px 0 18px;
    font-size: clamp(28px, 8.5vw, 36px);
  }

  .avatar-wrap {
    margin-bottom: 18px;
  }

  .avatar-image {
    width: 116px;
    height: 116px;
  }

  .avatar-edit {
    width: 38px;
    height: 38px;
    right: -2px;
    bottom: -2px;
  }

  .profile-form,
  .form-skeleton {
    gap: 10px 0;
  }

  .field-label {
    font-size: 15px;
  }

  .field-input {
    height: 50px;
    border-width: 1.5px;
    padding: 0 16px;
    font-size: 15px;
  }

  .select-wrap::after {
    right: 16px;
  }

  .address-title {
    margin-top: 12px;
    font-size: clamp(24px, 7.8vw, 32px);
  }

  .save-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 520px) {
  .profile-section {
    padding-bottom: 4px;
  }

  .section-title {
    margin-bottom: 14px;
    font-size: clamp(24px, 8vw, 30px);
  }

  .avatar-image {
    width: 104px;
    height: 104px;
  }

  .field-group {
    gap: 6px;
  }

  .field-input {
    height: 46px;
    border-radius: 14px;
  }

  .save-btn {
    height: 48px;
    padding: 0 20px;
    font-size: 14px;
  }
}
</style>
