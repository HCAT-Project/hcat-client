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
  if (!store.groupList[props.id])
    router.replace('/groups')
}, { immediate: true })

async function sendMessage(msg: Msg) {
  const form = {
    group_id: props.id,
    msg: JSON.stringify(msg),
  }
  await store.sendGroupMsg(form).then((res: any) => {
    const user_id = userStore.userId
    store.groupMessages[props.id] = [
      ...store.groupMessages[props.id] ?? [],
      {
        type: 'group_msg',
        group_id: props.id,
        user_id,
        member_name: user_id,
        member_nick: '我',
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
      <ChatHead :id="id" type="group" />
      <GroupChatContent :id="id" />
      <ChatInputPanel :id="id" @send="sendMessage" />
    </div>
    <GroupSettings :id="id" />
  </div>
</template>
