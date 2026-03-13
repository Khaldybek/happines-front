<template>
  <section
    class="about-section"
    :class="{ 'is-dimmed': dimmed }"
    :style="{ '--about-progress': String(transitionValue) }"
  >
    <div class="container">
      <div class="about-top">
        <div class="about-text">
          <h2 class="section-title about-section-title">О НАС</h2>
          <div class="about-desc">
            <p>Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник</p>
            <p>Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный</p>
          </div>
        </div>
        <div class="about-image-main">
          <img src="/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png" alt="About Us">

        </div>
      </div>
      <div class="about-bottom">
        <div class="about-img-group">
          <img src="/images/home/121.png" alt="Team 1">
        </div>
        <div class="about-img-group small">
          <img src="/images/home/121.png" alt="Team 2">
        </div>
        <div class="about-text-bottom">
          <p>Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный</p>
          <p>Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ dimmed?: boolean, transitionProgress?: number }>(), {
  dimmed: false,
  transitionProgress: 0
})

const transitionValue = computed(() => {
  const val = props.transitionProgress
  if (Number.isNaN(val)) return 0
  return Math.max(0, Math.min(1, val))
})
</script>

<style scoped>
.about-section {
  padding: 100px 0;
  transition: background 0.4s ease;
  --about-progress: 0;
}

.about-section .container {
  opacity: calc(1 - (var(--about-progress) * 0.78));
  transform: translateY(calc(var(--about-progress) * -34px)) scale(calc(1 - (var(--about-progress) * 0.015)));
  filter: blur(calc(var(--about-progress) * 3.4px));
  transition: opacity 0.32s ease, transform 0.42s cubic-bezier(.2,.7,.2,1), filter 0.42s ease;
}

.about-section.is-dimmed {
  background: #fff;
}

.about-section.is-dimmed .container {
  opacity: 0.45;
  transition: opacity 0.4s ease;
}

.about-section-title {
  text-align: left;
  font-weight: 800;
  font-size: clamp(2rem, 4vw, 56px);
}

.about-top {
  display: flex;
  gap: 50px;
  margin-bottom: 50px;
  transform: translateY(calc(var(--about-progress) * -14px));
  transition: transform 0.42s cubic-bezier(.2,.7,.2,1);
}

.about-text {
  flex: 0 0 40%;
}

.about-desc {
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-size: 20px;
  line-height: 1.6;
}

.about-desc p {
  margin: 0;
}

.about-image-main {
  flex: 1;
  position: relative;
}

.about-image-main img {
  width: 100%;
  border-radius: 50px;
}


.about-bottom {
  position: relative;
  display: flex;
  gap: 30px;
  align-items: center;
  padding: 40px 40px 40px 50px;
  background: linear-gradient(to right, #d4e8f7 0%, #e5f0f9 20%, #f0f7fc 40%, #f8fbfd 60%, white 75%);
  border-radius: 0 50px 50px 0;
  transform: translateY(calc(var(--about-progress) * 26px));
  transition: transform 0.42s cubic-bezier(.2,.7,.2,1);
}

.about-img-group {
  position: relative;
  flex: 0 0 28%;
  height: 280px;
  overflow: hidden;
  border-radius: 50px;
}

.about-img-group img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50px;
}

.about-img-group.small {
  flex: 0 0 18%;
  height: 280px;
}

.about-text-bottom {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
}

.about-text-bottom p {
  margin: 0;
  padding: 20px 24px;
  border-radius: 0 24px 24px 0;
  background: white;
}

.about-text-bottom p:last-child {
  background: linear-gradient(to right, #e2f0dc 0%, #eef5eb 30%, #f6faf4 55%, white 80%);
  border-radius: 0 24px 24px 0;
}

</style>
