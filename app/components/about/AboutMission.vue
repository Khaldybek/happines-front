<template>
  <section class="mission-section">
    <div class="container">
      <div class="mission-bg">
        <img src="/images/16_416.svg" class="blob-left" alt="">
        <img src="/images/16_417.svg" class="blob-right" alt="">
      </div>
      <div class="mission-content">
        <h2 class="mission-title">
          <span class="title-black">НАША</span>
          <span class="title-orange"> МИССИЯ</span>
        </h2>
        <p class="mission-subtitle">Создавать счастье через здоровье, качество и возможности для роста.</p>
        <p class="mission-desc">Мы развиваем HAPPINESS, объединяя 5000-летний опыт традиционной китайской медицины, натуральные растительные компоненты и современные биотехнологии. Наша цель — помогать людям укреплять здоровье и качество жизни, а партнёрам — давать понятную систему развития, поддержку и честные условия сотрудничества.</p>

        <div class="benefits-grid">
          <div class="benefits-col">
            <h3 class="benefits-heading">Что получает клиент</h3>
            <ul class="benefits-list">
              <li>
                <span class="benefit-icon">
                  <img src="/fire.svg" alt="">
                </span>
                <span>Поддержку организма и иммунитета в ежедневном ритме жизни</span>
              </li>
              <li>
                <span class="benefit-icon">
                  <img src="/fire.svg" alt="">
                </span>
                <span>Формулы с высокой усвояемостью и продуманным действием</span>
              </li>
              <li>
                <span class="benefit-icon">
                  <img src="/fire.svg" alt="">
                </span>
                <span>Бережный состав: акцент на натуральные растительные компоненты</span>
              </li>
              <li>
                <span class="benefit-icon">
                  <img src="/fire.svg" alt="">
                </span>
                <span>Системный подход к самочувствию — не «замаскировать», а улучшать основу</span>
              </li>
              <li>
                <span class="benefit-icon">
                  <img src="/fire.svg" alt="">
                </span>
                <span>Продукцию под контролем качества и стандартов производства</span>
              </li>
            </ul>
          </div>
          <div class="benefits-col">
            <h3 class="benefits-heading">Что получает партнёр:</h3>
            <ul class="benefits-list">
              <li>
                <span class="benefit-icon">
                  <img src="/fire.svg" alt="">
                </span>
                <span>Возможность участвовать в маркетинговой программе HAPPINESS</span>
              </li>
              <li>
                <span class="benefit-icon">
                  <img src="/fire.svg" alt="">
                </span>
                <span>Еженедельные выплаты</span>
              </li>
              <li>
                <span class="benefit-icon">
                  <img src="/fire.svg" alt="">
                </span>
                <span>Денежное вознаграждение (не товарное)</span>
              </li>
              <li>
                <span class="benefit-icon">
                  <img src="/fire.svg" alt="">
                </span>
                <span>Бонусы, поощрения и признание результатов</span>
              </li>
              <li>
                <span class="benefit-icon">
                  <img src="/fire.svg" alt="">
                </span>
                <span>Личностный и карьерный рост, участие в промоушенах и сильное сообщество</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mission-section {
  position: relative;
  padding: 80px 0 100px;
  overflow: hidden;
}

.mission-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.blob-left {
  position: absolute;
  left: -200px;
  top: 0;
  filter: blur(100px);
}

.blob-right {
  position: absolute;
  right: -100px;
  bottom: 0;
  filter: blur(100px);
}

.mission-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.mission-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.title-black {
  color: #121212;
}

.title-orange {
  color: var(--primary-orange);
}

.mission-subtitle {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #121212;
}

.mission-desc {
  font-size: 16px;
  color: #121212;
  line-height: 1.6;
  margin: 0 0 50px 0;
}

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  text-align: left;
  margin-top: 40px;
}

.benefits-heading {
  font-size: 20px;
  font-weight: 700;
  color: #121212;
  margin: 0 0 24px 0;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefits-list li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.5;
  color: #121212;
}

.benefit-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border: 2px solid var(--primary-orange);
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
}

.benefit-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .mission-title {
    font-size: 36px;
  }
}
</style>
