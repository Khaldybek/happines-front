<template>
  <section class="happiness-today-section">
    <div class="container">
      <h2 class="happiness-title">
        <span class="happiness-title-accent">HAPPINESS</span>
        <span>СЕГОДНЯ</span>
      </h2>

      <div class="cards-grid">
        <article class="card card-1">
          <div class="card-content">
            <h3>Продукция HAPPINESS</h3>
            <p>Натуральные формулы на стыке традиционной китайской медицины и современных биотехнологий — для ежедневной поддержки организма.</p>
            <ul>
              <li>Каталог / хиты / наборы</li>
              <li>Контроль качества и стандарты</li>
              <li>Удобная покупка онлайн</li>
            </ul>
          </div>
          <div class="card-footer">
            <NuxtLink to="/products" class="action-btn">
              <span class="action-arrow" aria-hidden="true"></span>
              <span>Перейти в каталог</span>
            </NuxtLink>
          </div>
        </article>

        <article class="card card-2">
          <div class="card-fire"><img src="/fire.svg" alt=""></div>
          <div class="card-content">
            <h3>Онлайн обучение</h3>
            <p>Система обучения для партнёров: знания о продуктах, инструменты продвижения и поддержка, чтобы уверенно развивать результат.</p>
            <ul>
              <li>Курсы и материалы</li>
              <li>Практика и наставничество</li>
              <li>Готовые инструменты для работы</li>
            </ul>
          </div>
          <div class="card-footer">
            <NuxtLink to="/learning" class="action-btn">
              <span class="action-arrow" aria-hidden="true"></span>
              <span>Перейти к обучению</span>
            </NuxtLink>
          </div>
        </article>

        <article class="card card-3">
          <div class="card-fire"><img src="/fire.svg" alt=""></div>
          <div class="card-content">
            <h3>Возможности для партнёров</h3>
            <p>Маркетинговая программа и понятная модель развития: доход, бонусы и карьерный рост в сильном сообществе.</p>
            <ul>
              <li>Еженедельные выплаты</li>
              <li>Денежное вознаграждение</li>
              <li>Бонусы и поощрения</li>
            </ul>
          </div>
          <div class="card-footer">
            <NuxtLink to="/business" class="action-btn">
              <span class="action-arrow" aria-hidden="true"></span>
              <span>Стать партнёром</span>
            </NuxtLink>
          </div>
        </article>

        <article class="card card-4">
          <div class="card-fire"><img src="/fire.svg" alt=""></div>
          <div class="card-content">
            <h3>События и промоушены</h3>
            <p>Поездки, встречи и программы признания, которые объединяют партнёров и ускоряют рост через опыт и комьюнити.</p>
            <ul>
              <li>Промоушены и поездки</li>
              <li>Новости и отчёты</li>
              <li>Истории партнёров</li>
            </ul>
          </div>
          <div class="card-footer">
            <NuxtLink to="/events" class="action-btn">
              <span class="action-arrow" aria-hidden="true"></span>
              <span>Смотреть события</span>
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.happiness-today-section {
  padding: 74px 0;
}

.happiness-title {
  margin: 0 0 28px;
  text-transform: uppercase;
  line-height: 0.95;
  font-size: clamp(56px, 6.4vw, 94px);
  font-weight: 900;
  letter-spacing: 0.01em;
  color: #080a10;
}

.happiness-title span {
  display: inline-block;
}

.happiness-title-accent {
  color: #dd5f05;
  margin-right: 14px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.card {
  position: relative;
  border-radius: 42px;
  padding: 54px 26px 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 560px;
  box-shadow: 8px 10px 0 rgba(0, 0, 0, 0.14);
}

.card-1,
.card-3 {
  background: #fff;
}

.card-2,
.card-4 {
  background: #d6eff9;
}

.card-fire {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.card-fire img {
  width: 38px;
  height: 38px;
}

.card-content h3 {
  font-size: clamp(27px, 1.75vw, 34px);
  line-height: 1.07;
  margin: 0 0 12px;
  text-transform: uppercase;
}

.card-content p {
  font-size: clamp(14px, 1vw, 18px);
  line-height: 1.21;
  margin: 0 0 14px;
}

.card-content ul {
  margin: 0;
  padding-left: 24px;
  font-size: clamp(14px, 1vw, 18px);
  line-height: 1.22;
}

.card-footer {
  margin-top: 18px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #e28133;
  color: #fff;
  border-radius: 999px;
  padding: 2px 18px 2px 2px;
  font-size: clamp(13px, 0.82vw, 16px);
  font-weight: 800;
  text-transform: uppercase;
}

.action-arrow {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #e28133;
  border: 2px solid rgba(255, 255, 255, 0.9);
  position: relative;
}

.action-arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: translate(-62%, -50%) rotate(45deg);
}

@media (max-width: 1350px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .card {
    min-height: 470px;
  }
}

@media (max-width: 760px) {
  .happiness-today-section {
    padding: 56px 0;
  }

  .happiness-title {
    margin-bottom: 16px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .card {
    border-radius: 28px;
    padding: 52px 18px 18px;
    min-height: 420px;
  }

  .action-btn {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
