<script setup lang="ts" generic="T extends any, O extends any">
import { getCookie, getDisplayTime } from '~/composables'
import { useStore } from '~/stores/store'
import type { ActiveChat, Message, chatType } from '~/types'

interface GroupList {
  [key: string]: Group
}

interface Group {
  group_name: string
  nick: string
  remark: string
}

interface SidebarButton {
  icon: string
  text: string
}

const store = useStore()
const router = useRouter()
const createGroupName = $ref('')
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
const activeChat = $ref<ActiveChat>({
  type: null,
  id: '',
})
let createGPModalVisible = $ref(false)
let joinGPModalVisible = $ref(false)
let selectedGroup = $ref('-1')
let groupList: GroupList = $ref({
  1: {
    group_name: 'Group 1',
    nick: 'Nick 1',
    remark: 'Remark 1',
  },
  2: {
    group_name: 'Group 2',
    nick: 'Nick 2',
    remark: 'Remark 2',
  },
  3: {
    group_name: 'Group 3',
    nick: 'Nick 3',
    remark: 'Remark 3',
  },
})
let inputMessage = $ref('')
const messageList = $ref<Message[]>([])

onMounted(async () => {
  await store.authToken()
    .catch((_) => {
      alert('请先登录')
      router.push('/login')
    })
  getGroupList()
})

function selectGroup(id: string) {
  selectedGroup = id
  changeActiveChat('group', id)
}

function changeActiveChat(type: chatType, id: string) {
  activeChat.type = type
  activeChat.id = id
}

async function getGroupList() {
  await store.getGroupList().then((res) => {
    const mergedObj = {}
    Object.assign(mergedObj, groupList, res as Group)
    groupList = mergedObj
  })
}

async function createGroup() {
  if (createGroupName === '')
  // TODO: 处理错误
    return

  await store.createGroup(createGroupName).then((res) => {
    getGroupList()
    createGPModalVisible = false
  }).catch((err) => {
    alert(err)
  })
}

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
          getGroupList()
          joinGPModalVisible = false
        }).catch((err) => {
          alert(err)
        })
        break
      case 'ac':
        await store.joinGroup(form).then((res) => {
          alert('已发送入群申请')
          getGroupList()
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
      break
    case 1:
      break
    case 2:
      break
    case 3:
      joinGPModalVisible = true
      break
  }
}

async function sendMessage() {
  if (inputMessage.trim() === '')
    return

  if (activeChat.type === 'group') {
    const msg = {
      msg_chain: [{ type: 'text', msg: inputMessage }],
    }
    const form = {
      group_id: activeChat.id,
      msg: JSON.stringify(msg),
    }
    await store.sendGroupMsg(form).then((res) => {
      messageList.push({
        group_id: activeChat.id,
        user_id: getCookie('user_id')!,
        msg: inputMessage,
        time: getDisplayTime(),
      })
      inputMessage = ''
    },
    ).catch((err) => {
      alert(err)
    })
  }
  // TODO: 好友消息
}
async function logout() {
  await store.logout().then((_) => {
    router.push('/login')
  })
}
</script>

<template>
  <div h-full grid="~ cols-12">
    <!-- Sidebar -->
    <div col-span-1 flex="~ col" p="y5" justify-between items-center>
      <p text-xl font-bold mb-10>
        <span text-primary>H</span>CAT
      </p>
      <div flex-1 flex="~ col" gap-5>
        <button v-for="item, index in sideBarButtonList" :key="item.text" flex="~ col" items-center text-xs gap-2 @click="sideBarAction(index)">
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
    <!-- Chat -->
    <div grid="~ cols-12" rounded-2xl bg-back-gray col-span-8 of-hidden>
      <div col-span-4 flex="~ col" p="y5 x5" gap-5>
        <!-- Search bar -->
        <div flex gap-3>
          <div flex-1 px-5 rounded-lg gap-3 h-10 flex items-center bg="back-light">
            <div text-text-secondary i-carbon-search />
            <input w-full outline-none bg-transparent>
          </div>
          <button text-text-secondary hover="text-text-light" bg-back-light w-10 h-10 rounded-lg flex items-center justify-center @click="createGPModalVisible = true">
            <div i-carbon-add />
            <!-- Create group Modal -->
            <Modal v-model:visible="createGPModalVisible">
              <div flex="~ col" gap-10>
                <div flex-1 flex="~ col" items-center gap-5>
                  <img w-20 h-20 src="/logo.png">
                  <TextInput v-model="createGroupName" text-sm label="群组名" />
                </div>
                <TextButton text="创建" @click="createGroup" />
              </div>
            </Modal>
          </button>
        </div>
        <!-- Chat card -->
        <div flex="~ col">
          <GroupChatCard v-for="item, key in groupList" :key="item.group_name" :group_id="key" :selected="selectedGroup === key" :name="item.group_name" :new-message-number="99" @click="selectGroup(key as string)" />
        </div>
      </div>
      <div col-span-8 flex="~ col" p="x8 t5" of-hidden>
        <!-- Group title -->
        <div flex justify-between items-center>
          <div flex="~ col">
            <div flex="~ col" gap-1>
              <p text="lg start" font-bold>
                {{ groupList[selectedGroup]?.group_name ?? '群组' }}
              </p>
              <!-- <p text="text-secondary sm">
                {{ groupList.find((item) => item.id === selectedGroup)?.members.length }} members
              </p> -->
            </div>
          </div>
          <div flex gap-5>
            <button>
              <div text-text-secondary i-carbon-clean />
            </button>
            <button>
              <div text-text-secondary i-carbon-search />
            </button>
            <button>
              <div text-text-secondary i-carbon-open-panel-right />
            </button>
          </div>
        </div>
        <!-- Group chat -->
        <div flex="~ col" of="y-auto" flex-1 p="y10" gap-5 class="no-scrollbar">
          <ChatBubble v-for="item in messageList" :key="item.msg" :time="item.time" :from-self="item.user_id === getCookie('user_id')!" :message="item.msg" />
        </div>
        <!-- Input -->
        <div flex items-center m="y5" gap-3 text="text-secondary">
          <button :disabled="activeChat.type === null">
            <div i-carbon-attachment />
          </button>
          <input v-model="inputMessage" :disabled="activeChat.type === null" placeholder="说点什么吧" flex-1 bg-transparent outline-none @keydown.enter="sendMessage">
        </div>
      </div>
    </div>
    <div col-span-3 flex="~ col" p-5 gap-5>
      <div flex="~" justify-between>
        <h1 text="lg" font-bold>
          聊天设定
        </h1>
      </div>
      <div flex justify-start gap-3>
        <button hover="bg-back-light" w-13 h-13 bg-back-gray flex items-center justify-center rounded-xl>
          <div i-carbon-text-annotation-toggle />
        </button>
        <button hover="bg-back-light" w-13 h-13 bg-back-gray flex items-center justify-center rounded-xl>
          <div i-carbon-notification />
        </button>
      </div>
      <div flex-1 />
      <div flex>
        <button bg-back-gray w-full py-2 rounded-lg hover="bg-back-light" text-important>
          离开群组
        </button>
      </div>
    </div>
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
