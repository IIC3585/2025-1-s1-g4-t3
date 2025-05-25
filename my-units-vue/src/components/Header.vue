<template>
  <header>
    <h1>MyUnits 📐⚖️🌡️</h1>
    <button @click="toggleTheme">
      Modo {{ theme === 'light' ? '🌙' : '☀️' }}
    </button>
  </header>
</template>

<script setup>
import { theme, toggleTheme } from '../stores/appStore';
</script>

<style>
header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: var(--header-bg, #f0f0f0);
        color: var(--header-text, #333);
        border-bottom: 1px solid var(--border-color, #ddd);
    }
    h1 {
        margin: 0;
        font-size: 1.8rem;
    }
    button {
        background: var(--button-bg, #e0e0e0);
        color: var(--button-text, #333);
        border: 1px solid var(--border-color, #ccc);
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
    }
    button:hover {
        background: var(--button-hover-bg, #d0d0d0);
    }
</style>
