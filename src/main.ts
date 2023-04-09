import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { useStore } from './stores/store'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
const store = useStore()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    await store.authToken().then((res) => {
      next()
    }).catch((_) => {
      next({ name: 'login' })
    })
  }
  else {
    await store.authToken().then((res) => {
      next({ name: 'index' })
    }).catch((_) => {
      next()
    })
  }
})
app.use(router)

app.mount('#app')
