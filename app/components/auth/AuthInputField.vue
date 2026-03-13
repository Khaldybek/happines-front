<template>
  <label class="auth-field">
    <span class="auth-label">{{ label }}</span>

    <span class="input-wrap" :class="{ 'with-icon': icon === 'eye' }">
      <select v-if="type === 'select'" class="auth-input auth-select">
        <option disabled selected>{{ placeholder }}</option>
        <option v-for="option in options" :key="option">{{ option }}</option>
      </select>

      <input
        v-else
        ref="inputRef"
        class="auth-input"
        :type="effectiveType"
        :placeholder="placeholder"
      >

      <button
        v-if="icon === 'eye' && type === 'password'"
        type="button"
        class="eye-btn"
        :aria-label="passwordVisible ? 'Скрыть пароль' : 'Показать пароль'"
        @click="togglePasswordVisibility"
      >
        <svg v-if="!passwordVisible" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12C3.8 8.5 7 6 12 6C17 6 20.2 8.5 22 12C20.2 15.5 17 18 12 18C7 18 3.8 15.5 2 12Z" stroke="#B1B1B1" stroke-width="1.8"/>
          <circle cx="12" cy="12" r="3" stroke="#B1B1B1" stroke-width="1.8"/>
        </svg>
        <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3l18 18M10.7 10.7a4 4 0 105.6 5.6M12 6c4.2 0 7.5 2.5 9.2 6a9.9 9.9 0 01-2.4 3.2M12 18c-4.2 0-7.5-2.5-9.2-6a9.9 9.9 0 012.4-3.2" stroke="#B1B1B1" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
    </span>
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  placeholder: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'select'
  options?: string[]
  icon?: 'none' | 'eye'
}>(), {
  type: 'text',
  options: () => [],
  icon: 'none',
})

const passwordVisible = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const effectiveType = computed(() => {
  if (props.type === 'password' && passwordVisible.value) return 'text'
  return props.type ?? 'text'
})

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value
}
</script>

<style scoped>
.auth-field {
  display: block;
}

.auth-label {
  display: inline-block;
  margin: 0 0 8px;
  font-size: clamp(18px, 1.2vw, 22px);
  font-weight: 700;
  color: #2a2a2a;
}

.input-wrap {
  position: relative;
  display: block;
}

.auth-input {
  width: 100%;
  height: 62px;
  border-radius: 999px;
  border: 1.5px solid #b7b7b7;
  background: #ffffff;
  color: #363636;
  font-size: 33px;
  font-size: clamp(17px, 0.94vw, 20px);
  padding: 0 22px;
  outline: none;
}

.auth-input::placeholder {
  color: #ababab;
}

.auth-select {
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #a2a2a2 50%), linear-gradient(135deg, #a2a2a2 50%, transparent 50%);
  background-position: calc(100% - 22px) calc(50% - 3px), calc(100% - 16px) calc(50% - 3px);
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;
}

.with-icon .auth-input {
  padding-right: 62px;
}

.eye-btn {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: inherit;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.eye-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

@media (max-width: 900px) {
  .auth-input {
    height: 54px;
    font-size: 16px;
  }

  .auth-label {
    font-size: 17px;
  }
}

@media (max-width: 480px) {
  .auth-input {
    height: 50px;
    padding: 0 18px;
  }

  .auth-label {
    font-size: 16px;
    margin-bottom: 6px;
  }
}
</style>
