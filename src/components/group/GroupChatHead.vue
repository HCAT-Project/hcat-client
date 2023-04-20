<script setup lang="ts">
import { useStore } from '~/stores/store'

const props = defineProps<{
  id: string
}>()

const store = useStore()

function clearMessages() {
  store.clearGroupMessages(props.id)
}
</script>

<template>
  <div flex justify-between items-center px8>
    <div flex="~ col">
      <div flex="~ col" gap-1>
        <p text="lg start" font-bold>
          {{ store.groupList[id]?.group_name ?? '群组' }}
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
