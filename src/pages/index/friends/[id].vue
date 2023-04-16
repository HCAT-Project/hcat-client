<script setup lang="ts">
import { useStore } from '~/stores/store'
import type { Msg } from '~/types'

const props = defineProps<{
  id: string
}>()

const store = useStore()
const router = useRouter()

watch(() => props.id, async () => {
  if (!Object.values(store.friendList).includes(props.id))
    router.replace('/friends')
}, { immediate: true })

async function sendMessage(msg: Msg) {
  const form = {
    friend_id: props.id,
    msg: JSON.stringify(msg),
  }
  await store.sendFriendMessage(form).then((res: any) => {
    const user_id = getCookie('user_id')!
    store.friendMessages[props.id] = [
      ...store.friendMessages[props.id] ?? [],
      {
        type: 'friend_msg',
        friend_id: props.id,
        user_id,
        friend_name: props.id,
        friend_nick: '',
        rid: '',
        msg,
        time: Date.now() / 1000,
      },
    ]
  },
  ).catch((err) => {
    alert(err)
  })
}
</script>

<template>
  <div flex>
    <div flex-1 flex="~ col" p="x8 t5" rounded="r-2xl" bg-back-gray of-hidden>
      <FriendChatHead :id="id" />
      <FriendChatContent :id="id" />
      <ChatInputPanel :id="id" @send="sendMessage" />
    </div>
    <FriendSetting :id="id" />
  </div>
</template>
