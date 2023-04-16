<script setup lang="ts">
import { getCookie } from '~/composables'
import { useStore } from '~/stores/store'

const props = defineProps<{
  id: string
}>()

const store = useStore()

const chatContent = ref<HTMLElement | null>(null)

watch(() => store.groupMessages[props.id], async () => {
  await nextTick()
  chatContent.value?.scrollTo(0, chatContent.value.scrollHeight)
}, { immediate: true })
</script>

<template>
  <div ref="chatContent" flex="~ col" of="y-auto" flex-1 p="y10" gap-5 class="no-scrollbar">
    <ChatBubble v-for="item, idx in store.groupMessages[id]" :key="idx" :time="convertTimeStampToTime(item.time)" :from-self="item.user_id === getCookie('user_id')" :message="item.msg.msg_chain[0]" />
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
