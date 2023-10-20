<script setup lang="ts">
import { useStore, useToastStore } from '~/stores'

const props = defineProps<{
  id: string
  type: 'group' | 'friend'
}>()

const store = useStore()
const toastStore = useToastStore()

function clearMessages() {
  props.type === 'friend' ? store.clearFriendMessages(props.id) : store.clearGroupMessages(props.id)
}
</script>

<template>
  <div flex justify-between items-center px-8>
    <div flex="~ col">
      <div flex="~" gap-3>
        <MobileSidebarBtn />
        <p text="lg start" font-bold>
          {{
            type === "group" ? store.groupList.find(item => item.id === id)?.group_name
            : id
          }}
        </p>
      </div>
    </div>
    <div flex gap-5>
      <button @click="clearMessages">
        <div text-text-secondary i-carbon-clean />
      </button>
      <button @click="toastStore.notImplemented">
        <div text-text-secondary i-carbon-search />
      </button>
      <button @click="toastStore.notImplemented">
        <div text-text-secondary i-carbon-open-panel-right />
      </button>
    </div>
  </div>
</template>
