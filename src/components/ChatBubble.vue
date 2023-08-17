<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'
import { onClickOutside } from '@vueuse/core'
import { marked } from 'marked'
import type { Nullable } from 'vitest'
import { useStore } from '~/stores'
import type { MsgChain, Profile } from '~/types'

const props = withDefaults(defineProps<{
  fromSelf?: boolean
  message: MsgChain
  time: string
  user: string
  userId: string
}>(), {
  fromSelf: false,
})
const store = useStore()
const imgPreviewVisible = ref(false)
const imgPreview = ref<HTMLImageElement | null>(null)
const nickInput = ref<HTMLImageElement | null>(null)
let profile: Nullable<Profile> = $ref(null)
let profileCardVisible = $ref(false)

onClickOutside(imgPreview, (_) => {
  imgPreviewVisible.value = false
})

marked.setOptions({
  gfm: true,
  breaks: true,
})
const markedHTML = marked.parse(props.message.msg.replace(/\\n/g, '\n'), { breaks: true, gfm: true })

async function toggleProfile(id: string) {
  profile = await store.getProfile(id)
  profileCardVisible = true
}
</script>

<template>
  <div flex items-start gap-3 :class="{ 'flex-row-reverse': fromSelf }">
    <OnClickOutside of-visible relative @trigger="profileCardVisible = false" @click="toggleProfile(userId)">
      <img w-10 h-10 rounded-full :src="fromSelf ? '/avatar.jpeg' : '/hsn.png'">
      <Transition>
        <div v-if="profileCardVisible && profile" text-sm w-65 h-80 absolute :class="[fromSelf ? 'right-12' : 'left-12']" top-2 shadow-lg border-base bg-back-gray p-1 rounded-lg>
          <div flex="~ col" relative h-full>
            <div h-12 bg="#969696" rounded-t />
            <div flex-1 flex>
              <div bg-back flex-1 m-3 mt-8 rounded text-start p-3 relative>
                <p font-bold text-lg>
                  {{ profile.name }}
                </p>
                <p op40 pb-3 border-b>
                  # {{ profile.id }}
                </p>
                <div v-if="profile.time" pt-3 flex="~ col" gap-1>
                  <p font-bold>
                    成为好友的时间
                  </p>
                  <p op40>
                    {{ convertTimeStampToTime(profile.time) }}
                  </p>
                  <p font-bold>
                    备注
                  </p>
                  <input ref="nickInput" :value="profile.nick" outline-none bg-transparent>
                </div>
                <button v-if="!fromSelf" absolute bg-primary p-3 rounded-full right-3 bottom-3>
                  <div i-carbon-chat />
                </button>
              </div>
            </div>
            <div w-18 h-18 rounded-full p-1.5 bg-back-gray absolute top-2 left-5>
              <img rounded-full :src="profile.avatar.length === 0 ? '/hsn.png' : profile.avatar" alt="">
            </div>
          </div>
        </div>
      </Transition>
    </OnClickOutside>
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
