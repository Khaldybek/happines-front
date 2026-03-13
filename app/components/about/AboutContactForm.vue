<template>
  <section class="about-contact-section">
    <div class="container">
      <div class="contact-wrapper">
        <div class="contact-bg">
          <img src="/images/5730e1d19254bf09a2a610a0d7051ffbcc89aab2.png" class="bowl-img" alt="">
          <img src="/images/d108efde919febe6ce2976a31c52a9e7fdc2be21.png" class="flowers-img" alt="">
        </div>
        <div class="contact-form-container">
          <h2>Оставьте заявку и мы с Вами свяжемся</h2>
          <form class="contact-form" @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="about-name">Имя</label>
              <input id="about-name" v-model="form.name" type="text" placeholder="Введите ваше имя" required>
            </div>
            <div class="form-group">
              <label for="about-phone">Номер телефона</label>
              <input id="about-phone" v-model="form.phone" type="tel" placeholder="Выберите телефон" required>
            </div>
            <div class="form-footer">
              <button type="submit" class="btn">Оставить заявку</button>
              <div class="checkbox-wrapper">
                <input id="about-policy" v-model="form.agree" type="checkbox" required>
                <label for="about-policy">Я согласен(-а) на обработку персональных данных…</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const form = reactive({
  name: '',
  phone: '',
  agree: false,
})

function onSubmit() {
  console.log('About contact form:', form)
}
</script>

<style scoped>
.about-contact-section {
  padding: 0 0 60px 0;
}

.contact-wrapper {
  background-color: #4b93d7;
  border-radius: 50px;
  position: relative;
  overflow: hidden;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.contact-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.bowl-img, .flowers-img {
  position: absolute;
}

.contact-form-container {
  position: relative;
  z-index: 2;
  width: 50%;
  padding: 60px;
  color: white;
}

.contact-form {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #ffffff;
  backdrop-filter: blur(7.2px);
  -webkit-backdrop-filter: blur(7.2px);
  border-radius: 50px;
  padding: 40px;
  color: #121212;
}

.contact-form .form-group label,
.contact-form .checkbox-wrapper label {
  color: inherit;
}

.contact-form-container h2 {
  font-size: 36px;
  margin-bottom: 40px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 16px 20px;
  border-radius: 40px;
  border: 1px solid #a6a6a6;
  background: white;
}

.form-footer {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.checkbox-wrapper {
  display: flex;
  gap: 10px;
  font-size: 12px;
}

@media (max-width: 900px) {
  .contact-wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .contact-form-container {
    width: 100%;
  }
}
</style>
