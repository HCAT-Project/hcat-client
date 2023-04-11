<script setup lang="ts">
import { useStore } from '~/stores/store.js'
import type { ChatType } from '~/types'

const props = defineProps<{
  id: string
}>()

const store = useStore()
const router = useRouter()

watch(() => props.id, async () => {
  if (!store.groupList[props.id]) {
    router.replace('/groups')
    return
  }
  await changeActiveChat('group', props.id)
}, { immediate: true })

async function changeActiveChat(type: ChatType, id: string) {
  // TODO:区分群聊和私聊
  store.activeChat.type = type
  store.activeChat.id = id
  const requestList = [store.getSelfPmsInGroup(), store.getGroupSetting(), store.getGroupMembers()]
  await Promise.all(requestList)
}
</script>

<template>
  <div flex>
    <div flex-1 flex="~ col" p="x8 t5" rounded="r-2xl" bg-back-gray of-hidden>
      <GroupChatHead />
      <GroupChatContent />
      <GroupInputPanel />
    </div>
    <GroupSettings />
  </div>
</template>
