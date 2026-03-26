<template>
  <section class="home-form-section">
    <div class="home-form-bg" aria-hidden="true">
      <img :src="bgImage" alt="" class="home-form-bg-img">
    </div>
    <div class="container home-form-container">
      <div class="home-form-block">
        <h2 class="home-form-title">
          Оставьте заявку и<br>
          мы с Вами свяжемся
        </h2>
        <div class="home-form-panel">
          <form class="home-form" @submit.prevent="onSubmit">
          <div class="home-form-group">
            <label for="home-form-name">Имя</label>
            <input
              id="home-form-name"
              v-model="form.name"
              type="text"
              class="home-form-input"
              placeholder="Введите ваше имя"
              required
            >
          </div>
          <div class="home-form-group">
            <label for="home-form-phone">Номер телефона</label>
            <input
              id="home-form-phone"
              v-model="form.phone"
              type="tel"
              class="home-form-input"
              placeholder="Выберите телефон"
              required
            >
          </div>
          <button type="submit" class="home-form-submit">
            <span class="home-form-submit-arrow">→</span>
            ОСТАВИТЬ ЗАЯВКУ
          </button>
          <div class="home-form-footer">
            <input id="home-form-policy" v-model="form.agree" type="checkbox" class="home-form-checkbox" required>
            <label for="home-form-policy" class="home-form-consent">
              Я согласен(-а) на обработку
              <NuxtLink to="/privacy" class="home-form-link">персональных данных</NuxtLink>
              и ознакомился(-ась) с
              <NuxtLink to="/privacy" class="home-form-link">политикой конфиденциальности</NuxtLink>
            </label>
          </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  backgroundImage?: string | null
}>()

const form = reactive({
  name: '',
  phone: '',
  agree: false,
})

const bgImage = computed(() => props.backgroundImage || '/home_form.png')

function onSubmit() {
  // TODO: отправить на API
  console.log('Contact form:', form)
}
</script>

<style scoped>
.home-form-section {
  position: relative;
  min-height: 720px;
  background: #3695e9;
  overflow: hidden;
}

.home-form-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.home-form-bg-img {
  width: 100%;
  height: 100%;
  min-height: 720px;
  object-fit: cover;
  object-position: left center;
}

.home-form-container {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height: 720px;
  padding: 80px 24px 100px;
  box-sizing: border-box;
}

.home-form-block {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.home-form-title {
  margin: 0 0 28px;
  font-size: clamp(22px, 2.5vw, 28px);
  font-weight: 700;
  line-height: 1.25;
  color: #fff;
  text-align: left;
}

.home-form-panel {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #ffffff;
  backdrop-filter: blur(7.2px);
  -webkit-backdrop-filter: blur(7.2px);
  border-radius: 24px;
  padding: 40px 36px;
}

.home-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.home-form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.home-form-group label {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.home-form-input {
  width: 100%;
  padding: 14px 18px;
  font-size: 16px;
  color: #333;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.home-form-input::placeholder {
  color: #999;
}

.home-form-input:hover {
  border-color: #ccc;
}

.home-form-input:focus {
  border-color: #e28133;
  box-shadow: 0 0 0 2px rgba(226, 129, 51, 0.2);
}

.home-form-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin-top: 8px;
  padding: 16px 24px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #fff;
  background: #e28133;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.home-form-submit:hover {
  background: #c96f28;
}

.home-form-submit-arrow {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 1;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
}

.home-form-footer {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 4px;
}

.home-form-checkbox {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  flex-shrink: 0;
  accent-color: #e28133;
}

.home-form-consent {
  font-size: 13px;
  line-height: 1.45;
  color: #666;
  cursor: pointer;
}

.home-form-link {
  color: #e28133;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.home-form-link:hover {
  color: #c96f28;
}

@media (max-width: 768px) {
  .home-form-section {
    min-height: 640px;
  }

  .home-form-bg-img {
    min-height: 640px;
  }

  .home-form-container {
    min-height: 640px;
    justify-content: center;
    padding: 48px 16px 64px;
  }

  .home-form-title {
    margin-bottom: 24px;
  }

  .home-form-panel {
    max-width: 100%;
    padding: 28px 24px;
  }
}
</style>
