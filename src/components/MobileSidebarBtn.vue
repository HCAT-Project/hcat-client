<script setup lang="ts">
import { useSidebarStore } from '~/stores'

const sidebarStore = useSidebarStore()
</script>

<template>
  <button sm:hidden @click="sidebarStore.show = !sidebarStore.show">
    <div i-carbon-menu />
  </button>
</template>

<style scoped>

</style>
