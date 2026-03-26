<template>
  <footer class="footer-wrap">
    <div class="footer-social-top" aria-hidden="true" />
    <div class="footer-social-strip">
      <div class="container">
        <div class="socials">
          <a href="#" aria-label="Mail" class="social-icon"><img src="/images/16_424.svg" alt="Mail"></a>
          <a href="#" aria-label="YouTube" class="social-icon"><img src="/images/16_429.svg" alt="YouTube"></a>
          <a href="#" aria-label="Instagram" class="social-icon"><img src="/images/16_432.svg" alt="Instagram"></a>
          <a href="#" aria-label="Telegram" class="social-icon"><img src="/images/16_440.svg" alt="Telegram"></a>
          <a href="#" aria-label="WhatsApp" class="social-icon"><img src="/images/I16_446_138_96774.svg" alt="WhatsApp"></a>
          <a href="#" aria-label="VK" class="social-icon"><img src="/images/16_453.svg" alt="VK"></a>
          <a href="#" aria-label="TikTok" class="social-icon"><img src="/images/16_460.svg" alt="TikTok"></a>
        </div>
      </div>
    </div>
    <div class="footer-social-bottom" aria-hidden="true" />

    <div class="container">
      <div class="footer-shell">
        <div class="footer-inner">
          <div class="footer-main-card">
            <article class="warning-card">
              <h3>
                <span class="warning-mark">!</span>
                ВНИМАНИЕ! ОСТЕРЕГАЙТЕСЬ ПОДДЕЛОК!
              </h3>
              <p>
                Мы гарантируем надлежащее качество реализуемого товара в официальном Интернет-магазине,
                а также через магазины Happiness!<br>
                Мы не гарантируем качество продукции, а также соблюдение условий ее хранения продавцами,
                если вы приобретаете товар на сторонних сайтах или маркетплейсах.
              </p>
            </article>

            <nav class="footer-nav-columns">
              <div class="footer-col">
                <h4>ПРОДУКЦИЯ</h4>
                <ul>
                  <li><NuxtLink to="/catalog" class="footer-link" active-class="is-active" exact-active-class="is-active">Очищение</NuxtLink></li>
                  <li><NuxtLink to="/catalog" class="footer-link">Восстановление и омоложение</NuxtLink></li>
                  <li><NuxtLink to="/catalog" class="footer-link">Ежедневный уход</NuxtLink></li>
                  <li><NuxtLink to="/catalog" class="footer-link">Товары для семьи</NuxtLink></li>
                  <li><NuxtLink to="/reviews" class="footer-link" active-class="is-active">Отзывы о продукции</NuxtLink></li>
                  <li><NuxtLink to="/diagnostic" class="footer-link" active-class="is-active">Диагностический тест</NuxtLink></li>
                  <li><NuxtLink to="/health-articles" class="footer-link" active-class="is-active">Статьи о здоровье</NuxtLink></li>
                </ul>
              </div>

              <div class="footer-col">
                <h4>СОБЫТИЯ</h4>
                <ul>
                  <li><NuxtLink to="/events/promotion" class="footer-link" active-class="is-active">Промоушен</NuxtLink></li>
                  <li><NuxtLink to="/gallery/gallery" class="footer-link" active-class="is-active">Галерея</NuxtLink></li>
                  <li><NuxtLink to="/distributors" class="footer-link" active-class="is-active">Выдающиеся дистрибьюторы</NuxtLink></li>
                  <li><NuxtLink to="/news" class="footer-link" active-class="is-active">Новости</NuxtLink></li>
                </ul>
              </div>

              <div class="footer-col">
                <h4>СЕРВИСЫ</h4>
                <ul>
                  <li><NuxtLink to="/learning" class="footer-link" active-class="is-active">Онлайн обучение</NuxtLink></li>
                  <li><NuxtLink to="/business" class="footer-link" active-class="is-active">Бизнес</NuxtLink></li>
                  <li><NuxtLink to="/contacts" class="footer-link" active-class="is-active">Контакты</NuxtLink></li>
                </ul>

                <h4 class="sub-title">О КОМПАНИИ</h4>
                <ul>
                  <li><NuxtLink to="/about" class="footer-link" active-class="is-active">О нас</NuxtLink></li>
                  <li><NuxtLink to="/documents" class="footer-link" active-class="is-active">Документы компании</NuxtLink></li>
                  <li><NuxtLink to="/certificates" class="footer-link" active-class="is-active">Сертификаты на продукцию</NuxtLink></li>
                </ul>
              </div>
            </nav>
          </div>

          <div class="footer-info-row">
            <div class="contacts-block">
              <div class="contact-item">
                <img src="/images/16_502.svg" alt="Address">
                <span>Казахстан, г Алматы ул. Эльбека, 61/3</span>
              </div>
              <div class="contact-item">
                <img src="/images/16_508.svg" alt="Phone">
                <span>+7 777 643 11 14</span>
              </div>
              <div class="contact-item">
                <img src="/images/16_514.svg" alt="Hours">
                <span>ПН-ВС 09:00 - 20:00</span>
              </div>
            </div>

            <div class="badges-block">
              <div class="app-links">
                <a href="#" class="app-btn" aria-label="Google Play">
                  <img src="/images/16_524.svg" alt="Google Play">
                  <div><span>Доступно в</span><strong>Google Play</strong></div>
                </a>
                <a href="#" class="app-btn" aria-label="App Store">
                  <img src="/images/I16_524_347_1617.svg" alt="App Store">
                  <div><span>Доступно в</span><strong>App Store</strong></div>
                </a>
              </div>

              <div class="certs">
                <div class="cert-badge">HACCP</div>
                <div class="cert-badge">ISO<br>22000</div>
              </div>
            </div>
          </div>

          <div class="footer-bottom-row">
            <div class="copyright">
              <p>© 2025 Happiness</p>
              <p>Сайт разработан MCODLAB</p>
            </div>

            <div class="policy-links">
              <NuxtLink to="/privacy">Политика конфиденциальности</NuxtLink>
              <NuxtLink to="/privacy">Пользовательское соглашение</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-wrap {
  background: #a9d08d;
  padding-bottom: 26px;
}

