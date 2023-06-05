export type ChatType = 'friend' | 'group'
export type GroupPermission = 'owner' | 'admin' | 'member'
export type GroupVerificationMethod = 'ac' | 'fr' | 'na' | 'aw'
const todoTypeList = [
  'friend_request',
  'group_join_request',
  'friend_msg',
  'group_msg',
  'friend_agree',
  'friend_deleted',
  'group_agree',
  'group_deleted',
  'group_rename',
  'banned',
  'admin_removed',
  'admin_added',
  'owner_replaced',
  'question',
  'member_removed',
] as const
export type TodoType = typeof todoTypeList[number]

export interface GroupSetting {
  answer: string
  question: string
  verification_method: GroupVerificationMethod
}

export interface GroupVerification {
  question: string
  verification_method: GroupVerificationMethod
}

export interface Group {
  id: string
  groupName: string
  nick: string
  remark: string
}

// api返回的群列表接口
export interface GroupMembers {
  [key: string]: {
    permission: GroupPermission
  }
}

export interface GroupMember {
  user_id: string
  permission: GroupPermission
}

export interface Msg {
  msg_chain: MsgChain[]
}

export interface MsgChain {
  msg: string
  type: string
}

// export interface Todo {
//   type: TodoType
//   rid?: string
//   user_id?: string
//   add_info?: string
//   time?: number
//   msg?: Msg
//   friend_nick?: string
//   friend_name?: string
//   group_id?: string
//   old_name?: string
//   new_name?: string
//   ban_time?: string
//   old_owner?: string
//   param_name?: string
//   text?: string
//   title?: string
//   path?: string
//   member_name?: string
//   member_nick?: string
//   name?: string
// }

export type Todo = GroupMessage | GroupJoinRequest | GroupAdminChange | MemberRemoved | FriendRequest | FriendMessage
export type GroupNotification = GroupJoinRequest | GroupAdminChange | MemberRemoved
export type FriendNotification = FriendRequest

// 接收到的群消息接口
export interface GroupMessage {
  type: 'group_msg'
  group_id: string
  member_name: string
  member_nick: string
  msg: Msg
  rid: string
  time: number
  user_id: string
}

// 加入群聊的请求接口
export interface GroupJoinRequest {
  type: 'group_join_request'
  add_info: string
  group_id: string
  rid: string
  time: number
  user_id: string
}

// 接收到的管理员变动接口
export interface GroupAdminChange {
  type: 'admin_added' | 'admin_removed'
  group_id: string
  name?: string
  admin_id?: string
  rid: string
  time: number
}

// 接收到的管理员变动接口
export interface MemberRemoved {
  type: 'member_removed'
  group_id: string
  member_id: string
  rid: string
  time: number
}

export interface FriendRequest {
  type: 'friend_request'
  add_info: string
  req_user_id: string
  rid: string
  time: number
  user_id: string
}

export interface FriendMessage {
  type: 'friend_msg'
  friend_id: string
  friend_name: string
  friend_nick: string
  msg: Msg
  rid: string
  time: number
  user_id: string
}
