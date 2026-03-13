<template>
  <section class="people-section">
    <div class="container">
      <h2 class="people-title">
        <span class="title-orange">ЛЮДИ И</span>
        <span class="title-black"> СООБЩЕСТВО</span>
      </h2>
      <p class="people-intro">HAPPINESS — это команда и партнёры, которые развивают культуру здоровья и качества, поддерживая друг друга в каждом регионе.</p>

      <div class="people-layout">
        <div class="people-left">
          <h3 class="people-subheading">Команда, которая отвечает за качество</h3>
          <p class="people-desc">От разработки формул до сервиса и обучения — каждый этап контролируется профильными специалистами.</p>
          <NuxtLink to="/about" class="btn btn-orange people-btn">
            <span class="btn-icon-wrap">
              <img src="/images/I16_569_132_85696.svg" alt="" class="btn-arrow">
            </span>
            Подробнее
          </NuxtLink>
        </div>

        <div class="people-blocks">
          <div class="people-block block-blue">
            <h4>R&D И ТЕХНОЛОГИИ</h4>
            <p>Разрабатываем и совершенствуем формулы, соединяя традиционный опыт и современные решения.</p>
          </div>
          <div class="people-block block-orange">
            <h4>КОНТРОЛЬ КАЧЕСТВА</h4>
            <p>Проверяем сырьё и продукцию, соблюдаем стандарты и обеспечиваем стабильность качества.</p>
          </div>
          <div class="people-block block-green">
            <h4>СЕРВИС И ПОДДЕРЖКА</h4>
            <p>Помогаем с заказами, консультациями и навигацией по сервисам — быстро и по делу.</p>
          </div>
          <div class="people-block block-yellow">
            <h4>ОБУЧЕНИЕ ПАРТНЁРОВ</h4>
            <p>Даём систему обучения, материалы и сопровождение, чтобы партнёр рос уверенно и этично.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.people-section {
  padding: 80px 0;
  background: #fff;
}

.people-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.title-orange {
  color: var(--primary-orange);
}

.title-black {
  color: #121212;
}

.people-intro {
  font-size: 16px;
  color: #121212;
  line-height: 1.6;
  margin: 0 0 40px 0;
  max-width: 100%;
}

.people-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.people-left {
  padding-right: 20px;
}

.people-subheading {
  font-size: 22px;
  font-weight: 700;
  color: #121212;
  margin: 0 0 16px 0;
}

.people-desc {
  font-size: 16px;
  color: #121212;
  line-height: 1.6;
  margin: 0 0 30px 0;
}

.people-btn {
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 16px 28px;
}

.btn-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-arrow {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}

.people-blocks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.people-block {
  border-radius: 24px;
  padding: 32px 28px;
  color: #fff;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.people-block h4 {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.3;
}

.people-block p {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
}

.block-blue {
  background-color: #4B92D1;
}

.block-orange {
  background-color: #F9A43E;
}

.block-green {
  background-color: #77B341;
}

.block-yellow {
  background-color: #F5CF5D;
  color: #121212;
}

.block-yellow h4 {
  color: #121212;
}

.block-yellow p {
  color: #121212;
}

@media (max-width: 968px) {
  .people-layout {
    grid-template-columns: 1fr;
  }

  .people-left {
    padding-right: 0;
  }

  .people-blocks {
    gap: 20px;
  }
}

@media (max-width: 600px) {
  .people-blocks {
    grid-template-columns: 1fr;
  }

  .people-title {
    font-size: 32px;
  }

  .people-subheading {
    font-size: 18px;
  }
}
</style>
