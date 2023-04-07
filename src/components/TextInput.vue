<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  type?: string
  isRequired?: boolean
  modelValue: string
}>(), {
  type: 'text',
  isRequired: false,
  modelValue: '',
})

const emits = defineEmits(['update:modelValue'])

const value = useVModel(props, 'modelValue', emits)
</script>

<template>
  <div flex="~ col" w-full gap-1 text-start>
    <p>{{ label }}<span v-if="isRequired" text-important>*</span></p>
    <div bg-input rounded px-3 text-text h-10>
      <input v-model="value" outline-none h-full w-full :type="type">
    </div>
    <slot />
  </div>
</template>
