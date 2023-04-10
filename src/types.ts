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

export interface ActiveChat {
  // TODO:check
  type?: ChatType
  id: string
  permission?: GroupPermission
  setting: GroupSetting
  members: GroupMember[]
}

export interface GroupSetting {
  answer: string
  question: string
  verification_method: GroupVerificationMethod
}

export interface GroupVerification {
  question: string
  verification_method: GroupVerificationMethod
}

export interface GroupList {
  [key: string]: Group
}

export interface Group {
  group_name: string
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

export interface Todo {
  type: TodoType
  rid?: string
  user_id?: string
  add_info?: string
  time?: number
  msg?: Msg
  friend_nick?: string
  friend_name?: string
  group_id?: string
  old_name?: string
  new_name?: string
  ban_time?: string
  old_owner?: string
  param_name?: string
  text?: string
  title?: string
  path?: string
  member_name?: string
  member_nick?: string
  name?: string
}

// 接收到的群消息接口
export type GroupMessage = Todo & {
  type: 'group_msg'
  group_id: string
  member_name: string
  member_nick: string
  msg: Msg
  rid: string
  time: number
  user_id: string
}

// 接收到的管理员变动接口
export type GroupAdminChange = Todo & {
  type: 'admin_added' | 'admin_removed'
  group_id: string
  name?: string
  admin_id?: string
  rid: string
  time: number
}

// 接收到的管理员变动接口
export type MemberRemoved = Todo & {
  type: 'member_removed'
  group_id: string
  member_id: string
  rid: string
  time: number
}

export type GroupJoinRequest = Todo & {
  type: 'group_join_request'
  add_info: string
  group_id: string
  rid: string
  time: number
  user_id: string
}
