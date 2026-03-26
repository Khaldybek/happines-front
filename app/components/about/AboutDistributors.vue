<template>
  <section class="distributors-section">
    <div class="container">
      <div class="dist-header">
        <div class="dist-header-text">
          <h3>Выдающиеся дистрибьюторы</h3>
          <p>
            Мы отмечаем людей, которые развивают сообщество HAPPINESS
            через дисциплину, уважение и результат.
          </p>
        </div>

        <NuxtLink to="/distributors" class="dist-all-link">
          <span class="dist-all-link__arrow" aria-hidden="true"></span>
          <span>СМОТРЕТЬ ВСЕХ ДИСТРИБЬЮТОРОВ</span>
        </NuxtLink>
      </div>

      <div class="dist-grid">
        <article v-for="(item, i) in distributors" :key="`${item.name}-${i}`" class="dist-card">
          <div class="dist-img">
            <img :src="item.image" :alt="item.name">
          </div>

          <div class="dist-info">
            <h4>{{ item.name }}</h4>
            <p class="location">{{ item.location }}</p>
            <p class="role">{{ item.role }}</p>

            <p class="contribution-title">Вклад</p>
            <ul class="contribution-list">
              <li v-for="(point, index) in item.contribution" :key="index">{{ point }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const baseDistributor = {
  name: 'Кудайбергенова Карима',
  location: 'Турция, Стамбул',
  role: 'Лидер сообщества / Топ-дистрибьютор',
  contribution: [
    'Обеспечивает логистику на локальном уровне',
    'Обучение продавцов/консультантов',
    'Организация офлайн/онлайн акций'
  ],
  image: '/images/0e4a1275c44cef2f320a07979f1e493f1718bc38.png'
}

const distributors = Array.from({ length: 8 }, () => ({ ...baseDistributor }))
</script>

<style scoped>
.distributors-section {
  padding: 66px 0 78px;
}

.dist-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 24px;
}

.dist-header-text h3 {
  margin: 0 0 8px;
  font-size: clamp(34px, 2.55vw, 56px);
  line-height: 1.05;
  color: #141414;
}

.dist-header-text p {
  margin: 0;
  max-width: 760px;
  font-size: clamp(20px, 1.25vw, 28px);
  line-height: 1.32;
  color: #1f1f1f;
}

.dist-all-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  background: #e28133;
  color: #fff;
  border-radius: 999px;
  padding: 2px 20px 2px 2px;
  font-size: clamp(13px, 0.78vw, 16px);
  font-weight: 800;
  text-transform: uppercase;
  margin-top: 4px;
}

.dist-all-link__arrow {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.9);
  position: relative;
}

.dist-all-link__arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 11px;
  height: 11px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: translate(-64%, -50%) rotate(45deg);
}

.dist-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 26px 22px;
}

.dist-card {
  border: 2px solid #d7d7d7;
  border-radius: 42px;
  overflow: hidden;
}

.dist-img {
  padding: 10px 10px 0;
}

.dist-img img {
  width: 100%;
  height: 172px;
  object-fit: cover;
  border-radius: 32px 32px 0 0;
}

.dist-info {
  padding: 8px 14px 14px;
}

.dist-info h4 {
  margin: 0 0 5px;
  font-size: clamp(18px, 1.1vw, 25px);
  line-height: 1.1;
  color: #101010;
}

.location,
.role,
.contribution-title {
  margin: 0;
  color: #1e1e1e;
}

.location {
  font-size: clamp(15px, 0.95vw, 22px);
  margin-bottom: 6px;
}

.role {
  font-size: clamp(15px, 0.95vw, 22px);
  line-height: 1.18;
  margin-bottom: 6px;
}

.contribution-title {
  font-size: clamp(15px, 0.95vw, 22px);
  font-weight: 800;
  margin-bottom: 4px;
}

.contribution-list {
  margin: 0;
  padding-left: 22px;
  font-size: clamp(15px, 0.95vw, 22px);
  line-height: 1.17;
  color: #171717;
}

@media (max-width: 1300px) {
  .dist-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .dist-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 980px) {
  .distributors-section {
    padding: 52px 0 62px;
  }

  .dist-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .dist-all-link__arrow {
    width: 42px;
    height: 42px;
  }
}

@media (max-width: 620px) {
  .dist-grid {
    grid-template-columns: 1fr;
  }

  .dist-all-link {
    width: 100%;
    justify-content: center;
  }
}
</style>
