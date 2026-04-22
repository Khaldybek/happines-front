<template>
  <div>
    <TheHeader />
    <main class="contacts-page">
      <ContactsBreadcrumbs />

      <div class="container">
        <h1 class="contacts-title">КОНТАКТЫ</h1>

        <div class="contacts-info">
          <div class="contacts-grid">
            <div v-if="mainOffice" class="contact-office">
              <h3>{{ mainOffice.name }}</h3>
              <div class="contact-detail">
                <img src="/images/16_502.svg" alt="" class="contact-icon">
                <span>{{ mainOffice.address }}</span>
              </div>
              <div
                v-for="(phone, idx) in mainOffice.phones"
                :key="`main-phone-${idx}`"
                class="contact-detail"
              >
                <img src="/images/16_508.svg" alt="" class="contact-icon">
                <span>{{ phone }}</span>
              </div>
              <div
                v-for="(email, idx) in mainOffice.emails"
                :key="`main-email-${idx}`"
                class="contact-detail"
              >
                <img src="/images/16_424.svg" alt="" class="contact-icon">
                <span>{{ email }}</span>
              </div>
              <div v-if="mainOffice.work_time" class="contact-detail">
                <img src="/images/16_514.svg" alt="" class="contact-icon">
                <span>{{ mainOffice.work_time }}</span>
              </div>
            </div>

            <div v-if="chinaOffice" class="contact-office">
              <h3>{{ chinaOffice.name }}</h3>
              <div class="contact-detail">
                <img src="/images/16_502.svg" alt="" class="contact-icon">
                <span>{{ chinaOffice.address }}</span>
              </div>
              <div
                v-for="(phone, idx) in chinaOffice.phones"
                :key="`china-phone-${idx}`"
                class="contact-detail"
              >
                <img src="/images/16_508.svg" alt="" class="contact-icon">
                <span>{{ phone }}</span>
              </div>
              <div
                v-for="(email, idx) in chinaOffice.emails"
                :key="`china-email-${idx}`"
                class="contact-detail"
              >
                <img src="/images/16_424.svg" alt="" class="contact-icon">
                <span>{{ email }}</span>
              </div>
              <div v-if="chinaOffice.work_time" class="contact-detail">
                <img src="/images/16_514.svg" alt="" class="contact-icon">
                <span>{{ chinaOffice.work_time }}</span>
              </div>
            </div>
          </div>

          <div class="branches-grid">
            <div
              v-for="branch in branches"
              :key="branch.id"
              class="branch"
            >
              <h4>{{ branch.name }}</h4>
              <div class="contact-detail">
                <img src="/images/16_508.svg" alt="" class="contact-icon">
                <span>{{ branch.phone }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="contacts-form-section">
        <div class="form-section-bg" aria-hidden="true">
          <span class="blur-circle blur-circle--1" />
          <span class="blur-circle blur-circle--2" />
        </div>
        <div class="container form-section-inner">
          <h2 class="form-section-title">Задать вопрос или отправить сообщение</h2>
          <form class="contacts-form" @submit.prevent="onSubmit">
            <div class="form-row">
              <div class="form-group">
                <label for="contacts-name">Имя</label>
                <input id="contacts-name" v-model="form.name" type="text" placeholder="Введите ваше имя" required>
              </div>
              <div class="form-group">
                <label for="contacts-phone">Номер телефона</label>
                <input id="contacts-phone" v-model="form.phone" type="tel" placeholder="Введите телефон" required>
              </div>
            </div>
            <div class="form-row">
              <CountryCitySelect
                v-model:country-id="form.countryId"
                v-model:city-id="form.cityId"
                :countries="countries"
                :loading="countriesPending"
              />
            </div>
            <div class="form-group form-group-full">
              <label for="contacts-email">Email</label>
              <input id="contacts-email" v-model="form.email" type="email" placeholder="Введите email">
            </div>
            <div class="form-group form-group-full">
              <label for="contacts-message">Ваш вопрос или сообщение</label>
              <textarea id="contacts-message" v-model="form.message" rows="4" placeholder="Введите Ваш вопрос или сообщение"></textarea>
            </div>
            <div class="form-footer">
              <div class="checkbox-wrapper">
                <input id="contacts-policy" v-model="form.agree" type="checkbox" required>
                <label for="contacts-policy">
                  Я согласен(-а) на обработку персональных данных и ознакомился(-ась) с
                  <NuxtLink to="/privacy" class="policy-link">политикой конфиденциальности</NuxtLink>
                </label>
              </div>
              <button type="submit" class="btn btn-orange form-submit">
                <img src="/images/I16_569_132_85696.svg" alt="" class="btn-arrow">
                Отправить
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { ContactsBranch, ContactsOffice } from '~/types/contactsPage'
import { useCountries } from '~/composables/useCountries'

definePageMeta({
  layout: false,
})

const { data } = useContactsPage()
const { data: countriesData, pending: countriesPending } = useCountries()
const countries = computed(() => countriesData.value?.countries ?? [])

const pageData = computed(() => data.value ?? null)

const fallbackMainOffice: ContactsOffice = {
  name: 'ОФИС В КАЗАХСТАНЕ',
  address: 'Казахстан, г Алматы ул. Эльбека, 61/3',
  work_time: 'ПН-ВС 09:00 - 20:00',
  phones: ['+7 777 643 11 14'],
  emails: ['support@happiness.com'],
}

const fallbackChinaOffice: ContactsOffice = {
  name: 'ГОЛОВНОЙ ОФИС В КИТАЕ',
  address: 'Room 2007-1, Unit 1, Building 1, Lianhe Caifu Guangchang, No.2177 Tianchen Road, Gaoxin District, Jinan City',
  work_time: '',
  phones: ['+86 0531-68659493', 'Горячая линия: +86 400-172-1168'],
  emails: ['support@happiness.com'],
}

const fallbackBranches: ContactsBranch[] = [
  { id: 1, name: 'КАЗАХСТАНСКИЙ ФИЛИАЛ', phone: '+7 702 107 42 26' },
  { id: 2, name: 'УКРАИНСКИЙ ФИЛИАЛ', phone: '+380 44 500 55 57' },
  { id: 3, name: 'МОСКОВСКИЙ ФИЛИАЛ', phone: '+7 499 754 90 35' },
  { id: 4, name: 'ГРУЗИНСКИЙ ФИЛИАЛ', phone: '+995 593 331 958' },
  { id: 5, name: 'ЕКАТЕРИНБУРГСКИЙ ФИЛИАЛ', phone: '+7 912 656 63 67' },
  { id: 6, name: 'НЕМЕЦКИЙ ФИЛИАЛ', phone: '+49 30 34042697' },
]

const mainOffice = computed(() => pageData.value?.contact ?? fallbackMainOffice)
const chinaOffice = computed(
  () => pageData.value?.offices?.china_head ?? fallbackChinaOffice,
)
const branches = computed(() => pageData.value?.branches ?? fallbackBranches)

useHead(() => ({
  title: `${pageData.value?.seoPage?.meta_title || 'Контакты'} — Happiness`,
  meta: [
    {
      name: 'description',
      content: pageData.value?.seoPage?.meta_description || 'Контакты',
    },
    {
      name: 'keywords',
      content: pageData.value?.seoPage?.meta_keyword || 'Контакты',
    },
  ],
}))

const form = reactive({
  name: '',
  countryId: null as number | null,
  cityId: null as number | null,
  phone: '',
  email: '',
  message: '',
  agree: false,
})

function onSubmit() {
  console.log('Contacts form:', form)
}
</script>

<style scoped>
.contacts-page {
  background: #fff;
  min-height: 100vh;
}

.contacts-title {
  font-size: clamp(40px, 5vw, 58px);
  font-weight: 700;
  color: #dd5f05;
  margin: 0 0 50px 0;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.contacts-info {
  padding-bottom: 60px;
}

.contacts-grid,
.branches-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.contacts-grid {
  margin-bottom: 50px;
}

.branches-grid {
  margin-bottom: 0;
}

.contact-office h3,
.branch h4 {
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 700;
  color: #dd5f05;
  margin: 0 0 20px 0;
  text-transform: uppercase;
}

.contact-detail {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 16px;
  font-size: clamp(18px, 2vw, 22px);
  color: #121212;
  line-height: 1.5;
}

.contact-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
}

.branch {
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
}

.branch h4 {
  margin-bottom: 12px;
}

.branch .contact-detail {
  margin-bottom: 0;
}

.contacts-form-section {
  background-color: #4B93D7;
  padding: 60px 0 80px;
  position: relative;
  overflow: hidden;
}

.form-section-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.form-section-inner {
  position: relative;
  z-index: 1;
}

.blur-circle {
  position: absolute;
  border-radius: 50%;
}

.blur-circle--1 {
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.4);
  filter: blur(167.1px);
  top: -100px;
  left: -100px;
}

