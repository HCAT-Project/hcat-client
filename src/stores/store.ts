import { defineStore } from 'pinia'
import { addAdminApi, agreeJoinGroupReqApi, authTokenApi, changeGroupSettingApi, createGroupApi, getGroupListApi, getGroupMembersApi, getGroupNameApi, getGroupSettingApi, getGroupVerificationApi, getSelfPmsInGroupApi, getTodoListApi, joinGroupApi, kickMemberApi, leaveGroupApi, loginApi, logoutApi, registerApi, removeAdminApi, renameGroupApi, sendGroupMsgApi, transferOwnershipApi } from '~/api'
import { setCookie } from '~/composables'
import type { ActiveChat, Group, GroupList, GroupMembers, GroupMessage, GroupSetting, GroupVerification, Todo } from '~/types'

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

interface GroupSettingForm {
  group_id: string
  setting: string
}

interface GroupMessages {
  [key: string]: GroupMessage[]
}
// type status = 'ok' | 'null'

// interface basicResponse {
//   message: string
//   status: status
// }

export const useStore = defineStore('stores', {
  state: () => ({
    activeChat: {
      id: '',
      members: [],
      setting: {} as GroupSetting,
    } as ActiveChat,
    groupList: {
    } as GroupList,
    activeTab: -1,
    gpNotificationList: [] as any[],
    groupMessages: {
    } as GroupMessages,
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
            resolve(res.data.value.status)
          else
            reject(res.data.value.message)
        })
      })
    },
    getGroupList() {
      return new Promise((resolve: (value: Group) => void, reject) => {
        const { execute } = getGroupListApi()
        execute().then((res) => {
          if (res.data.value.status === 'ok') {
            this.groupList = res.data.value.data
            resolve(res.data.value.data)
          }
          else { reject(res.data.value.message) }
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
      return new Promise((resolve: (value: GroupVerification) => void, reject) => {
        const { execute } = getGroupVerificationApi()
        execute({ data: { group_id: groupId } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.data)
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
    getSelfPmsInGroup() {
      return new Promise((resolve, reject) => {
        const { execute } = getSelfPmsInGroupApi()
        execute({ data: { group_id: this.activeChat.id } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.data)
          else
            reject(res.data.value.message)
        })
      })
    },
    getGroupSetting() {
      return new Promise((resolve: (value: GroupSetting) => void, reject) => {
        const { execute } = getGroupSettingApi()
        execute({ data: { group_id: this.activeChat.id } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.data as GroupSetting)
          else
            reject(res.data.value.message)
        })
      })
    },
    changeGroupSetting(form: GroupSettingForm) {
      return new Promise((resolve, reject) => {
        const { execute } = changeGroupSettingApi()
        execute({ data: form }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    getGroupMembers() {
      return new Promise((resolve: (value: GroupMembers) => void, reject) => {
        const { execute } = getGroupMembersApi()
        execute({ data: { group_id: this.activeChat.id } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.data)
          else
            reject(res.data.value.message)
        })
      })
    },
    getGroupName(groupId: string) {
      return new Promise((resolve: (value: string) => void, reject) => {
        const { execute } = getGroupNameApi()
        execute({ data: { group_id: groupId } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.group_name)
          else
            reject(res.data.value.message)
        })
      })
    },
    leaveGroup(groupId: string) {
      return new Promise((resolve, reject) => {
        const { execute } = leaveGroupApi()
        execute({ data: { group_id: groupId } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    addAdmin(member_id: string) {
      return new Promise((resolve, reject) => {
        const { execute } = addAdminApi()
        execute({ data: { group_id: this.activeChat.id, member_id } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    removeAdmin(admin_id: string) {
      return new Promise((resolve, reject) => {
        const { execute } = removeAdminApi()
        execute({ data: { group_id: this.activeChat.id, admin_id } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    // TODO: 未完成
    getTodoList() {
      return new Promise((resolve: (value: Todo[]) => void, reject) => {
        const { execute } = getTodoListApi()
        execute().then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.data)
          else
            reject(res.data.value.message)
        })
      })
    },
    agreeJoinGroupReq(rid: string) {
      return new Promise((resolve, reject) => {
        const { execute } = agreeJoinGroupReqApi()
        execute({ data: { rid } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    kickMember(member_id: string) {
      return new Promise((resolve, reject) => {
        const { execute } = kickMemberApi()
        execute({ data: { group_id: this.activeChat.id, member_id } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    transferOwnership(member_id: string) {
      return new Promise((resolve, reject) => {
        const { execute } = transferOwnershipApi()
        execute({ data: { group_id: this.activeChat.id, member_id } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    renameGroup(group_name: string) {
      return new Promise((resolve, reject) => {
        const { execute } = renameGroupApi()
        execute({ data: { group_id: this.activeChat.id, group_name } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    addGroupNotification(todo: Todo) {
      this.gpNotificationList.unshift(todo)
    },
    removeGroupNotification(rid: string) {
      this.gpNotificationList = this.gpNotificationList.filter(item => item.rid !== rid)
    },
    clearMessageStorage() {
      this.groupMessages = {}
    },

  },
  getters: {},
  persist: {
    key: 'defaultStore',
    storage: window.localStorage,
    paths: ['gpNotificationList', 'groupMessages'],
  },
})
