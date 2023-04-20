<script setup lang="ts">
import { useStore } from '~/stores/store.js'
import type { Msg } from '~/types'

const props = defineProps<{
  id: string
}>()

const store = useStore()
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
    const user_id = getCookie('user_id')!
    store.groupMessages[props.id] = [
      ...store.groupMessages[props.id] ?? [],
      {
        type: 'group_msg',
        group_id: props.id,
        user_id,
        member_name: user_id,
        member_nick: '',
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
    <div flex-1 flex="~ col" p="t5" rounded="r-2xl" bg-back-gray of-hidden>
      <GroupChatHead :id="id" />
      <GroupChatContent :id="id" />
      <ChatInputPanel :id="id" @send="sendMessage" />
    </div>
    <GroupSettings :id="id" />
  </div>
</template>
