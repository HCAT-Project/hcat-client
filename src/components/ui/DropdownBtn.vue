<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'

export interface Item {
  label: string
  onClick: () => void
}

defineProps<{
  icon: string
  items: Item[]
}>()

const listVisible = $ref(false)
</script>

<template>
  <div relative of-visible w-10 h-10 ml-3>
    <IconBtn :click="() => { listVisible = !listVisible }" :icon="icon" />
    <OnClickOutside v-show="listVisible" border-base bg-back-gray rounded-lg w-30 mt-1 of-hidden shadow-lg @trigger="listVisible = false">
      <DropdownItem v-for="item in items" :key="item.label" :click="item.onClick" :label="item.label" />
    </OnClickOutside>
  </div>
</template>

<style scoped>

</style>