.blur-circle--2 {
  width: 280px;
  height: 280px;
  background: rgba(255, 255, 255, 0.25);
  filter: blur(62.97px);
  bottom: -60px;
  right: 10%;
}

.form-section-title {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 40px 0;
  text-align: center;
}

.contacts-form {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #ffffff;
  backdrop-filter: blur(7.2px);
  -webkit-backdrop-filter: blur(7.2px);
  border-radius: 24px;
  padding: 40px;
  color: #121212;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group-full {
  grid-column: 1 / -1;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 14px 20px;
  border-radius: 16px;
  border: 1px solid #d0d0d0;
  background: #fff;
  font-size: 16px;
  font-family: inherit;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.checkbox-wrapper {
  flex: 1;
  min-width: 200px;
  display: flex;
  gap: 10px;
  font-size: 13px;
  line-height: 1.5;
}

.checkbox-wrapper label {
  color: #121212;
}

.policy-link {
  color: #dd5f05;
  text-decoration: underline;
}

.policy-link:hover {
  opacity: 0.9;
}

.form-submit {
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 28px;
}

.form-submit .btn-arrow {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}

@media (max-width: 900px) {
  .contacts-grid {
    grid-template-columns: 1fr;
  }

  .branches-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-footer {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 600px) {
  .contacts-title {
    font-size: 38px;
    margin-bottom: 28px;
  }

  .contact-office h3,
  .branch h4 {
    font-size: 20px;
  }

  .contact-detail {
    font-size: 18px;
  }

  .contact-icon {
    width: 26px;
    height: 26px;
  }

  .form-section-title {
    font-size: 22px;
  }
}

@media (max-width: 480px) {
  .contacts-title {
    font-size: 30px;
    margin-bottom: 20px;
  }

  .contacts-info {
    padding-bottom: 36px;
  }

  .contacts-grid,
  .branches-grid {
    gap: 20px;
  }

  .contacts-grid {
    margin-bottom: 24px;
  }

  .contact-office h3,
  .branch h4 {
    font-size: 17px;
    margin-bottom: 10px;
  }

  .contact-detail {
    gap: 10px;
    margin-bottom: 10px;
    font-size: 15px;
    line-height: 1.35;
  }

  .contact-icon {
    width: 20px;
    height: 20px;
  }

  .contacts-form-section {
    padding: 34px 0 42px;
  }

  .form-section-title {
    font-size: 19px;
    margin-bottom: 18px;
  }

  .contacts-form {
    border-radius: 18px;
    padding: 18px 14px;
  }

  .form-row {
    gap: 12px;
  }

  .form-group {
    margin-bottom: 12px;
  }

  .form-group input,
  .form-group textarea {
    padding: 12px 14px;
    border-radius: 12px;
    font-size: 14px;
  }

  .form-group textarea {
    min-height: 88px;
  }

  .form-footer {
    margin-top: 10px;
    padding-top: 12px;
    gap: 12px;
  }

  .checkbox-wrapper {
    min-width: 0;
    font-size: 12px;
    gap: 8px;
  }

  .form-submit {
    width: 100%;
    justify-content: center;
    padding: 12px 18px;
    font-size: 14px;
  }

  .form-submit .btn-arrow {
    width: 16px;
    height: 16px;
  }
}
</style>
