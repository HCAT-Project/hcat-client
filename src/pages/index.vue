<script setup lang="ts" generic="T extends any, O extends any">
import axios from 'axios'
import { deleteCookie } from '~/composables'
import { IP } from '~/constant'

const router = useRouter()
const createGroupName = $ref('')
let modalVisible = $ref(false)

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

async function createGroup() {
  if (createGroupName === '')
  // TODO: 处理错误
    return

  const form = new FormData()
  form.append('group_name', createGroupName)
  await axios.post(
    `${IP}/group/create_group`,
    form,
    {
      withCredentials: true,
    },
  ).then((res) => {
    if (res.data.status === 'ok') {
      // TODO: create group
      fetchGroups()
      modalVisible = false
    }
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
      <div col-span-4 flex="~ col" p="y5 x5" gap-5>
        <!-- Search bar -->
        <div flex gap-3>
          <div flex-1 px-5 rounded-lg gap-3 h-10 flex items-center bg="back-light">
            <div text-text-secondary i-carbon-search />
            <input w-full outline-none bg-transparent>
          </div>
          <button text-text-secondary hover="text-text-light" bg-back-light w-10 h-10 rounded-lg flex items-center justify-center @click="modalVisible = true">
            <div i-carbon-add />
            <!-- Modal -->
            <div v-if="modalVisible" cursor-auto z-50 absolute inset-0 bg="black op80" flex items-center justify-center>
              <div w-90 h-80 bg-back-gray flex="~ col" p="5" rounded>
                <div flex="~" justify-end>
                  <button @click.stop="modalVisible = false">
                    <div w-6 h-6 i-carbon-close />
                  </button>
                </div>
                <div flex-1 flex="~ col" items-center>
                  <img w-20 h-20 src="/logo.png" my5>
                  <TextInput v-model="createGroupName" text-sm label="群组名" />
                </div>
                <TextButton text="创建" @click="createGroup" />
              </div>
            </div>
          </button>
        </div>
        <!-- Chat card -->
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
