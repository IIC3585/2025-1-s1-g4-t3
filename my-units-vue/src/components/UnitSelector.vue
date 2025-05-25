<template>
  <select :value="selectedUnit" @change="$emit('update:unit', $event.target.value)">
    <option v-for="(label, key) in units" :key="key" :value="key">{{ label }}</option>
  </select>
</template>

<script setup>
import { defineProps } from 'vue';
import { units } from '../utils/unitsData';

defineProps({
  selectedUnit: String
});
</script>