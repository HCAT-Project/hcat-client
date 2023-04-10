<script setup lang="ts">
import { useStore } from '~/stores/store'
import type { ChatType, GroupMessage } from '~/types'

const props = defineProps<{
  id: string
}>()

const store = useStore()
const router = useRouter()
const verificationMethod = $ref({
  fr: '自由加入',
  ac: '需要验证',
  aw: '回答问题',
  na: '禁止加入',
})
let transferModalVisible = $ref(false)
let questionModalVisible = $ref(false)
let renameModalVisible = $ref(false)
let inputMessage = $ref('')
const newGroupName = $ref('')

watch(() => props.id, async () => {
  if (!store.groupList[props.id]) {
    router.replace('/groups')
    return
  }
  await changeActiveChat('group', props.id)
}, { immediate: true })

async function changeActiveChat(type: ChatType, id: string) {
  // TODO:区分群聊和私聊
  store.activeChat.type = type
  store.activeChat.id = id

  const requestList = [getSelfPmsInGroup(), getGroupSetting(), getGroupMembers()]
  await Promise.all(requestList)
}

async function getGroupMembers() {
  await store.getGroupMembers().then((res) => {
    // 将permission为owner的member放在第一位
    const owners = []
    const members = []
    for (const k in res) {
      const member = { user_id: k, permission: res[k].permission }
      if (res[k].permission === 'owner')
        owners.unshift(member)
      else
        members.push(member)
    }
    store.activeChat.members = owners.concat(members)
  }).catch((_) => {
  })
}

async function getGroupSetting() {
  await store.getGroupSetting().then((res) => {
    store.activeChat.setting = res
  }).catch((_) => {
  })
}

async function getSelfPmsInGroup() {
  store.getSelfPmsInGroup().then((res: any) => {
    store.activeChat.permission = res
  }).catch((_) => {
  })
}

async function sendMessage() {
  if (inputMessage.trim() === '')
    return

  if (store.activeChat.type === 'group') {
    const msg = {
      msg_chain: [{ type: 'text', msg: inputMessage }],
    }
    const form = {
      group_id: store.activeChat.id,
      msg: JSON.stringify(msg),
    }
    await store.sendGroupMsg(form).then((res: any) => {
      const user_id = getCookie('user_id')!
      store.groupMessages[store.activeChat.id] = [
        ...store.groupMessages[store.activeChat.id] ?? [],
        {
          type: 'group_msg',
          group_id: store.activeChat.id,
          user_id,
          member_name: user_id,
          member_nick: '',
          rid: '',
          msg,
          time: Date.now() / 1000,
        },
      ]
      inputMessage = ''
    },
    ).catch((err) => {
      alert(err)
    })
  }
  // TODO: 好友消息
}

async function changeGroupSetting() {
  const setting = toRaw(store.activeChat.setting)
  const form = {
    group_id: store.activeChat.id,
    setting: JSON.stringify(setting),
  }
  await store.changeGroupSetting(form).then((res) => {

  }).catch((err) => {
    alert(err)
  })
}

async function leaveGroup() {
  await store.leaveGroup(store.activeChat.id).then(async (res) => {
    alert('已退出群聊')
    await store.getGroupList()
    store.activeChat.id = ''
    router.replace('/groups')
  }).catch((err) => {
    alert(err)
  })
}

async function fetchTodo() {
  await store.getTodoList().then((res) => {
    res.filter(item => item.type === 'group_msg').forEach((item) => {
      const msg = item as GroupMessage
      store.groupMessages[store.activeChat.id] = [
        ...store.groupMessages[store.activeChat.id] ?? [],
        msg,
      ]
    })
  }).catch((err) => {
    alert(err)
  })
}

async function giveAdmin(userId: string) {
  await store.addAdmin(userId).then(async (res) => {
    await getGroupMembers()
  }).catch((err) => {
    alert(err)
  })
}

async function removeAdmin(userId: string) {
  await store.removeAdmin(userId).then(async (res) => {
    await getGroupMembers()
  }).catch((err) => {
    alert(err)
  })
}

async function kickMember(userId: string) {
  await store.kickMember(userId).then(async (res) => {
    await getGroupMembers()
  }).catch((err) => {
    alert(err)
  })
}

async function transferOwnership(userId: string) {
  await store.transferOwnership(userId).then(async (res) => {
    transferModalVisible = false
    store.activeChat.permission = 'admin'
    await getGroupMembers()
  }).catch((err) => {
    alert(err)
  })
}

async function saveQuestion() {
  await changeGroupSetting()
  questionModalVisible = false
}

async function renameGroup() {
  await store.renameGroup(newGroupName).then(async (res) => {
    await store.getGroupList()
    renameModalVisible = false
  }).catch((err) => {
    alert(err)
  })
}

function clearMessages() {
  store.groupMessages[store.activeChat.id] = []
}
</script>

