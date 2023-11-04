import { defineStore } from 'pinia'
import { addAdminApi, agreeJoinGroupReqApi, changeGroupSettingApi, checkFileAPi, createGroupApi, getAvatarUrlApi, getGroupListApi, getGroupMembersApi, getGroupNameApi, getGroupSettingApi, getGroupVerificationApi, getProfileApi, getSelfPmsInGroupApi, getTodoListApi, joinGroupApi, kickMemberApi, leaveGroupApi, removeAdminApi, renameGroupApi, sendGroupMsgApi, transferOwnershipApi, updateProfileApi, uploadFileApi } from '~/api'
import { addFriendApi, agreeFriendReqApi, deleteFriendApi, getFriendListApi, sendFriendMsgApi } from '~/api/friend'
import type { FriendMessage, FriendNotification, Group, GroupMember, GroupMessage, GroupNotification, GroupPermission, GroupSetting, GroupVerification, MsgChain, Profile, Todo, UpdateProfile } from '~/types'

interface GroupMsgForm {
  group_id: string
  msg: string
}

interface FriendMsgForm {
  friend_id: string
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
interface FriendMessages {
  [key: string]: FriendMessage[]
}
interface UnReadMsgs {
  [key: string]: UnReadMsg
}

interface UnReadMsg {
  number: number
  lastMsg: string
}

export const useStore = defineStore('stores', {
  state: () => ({
    groupList: [] as Group[],
    friendList: [] as string[],
    activeTab: -1,
    gpNotificationList: [] as GroupNotification[],
    fdNotificationList: [] as FriendNotification[],
    groupMessages: {
    } as GroupMessages,
    friendMessages: {
    } as FriendMessages,
    hasNewFRNotify: false,
    hasNewGPNotify: false,
    unReadMsg: {} as UnReadMsgs,
  }),
  actions: {

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
    getGroupList() {
      return new Promise((resolve: (value: Group[]) => void, reject) => {
        const { execute } = getGroupListApi()
        execute().then((res) => {
          if (res.data.value.status === 'ok') {
            const { data } = res.data.value
            this.groupList = data
            resolve(data)
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
    getSelfPmsInGroup(group_id: string) {
      return new Promise((resolve: (value: GroupPermission) => void, reject) => {
        const { execute } = getSelfPmsInGroupApi()
        execute({ data: { group_id } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.data)
          else reject(res.data.value.message)
        })
      })
    },
    getGroupSetting(group_id: string) {
      return new Promise((resolve: (value: GroupSetting) => void, reject) => {
        const { execute } = getGroupSettingApi()
        execute({ data: { group_id } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.data)
          else reject(res.data.value.message)
        })
      })
    },
    changeGroupSetting(form: GroupSettingForm) {
      return new Promise((resolve, reject) => {
        const { execute } = changeGroupSettingApi()
        execute({ data: form }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)

          else reject(res.data.value.message)
        })
      })
    },
    getGroupMembers(group_id: string) {
      return new Promise((resolve: (value: GroupMember[]) => void, reject) => {
        const { execute } = getGroupMembersApi()
        execute({ data: { group_id } }).then((res) => {
          if (res.data.value.status === 'ok') {
            const groupMembers = res.data.value.data as GroupMember[]
            resolve(groupMembers)
          }

          else { reject(res.data.value.message) }
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
    addAdmin(group_id: string, member_id: string) {
      return new Promise((resolve, reject) => {
        const { execute } = addAdminApi()
        execute({ data: { group_id, member_id } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    removeAdmin(group_id: string, admin_id: string) {
      return new Promise((resolve, reject) => {
        const { execute } = removeAdminApi()
        execute({ data: { group_id, admin_id } }).then((res) => {
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
          if (res.data.value.status === 'ok') {
            const data = res.data.value.data as Todo[]
            data.forEach((item) => {
              switch (item.type) {
                case 'group_msg':
                  this.groupMessages[item.group_id].push(item)
                  this.saveUnReadMsg(item.group_id, item.msg.msg_chain[0])
                  break
                case 'friend_msg':
                  this.friendMessages[item.friend_id] = [
                    ...this.friendMessages[item.friend_id] ?? [],
                    item,
                  ]
                  this.saveUnReadMsg(item.friend_id, item.msg.msg_chain[0])
                  break
                case 'friend_request':
                  this.hasNewFRNotify = true
                  this.addFriendNotification(item)
                  break
                case 'group_join_request':
                case 'admin_added':
                case 'admin_removed':
                case 'member_removed':
                  this.hasNewGPNotify = true
                  this.addGroupNotification(item)
                  break
              }
            })
            resolve(data)
          }
          else { reject(res.data.value.message) }
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
    kickMember(group_id: string, member_id: string) {
      return new Promise((resolve, reject) => {
        const { execute } = kickMemberApi()
        execute({ data: { group_id, member_id } }).then(async (res) => {
          if (res.data.value.status === 'ok') {
            await this.getGroupMembers(group_id)
            resolve(res.data.value)
          }
          else { reject(res.data.value.message) }
        })
      })
    },
    transferOwnership(group_id: string, member_id: string) {
      return new Promise((resolve, reject) => {
        const { execute } = transferOwnershipApi()
        execute({ data: { group_id, member_id } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    renameGroup(group_id: string, group_name: string) {
      return new Promise((resolve, reject) => {
        const { execute } = renameGroupApi()
        execute({ data: { group_id, group_name } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    addFriend(user_id: string, add_info: string) {
      return new Promise((resolve, reject) => {
        const { execute } = addFriendApi()
        execute({ data: { user_id, add_info } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)

          else reject(res.data.value.message)
        })
      })
    },
    agreeFriendReq(rid: string) {
      return new Promise((resolve, reject) => {
        const { execute } = agreeFriendReqApi()
        execute({ data: { rid } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    getFriendList() {
      return new Promise((resolve, reject) => {
        const { execute } = getFriendListApi()
        execute().then((res) => {
          if (res.data.value.status === 'ok') {
            this.friendList = res.data.value.data as string[]
            resolve(res.data.value.data)
          }
          else { reject(res.data.value.message) }
        })
      })
    },
    sendFriendMessage(form: FriendMsgForm) {
      return new Promise((resolve, reject) => {
        const { execute } = sendFriendMsgApi()
        execute({ data: form }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value)
          else
            reject(res.data.value.message)
        })
      })
    },
    deleteFriend(friend_id: string) {
      return new Promise((resolve, reject) => {
        const { execute } = deleteFriendApi()
        execute({ data: { friend_id } }).then(async (res) => {
          if (res.data.value.status === 'ok') {
            await this.getFriendList()
            resolve(res.data.value)
          }
          else { reject(res.data.value.message) }
        })
      })
    },
    getAvatarUrl(user_id: string) {
      return new Promise((resolve, reject) => {
        const { execute } = getAvatarUrlApi()
        execute({ data: { user_id } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.data)
          else reject(res.data.value.message)
        })
      })
    },
    getProfile(user_id: string) {
      return new Promise((resolve: (value: Profile) => void, reject) => {
        const { execute } = getProfileApi()
        execute({ data: { user_id } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.data)
          else
            reject(res.data.value.message)
        })
      })
    },
    updateProfile(profile: UpdateProfile) {
      return new Promise((resolve, reject) => {
        const { execute } = updateProfileApi()
        const profileStr = JSON.stringify(profile)
        execute({ data: { profile: profileStr } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.data)
          else
            reject(res.data.value.message)
        })
      })
    },
    checkFile(sha1: string) {
      return new Promise((resolve, reject) => {
        const { execute } = checkFileAPi()
        execute({ data: { sha1 } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.data)
          else
            reject(res.data.value.message)
        })
      })
    },
    uploadFile(file: File) {
      return new Promise((resolve, reject) => {
        const { execute } = uploadFileApi()
        execute({ data: { file }, headers: {
          'Content-Type': 'multipart/form-data',
        } }).then((res) => {
          if (res.data.value.status === 'ok')
            resolve(res.data.value.data)
          else
            reject(res.data.value.message)
        })
      })
    },
    addGroupNotification(notification: GroupNotification) {
      this.gpNotificationList.unshift(notification)
    },
    addFriendNotification(notification: FriendNotification) {
      this.fdNotificationList.unshift(notification)
    },
    removeGroupNotification(rid: string) {
      this.gpNotificationList = this.gpNotificationList.filter(item => item.rid !== rid)
    },
    removeFriendNotification(rid: string) {
      this.fdNotificationList = this.fdNotificationList.filter(item => item.rid !== rid)
    },
    clearGroupNotification() {
      this.gpNotificationList = []
    },
    clearFriendNotification() {
      this.fdNotificationList = []
    },
    clearGroupMessages(group_id: string) {
      this.groupMessages[group_id] = []
      this.cleanUnReadMsg(group_id)
    },
    clearFriendMessages(friend_id: string) {
      this.friendMessages[friend_id] = []
      this.cleanUnReadMsg(friend_id)
    },
    clearStorage() {
      this.groupMessages = {}
      this.friendMessages = {}
      this.gpNotificationList = []
      this.fdNotificationList = []
      this.groupList = []
      this.friendList = []
    },
    saveUnReadMsg(conversationId: string, msg: MsgChain) {
      const isText = msg.type === 'text'
      const lastMsg = isText ? msg.msg : '[图片]'

      if (conversationId in this.unReadMsg) {
        this.unReadMsg[conversationId].number += 1
        this.unReadMsg[conversationId].lastMsg = lastMsg
      }
      else {
        this.unReadMsg[conversationId] = {
          number: 1,
          lastMsg,
        }
      }
    },
    cleanUnReadMsg(conversationId: string) {
      if (conversationId in this.unReadMsg) {
        this.unReadMsg[conversationId] = {
          number: 0,
          lastMsg: '',
        }
      }
    },
  },
  getters: {
    hasNewNotify(state) {
      return state.hasNewFRNotify || state.hasNewGPNotify
    },
  },
  persist: {
    key: 'defaultStorage',
    storage: window.localStorage,
    // TODO: 图片不该存储在本地
    paths: ['gpNotificationList', 'fdNotificationList', 'friendList', 'groupList', 'friendMessages', 'groupMessages'],
  },
})
