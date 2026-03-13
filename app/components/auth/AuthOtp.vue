<template>
  <div class="otp-row">
    <input
      v-for="(_, index) in length"
      :key="index"
      ref="inputRefs"
      type="text"
      inputmode="numeric"
      autocomplete="one-time-code"
      maxlength="1"
      class="otp-cell"
      :value="digits[index]"
      @input="onInput($event, index)"
      @keydown="onKeydown($event, index)"
      @paste="onPaste"
    >
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ length?: number }>(), {
  length: 6,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const digits = ref<string[]>(Array.from({ length: props.length }, () => ''))
const inputRefs = ref<(HTMLInputElement | null)[]>([])

function getRefs(): HTMLInputElement[] {
  const refs = inputRefs.value
  return Array.isArray(refs) ? refs.filter(Boolean) as HTMLInputElement[] : []
}

function focusAt(index: number) {
  const refs = getRefs()
  const i = Math.max(0, Math.min(index, refs.length - 1))
  refs[i]?.focus()
}

function onInput(event: Event, index: number) {
  const input = event.target as HTMLInputElement
  const raw = input.value.replace(/\D/g, '')
  const char = raw.slice(-1)
  if (char) {
    digits.value = [...digits.value]
    digits.value[index] = char
    emitValue()
    if (index < props.length - 1) {
      nextTick(() => focusAt(index + 1))
    }
  } else {
    digits.value = [...digits.value]
    digits.value[index] = ''
    emitValue()
  }
}

function onKeydown(event: KeyboardEvent, index: number) {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    event.preventDefault()
    digits.value = [...digits.value]
    digits.value[index - 1] = ''
    emitValue()
    nextTick(() => focusAt(index - 1))
  }
}

function onPaste(event: ClipboardEvent) {
  event.preventDefault()
  const pasted = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, props.length)
  if (!pasted) return
  const refs = getRefs()
  const arr = pasted.split('')
  for (let i = 0; i < props.length; i++) {
    digits.value[i] = arr[i] ?? ''
  }
  digits.value = [...digits.value]
  emitValue()
  const nextIndex = Math.min(pasted.length, props.length - 1)
  nextTick(() => focusAt(nextIndex))
}

function emitValue() {
  const value = digits.value.join('')
  emit('update:modelValue', value)
}

onMounted(() => {
  nextTick(() => focusAt(0))
})
</script>

<style scoped>
.otp-row {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.otp-cell {
  width: 64px;
  height: 74px;
  border-radius: 14px;
  border: 1.5px solid #b7b7b7;
  background: #ffffff;
  text-align: center;
  font-size: 32px;
  color: #333;
  outline: none;
}

@media (max-width: 900px) {
  .otp-row {
    gap: 5px;
  }

  .otp-cell {
    width: 42px;
    height: 52px;
    border-radius: 10px;
    font-size: 20px;
  }
}
</style>
