<script setup lang="ts">
const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['update:visible'])

const visible = useVModel(props, 'visible', emit)
</script>

<template>
  <div v-if="visible" cursor-auto z-50 absolute inset-0 bg="black op80" flex items-center justify-center>
    <div w-90 h-auto bg-back-gray flex="~ col" p="5" rounded>
      <div flex="~" justify-end>
        <button @click.stop="visible = false">
          <div w-6 h-6 i-carbon-close />
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>
