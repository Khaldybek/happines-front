<template>
  <section class="about-hero-section">
    <div class="container">
      <div class="hero-wrapper">
        <img src="/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png" alt="О компании" class="hero-img">
        <div class="play-btn">
          <div class="play-icon-wrapper">
            <img src="/images/16_561.svg" alt="Play">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-hero-section {
  margin-bottom: 60px;
}

.hero-wrapper {
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  height: 500px;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.play-icon-wrapper {
  width: 50px;
  height: 50px;
}
</style>
