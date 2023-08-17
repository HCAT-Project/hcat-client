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
    <Transition>
      <OnClickOutside v-show="listVisible" border-base bg-back-gray rounded-lg w-30 mt-1 of-hidden shadow-lg @trigger="listVisible = false">
        <DropdownItem v-for="item in items" :key="item.label" :click="() => { listVisible = false; item.onClick() }" :label="item.label" />
      </OnClickOutside>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
opacity: 0;
translate: 0px -3px;
}
</style>
