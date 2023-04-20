<script setup lang="ts">
import { useStore } from '~/stores/store'

const store = useStore()

onMounted(() => {
  store.hasNewFRNotify = false
})
</script>

<template>
  <div flex="~ col">
    <div text-start p="x10 y5" border="b-0.1 back-light" flex items-center gap-2>
      好友通知
      <button text-text-secondary hover:text-text-light transition-colors duration-300 @click="store.clearFriendNotification">
        <div i-carbon-clean />
      </button>
    </div>
    <div flex="~ col" gap-5 items-center of-auto p="5">
      <FriendNotificationCard
        v-for="item in store.fdNotificationList" :key="item.rid"
        :item="item"
      />
    </div>
  </div>
</template>
