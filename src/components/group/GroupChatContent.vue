<script setup lang="ts">
import { useStore } from '~/stores/store'
import { useUserStore } from '~/stores/user'

const props = defineProps<{
  id: string
}>()

const store = useStore()
const userStore = useUserStore()

const chatContent = ref<HTMLElement | null>(null)

watch(() => store.groupMessages[props.id], async () => {
  await nextTick()
  chatContent.value?.scrollTo(0, chatContent.value.scrollHeight)
}, { immediate: true })
</script>

<template>
  <div ref="chatContent" flex="~ col" of="y-auto" flex-1 p="y10 x5" gap-5 class="no-scrollbar">
    <ChatBubble v-for="item, idx in store.groupMessages[id]" :key="idx" :user-id="item.user_id" :time="convertTimeStampToTime(item.time)" :from-self="item.user_id === userStore.userId" :user="item.member_name" :message="item.msg.msg_chain[0]" />
  </div>
</template>
