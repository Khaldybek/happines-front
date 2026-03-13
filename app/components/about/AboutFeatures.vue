<template>
  <section class="features-section">
    <div class="container">
      <div class="features-grid">
        <div class="feature-card blue">
          <h3>Команда, которая отвечает за качество</h3>
          <p>От разработки формул до сервиса и обучения — каждый этап контролируется профильными специалистами.</p>
          <div class="feature-footer">
            <div class="btn-circle"><img src="/images/I16_1533_132_85696.svg" alt=""></div>
            <span>Подробнее</span>
          </div>
        </div>
        <div class="feature-card orange">
          <h3>R&D и технологии</h3>
          <p>Разрабатываем и совершенствуем формулы, соединяя традиционный опыт и современные решения.</p>
        </div>
        <div class="feature-card green">
          <h3>Контроль качества</h3>
          <p>Проверяем сырьё и продукцию, соблюдаем стандарты и обеспечиваем стабильность качества.</p>
        </div>
        <div class="feature-card yellow">
          <h3>Сервис и поддержка</h3>
          <p>Помогаем с заказами, консультациями и навигацией по сервисам — быстро и по делу.</p>
        </div>
        <div class="feature-card light-orange">
          <h3>Обучение партнёров</h3>
          <p>Даём систему обучения, материалы и сопровождение, чтобы партнёр рос уверенно и этично.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  padding: 40px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.feature-card {
  border-radius: 50px;
  padding: 40px;
  color: white;
  min-height: 232px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.feature-card h3 {
  font-size: 24px;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.feature-card.blue { background-color: #4b93d7; }
.feature-card.orange { background-color: #ff7b1c; }
.feature-card.green { background-color: #78a435; }
.feature-card.yellow { background-color: #ffbf35; }
.feature-card.light-orange { background-color: #ffbf35; }

.feature-footer {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.2);
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
