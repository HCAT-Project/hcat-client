<script setup lang="ts">
import { useSidebarStore } from '~/stores'
import { useStore } from '~/stores/store'

const selected = $ref(-1)
const router = useRouter()
const store = useStore()
const sidebarStore = useSidebarStore()

function navToNotification(path: string) {
  sidebarStore.show = false
  router.replace(path)
}
</script>

<template>
  <div w="70" rounded="l-2xl" bg-back-gray of-hidden h-full>
    <div flex="~ col" p="y5 x5" gap-5>
      <!-- Chat card -->
      <div flex="~ col">
        <div p3 rounded-2xl h-15 :class="{ 'bg-back-light': selected === 0 }" hover="bg-back-light" flex="~" justify-between w-full gap-3 items-center select-none @click="navToNotification('/notifications/friend-notification')">
          <div flex items-center gap-2>
            <p>好友通知</p>
            <div v-show="store.hasNewFRNotify" rounded-full p="x2 y0.5" text-xs bg-primary>
              New
            </div>
          </div>
          <div i-carbon-chevron-right />
        </div>
        <div p3 rounded-2xl h-15 :class="{ 'bg-back-light': selected === 1 }" hover="bg-back-light" flex="~" justify-between w-full gap-3 items-center select-none @click="navToNotification('/notifications/group-notification')">
          <div flex items-center gap-2>
            <p>群通知</p>
            <div v-show="store.hasNewGPNotify" rounded-full p="x2 y0.5" text-xs bg-primary>
              New
            </div>
          </div>
          <div i-carbon-chevron-right />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
