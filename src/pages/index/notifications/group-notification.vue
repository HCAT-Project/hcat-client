<script setup lang="ts">
import GroupNotificationCard from './components/GroupNotificationCard.vue'
import { useStore } from '~/stores/store'
import type { Todo } from '~/types'

const store = useStore()

onMounted(async () => {
  await store.getTodoList().then((res) => {
    res.forEach((item: Todo) => {
      if (item.type === 'group_join_request' || item.type === 'admin_removed' || item.type === 'admin_added' || item.type === 'member_removed')
        store.addGroupNotification(item)
    })
  })
})
</script>

<template>
  <div flex="~ col">
    <div text-start p="x10 y5" border="b-0.1 back-light">
      群通知
    </div>
    <div flex="~ col" gap-5 items-center of-auto p="5">
      <!-- Notification card -->
      <GroupNotificationCard v-for="item in store.gpNotificationList" :key="item.rid" :item="item" />
    </div>
  </div>
</template>
