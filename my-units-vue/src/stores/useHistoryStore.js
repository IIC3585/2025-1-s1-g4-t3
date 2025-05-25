import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('history', {
    state: () => ({
        conversionHistory: []
    }),

    actions: {
        addToHistory(entry) {
            this.conversionHistory = [entry, ...this.conversionHistory].slice(0, 10)
        },
    }
})
