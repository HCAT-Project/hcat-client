<script setup lang="ts">
defineProps<{
  click: () => void
  label: string
}>()
</script>

<template>
  <button px-3 py-2 hover:bg-back-light w-full text-sm text-start @click="click">
    {{ label }}
  </button>
</template>

<style scoped>

</style>
