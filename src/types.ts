export type chatType = 'friend' | 'group'

export interface ActiveChat {
  type: chatType | null
  id: string
}

export interface Message {
  group_id: string
  user_id: string
  msg: string
  time: string
}
