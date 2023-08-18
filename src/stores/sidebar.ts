import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    show: false,
  }),
  actions: {
    showSidebar(message: string) {
      this.show = true
    },
    hideSidebar() {
      this.show = false
    },
  },
})
