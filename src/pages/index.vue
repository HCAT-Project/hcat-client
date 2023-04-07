<script setup lang="ts" generic="T extends any, O extends any">
import axios from 'axios'
import { deleteCookie } from '~/composables'
import { IP } from '~/constant'

axios.defaults.withCredentials = true

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

const router = useRouter()
const createGroupName = $ref('')
const joinGroupID = $ref('')
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
let createGPModalVisible = $ref(false)
let joinGPModalVisible = $ref(false)
const addMessage = $ref('')
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

onMounted(async () => {
  if (!await authenticateToken())
    router.push('/login')

  fetchGroups()
})

function selectGroup(id: string) {
  selectedGroup = id
}

async function fetchGroups() {
  await axios.get(
    `${IP}/group/get_groups`,
  ).then((res) => {
    if (res.data.status === 'ok') {
      const mergedObj = {}
      Object.assign(mergedObj, groupList, res.data.data as Group)
      groupList = mergedObj
    }
    else {
      // TODO: 处理错误
    }
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
      fetchGroups()
      createGPModalVisible = false
    }
    else {
      // TODO: 处理错误
    }
  }).catch((_) => {

  })
}

async function joinGroup() {
  // TODO: 自由进出与需要验证分开处理
  if (joinGroupID === '') {
    // TODO: 处理错误
    return
  }

  const form = new FormData()
  form.append('group_id', joinGroupID)
  await axios.post(
    `${IP}/group/get_verification_method`,
    form,
  ).then(async (res) => {
    if (res.data.status === 'ok') {
      const joinForm = new FormData()
      joinForm.append('group_id', joinGroupID)
      joinForm.append('add_info', addMessage)

      switch (res.data.data.verification_method) {
        case 'fr':
          await axios.post(
            `${IP}/group/join_group`,
            joinForm,
            {
              withCredentials: true,
            },
          ).then((res) => {
            if (res.data.status === 'ok') {
              fetchGroups()
              joinGPModalVisible = false
            }
            else {
              // TODO: 处理错误
            }
          })
          break
        case 'ac':
          axios.post(
              `${IP}/group/join_group`,
              joinForm,
          ).then((res) => {
            if (res.data.status === 'ok') {
              fetchGroups()
              joinGPModalVisible = false
            }
            else {
              // TODO: 处理错误
              alert(res.data.message)
            }
          })
          break
        case 'na':
          // TODO:
          break
        case 'aw':
          // TODO:
          break
      }
      // fetchGroups()
      // joinGPModalVisible = false
    }
    else {
      // TODO: 处理错误
    }
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

async function logOut() {
  await axios.post(
    `${IP}/account/logout`,
  ).then((res) => {
    if (res.data.status === 'ok') {
      deleteCookie('user_id')
      router.push('/login')
    }
    else {
      // TODO: 处理错误
    }
  }).catch((_) => {

  })
}
</script>

<template>
  <div h-full grid="~ cols-24">
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
    <div grid="~ cols-12" rounded-2xl bg-back-gray col-span-16 of-hidden>
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
          <GroupChatCard v-for="item, key in groupList" :key="item.group_name" :selected="selectedGroup === key" :name="item.group_name" :new-message-number="99" @click="selectGroup(key as string)" />
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
    <div col-span-7 flex="~ col" justify-center items-center>
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
