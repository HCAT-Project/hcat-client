<script setup lang="ts">
import { useFileDialog } from '@vueuse/core'
import * as crypto from 'crypto-js'
import { useStore, useToastStore } from '../stores'
import type { Msg } from '~/types'

defineProps<{
  id: string
}>()

const emit = defineEmits<{
  (e: 'send', message: Msg): void
}>()

const toastStore = useToastStore()
const { files, open } = useFileDialog({ accept: 'image/*' })
const store = useStore()

// TODO: 两次相同的图片不会触发
watch(files, (files) => {
  if (!files)
    return
  const img = files[0]
  const reader = new FileReader() // 创建 FileReader 对象
  reader.readAsArrayBuffer(img) // 读取文件内容
  if (img.size > 1024 * 1024 * 3) {
    toastStore.showToast('图片大小不能超过3MB', 'error')
    return
  }
  reader.onload = async (e) => {
    const wordArry = crypto.lib.WordArray.create(e.target?.result as any)
    const hash = crypto.SHA1(wordArry).toString()
    const msg = {
      msg_chain: [{ type: 'img', msg: hash }],
    }
    try {
      await store.checkFile(hash)
    }
    catch {
      await store.uploadFile(img)
    }
    emit('send', msg)
  }
})

let inputMessage = $ref('')

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
  <div flex items-center p="y5 x8" gap-3 text="text-secondary">
    <button class="group" @click="open()">
      <div group-hover:text-text-light i-carbon-attachment />
    </button>
    <input v-model="inputMessage" placeholder="说点什么吧" flex-1 bg-transparent outline-none @keydown.enter="sendMessage">
  </div>
</template>
