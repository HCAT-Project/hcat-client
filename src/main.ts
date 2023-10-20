import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { useUserStore } from './stores/user'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
const userStore = useUserStore()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    await userStore.authToken().then(() => {
      next()
    }).catch((_) => {
      next({ name: 'login' })
    })
  }
  else {
    await userStore.authToken().then(() => {
      next({ name: 'index' })
    }).catch((_) => {
      next()
    })
  }
})
app.use(router)

app.mount('#app')
