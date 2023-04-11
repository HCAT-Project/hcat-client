<script setup lang="ts">
import { useStore } from '~/stores/store'

const store = useStore()
let inputMessage = $ref('')

async function fetchMessage() {
  await store.getTodoList()
}

async function sendMessage() {
  if (inputMessage.trim() === '')
    return

  if (store.activeChat.type === 'group') {
    const msg = {
      msg_chain: [{ type: 'text', msg: inputMessage }],
    }
    const form = {
      group_id: store.activeChat.id,
      msg: JSON.stringify(msg),
    }
    await store.sendGroupMsg(form).then((res: any) => {
      const user_id = getCookie('user_id')!
      store.groupMessages[store.activeChat.id] = [
        ...store.groupMessages[store.activeChat.id] ?? [],
        {
          type: 'group_msg',
          group_id: store.activeChat.id,
          user_id,
          member_name: user_id,
          member_nick: '',
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
  // TODO: 好友消息
}
</script>

<template>
  <div flex items-center m="y5" gap-3 text="text-secondary">
    <button :disabled="store.activeChat.type === null">
      <div i-carbon-attachment />
    </button>
    <input v-model="inputMessage" :disabled="store.activeChat.type === null" placeholder="说点什么吧" flex-1 bg-transparent outline-none @keydown.enter="sendMessage">
    <button active="-rotate-180" transition-all @click="fetchMessage">
      <div i-carbon-rotate-360 />
    </button>
  </div>
</template>
