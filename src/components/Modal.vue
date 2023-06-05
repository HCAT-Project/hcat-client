<script setup lang="ts">
defineProps<{
  modalVisible: boolean
  childPageVisible?: boolean
  title?: string
}>()

const emit = defineEmits(['close'])
const { escape } = useMagicKeys()

watch(escape, (v) => {
  if (v)
    emit('close')
})
</script>

<template>
  <div>
    <Teleport to="main">
      <div v-show="modalVisible" cursor-auto z-50 absolute inset-0 bg="black op80" flex items-center justify-center>
        <Transition>
          <div v-show="modalVisible" w-90 h-auto bg-back-gray flex="~ col" p="5" rounded gap-3>
            <div flex="~" justify-between>
              <p text-lg>
                {{ title }}
              </p>
              <button text-text-secondary hover:text-text-light @click="emit('close')">
                <div w-6 h-6 i-carbon-close />
              </button>
            </div>
            <slot />
          </div>
        </Transition>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: perspective(700px) rotateX(15deg) translateY(-15px);
  opacity: 0;
}
</style>
