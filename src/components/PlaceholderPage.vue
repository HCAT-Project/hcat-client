<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div w-full h-full flex="~ col" px-8 py-5>
    <div w-full flex>
      <MobileSidebarBtn />
    </div>
    <div flex="~ col" items-center justify-center gap-3 flex-1>
      <img src="/logo.png" w-20 h-20>
      <p text="2xl primary" font-bold>
        {{ title[0] }}<span text-light>{{ title.slice(1) }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
