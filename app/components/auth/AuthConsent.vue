<template>
  <label class="consent">
    <input v-model="agreed" type="checkbox" class="consent-check">
    <span class="consent-text">
      Я согласен(-а) на обработку <NuxtLink to="/privacy">персональных данных</NuxtLink>
      и ознакомился(-ась) с <NuxtLink to="/privacy">политикой конфиденциальности</NuxtLink>
    </span>
  </label>
</template>

<script setup lang="ts">
const agreed = defineModel<boolean>({ default: false })
</script>

<style scoped>
.consent {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
}

.consent-check {
  width: 26px;
  height: 26px;
  margin-top: 2px;
  accent-color: #e28133;
}

.consent-text {
  max-width: 640px;
  color: #565656;
  font-size: clamp(18px, 1vw, 22px);
  line-height: 1.2;
}

.consent-text a {
  color: #f07d2c;
}

@media (max-width: 900px) {
  .consent-check {
    width: 20px;
    height: 20px;
  }

  .consent-text {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .consent {
    gap: 8px;
    align-items: flex-start;
  }

  .consent-check {
    width: 22px;
    height: 22px;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .consent-text {
    font-size: 14px;
    line-height: 1.3;
  }
}
</style>
