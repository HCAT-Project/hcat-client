<script setup lang="ts">
const props = defineProps<{
  visible: boolean
  childPageVisible?: boolean
  title?: string
}>()

const emit = defineEmits(['update:visible', 'update:childPageVisible'])

const visible = useVModel(props, 'visible', emit)
const childPageVisible = useVModel(props, 'childPageVisible', emit)
function closeModal() {
  visible.value = false
  childPageVisible.value = false
}
</script>

<template>
  <div v-show="visible" cursor-auto z-50 absolute inset-0 bg="black op80" flex items-center justify-center>
    <div w-90 h-auto bg-back-gray flex="~ col" p="5" rounded gap-5>
      <div flex="~" justify-between>
        <p text-lg>
          {{ title }}
        </p>
        <button @click.stop="closeModal">
          <div w-6 h-6 i-carbon-close />
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>
