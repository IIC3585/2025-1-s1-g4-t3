<template>
  <div class="history-panel" v-if="historyStore.conversionHistory.length">
    <h4>Historial reciente</h4>
    <ul>
      <li v-for="(entry, index) in historyStore.conversionHistory" :key="index">
        {{ entry.value }} {{ entry.from }} = {{ entry.result }} {{ entry.to }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useHistoryStore } from '@/stores/useHistoryStore';
const historyStore = useHistoryStore();

const props = defineProps({
  history: {
    type: Array,
    default: () => [],
  },
});



</script>

<style scoped>
    .history-panel {
        margin-top: 2rem;
        padding: 1rem;
        background-color: var(--card-alt-bg, #f9f9f9);
        border: 1px solid var(--border-color, #eee);
        border-radius: 8px;
    }
    h4 {
        margin-top: 0;
        color: var(--text-secondary-color, #555);
    }
    ul {
        list-style-type: none;
        padding-left: 0;
        max-height: 200px; 
        overflow-y: auto;
    }
    li {
        padding: 0.3rem 0;
        font-size: 0.9rem;
        color: var(--text-color, #333);
        border-bottom: 1px dashed var(--border-light-color, #f0f0f0);
    }
    li:last-child {
        border-bottom: none;
    }
    li span {
        font-weight: bold;
        color: var(--primary-color, #007bff);
    }
</style>