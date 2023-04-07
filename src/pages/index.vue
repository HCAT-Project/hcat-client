<script setup lang="ts" generic="T extends any, O extends any">
import axios from 'axios'
import { deleteCookie } from '~/composables'
import { IP } from '~/constant'

const router = useRouter()

onMounted(async () => {
  if (!await authenticateToken())
    router.push('/login')

  fetchGroups()
})

interface Group {
  id: number
  name: string
  members: User[]
}

interface User {
  name: string
}

interface SidebarButton {
  icon: string
  text: string
}

const userList: User[] = [
  {
    name: 'User',
  },
  {
    name: 'User 2',
  },
  {
    name: 'User 3',
  },
]

const groupList: Group[] = [
  {
    id: 1,
    name: 'Group 1',
    members: userList,
  },
  {
    id: 2,
    name: 'Group 2',
    members: userList.slice(0, 2),
  },
]

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

let selectedGroup = $ref<number>(-1)

function selectGroup(id: number) {
  selectedGroup = id
}

async function fetchGroups() {
  await axios.get(
    `${IP}/group/get_groups`,
    {
      withCredentials: true,
    },
  ).then((res) => {
    // if (res.data.status === 'ok')
    // TODO: fetch groups
  }).catch((_) => {

  })
}

async function logOut() {
  await axios.post(
    `${IP}/account/logout`,
    {},
    {
      headers: {
        'Content-Type': 'text/plain',
      },
      withCredentials: true,
    },
  ).then((res) => {
    if (res.data.status === 'ok') {
      deleteCookie('user_id')
      router.push('/login')
    }
  }).catch((_) => {

  })
}
</script>

<template>
  <div h-full grid="~ cols-12">
    <!-- Sidebar -->
    <div col-span-1 flex="~ col" p="y5" justify-between items-center>
      <p text-2xl font-bold mb-10>
        <span text-primary>H</span>CAT
      </p>
      <div flex-1 flex="~ col" gap-5>
        <button v-for="item in sideBarButtonList" :key="item.text" flex="~ col" items-center text-xs gap-2>
          <div w-6 h-6 :class="item.icon" />
          <p>{{ item.text }}</p>
        </button>
      </div>
      <div flex="~ col" gap-5 text="xs text-secondary">
        <button flex="~ col" items-center gap-2 hover="text-light" @click="logOut">
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
      <div col-span-4 flex="~ col" p="y5 x5">
        <GroupChatCard v-for="item in groupList" :key="item.id" :selected="selectedGroup === item.id" :name="item.name" :new-message-number="99" @click="selectGroup(item.id)" />
      </div>
      <div col-span-8 flex="~ col" p="x8 t5" of-hidden>
        <!-- Group title -->
        <div flex justify-between items-center>
          <div flex="~ col">
            <div flex="~ col" gap-1>
              <p text="lg start" font-bold>
                {{ groupList.find((item) => item.id === selectedGroup)?.name }}
              </p>
              <p text="text-secondary sm">
                {{ groupList.find((item) => item.id === selectedGroup)?.members.length }} members
              </p>
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
          <ChatBubble v-for="item in 10" :key="item" message="你好这条消息来自HCAT,我希望它能够在互联网传递给每一个友善的人。" />
        </div>
        <!-- Input -->
        <div flex items-center m="y5" gap-3 text="text-secondary">
          <button>
            <div i-carbon-attachment />
          </button>
          <input placeholder="说点什么吧" flex-1 bg-transparent outline-none>
        </div>
      </div>
    </div>
    <div col-span-3 flex="~ col" justify-center items-center>
      <div text-text-secondary>
        Placeholder
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
