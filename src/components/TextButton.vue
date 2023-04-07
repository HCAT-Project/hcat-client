<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <button bg="primary" hover="bg-primary-light" h-10 rounded w-full>
    {{ text }}
  </button>
</template>
