import { defineStore } from 'pinia'

type ToastState = 'info' | 'success' | 'error'

export const useToastStore = defineStore('toast', {
  state: () => ({
    show: false,
    message: '',
    type: 'info' as ToastState,
    description: '',
  }),
  actions: {
    showToast(message: string, type: ToastState, description?: string) {
      this.show = true
      this.message = message
      this.type = type
      setTimeout (() => {
        this.show = false
      }, 1500)
    },
    hideToast() {
      this.show = false
    },
  },
})
