<script setup lang="ts">
import { useFileDialog } from '@vueuse/core'
import { useStore } from '~/stores/store'
import type { Msg } from '~/types'

defineProps<{
  id: string
}>()

const emit = defineEmits<{
  (e: 'send', message: Msg): void
}>()

const { files, open } = useFileDialog({ accept: 'image/*' })

// TODO: 两次相同的图片不会触发
watch(files, (files) => {
  if (!files)
    return
  const img = files[0]
  const reader = new FileReader() // 创建 FileReader 对象
  reader.readAsDataURL(img) // 读取文件内容
  reader.onload = async (e) => {
    const msg = {
      msg_chain: [{ type: 'img', msg: e.target?.result as string }],
    }
    emit('send', msg)
  }
})

const store = useStore()
let inputMessage = $ref('')

async function fetchMessage() {
  await store.getTodoList()
}

function sendMessage() {
  if (inputMessage === '')
    return
  const msg = {
    msg_chain: [{ type: 'text', msg: inputMessage }],
  }
  emit('send', msg)
  inputMessage = ''
}
</script>

<template>
  <div flex items-center m="y5" gap-3 text="text-secondary">
    <button class="group" @click="open()">
      <div group-hover:text-text-light i-carbon-attachment />
    </button>
    <input v-model="inputMessage" placeholder="说点什么吧" flex-1 bg-transparent outline-none @keydown.enter="sendMessage">
    <button active="-rotate-180" transition-all @click="fetchMessage">
      <div i-carbon-rotate-360 />
    </button>
  </div>
</template>
