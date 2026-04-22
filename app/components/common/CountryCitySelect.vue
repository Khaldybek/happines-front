<template>
  <!-- display: contents — оба form-group встают прямо в сетку родительского form-row -->
  <div class="country-city-root">
    <div class="cc-group">
      <label :for="`${uid}-country`" class="cc-label">Страна</label>
      <div class="cc-select-wrap">
        <select
          :id="`${uid}-country`"
          class="cc-select"
          :value="countryId ?? ''"
          :disabled="loading || !countries.length"
          @change="onCountryChange"
        >
          <option value="" disabled>
            {{ loading ? 'Загрузка...' : 'Выберите страну' }}
          </option>
          <option v-for="c in countries" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>
        <span class="cc-chevron" aria-hidden="true">
          <svg viewBox="0 0 12 8" fill="none">
            <path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
    </div>

    <div class="cc-group">
      <label :for="`${uid}-city`" class="cc-label">Город</label>
      <div class="cc-select-wrap">
        <select
          :id="`${uid}-city`"
          class="cc-select"
          :value="cityId ?? ''"
          :disabled="loading || !availableCities.length"
          @change="onCityChange"
        >
          <option value="" disabled>
            {{ !countryId ? 'Сначала выберите страну' : availableCities.length ? 'Выберите город' : 'Нет городов' }}
          </option>
          <option v-for="city in availableCities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>
        <span class="cc-chevron" aria-hidden="true">
          <svg viewBox="0 0 12 8" fill="none">
            <path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Country } from '~/types/countries'

const props = withDefaults(defineProps<{
  countryId?: number | null
  cityId?: number | null
  countries?: Country[]
  loading?: boolean
}>(), {
  countryId: null,
  cityId: null,
  countries: () => [],
  loading: false,
})

const emit = defineEmits<{
  'update:countryId': [id: number | null]
  'update:cityId': [id: number | null]
}>()

const uid = useId()

const availableCities = computed(() => {
  if (!props.countryId) return []
  return props.countries.find(c => c.id === props.countryId)?.cities ?? []
})

function onCountryChange(e: Event) {
  const val = (e.target as HTMLSelectElement).value
  emit('update:countryId', val ? Number(val) : null)
  emit('update:cityId', null)
}

function onCityChange(e: Event) {
  const val = (e.target as HTMLSelectElement).value
  emit('update:cityId', val ? Number(val) : null)
}
</script>

<style scoped>
.country-city-root {
  display: contents;
}

.cc-group {
  margin-bottom: 20px;
}

.cc-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
}

.cc-select-wrap {
  position: relative;
}

.cc-select {
  width: 100%;
  padding: 14px 42px 14px 20px;
  border-radius: 16px;
  border: 1px solid #d0d0d0;
  background: #fff;
  font-size: 16px;
  font-family: inherit;
  color: #121212;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
}

.cc-select:focus {
  border-color: #e28133;
}

.cc-select:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.cc-chevron {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #888;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
}

.cc-chevron svg {
  width: 12px;
  height: 8px;
}
</style>
