<script setup lang="ts">
const selected = $ref(-1)
const router = useRouter()
</script>

<template>
  <!-- Chat -->
  <div flex>
    <div w="70" rounded="l-2xl" bg-back-gray of-hidden hidden md:block>
      <div flex="~ col" p="y5 x5" gap-5>
        <!-- Chat card -->
        <div flex="~ col">
          <div p3 rounded-2xl h-15 :class="{ 'bg-back-light': selected === 0 }" hover="bg-back-light" flex="~" justify-between w-full gap-3 items-center select-none @click="router.replace('/notifications/friend-notification')">
            <p>好友通知</p>
            <div i-carbon-chevron-right />
          </div>
          <div p3 rounded-2xl h-15 :class="{ 'bg-back-light': selected === 1 }" hover="bg-back-light" flex="~" justify-between w-full gap-3 items-center select-none @click="router.replace('/notifications/group-notification')">
            <p>群通知</p>
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
