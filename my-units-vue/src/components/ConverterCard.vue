<template>
  <div class="converter-card">
    <h3>{{ category?.name }}</h3>

    <div class="conversion-row">
      <div class="input-group">
        <label :for="`${categoryKey}-valA`">Valor:</label>
        <input
          :id="`${categoryKey}-valA`"
          type="number"
          v-model="valueA"
          @input="handleInputA"
          placeholder="Ingresa valor"
        />
      </div>
      <div class="input-group">
        <label :for="`${categoryKey}-unitA`">De:</label>
        <UnitSelector
          :units="units"
          v-model:selectedUnitKey="unitA_key"
          :id="`${categoryKey}-unitA`"
          @change="handleUnitAChange"
        />
      </div>
    </div>

    <button class="swap-button" @click="swapUnits" title="Intercambiar unidades y valores">⇅</button>

    <div class="conversion-row">
      <div class="input-group">
        <label :for="`${categoryKey}-valB`">Resultado:</label>
        <input
          :id="`${categoryKey}-valB`"
          type="number"
          v-model="valueB"
          placeholder="Resultado"
          readonly
        />
      </div>
      <div class="input-group">
        <label :for="`${categoryKey}-unitB`">A:</label>
        <UnitSelector
          :units="units"
          v-model:selectedUnitKey="unitB_key"
          :id="`${categoryKey}-unitB`"
          @change="handleUnitBChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { unitCategories } from '@/utils/unitsData';
import { convertUnit } from '@/utils/conversionUtils.js';
import UnitSelector from './UnitSelector.vue';
import { useHistoryStore } from '@/stores/useHistoryStore';

const props = defineProps({
  categoryKey: String,
});

const category = ref(null);
const unitKeys = ref([]);
const unitA_key = ref(null);
const unitB_key = ref(null);
const valueA = ref('');
const valueB = ref('');
const lastChanged = ref(null);
const units = ref(null);
const prevCategoryKey = ref(null);
const debounceTimer = ref(null);

const historyStore = useHistoryStore();

watch(
  () => props.categoryKey,
  (newKey, prevKey) => {
    if (newKey && newKey !== prevKey) {
      category.value = unitCategories[newKey];
      units.value = category.value.units;
      unitKeys.value = Object.keys(units.value);
      unitA_key.value = unitKeys.value[0];
      unitB_key.value = unitKeys.value.length > 1 ? unitKeys.value[1] : unitKeys.value[0];
      valueA.value = '';
      valueB.value = '';
      lastChanged.value = null;
      prevCategoryKey.value = newKey;
    }
  },
  { immediate: true }
);

watch([valueA, unitA_key, unitB_key], () => {
  if (lastChanged.value === 'A' && valueA.value !== '') {
    const r = convertUnit(valueA.value, unitA_key.value, unitB_key.value, props.categoryKey);
    valueB.value = typeof r === 'number' && !isNaN(r) && isFinite(r) ? r : '';
    recordConversion(valueA.value, unitA_key.value, valueB.value, unitB_key.value);
  } else if (valueA.value === '') {
    valueB.value = '';
  }
});

function handleInputA(e) {
  valueA.value = e.target.value;
  lastChanged.value = 'A';
  if (valueA.value === '') valueB.value = '';
}

function handleUnitAChange() {
  lastChanged.value = 'A';
}
function handleUnitBChange() {
  lastChanged.value = 'A';
}

function swapUnits() {
  if (valueA.value === '') {
    [unitA_key.value, unitB_key.value] = [unitB_key.value, unitA_key.value];
    return;
  }
  const originalValue = valueA.value;
  [unitA_key.value, unitB_key.value] = [unitB_key.value, unitA_key.value];
  const result = convertUnit(originalValue, unitA_key.value, unitB_key.value, props.categoryKey);
  valueB.value = typeof result === 'number' ? result : '';
  recordConversion(originalValue, unitA_key.value, valueB.value, unitB_key.value);
}

function recordConversion(valFrom, unitFromKey, valTo, unitToKey) {
  clearTimeout(debounceTimer.value);
  debounceTimer.value = setTimeout(() => {
  if (valFrom && unitFromKey && valTo && unitToKey && category) {
    historyStore.addToHistory({
    id: Date.now(),
    categoryName: category.name,
    from: `${valFrom} ${units.value[unitFromKey].symbol}`,
    to:   `${valTo}   ${units.value[unitToKey].symbol}`
    });
  }
  }, 500);
}
</script>

<style>
  .converter-card {
    background-color: var(--card-bg, white);
    border: 1px solid var(--border-color, #ddd);
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 10px var(--shadow-color, rgba(0,0,0,0.05));
  }
  h3 {
    margin-top: 0;
    color: var(--primary-color, #007bff);
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .conversion-row {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
    margin-bottom: 1rem;
  }
  .input-group {
    display: flex;
    flex-direction: column;
    flex: 1; 
  }
  label {
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
    color: var(--text-secondary-color, #555);
  }
  input[type="number"] {
    padding: 0.6rem;
    border: 1px solid var(--border-color, #ccc);
    border-radius: 4px;
    font-size: 1rem;
    width: 100%; 
    box-sizing: border-box; 
    background-color: var(--input-bg, white);
    color: var(--text-color, #333);
  }
  .swap-button {
    display: block;
    margin: 0.5rem auto 1rem;
    padding: 0.5rem;
    font-size: 1.5rem; 
    background-color: var(--secondary-color, #6c757d);
    color: white;
    border: none;
    border-radius: 50%; 
    width: 40px;
    height: 40px;
    line-height: 1; 
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }
  .swap-button:hover {
    transform: rotate(180deg);
    background-color: var(--secondary-hover-color, #5a6268);
  }

  @media (max-width: 600px) {
    .conversion-row {
      flex-direction: column;
      align-items: stretch; 
    }
    .input-group {
      margin-bottom: 0.8rem; 
    }
    .input-group:last-child {
      margin-bottom: 0;
    }
    select {
      width: 100%; 
    }
  }
</style>