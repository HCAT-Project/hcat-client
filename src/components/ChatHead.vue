<script setup lang="ts">
import { useStore } from '~/stores/store'

const props = defineProps<{
  id: string
  type: string
}>()

const store = useStore()

function clearMessages() {
  props.type === 'friend' ? store.clearFriendMessages(props.id) : store.clearGroupMessages(props.id)
}
</script>

<template>
  <div flex justify-between items-center px-8>
    <div flex="~ col">
      <div flex="~ col" gap-1>
        <p text="lg start" font-bold>
          {{ type === "friend" ? '好友' : '群组' }}
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
