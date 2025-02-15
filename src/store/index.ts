import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
    state: () => ({
        isMenuCollapse: false
    }),
    actions: {
        toggleMenu() {
            this.isMenuCollapse = !this.isMenuCollapse
        }
    }
})
