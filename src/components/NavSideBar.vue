<script setup lang="ts">
import gsap from 'gsap'
import { useStore, useToastStore, useUserStore } from '~/stores'

const router = useRouter()
const store = useStore()
const userStore = useUserStore()
const toastStore = useToastStore()

const notifyButton = ref<HTMLDivElement | null>(null)
const tl = gsap.timeline({ paused: true })
const profileModalVisible = $ref(false)

onBeforeMount(async () => {
  const data = await store.getProfile(userStore.userId)
  userStore.userProfile = data
})

onMounted(() => {
  tl.to(notifyButton.value, { rotation: 30, duration: 0.6, repeat: -1, yoyo: true, transformOrigin: '50% 0', ease: 'sine.inOut' })
    .to(notifyButton.value, {
      rotation: -30,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      transformOrigin: '50% 0',
      ease: 'sine.inOut',
    })
})

watch(() => store.hasNewNotify, (newVal) => {
  if (newVal)
    tl.play()
  else tl.pause(0)
}, { immediate: true })

function sideBarAction(index: number) {
  switch (index) {
    case 0:
      router.replace('/groups')
      break
    case 1:
      router.replace('/friends')
      break
    case 2:
      router.replace('/notifications')
      break
  }
}

async function logout() {
  store.clearStorage()
  await userStore.logout().then((_) => {
    router.replace('/login')
  })
}

function showSettings() {
  // TODO: show settings
  toastStore.notImplemented()
}
</script>

<template>
  <div w="20" flex="~ col" p="y5" justify-between items-center>
    <button text-xl font-bold @click="router.replace('/')">
      <span text-primary>H</span>CAT
    </button>
    <button my-5 @click="profileModalVisible = true">
      <img rounded-full w-10 h-10 :src="userStore.userProfile.avatar.length === 0 ? '/avatar.jpeg' : userStore.userProfile.avatar" alt="avatar">
      <EditProfileModal :profile="userStore.userProfile" :modal-visible="profileModalVisible" :close="() => { profileModalVisible = false }" />
    </button>
    <div flex-1 flex="~ col" gap-5>
      <button :class="[store.activeTab === 0 ? 'text-text-light' : 'text-text-secondary']" flex="~ col" items-center text-xs gap-2 @click="sideBarAction(0)">
        <div w-6 h-6 i-carbon-group />
        <p>群聊</p>
      </button>
      <button :class="[store.activeTab === 1 ? 'text-text-light' : 'text-text-secondary']" flex="~ col" items-center text-xs gap-2 @click="sideBarAction(1)">
        <div w-6 h-6 i-carbon-chat-bot />
        <p>好友</p>
      </button>
      <button :class="[store.activeTab === 2 ? 'text-text-light' : 'text-text-secondary']" flex="~ col" items-center text-xs gap-2 @click="sideBarAction(2)">
        <div ref="notifyButton" w-6 h-6 i-carbon-notification :class="{ 'text-primary': store.hasNewNotify }" />
        <p>通知</p>
      </button>
    </div>
    <div flex="~ col" gap-5 text="xs text-secondary">
      <button flex="~ col" items-center gap-2 hover="text-light" @click="logout">
        <div w-6 h-6 i-carbon-logout />
        <p> 注销</p>
      </button>
      <button flex="~ col" items-center gap-2 hover="text-light" @click="showSettings">
        <div w-6 h-6 i-carbon-settings />
        <p> 设置</p>
      </button>
    </div>
  </div>
</template>
