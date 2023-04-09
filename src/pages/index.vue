<script setup lang="ts" generic="T extends any, O extends any">
import { useStore } from '~/stores/store'

interface SidebarButton {
  icon: string
  text: string
}

const store = useStore()
const router = useRouter()
const route = useRoute()
const joinGroupID = $ref('')
const addMessage = $ref('')
const sideBarButtonList: SidebarButton[] = [
  {
    icon: 'i-carbon-group',
    text: '群聊',
  },
  {
    icon: 'i-carbon-chat-bot',
    text: '好友',
  },
  {
    icon: 'i-carbon-notification-new',
    text: '通知',
  },
  {
    icon: 'i-carbon-search-advanced',
    text: '查找',
  },
]

let joinGPModalVisible = $ref(false)

watch(() => route.meta.tab, () => {
  store.activeTab = route.meta.tab as number ?? -1
}, { immediate: true })

async function joinGroup() {
  // TODO: 自由进出与需要验证分开处理
  if (joinGroupID.trim() === '') {
    // TODO: 处理错误
    return
  }

  await store.getGroupVerification(joinGroupID).then(async (method) => {
    const form = {
      group_id: joinGroupID,
      add_info: addMessage,
    }
    switch (method) {
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
        // TODO:
        break
      case 'aw':
        // TODO:
        break
    }
  }).catch((err) => {
    alert(err)
  })
}

function sideBarAction(index: number) {
  switch (index) {
    case 0:
      router.push(`/groups/${store.activeChat.id ?? ''}`)
      break
    case 1:
      router.push('/friends')
      break
    case 2:
      router.push('/notifications')
      break
    case 3:
      joinGPModalVisible = true
      break
  }
}

async function logout() {
  await store.logout().then((_) => {
    router.push('/login')
  })
}
</script>

<template>
  <div h-full flex="~">
    <!-- Sidebar -->
    <div w="20" flex="~ col" p="y5" justify-between items-center>
      <button text-xl font-bold mb-10 @click="router.push('/')">
        <span text-primary>H</span>CAT
      </button>
      <div flex-1 flex="~ col" gap-5>
        <button v-for="item, index in sideBarButtonList" :key="item.text" :class="[store.activeTab === index ? 'text-text-light' : 'text-text-secondary']" flex="~ col" items-center text-xs gap-2 @click="sideBarAction(index)">
          <div w-6 h-6 :class="item.icon" />
          <p>{{ item.text }}</p>
        </button>
        <!-- Join Modal -->
        <Modal v-model:visible="joinGPModalVisible">
          <div flex="~ col" gap-10>
            <div flex-1 flex="~ col" items-center gap-5>
              <img w-20 h-20 src="/logo.png">
              <TextInput v-model="joinGroupID" text-sm label="群组ID" />
              <TextInput v-model="addMessage" text-sm label="附加消息" />
            </div>
            <TextButton text="加入" @click="joinGroup" />
          </div>
        </Modal>
      </div>
      <div flex="~ col" gap-5 text="xs text-secondary">
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
    <RouterView flex-1 />
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