.footer-social-top {
  height: 32px;
  background: #fff;
}

.footer-social-strip {
  background: #6ab24e;
  padding: 44px 24px;
}

.footer-social-bottom {
  height: 32px;
  background: #fff;
}

.footer-social-strip .container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.socials {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.social-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e28133;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.social-icon img {
  width: 26px;
  height: 26px;
  object-fit: contain;
}

.footer-shell {
  margin-top: 40px;
  background: #dce4b7;
  border-radius: 10px;
  padding: 24px;
}

.footer-inner {
  background: #dce4b7;
  border-radius: 8px;
}

.footer-main-card {
  background: #ececec;
  border-radius: 12px;
  padding: 34px 28px;
  display: grid;
  grid-template-columns: 1.24fr 2fr;
  gap: 34px;
}

.warning-card h3 {
  margin: 0 0 18px;
  font-size: clamp(24px, 1.7vw, 40px);
  line-height: 1;
  color: #2a2a2a;
  text-transform: uppercase;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.warning-mark {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #e28133;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 34px;
  line-height: 1;
  flex-shrink: 0;
}

.warning-card p {
  margin: 0;
  font-size: clamp(18px, 1.12vw, 24px);
  line-height: 1.17;
  color: #343434;
}

.footer-nav-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.footer-col h4 {
  margin: 0 0 12px;
  font-size: clamp(19px, 1.25vw, 27px);
  line-height: 1;
  color: #2a2a2a;
  text-transform: uppercase;
}

.footer-col .sub-title {
  margin-top: 14px;
}

.footer-col ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer-col li {
  margin-bottom: 8px;
  line-height: 1.1;
}

.footer-col .footer-link {
  display: inline-block;
  color: #353535;
  font-size: clamp(16px, 1vw, 22px);
  text-decoration: none;
  border-radius: 999px;
  padding: 2px 10px;
  margin: -2px -10px 0 -10px;
  transition: background 0.2s, color 0.2s;
}

.footer-col .footer-link:hover {
  color: #c25404;
  background: rgba(226, 129, 51, 0.15);
}

.footer-col .footer-link.is-active {
  color: #fff;
  background: #e28133;
}

.footer-col .footer-link.is-active:hover {
  color: #fff;
  background: #c96f28;
}

.footer-info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  padding: 24px 20px 18px;
}

.contacts-block {
  display: grid;
  gap: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: clamp(17px, 1.05vw, 23px);
  color: #252525;
}

.contact-item img {
  width: 22px;
  height: 22px;
}

.badges-block {
  display: flex;
  align-items: center;
  gap: 16px;
}

.app-links {
  display: flex;
  gap: 10px;
}

.app-btn {
  background: #2c6fc0;
  color: #fff;
  border-radius: 999px;
  padding: 8px 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.app-btn img {
  width: 24px;
  height: 24px;
}

.app-btn span {
  display: block;
  font-size: 11px;
  line-height: 1;
  opacity: 0.95;
}

.app-btn strong {
  display: block;
  font-size: 31px;
  font-size: clamp(16px, 0.94vw, 20px);
  line-height: 1.05;
}

.certs {
  display: flex;
  gap: 8px;
}

.cert-badge {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 3px solid #3f77c1;
  color: #2d68b9;
  background: #e7f0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 800;
  font-size: 15px;
  line-height: 1;
}

.footer-bottom-row {
  border-top: 1px solid #cad6a2;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 18px 20px 0;
  gap: 20px;
}

.copyright p {
  margin: 0;
  color: #6f6f6f;
  line-height: 1.4;
  font-size: clamp(15px, 0.95vw, 20px);
}

.copyright p + p {
  margin-top: 6px;
  font-size: clamp(13px, 0.83vw, 17px);
}

.policy-links {
  display: flex;
  flex-direction: column;
  text-align: right;
  gap: 4px;
}

.policy-links a {
  color: #6f6f6f;
  font-size: clamp(15px, 0.95vw, 20px);
}

@media (max-width: 1240px) {
  .footer-main-card {
    grid-template-columns: 1fr;
  }

  .footer-nav-columns {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-col:last-child {
    grid-column: 1 / -1;
  }

  .footer-info-row {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 760px) {
  .footer-wrap {
    padding-bottom: 20px;
  }

  .footer-shell {
    margin-top: 20px;
    padding: 12px;
  }

  .footer-main-card {
    border-radius: 10px;
    padding: 16px 12px;
    gap: 18px;
  }

  .warning-card h3 {
    font-size: 25px;
  }

  .warning-mark {
    width: 34px;
    height: 34px;
    font-size: 24px;
  }

  .warning-card p {
    font-size: 16px;
  }

  .footer-nav-columns {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .footer-col h4 {
    font-size: 20px;
  }

  .footer-col a {
    font-size: 16px;
  }

  .footer-info-row,
  .footer-bottom-row {
    padding-left: 6px;
    padding-right: 6px;
  }

  .footer-social-top,
  .footer-social-bottom {
    height: 24px;
  }

  .footer-social-strip {
    padding: 36px 20px;
  }

  .socials {
    flex-wrap: wrap;
    gap: 12px;
  }

  .badges-block {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }

  .app-links {
    flex-wrap: wrap;
  }

  .footer-bottom-row {
    flex-direction: column;
  }

  .policy-links {
    text-align: left;
  }
}
</style>
