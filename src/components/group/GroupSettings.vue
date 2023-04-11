<script setup lang="ts">
import { useStore } from '~/stores/store.js'

const store = useStore()
const router = useRouter()
const verificationMethod = $ref({
  fr: '自由加入',
  ac: '需要验证',
  aw: '回答问题',
  na: '禁止加入',
})
const newGroupName = $ref('')
let transferModalVisible = $ref(false)
let questionModalVisible = $ref(false)
let renameModalVisible = $ref(false)

async function transferOwnership(userId: string) {
  await store.transferOwnership(userId).then(async (res) => {
    transferModalVisible = false
    store.activeChat.permission = 'admin'
    await store.getGroupMembers()
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
</script>

<template>
  <div min-w-60 flex="md:~ col" p-5 gap-5 hidden>
    <h1 text="lg" font-bold text-start>
      聊天设定<span mx-2 text="text-secondary xs" font-sans>{{ store.activeChat.id }}</span>
    </h1>
    <div flex justify-between gap-3>
      <button hover="bg-back-light" w-12 h-12 bg-back-gray flex items-center justify-center rounded-xl @click="() => { renameModalVisible = true ;newGroupName = store.groupList[store.activeChat.id].group_name }">
        <div i-carbon-text-annotation-toggle />
        <Modal :modal-visible="renameModalVisible" title="更改群名" @close="renameModalVisible = false">
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
        <Modal :modal-visible="questionModalVisible" title="修改验证问题" @close="questionModalVisible = false">
          <div flex="~ col" gap-8>
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
    <GroupMemberList />
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
    <Modal :modal-visible="transferModalVisible" text="text-light" title="转让群组" @close="transferModalVisible = false">
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
</template>
