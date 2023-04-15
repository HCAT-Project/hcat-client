<script setup lang="ts">
defineProps<{
  id: string
}>()

function clearMessages() {
  // store.clearGroupMessages()
}
</script>

<template>
  <div flex justify-between items-center>
    <div flex="~ col">
      <div flex="~ col" gap-1>
        <p text="lg start" font-bold>
          {{ id ?? '好友' }}
        </p>
      </div>
    </div>
    <div flex gap-5>
      <button @click="clearMessages">
        <div text-text-secondary i-carbon-clean />
      </button>
      <button>
        <div text-text-secondary i-carbon-search />
      </button>
      <button>
        <div text-text-secondary i-carbon-open-panel-right />
      </button>
    </div>
  </div>
</template>
