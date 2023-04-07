<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  type?: string
  isRequired?: boolean
}>(), {
  type: 'text',
  isRequired: false,
})
</script>

<template>
  <div flex="~ col" w-full gap-1 text-start>
    <p>{{ label }}<span v-if="isRequired" text-important>*</span></p>
    <div bg-input rounded px-3 text-text h-10>
      <input outline-none h-full w-full :type="type">
    </div>
    <slot />
  </div>
</template>
