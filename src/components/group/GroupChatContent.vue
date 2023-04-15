<script setup lang="ts">
import { getCookie } from '~/composables'
import { useStore } from '~/stores/store'

defineProps<{
  id: string
}>()

const store = useStore()
</script>

<template>
  <div flex="~ col" of="y-auto" flex-1 p="y10" gap-5 class="no-scrollbar">
    <ChatBubble v-for="item, idx in store.groupMessages[id]" :key="idx" :time="convertTimeStampToTime(item.time)" :from-self="item.user_id === getCookie('user_id')" :message="item.msg.msg_chain[0].msg" />
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
