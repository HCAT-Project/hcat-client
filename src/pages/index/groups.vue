<script setup lang="ts">
import { useStore } from '~/stores'

const store = useStore()

onBeforeMount(async () => {
  await store.getGroupList()
})
</script>

<template>
  <!-- Chat -->
  <div flex>
    <div hidden sm:block>
      <ChatListContent :list="store.groupList" type="groups" />
    </div>
    <RouterView flex-1 />
  </div>
</template>

<route lang="yaml">
name: groups
meta:
  requiresAuth: true
  tab: 0
</route>
