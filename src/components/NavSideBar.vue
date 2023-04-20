<script setup lang="ts">
import gsap from 'gsap'
import { useStore } from '~/stores/store'

const router = useRouter()
const store = useStore()
const answer = $ref('')
const joinGroupID = $ref('')
const addMessage = $ref('')
const notifyButton = ref<HTMLDivElement | null>(null)
const tl = gsap.timeline({ paused: true })

let question = $ref('')
let joinGPModalVisible = $ref(false)
let showQA = $ref(false)

onMounted(() => {
  tl.to(notifyButton.value,
    { rotation: 30, duration: 0.6, repeat: -1, yoyo: true, transformOrigin: '50% 0', ease: 'sine.inOut' })
    .to(notifyButton.value, {
      rotation: -30, duration: 0.6, repeat: -1, yoyo: true, transformOrigin: '50% 0', ease: 'sine.inOut',
    })
})

watch(() => store.hasNewNotify, (newVal) => {
  if (newVal)
    tl.play()

  else tl.pause(0)
}, { immediate: true })

async function joinGroup() {
  // TODO: 自由进出与需要验证分开处理
  if (joinGroupID.trim() === '') {
    // TODO: 处理错误
    return
  }

  await store.getGroupVerification(joinGroupID).then(async (verification) => {
    question = verification.question
    const form = {
      group_id: joinGroupID,
      add_info: addMessage,
    }
    switch (verification.verification_method) {
      case 'fr':
        await store.joinGroup(form).then((res) => {
          store.getGroupList()
          joinGPModalVisible = false
        }).catch((err) => {
          alert(err)
        })
        break
      case 'ac':
        await store.joinGroup(form).then((res) => {
          alert('已发送入群申请')
          store.getGroupList()
          joinGPModalVisible = false
        }).catch((err) => {
          alert(err)
        })
        break
      case 'na':
        alert('该群组不允许加入')
        break
      case 'aw':
        showQA = true
        break
    }
  }).catch((err) => {
    alert(err)
  })
}

async function submitAnswer() {
  await store.joinGroup({
    group_id: joinGroupID,
    add_info: answer,
  }).then((res) => {
    showQA = false
    joinGPModalVisible = false
    store.getGroupList()
  }).catch((err) => {
    alert(err)
  })
}

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
    case 3:
      joinGPModalVisible = true
      break
  }
}

async function logout() {
  store.clearStorage()
  await store.logout().then((_) => {
    router.replace('/login')
  })
}
</script>

<template>
  <div w="20" flex="~ col" p="y5" justify-between items-center>
    <button text-xl font-bold mb-10 @click="router.replace('/')">
      <span text-primary>H</span>CAT
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
      <button :class="[store.activeTab === 3 ? 'text-text-light' : 'text-text-secondary']" flex="~ col" items-center text-xs gap-2 @click="sideBarAction(3)">
        <div w-6 h-6 i-carbon-search-advanced />
        <p>查找</p>
      </button>
      <!-- Join Modal -->
      <Modal :modal-visible="joinGPModalVisible" :child-page-visible="showQA" @close="() => { joinGPModalVisible = false, showQA = false }">
        <div v-if="!showQA" flex="~ col" gap-8>
          <div flex-1 flex="~ col" items-center gap-3>
            <img w-20 h-20 src="/logo.png">
            <TextInput v-model="joinGroupID" text-sm label="群组ID" />
            <TextInput v-model="addMessage" text-sm label="附加消息" />
          </div>
          <TextButton text="加入" @click="joinGroup" />
        </div>
        <div v-else>
          <div flex="~ col" gap-5>
            <div flex="~ col" gap-3>
              <TextInput v-model="question" :disabled="true" text-sm label="问题" />
              <TextInput v-model="answer" text-sm label="答案" />
            </div>
            <TextButton text="提交" @click="submitAnswer" />
          </div>
        </div>
      </Modal>
    </div>
    <div flex="~ col" gap-5 text="xs text-secondary">
      <button flex="~ col" items-center gap-2 hover="text-light" @click="() => { store.clearStorage;router.replace('/') }">
        <div w-6 h-6 i-carbon-trash-can />
        <p> 清空</p>
      </button>
      <button flex="~ col" items-center gap-2 hover="text-light" @click="logout">
        <div w-6 h-6 i-carbon-logout />
        <p> 注销</p>
      </button>
      <button flex="~ col" items-center gap-2 hover="text-light">
        <div w-6 h-6 i-carbon-settings />
        <p> 设置</p>
      </button>
    </div>
  </div>
</template>
