export type ChatType = 'friend' | 'group'
export type GroupPermission = 'owner' | 'admin' | 'guest'
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
  'admin_add',
  'owner_replaced',
  'question',
] as const
export type TodoType = typeof todoTypeList[number]

export interface ActiveChat {
  // TODO:check
  type: ChatType | null
  id: string
  permission?: GroupPermission
  setting?: GroupSetting
  members?: GroupMembers
}

export interface Message {
  group_id: string
  user_id: string
  msg: string
  time: string
}

export interface GroupSetting {
  answer: string
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

export interface GroupMembers {
  [key: string]: {
    permission: GroupPermission
  }
}

export interface Todo {
  type: TodoType
  rid?: string
  user_id?: string
  add_info?: string
  time?: string
  msg?: string
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
}
