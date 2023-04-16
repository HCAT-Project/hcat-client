<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import type { MsgChain } from '~/types'

withDefaults(defineProps<{
  fromSelf?: boolean
  message: MsgChain
  time: string
}>(), {
  fromSelf: false,
})
const imgPreviewVisible = ref(false)
const imgPreview = ref<HTMLImageElement | null>(null)
onClickOutside(imgPreview, (_) => {
  imgPreviewVisible.value = false
})
</script>

<template>
  <div flex items-end gap-3 :class="{ 'flex-row-reverse': fromSelf }">
    <img w-10 h-10 rounded-full :src="fromSelf ? '/avatar.jpeg' : '/hsn.png'">
    <div bg-back-light p="x-3 y3" rounded-lg max-w="2/3" text="sm start" flex="~ col" gap-2>
      <div v-if="message.type === 'text'" break-all>
        {{ message.msg }}
      </div>
      <img v-else :src="message.msg" max-w-40 cursor-pointer @click="imgPreviewVisible = true">
      <!-- ImgPreview -->
      <div v-if="imgPreviewVisible" bg="black op40" absolute z-50 inset-0 flex items-center justify-center>
        <img ref="imgPreview" max-w-screen-sm :src="message.msg">
      </div>
      <div flex justify-between items-center gap-10>
        <p text="xs text-secondary">
          {{ time }}
        </p>
        <!-- <div flex gap-3 items-center>
          <button>
            <div i-carbon-reply />
          </button>
          <button>
            <div i-carbon-overflow-menu-vertical />
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>
