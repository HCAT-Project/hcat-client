<script setup lang="ts">
import { useToastStore } from '~/stores'
import { useStore } from '~/stores/store.js'
import type { FriendNotification } from '~/types'

defineProps<{
  item: FriendNotification
}>()

const store = useStore()
const toastStore = useToastStore()

function agreeAddReq(rid: string) {
  store.agreeFriendReq(rid).then(async () => {
    store.removeFriendNotification(rid)
    await store.getFriendList()
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}
</script>

<template>
  <div flex="~" items-center text-start gap-3 text-sm p-3 bg="back-gray" w-full max-w-150 rounded="lg">
    <img src="/avatar.jpeg" w-15 h-15 rounded="full">
    <template v-if="item.type === 'friend_request'">
      <div flex="~ col" gap-1>
        <p flex text="warning" gap-2 items-end>
          {{ item.user_id }}
          <span text-text-light>请求加为好友</span>
          <span text="text-secondary">{{ convertTimeStampToTime(item.time) }}</span>
        </p>
        <p text="text-secondary xs">
          留言:
          <span>{{ item.add_info }}</span>
        </p>
      </div>
      <div flex-1 />
      <button border="~ back-light" rounded p="x3 y1" hover="bg-back-light" @click="agreeAddReq(item.rid)">
        同意
      </button>
      <button border="~ back-light" rounded p="x3 y1" hover="bg-back-light">
        拒绝
      </button>
    </template>
  </div>
</template>
