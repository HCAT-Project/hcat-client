<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { marked } from 'marked'
import type { MsgChain } from '~/types'

const props = withDefaults(defineProps<{
  fromSelf?: boolean
  message: MsgChain
  time: string
  user: string
}>(), {
  fromSelf: false,
})
const imgPreviewVisible = ref(false)
const imgPreview = ref<HTMLImageElement | null>(null)

onClickOutside(imgPreview, (_) => {
  imgPreviewVisible.value = false
})

marked.setOptions({
  gfm: true,
  breaks: true,
})
const markedHTML = marked.parse(props.message.msg.replace(/\\n/g, '\n'), { breaks: true, gfm: true })
</script>

<template>
  <div flex items-start gap-3 :class="{ 'flex-row-reverse': fromSelf }">
    <img w-10 h-10 rounded-full :src="fromSelf ? '/avatar.jpeg' : '/hsn.png'">
    <div flex="~ col" :class="[fromSelf ? 'items-end' : 'items-start']">
      <p text-text-secondary font-bold text-sm>
        {{ user }}
      </p>
      <div bg-back-light p="x-3 y3" rounded-lg max-w="md:80 60" text="sm start" flex="~ col" gap-2 break-words>
        <span v-if="message.type === 'text'" break-all v-html="markedHTML" />
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
  </div>
</template>
