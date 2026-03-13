<template>
  <section class="benefits-section">
    <div class="container">
      <div class="benefits-grid">
        <div class="benefits-col">
          <h3>Что получает клиент</h3>
          <div class="benefit-list">
            <div class="benefit-item">
              <div class="icon-box"><img src="/images/16_586.svg" alt=""></div>
              <p>Поддержку организма и иммунитета в ежедневном ритме жизни</p>
            </div>
            <div class="benefit-item">
              <div class="icon-box"><img src="/images/16_604.svg" alt=""></div>
              <p>Формулы с высокой усвояемостью и продуманным действием</p>
            </div>
            <div class="benefit-item">
              <div class="icon-box"><img src="/images/16_622.svg" alt=""></div>
              <p>Бережный состав: акцент на натуральные растительные компоненты</p>
            </div>
            <div class="benefit-item">
              <div class="icon-box"><img src="/images/16_640.svg" alt=""></div>
              <p>Системный подход к самочувствию — не «замаскировать», а улучшать основу</p>
            </div>
            <div class="benefit-item">
              <div class="icon-box"><img src="/images/16_658.svg" alt=""></div>
              <p>Продукцию под контролем качества и стандартов производства</p>
            </div>
          </div>
        </div>
        <div class="benefits-col">
          <h3>Что получает партнёр:</h3>
          <div class="benefit-list">
            <div class="benefit-item">
              <div class="icon-box"><img src="/images/16_679.svg" alt=""></div>
              <p>Возможность участвовать в маркетинговой программе HAPPINESS</p>
            </div>
            <div class="benefit-item">
              <div class="icon-box"><img src="/images/16_697.svg" alt=""></div>
              <p>Еженедельные выплаты</p>
            </div>
            <div class="benefit-item">
              <div class="icon-box"><img src="/images/16_715.svg" alt=""></div>
              <p>Денежное вознаграждение (не товарное)</p>
            </div>
            <div class="benefit-item">
              <div class="icon-box"><img src="/images/16_733.svg" alt=""></div>
              <p>Бонусы, поощрения и признание результатов</p>
            </div>
            <div class="benefit-item">
              <div class="icon-box"><img src="/images/16_751.svg" alt=""></div>
              <p>Личностный и карьерный рост, участие в промоушенах и сильное сообщество</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.benefits-section {
  padding: 60px 0;
}

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
}

.benefits-col h3 {
  font-size: 24px;
  margin-bottom: 30px;
}

.benefit-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.icon-box {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
