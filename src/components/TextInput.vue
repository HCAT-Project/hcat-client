<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  type?: string
  isRequired?: boolean
  modelValue: string
  disabled?: boolean
}>(), {
  type: 'text',
  isRequired: false,
  modelValue: '',
  disabled: false,
})

const emits = defineEmits(['update:modelValue'])

const value = useVModel(props, 'modelValue', emits)
</script>

<template>
  <div flex="~ col" w-full gap-1 text-start>
    <p>{{ label }}<span v-if="isRequired" text-important>*</span></p>
    <div :class="[disabled ? 'bg-back text-text-light' : 'bg-input text-text']" rounded px-3 h-10>
      <input v-model="value" :disabled="disabled" :class="{ 'text-text-light': disabled }" bg-transparent outline-none h-full w-full :type="type">
    </div>
    <slot />
  </div>
</template>
