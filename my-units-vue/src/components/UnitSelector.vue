<template>
  <select :value="selectedUnitKey" @change="$emit('update:selectedUnitKey', $event.target.value)">
    <option v-for="(label, key) in units" :key="key" :value="key">
      {{ label.name }} ({{ label.symbol }})
    </option>
  </select>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  units: Object,
  id: String,
  selectedUnitKey: String,
});

</script>