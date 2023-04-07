<script setup lang="ts">
withDefaults(defineProps<{
  fromSelf: boolean
  message: string
}>(), {
  fromSelf: false,
})
</script>

<template>
  <div flex items-end gap-3>
    <img w-10 h-10 rounded-lg src="/logo.png">
    <div bg-back-light p="x-3 y3" rounded-lg max-w="2/3" text="sm start" flex="~ col" gap-2>
      <p>{{ message }}</p>
      <div flex justify-between items-center>
        <p text="xs text-secondary">
          12:00:00
        </p>
        <div flex gap-3 items-center>
          <button>
            <div i-carbon-reply />
          </button>
          <button>
            <div i-carbon-overflow-menu-vertical />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
