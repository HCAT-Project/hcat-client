<script setup lang="ts">
import { useToastStore } from '~/stores/toast'

const toast = ref<HTMLDivElement | null>(null)

const toastStore = useToastStore()
</script>

<template>
  <Transition>
    <div v-if="toastStore.show" ref="toast" z-99 flex p="x5 y3" absolute top-10 left-0 right-0 mx-auto max-w-xs bg-back rounded-lg items-center justify-between gap-5 border="back-light ~">
      <div flex items-center gap-2>
        <div v-if="toastStore.type === 'success'" text-safe i-carbon-checkmark-outline />
        <div v-else-if="toastStore.type === 'info'" i-carbon-warning />
        <div v-else-if="toastStore.type === 'error'" text-important i-carbon-error-outline />
        <div flex="~ col">
          <p>{{ toastStore.message }}</p>
          <p text="xs" text-light>
            {{ toastStore.description }}
          </p>
        </div>
      </div>
      <button @click="toastStore.hideToast">
        <div i-carbon-close />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: perspective(70px) rotateX(90deg);
  opacity: 0;
}
</style>
