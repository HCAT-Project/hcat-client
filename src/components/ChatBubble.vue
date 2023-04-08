<script setup lang="ts">
withDefaults(defineProps<{
  fromSelf?: boolean
  message: string
  time: string
}>(), {
  fromSelf: false,
})
</script>

<template>
  <div flex items-end gap-3 :class="{ 'flex-row-reverse': fromSelf }">
    <img w-10 h-10 rounded-full src="/avatar.jpeg">
    <div bg-back-light p="x-3 y3" rounded-lg max-w="2/3" text="sm start" flex="~ col" gap-2>
      <div break-all>
        {{ message }}
      </div>
      <div flex justify-between items-center gap-10>
        <p text="xs text-secondary">
          {{ time }}
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
