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

              <div class="avatar-wrap">
                <img src="/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png" alt="Аватар" class="avatar-image">
                <button type="button" class="avatar-edit" aria-label="Изменить фото"></button>
              </div>

              <form class="profile-form" @submit.prevent>
                <label class="field-group field-full">
                  <span class="field-label">ФИО</span>
                  <input type="text" placeholder="Введите ваше ФИО" class="field-input">
                </label>

                <label class="field-group">
                  <span class="field-label">Номер телефона</span>
                  <input type="tel" placeholder="Введите ваш телефон" class="field-input">
                </label>

                <label class="field-group">
                  <span class="field-label">Email</span>
                  <input type="email" placeholder="Введите ваш email" class="field-input">
                </label>

                <h3 class="address-title">АДРЕС</h3>

                <label class="field-group">
                  <span class="field-label">Страна</span>
                  <span class="select-wrap">
                    <select class="field-input">
                      <option selected disabled>Выберите стану</option>
                      <option>Казахстан</option>
                      <option>Россия</option>
                      <option>Узбекистан</option>
                    </select>
                  </span>
                </label>

                <label class="field-group">
                  <span class="field-label">Город</span>
                  <span class="select-wrap">
                    <select class="field-input">
                      <option selected disabled>Выберите город</option>
                      <option>Алматы</option>
                      <option>Астана</option>
                      <option>Шымкент</option>
                    </select>
                  </span>
                </label>

                <label class="field-group">
                  <span class="field-label">Улица и номер дома</span>
                  <input type="text" placeholder="Введите улицу и номер дома" class="field-input">
                </label>

                <label class="field-group">
                  <span class="field-label">Квартира</span>
                  <input type="text" placeholder="Введите квартира" class="field-input">
                </label>
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
definePageMeta({
  layout: false,
})

useHead({
  title: 'Личный кабинет — Профиль',
})
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

.section-title {
  margin: 12px 0 16px;
  font-size: clamp(40px, 2.1vw, 42px);
  color: #101010;
}

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
}

.field-input::placeholder {
  color: #ababab;
}

select.field-input {
  appearance: none;
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

@media (max-width: 1100px) {
  .cabinet-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    margin-top: 0;
  }

  .profile-form {
    grid-template-columns: 1fr;
    max-width: 100%;
  }

  .field-full,
  .address-title {
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
}
</style>
