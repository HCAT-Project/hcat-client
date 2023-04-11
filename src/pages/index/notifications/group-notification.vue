<script setup lang="ts">
import GroupNotificationCard from '../../../components/notification/GroupNotificationCard.vue'
import { useStore } from '~/stores/store'

const store = useStore()

onMounted(async () => {
  await store.getTodoList()
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
