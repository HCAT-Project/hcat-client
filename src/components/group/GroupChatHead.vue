<script setup lang="ts">
import { useStore } from '~/stores/store'

const store = useStore()

function clearMessages() {
  store.clearGroupMessages()
}
</script>

<template>
  <div flex justify-between items-center>
    <div flex="~ col">
      <div flex="~ col" gap-1>
        <p text="lg start" font-bold>
          {{ store.groupList[store.activeChat.id]?.group_name ?? '群组' }}
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
