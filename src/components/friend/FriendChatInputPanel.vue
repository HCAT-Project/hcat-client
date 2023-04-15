<script setup lang="ts">
import { useStore } from '~/stores/store'

const props = defineProps<{
  id: string
}>()

const store = useStore()
let inputMessage = $ref('')

async function fetchMessage() {
  await store.getTodoList()
}

async function sendMessage() {
  if (inputMessage.trim() === '')
    return

  const msg = {
    msg_chain: [{ type: 'text', msg: inputMessage }],
  }

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
        friend_name: user_id,
        friend_nick: '',
        rid: '',
        msg,
        time: Date.now() / 1000,
      },
    ]
    inputMessage = ''
  },
  ).catch((err) => {
    alert(err)
  })
}
</script>

<template>
  <div flex items-center m="y5" gap-3 text="text-secondary">
    <button>
      <div i-carbon-attachment />
    </button>
    <input v-model="inputMessage" placeholder="说点什么吧" flex-1 bg-transparent outline-none @keydown.enter="sendMessage">
    <button active="-rotate-180" transition-all @click="fetchMessage">
      <div i-carbon-rotate-360 />
    </button>
  </div>
</template>
