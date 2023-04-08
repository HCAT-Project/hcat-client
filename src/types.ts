export type chatType = 'friend' | 'group'
export type groupPermission = 'owner' | 'admin' | 'guest'
export type groupVerificationMethod = 'ac' | 'fr' | 'na' | 'aw'

export interface ActiveChat {
  type: chatType | null
  id: string
  permission?: groupPermission
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
  verification_method: groupVerificationMethod
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
    permission: groupPermission
  }
}
