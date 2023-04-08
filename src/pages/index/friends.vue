<script setup lang="ts">
</script>

<template>
  <div w-full h-full flex="~ col" items-center justify-center gap2>
    <img src="/logo.png" w-20 h-20>
    <p text="2xl primary" font-bold>
      F<span text-light>RIENDS</span>
    </p>
  </div>
</template>

<route lang="yaml">
name: friends
meta:
  requiresAuth: true
</route>
