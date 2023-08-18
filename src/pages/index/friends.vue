<script setup lang="ts">
import { useStore } from '~/stores'

const store = useStore()

onBeforeMount(async () => {
  await store.getFriendList()
})
</script>

<template>
  <!-- Chat -->
  <div flex>
    <div hidden sm:block>
      <ChatListContent :list="store.friendList" type="friends" />
    </div>
    <RouterView flex-1 />
  </div>
</template>

<route lang="yaml">
name: friends
meta:
  requiresAuth: true
  tab: 1
</route>
