<script setup lang="ts">
import { useStore, useToastStore, useUserStore } from '~/stores'
import type { Msg } from '~/types'

const props = defineProps<{
  id: string
}>()

const store = useStore()
const userStore = useUserStore()
const toastStore = useToastStore()
const router = useRouter()

watch(() => props.id, async () => {
  for (const item of store.friendList) {
    if (item === props.id)
      return
  }
  router.replace('/friends')
}, { immediate: true })

async function sendMessage(msg: Msg) {
  const form = {
    friend_id: props.id,
    msg: JSON.stringify(msg),
  }
  await store.sendFriendMessage(form).then((res: any) => {
    const user_id = userStore.userId
    const friend_name = userStore.userProfile.name
    store.friendMessages[props.id] = [
      ...store.friendMessages[props.id] ?? [],
      {
        type: 'friend_msg',
        friend_id: props.id,
        user_id,
        friend_name,
        friend_nick: '',
        rid: '',
        msg,
        time: Date.now() / 1000,
      },
    ]
    store.saveUnReadMsg(props.id, msg.msg_chain[0])
  },
  ).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}
</script>

<template>
  <div flex>
    <div flex-1 flex="~ col" p="t5" rounded="r-2xl" bg-back-gray of-hidden>
      <ChatHead :id="id" type="friend" :name="store.groupList.find(item => item.id === id)?.groupName!" />
      <FriendChatContent :id="id" />
      <ChatInputPanel :id="id" @send="sendMessage" />
    </div>
    <FriendSetting :id="id" />
  </div>
</template>
