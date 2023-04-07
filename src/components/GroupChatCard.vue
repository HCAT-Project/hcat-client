<script setup lang="ts">
withDefaults(defineProps<{
  name: string
  newMessageNumber: number
  selected: boolean
}>(), {
  newMessageNumber: 0,
  selected: false,
})
</script>

<template>
  <div h-20 p="3" rounded-2xl :class="{ 'bg-back-light': selected }" hover="bg-back-light" flex w-full gap-3 items-center select-none>
    <img w-8 h-8 src="/logo.png" alt="">
    <div flex="~ col" flex-1 text="start" truncate>
      <p>{{ name }}</p>
      <p text="xs text-secondary" truncate>
        Hi there! I'm a friendly Chinese guy!
      </p>
    </div>
    <p v-if="newMessageNumber !== 0" bg-primary rounded-full p="x-1.5 y0.5" flex items-center text-xs justify-center>
      +{{ newMessageNumber }}
    </p>
  </div>
</template>
