<template>
  <div class="cabinet-heading">
    <h1 class="cabinet-page-title">ЛИЧНЫЙ КАБИНЕТ</h1>
  </div>
</template>

<style scoped>
.cabinet-heading {
  margin-bottom: 32px;
}

.cabinet-page-title {
  margin: 0;
  color: #dd5f05;
  font-size: clamp(44px, 2.1vw, 46px);
  line-height: 1;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

@media (max-width: 1100px) {
  .cabinet-heading {
    margin-bottom: 24px;
  }

  .cabinet-page-title {
    font-size: clamp(34px, 8vw, 42px);
  }
}
</style>
