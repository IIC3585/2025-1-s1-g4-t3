<template>
  <div class="history-display">
    <h2>History</h2>
    <ul>
      <li v-for="(entry, index) in history" :key="index">
        {{ entry.value }} {{ entry.from }} = {{ entry.result }} {{ entry.to }}
      </li>
    </ul>
  </div>
</template>

<script setup>
//import { useAppStore } from '../stores/appStore';

//const store = useAppStore();
//const history = store.history;
</script>

<style scoped>
.history-display {
  max-width: 400px;
  margin: 1rem auto;
  padding: 1rem;
  border-top: 1px solid #ccc;
}
</style>