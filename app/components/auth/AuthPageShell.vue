<template>
  <div>
    <TheHeader />
    <main class="auth-page">
      <div class="container">
        <slot />
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 820px;
  background: #ffffff;
  padding: 64px 0 80px;
}

@media (max-width: 900px) {
  .auth-page {
    min-height: auto;
    padding: 36px 0 44px;
  }
}

@media (max-width: 600px) {
  .auth-page {
    padding: 24px 0 32px;
  }

  .auth-page :deep(.container) {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (max-width: 480px) {
  .auth-page {
    padding: 20px 0 28px;
  }

  .auth-page :deep(.container) {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
