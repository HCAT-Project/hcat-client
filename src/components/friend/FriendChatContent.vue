<script setup lang="ts">
import { useStore } from '~/stores/store'

const props = defineProps<{
  id: string
}>()

const store = useStore()

const chatContent = ref<HTMLElement | null>(null)

// TODO: 处理用户的上滑行为不触发滚动
watch(() => store.friendMessages[props.id], async () => {
  await nextTick()
  chatContent.value?.scrollTo(0, chatContent.value.scrollHeight)
}, { immediate: true })
</script>

<template>
  <div ref="chatContent" flex="~ col" of="y-auto" flex-1 p="y10" gap-5 class="no-scrollbar">
    <ChatBubble v-for="item, idx in store.friendMessages[id]" :key="idx" :time="convertTimeStampToTime(item.time)" :from-self="item.user_id === getCookie('user_id')" :user="item.friend_name" :message="item.msg.msg_chain[0]" />
  </div>
</template>

<style scoped>
  .no-scrollbar::-webkit-scrollbar {
      display: none;
    }

  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