<template>
  <div flex>
    <!-- Chat window -->
    <div flex-1 flex="~ col" p="x8 t5" rounded="r-2xl" bg-back-gray of-hidden>
      <!-- Group title -->
      <div flex justify-between items-center>
        <div flex="~ col">
          <div flex="~ col" gap-1>
            <p text="lg start" font-bold>
              {{ store.groupList[store.activeChat.id]?.group_name ?? '群组' }}
            </p>
          </div>
        </div>
        <div flex gap-5>
          <button @click="clearMessages">
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
        <ChatBubble v-for="item, idx in store.groupMessages[store.activeChat.id]" :key="idx" :time="convertTimeStampToTime(item.time)" :from-self="item.user_id === getCookie('user_id')!" :message="item.msg.msg_chain[0].msg" />
      </div>
      <!-- Input -->
      <div flex items-center m="y5" gap-3 text="text-secondary">
        <button :disabled="store.activeChat.type === null">
          <div i-carbon-attachment />
        </button>
        <input v-model="inputMessage" :disabled="store.activeChat.type === null" placeholder="说点什么吧" flex-1 bg-transparent outline-none @keydown.enter="sendMessage">
        <button active="-rotate-180" transition-all @click="fetchTodo">
          <div i-carbon-rotate-360 />
        </button>
      </div>
    </div>
    <!-- Chat setting -->
    <div min-w-60 flex="md:~ col" p-5 gap-5 hidden>
      <h1 text="lg" font-bold text-start>
        聊天设定<span mx-2 text="text-secondary xs" font-sans>{{ id }}</span>
      </h1>
      <div flex justify-between gap-3>
        <button hover="bg-back-light" w-12 h-12 bg-back-gray flex items-center justify-center rounded-xl @click="() => { renameModalVisible = true ;newGroupName = store.groupList[store.activeChat.id].group_name }">
          <div i-carbon-text-annotation-toggle />
          <Modal v-model:visible="renameModalVisible" title="更改群名">
            <div flex="~ col" gap-5 p="x5 y5">
              <div flex="~ col" gap-3>
                <TextInput v-model="newGroupName" label="群名" />
              </div>
              <div flex justify-end gap-3>
                <TextButton text="保存" @click="renameGroup" />
              </div>
            </div>
          </Modal>
        </button>
        <button :disabled="store.activeChat.setting.verification_method !== 'aw'" hover="bg-back-light" w-12 h-12 bg-back-gray flex items-center justify-center rounded-xl @click="questionModalVisible = true">
          <div i-carbon-password />
          <Modal v-model:visible="questionModalVisible" title="修改验证问题">
            <div flex="~ col" gap-5 p="x5 y5">
              <div flex="~ col" gap-3>
                <TextInput v-model="store.activeChat.setting.question" label="问题" />
                <TextInput v-model="store.activeChat.setting.answer" label="答案" />
              </div>
              <div flex justify-end gap-3>
                <TextButton text="保存" @click="saveQuestion" />
              </div>
            </div>
          </Modal>
        </button>
        <button hover="bg-back-light" w-12 h-12 bg-back-gray flex items-center justify-center rounded-xl>
          <div i-carbon-copy />
        </button>
      </div>
      <div flex-1 flex="~ col">
        <!-- Members -->
        <div v-for="item, key in store.activeChat.members" :key="key" flex items-center justify-between hover="bg-back-gray" rounded-lg p="x3 y2">
          <div flex items-center gap-3>
            <img src="/avatar.jpeg" w-10 h-10 rounded-full>
            <p text="lg" font-bold>
              {{ item.user_id }}
            </p>
          </div>
          <div flex gap-2 items-end>
            <!--  -->
            <div v-if="item.permission === 'owner'" text-warning i-carbon-user-certification />
            <button v-else-if="item.permission === 'admin'" :disabled="store.activeChat.permission !== 'owner'" @click="removeAdmin(item.user_id)">
              <div text-safe i-carbon-user-sponsor />
            </button>
            <button v-else :disabled="store.activeChat.permission !== 'owner'" @click="giveAdmin(item.user_id)">
              <div text-text-secondary i-carbon-user-admin />
            </button>
            <!--  -->
            <button v-if="item.permission !== 'owner' && store.activeChat.permission !== 'member' && item.user_id !== getCookie('user_id')" @click="kickMember(item.user_id)">
              <div text="important xs" i-carbon-trash-can />
            </button>
          </div>
        </div>
      </div>
      <div v-if="store.activeChat.permission === 'owner' || store.activeChat.permission === 'admin'" flex="~ col" text-start gap-1>
        <p>加群方式</p>
        <div px="3" flex bg-back-gray rounded-lg hover="bg-back-light">
          <select v-if="store.activeChat.setting" v-model="store.activeChat.setting.verification_method" flex-1 p=" y3" bg-transparent outline-none @change="changeGroupSetting">
            <option v-for="item, key in verificationMethod" :key="key" :value="key">
              {{ item }}
            </option>
          </select>
        </div>
      </div>
      <button v-if="store.activeChat.permission === 'owner'" bg-back-gray w-full py-2 rounded-lg hover="bg-back-light" text-important @click="transferModalVisible = true">
        转让群组
      </button>
      <button v-else bg-back-gray w-full py-2 rounded-lg hover="bg-back-light" text-important @click="leaveGroup">
        离开群组
      </button>
      <Modal v-model:visible="transferModalVisible" text="text-light" title="转让群组">
        <div flex="~ col" gap-5>
          <div flex-1 flex="~ col">
            <!-- Members -->
            <div v-for="item, key in store.activeChat.members" :key="key" flex items-center justify-between hover="bg-back-light" rounded-lg p="x3 y2">
              <div flex items-center gap-3>
                <img src="/avatar.jpeg" w-10 h-10 rounded-full>
                <p text="lg" font-bold>
                  {{ item.user_id }}
                </p>
              </div>
              <div flex gap-2 items-end>
                <!--  -->
                <button v-if="item.permission !== 'owner'" @click="transferOwnership(item.user_id)">
                  <div i-carbon-study-skip />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>
