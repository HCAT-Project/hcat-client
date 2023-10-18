<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { marked } from 'marked'
import axios from 'axios'
import type { MsgChain } from '~/types'
import { URL } from '~/constant'

const props = withDefaults(defineProps<{
  fromSelf?: boolean
  message: MsgChain
  time: string
  user: string
  userId: string
}>(), {
  fromSelf: false,
})
// const store = useStore()
// const toastStore = useToastStore()
const imgPreviewVisible = ref(false)
const imgPreview = ref<HTMLImageElement | null>(null)
const avatarRef = ref<HTMLImageElement | null>(null)
const imgBase64 = ref('')

onMounted(() => {
  if (props.message.type === 'img') {
    axios.get(`${URL}/files/${props.message.msg}`, {
      responseType: 'arraybuffer',
    }).then((res) => {
      // 转图片为base64
      const base64 = btoa(
        new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''),
      )
      imgBase64.value = `data:image/png;base64,${base64}`

    })
  }
})

// const { top, left, width } = useElementBounding(avatarRef)
// let profile: Nullable<Profile> = $ref(null)
// let profileCardVisible = $ref(false)
// let position = {
//   x: 0,
//   y: 0,
// }

onClickOutside(imgPreview, (_) => {
  imgPreviewVisible.value = false
})

marked.setOptions({
  gfm: true,
  breaks: true,
})
const markedHTML = marked.parse(props.message.msg.replace(/\\n/g, '\n'), { breaks: true, gfm: true })

// async function toggleProfile(id: string) {
//   if (props.fromSelf)
//     return
//   position = {
//     x: left.value + width.value + 5,
//     y: top.value,
//   }
//   profile = await store.getProfile(id)
//   profileCardVisible = true
// }
</script>

<template>
  <div flex items-start gap-3 :class="{ 'flex-row-reverse': fromSelf }">
    <div of-visible relative>
      <img ref="avatarRef" w-10 h-10 rounded-full :src="fromSelf ? '/avatar.jpeg' : '/hsn.png'">
    </div>
    <div flex="~ col" :class="[fromSelf ? 'items-end' : 'items-start']">
      <p text-text-secondary font-bold text-sm>
        {{ user }}
      </p>
      <div bg-back-light p="x-3 y3" rounded-lg max-w="md:80 60" text="sm start" flex="~ col" gap-2 break-words>
        <span v-if="message.type === 'text'" break-all v-html="markedHTML" />
        <img v-else :src="imgBase64" max-w-40 cursor-pointer @click="imgPreviewVisible = true">
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

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform:translateX( -10%)
}
</style>
