<script setup lang="ts">
defineProps<{
  modalVisible: boolean
  childPageVisible?: boolean
  title?: string
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <div>
    <Teleport to="main">
      <div v-show="modalVisible" cursor-auto z-50 absolute inset-0 bg="black op80" flex items-center justify-center>
        <div w-90 h-auto bg-back-gray flex="~ col" p="5" rounded gap-3>
          <div flex="~" justify-between>
            <p text-lg>
              {{ title }}
            </p>
            <button @click="emit('close')">
              <div w-6 h-6 i-carbon-close />
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Teleport>
  </div>
</template>
