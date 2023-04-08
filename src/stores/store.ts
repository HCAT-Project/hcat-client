import { defineStore } from 'pinia'
import { authTokenApi, createGroupApi, getGroupListApi, getGroupVerificationApi, joinGroupApi, loginApi, logoutApi, registerApi, sendGroupMsgApi } from '~/api'
import { setCookie } from '~/composables'

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

interface GroupMsgForm {
  group_id: string
  msg: string
}

interface JoinGroupForm {
  group_id: string
  add_info: string
}

// type status = 'ok' | 'null'

// interface basicResponse {
//   message: string
//   status: status
// }

export const useStore = defineStore('stores', {
  state: () => ({

  }),
  actions: {
    login(form: LoginForm) {
      return new Promise((resolve, reject) => {
        const { execute } = loginApi()
        execute({ data: form }).then((res) => {
          if (res.data.value.status === 'ok') {
            setCookie('user_id', form.user_id, 180)
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
    logout() {
      return new Promise((resolve, reject) => {
        const { execute } = logoutApi()
        execute().then((res) => {
          if (res.data.value.status === 'ok') {
            setCookie('user_id', '', -1)
            resolve(res.data.value)
          }
          else {
            reject(res.data.value.message)
          }
        })
      })
    },
    sendGroupMsg(form: GroupMsgForm) {
      return new Promise((resolve, reject) => {
        const { execute } = sendGroupMsgApi()
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
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    getGroupList() {
      return new Promise((resolve, reject) => {
        const { execute } = getGroupListApi()
        execute().then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.data)
          else
            reject(res.data.value.message)
        })
      })
    },
    createGroup(groupName: string) {
      return new Promise((resolve, reject) => {
        const { execute } = createGroupApi()
        execute({ data: { group_name: groupName } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    getGroupVerification(groupId: string) {
      return new Promise((resolve, reject) => {
        const { execute } = getGroupVerificationApi()
        execute({ data: { group_id: groupId } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.data.verification_method)
          else
            reject(res.data.value.message)
        })
      })
    },
    joinGroup(form: JoinGroupForm) {
      return new Promise((resolve, reject) => {
        const { execute } = joinGroupApi()
        execute({ data: form }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
  },
  getters: {},
})
