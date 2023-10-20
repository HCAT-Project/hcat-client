<script setup lang="ts">

</script>

<template>
  <div w-full h-full flex="~ col" items-center  gap2>
    <PlaceholderPage
    title="HCAT"
    />
  </div>
</template>

<route lang="yaml">
name: index
meta:
  requiresAuth: true
</route>
