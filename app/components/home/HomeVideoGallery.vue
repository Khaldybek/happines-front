<template>
  <section class="video-section">
    <div class="container">
      <div class="video-header">
        <h2 class="video-title">ВИДЕОГАЛЕРЕЯ</h2>
        <img src="/vit.png" alt="" class="video-decor" aria-hidden="true">
      </div>

      <div class="video-desc">
        <p class="video-hashtag">#HAPPINESSINSIDE</p>
        <p class="video-text">
          Здесь собраны лучшие видео о продуктах, людях и развитии компании. Узнайте,
          как работает команда, меняются рынки и строится будущее бренда.
        </p>
      </div>

      <div class="video-grid">
        <div class="video-item">
          <div class="video-thumb">
            <img src="/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png" alt="Видео о продукции NEW">
            <button class="play-btn" aria-label="Воспроизвести видео"></button>
          </div>
          <p class="video-caption">ВИДЕО О ПРОДУКЦИИ NEW</p>
        </div>

        <div class="video-item">
          <div class="video-thumb">
            <img src="/images/342d0f8b9544d8dc8e8678f3302ca4864aa11e04.png" alt="Видео о продукции NEW Зубная паста Happiness">
            <button class="play-btn" aria-label="Воспроизвести видео"></button>
          </div>
          <p class="video-caption">
            ВИДЕО О ПРОДУКЦИИ NEW ЗУБНАЯ ПАСТА HAPPINESS ДВОЙНОЙ ЭФФЕКТ «СИЯЮЩИЕ ЗУБЫ И
            ЗДОРОВЫЕ ДЕСНЫ»...
          </p>
        </div>
      </div>

      <div class="video-nav">
        <button class="video-nav-btn is-prev" aria-label="Предыдущее видео"></button>
        <button class="video-nav-btn is-next" aria-label="Следующее видео"></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video-section {
  padding: 108px 0 88px;
  background: #fff;
}

.video-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
}

.video-title {
  font-size: clamp(48px, 7.2vw, 84px);
  line-height: 0.95;
  font-weight: 900;
  letter-spacing: 0.01em;
  color: #0a0b12;
  text-transform: uppercase;
}

.video-decor {
  position: absolute;
  right: 84px;
  top: 50%;
  width: 48px;
  height: 78px;
  object-fit: contain;
  transform: translateY(-50%) rotate(24deg);
}

.video-desc {
  max-width: 600px;
  margin-bottom: 40px;
}

.video-hashtag {
  font-size: clamp(26px, 2vw, 37px);
  font-weight: 800;
  letter-spacing: 0.01em;
  color: #343434;
  margin-bottom: 10px;
}

.video-text {
  font-size: clamp(22px, 1.45vw, 27px);
  line-height: 1.2;
  color: #383838;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.video-item {
  min-width: 0;
}

.video-thumb {
  position: relative;
  overflow: hidden;
  border-radius: 52px;
}

.video-thumb img {
  width: 100%;
  height: 100%;
  min-height: 280px;
  object-fit: cover;
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: #2f73cd;
  box-shadow: 0 8px 14px rgba(47, 115, 205, 0.28);
}

.play-btn::before {
  content: "";
  position: absolute;
  left: 56%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-left: 16px solid #fff;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

.video-caption {
  margin-top: 16px;
  font-size: clamp(26px, 1.62vw, 30px);
  line-height: 1.08;
  font-weight: 900;
  color: #111;
  text-transform: uppercase;
}

.video-nav {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 38px;
}

.video-nav-btn {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
}

.video-nav-btn::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
  transform-origin: center;
}

.video-nav-btn.is-prev {
  border: 1px solid #e28133;
  color: #e28133;
  background: #fff;
}

.video-nav-btn.is-prev::before {
  transform: translate(-38%, -50%) rotate(-135deg);
}

.video-nav-btn.is-next {
  background: #e28133;
  color: #fff;
}

.video-nav-btn.is-next::before {
  transform: translate(-62%, -50%) rotate(45deg);
}

@media (max-width: 1280px) {
  .video-title {
    font-size: clamp(44px, 6.5vw, 72px);
  }

  .video-decor {
    right: 10px;
  }
}

@media (max-width: 900px) {
  .video-section {
    padding: 72px 0 64px;
  }

  .video-header {
    margin-bottom: 24px;
  }

  .video-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .video-decor {
    display: none;
  }

  .video-thumb {
    border-radius: 32px;
  }

  .video-caption {
    font-size: clamp(24px, 4.8vw, 34px);
  }
}

@media (max-width: 600px) {
  .video-text {
    line-height: 1.3;
  }

  .video-thumb img {
    min-height: 220px;
  }

  .play-btn {
    width: 54px;
    height: 54px;
  }

  .play-btn::before {
    border-left-width: 12px;
    border-top-width: 8px;
    border-bottom-width: 8px;
  }
}
</style>
