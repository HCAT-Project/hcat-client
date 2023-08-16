<script setup lang="ts">

</script>

<template>
  <!-- Chat -->
  <div flex>
    <div hidden sm:block>
      <FriendList />
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
