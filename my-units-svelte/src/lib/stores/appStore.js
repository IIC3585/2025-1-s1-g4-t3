import { writable } from 'svelte/store';
import { unitCategories } from '$lib/utils/unitsData.js';

export const selectedCategoryKey = writable(Object.keys(unitCategories)[0]); 

export const theme = writable('light'); 

export const conversionHistory = writable([]);

export function addToHistory(entry) {
    conversionHistory.update(currentHistory => {
        const newHistory = [entry, ...currentHistory];
        return newHistory.slice(0, 10);
    });
}