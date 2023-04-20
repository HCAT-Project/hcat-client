<script setup lang="ts">
import { useStore } from '~/stores/store'

const selected = $ref(-1)
const router = useRouter()
const store = useStore()
</script>

<template>
  <!-- Chat -->
  <div flex>
    <div w="70" rounded="l-2xl" bg-back-gray of-hidden hidden md:block>
      <div flex="~ col" p="y5 x5" gap-5>
        <!-- Chat card -->
        <div flex="~ col">
          <div p3 rounded-2xl h-15 :class="{ 'bg-back-light': selected === 0 }" hover="bg-back-light" flex="~" justify-between w-full gap-3 items-center select-none @click="router.replace('/notifications/friend-notification')">
            <div flex items-center gap-2>
              <p>好友通知</p>
              <div v-show="store.hasNewFRNotify" rounded-full p="x2 y0.5" text-xs bg-primary>
                New
              </div>
            </div>
            <div i-carbon-chevron-right />
          </div>
          <div p3 rounded-2xl h-15 :class="{ 'bg-back-light': selected === 1 }" hover="bg-back-light" flex="~" justify-between w-full gap-3 items-center select-none @click="router.replace('/notifications/group-notification')">
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
    <RouterView flex-1 />
  </div>
</template>

<route lang="yaml">
name: notifications
meta:
  requiresAuth: true
  tab: 2
</route>
