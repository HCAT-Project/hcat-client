export type chatType = 'friend' | 'group'
export type groupPermission = 'owner' | 'admin' | 'guest'
export type groupVerificationMethod = 'ac' | 'fr' | 'na' | 'aw'

export interface ActiveChat {
  type: chatType | null
  id: string
  permission?: groupPermission
  setting?: GroupSetting
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
