import { ref } from 'vue';

export const theme = ref('light');

export function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}