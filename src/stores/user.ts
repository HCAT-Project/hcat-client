import { defineStore } from 'pinia'
import { authTokenApi, loginApi, logoutApi, registerApi } from '~/api'
import type { Profile } from '~/types'

interface LoginForm {
  user_id: string
  password: string
}

interface RegisterForm {
  user_id: string
  password: string
  username: string

  lang: string
}

export const useUserStore = defineStore('users', {
  state: () => ({
    userId: '',
    userProfile: {
      avatar: '',
      name: '',
      id: '',
      bio: 'NULL',
      status: '',
      is_friend: false,
    } as Profile,
  }),
  actions: {
    login(form: LoginForm) {
      return new Promise((resolve, reject) => {
        const { execute } = loginApi()
        execute({ data: form }).then((res) => {
          if (res.data.value.status === 'ok') {
            setCookie('user_id', form.user_id, 180)
            this.userId = form.user_id
            resolve(res.data.value)
          }
          else {
            reject(res.data.value.message)
          }
        })
      })
    },
    register(form: RegisterForm) {
      return new Promise((resolve, reject) => {
        const { execute } = registerApi()
        execute({ data: form }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    authToken() {
      return new Promise((resolve, reject) => {
        const { execute } = authTokenApi()
        execute().then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.status)
          else
            reject(res.data.value.message)
        })
      })
    },
    logout() {
      return new Promise((resolve, reject) => {
        const { execute } = logoutApi()
        execute().then((res) => {
          if (res.data.value.status === 'ok') {
            setCookie('user_id', '', -1)
            this.userId = ''
            resolve(res.data.value)
          }
          else {
            reject(res.data.value.message)
          }
        })
      })
    },
  },
  persist: {
    key: 'userStorage',
    storage: window.localStorage,
    // TODO: 图片不该存储在本地
    paths: ['userId'],
  },
})
