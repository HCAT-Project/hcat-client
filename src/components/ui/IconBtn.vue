<script setup lang="ts">
defineProps<{
  click: () => void
  icon: string
}>()
</script>

<template>
  <button text-text-secondary hover="text-text-light" bg-back-light w-10 h-10 rounded-lg flex items-center justify-center @click="click">
    <div :class="icon" />
  </button>
</template>

<style scoped>

</style>
