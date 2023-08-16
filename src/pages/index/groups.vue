<script setup lang="ts">

</script>

<template>
  <!-- Chat -->
  <div flex>
    <div hidden sm:block>
      <GroupList />
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
