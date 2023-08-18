<script setup lang="ts">

</script>

<template>
  <!-- Chat -->
  <div flex>
    <div hidden sm:block>
      <NotificationCate />
    </div>
    <RouterView flex-1 />
  </div>
</template>

<route lang="yaml">
name: notifications
meta:
  requiresAuth: true
  tab: 2
</route>
