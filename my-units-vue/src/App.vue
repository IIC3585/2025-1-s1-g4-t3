<template>
  <div class="app" :class="themeClass">
    <Header />

    <main>
      <div class="category-selector">
        <label for="category-select">Selecciona una categoría:</label>
        <select id="category-select" v-model="selectedCategoryKey">
          <option
            v-for="([key, catData], index) in categoryArray"
            :key="index"
            :value="key"
          >
            {{ catData.name }}
          </option>
        </select>
      </div>
      <ConverterCard :categoryKey="selectedCategoryKey" :key="selectedCategoryKey" />
      <HistoryDisplay />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Header from './components/Header.vue';
import ConverterCard from './components/ConverterCard.vue';
import HistoryDisplay from './components/HistoryDisplay.vue';
import { units } from './utils/unitsData.js';
import { theme } from './stores/appStore.js';

const categoryArray = Object.entries(units);

const selectedCategoryKey = ref(categoryArray[0][0]);

const themeClass = computed(() => (theme.value === 'dark' ? 'dark-mode' : ''));
</script>

<style scoped>
@import './assets/styles.css'; /* Puedes dejar los estilos globales aquí o en otro archivo */
</style>