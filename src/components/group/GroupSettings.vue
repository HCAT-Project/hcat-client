<script setup lang="ts">
import { useToastStore } from '~/stores'
import { useStore } from '~/stores/store.js'
import type { GroupMember, GroupPermission, GroupSetting } from '~/types'

const props = defineProps<{
  id: string
}>()

const store = useStore()
const toastStore = useToastStore()
const router = useRouter()
const verificationMethod = $ref({
  fr: '自由加入',
  ac: '需要验证',
  aw: '回答问题',
  na: '禁止加入',
})
let selfPermission = $ref<GroupPermission>('member')
let groupSettings = $ref<GroupSetting>()
let groupMembers = $ref<GroupMember[]>([])
const transferModalVisible = $ref(false)
const questionModalVisible = $ref(false)
const renameModalVisible = $ref(false)

watch(() => props.id, async () => {
  const requestList = [
    store.getSelfPmsInGroup(props.id),
    store.getGroupSetting(props.id),
    store.getGroupMembers(props.id),
  ]
  await Promise.all(requestList).then((res) => {
    selfPermission = res[0] as GroupPermission
    groupSettings = res[1] as GroupSetting
    groupMembers = res[2] as GroupMember[]
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}, { immediate: true })

async function changeGroupSetting(groupSettings: GroupSetting) {
  const setting = groupSettings
  const form = {
    group_id: props.id,
    setting: JSON.stringify(setting),
  }
  await store.changeGroupSetting(form).then((res) => {
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}

async function leaveGroup() {
  await store.leaveGroup(props.id).then(async (res) => {
    toastStore.showToast('已退出群聊', 'success')
    await store.getGroupList()
    router.replace('/groups')
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}

function writeToClipboard() {
  navigator.clipboard.writeText(props.id)
  toastStore.showToast('已复制群号', 'success')
}

async function refreshMemberList() {
  groupMembers = await store.getGroupMembers(props.id)
}
</script>

<template>
  <div min-w-60 flex="md:~ col" p-5 gap-5 hidden>
    <h1 text="lg" font-bold text-start>
      聊天设定<span mx-2 text="text-secondary xs" font-sans>{{ id }}</span>
    </h1>
    <div v-if="groupSettings" flex justify-between gap-3>
      <button hover="bg-back-light" w-12 h-12 bg-back-gray flex items-center justify-center rounded-xl @click="() => { renameModalVisible = true }">
        <div i-carbon-text-annotation-toggle />
        <RenameGroupModal :modal-visible="renameModalVisible" :close="() => { renameModalVisible = false }" :group-id="id" :group-name="store.groupList.find(item => item.id === id)?.groupName! " />
      </button>
      <button :disabled="groupSettings.verification_method !== 'aw'" hover="bg-back-light" w-12 h-12 bg-back-gray flex items-center justify-center rounded-xl @click="questionModalVisible = true">
        <div i-carbon-password />
        <GroupJoinQuestionModal :modal-visible="questionModalVisible" :close="() => { questionModalVisible = false }" :group-settings="groupSettings" :change-group-setting="changeGroupSetting" :group-id="id" />
      </button>
      <button hover="bg-back-light" w-12 h-12 bg-back-gray flex items-center justify-center rounded-xl @click="writeToClipboard">
        <div i-carbon-copy />
      </button>
    </div>
    <GroupMemberList :id="id" :permission="selfPermission" :members="groupMembers" @refresh-member-list="refreshMemberList" />
    <div v-if="selfPermission === 'owner' || selfPermission === 'admin'" flex="~ col" text-start gap-1>
      <p>加群方式</p>
      <div px="3" flex bg-back-gray rounded-lg hover="bg-back-light">
        <select v-if="groupSettings" v-model="groupSettings.verification_method" flex-1 p=" y3" bg-transparent outline-none @change="changeGroupSetting(groupSettings)">
          <option v-for="item, key in verificationMethod" :key="key" :value="key">
            {{ item }}
          </option>
        </select>
      </div>
    </div>
    <button v-if="selfPermission === 'owner'" bg-back-gray w-full py-2 rounded-lg hover="bg-back-light" text-important @click="transferModalVisible = true">
      转让群组
      <TransferGroupModal
        :modal-visible="transferModalVisible"
        :close="async () => {
          selfPermission = 'admin'
          groupMembers = await store.getGroupMembers(props.id)
        }"
        :group-id="id"
        :group-members="groupMembers"
      />
    </button>
    <button v-else bg-back-gray w-full py-2 rounded-lg hover="bg-back-light" text-important @click="leaveGroup">
      离开群组
    </button>
  </div>
</template>
