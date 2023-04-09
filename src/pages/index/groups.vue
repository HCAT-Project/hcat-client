<script setup lang="ts">
import { useStore } from '~/stores/store'

const store = useStore()
const router = useRouter()
const createGroupName = $ref('')

let createGPModalVisible = $ref(false)

onMounted(async () => {
  await store.getGroupList()
})

function selectGroup(id: string) {
  store.activeChat.id = id
  router.push(`/groups/${id}`)
}

async function createGroup() {
  if (createGroupName === '')
  // TODO: 处理错误
    return

  await store.createGroup(createGroupName).then(async (res) => {
    await store.getGroupList()
    createGPModalVisible = false
  }).catch((err) => {
    alert(err)
  })
}
</script>

<template>
  <!-- Chat -->
  <div flex>
    <div w="70" rounded="l-2xl" bg-back-gray of-hidden hidden md:block>
      <div flex="~ col" p="y5 x5" gap-5>
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
          <GroupChatCard v-for="item, key in store.groupList" :key="item.group_name" :group_id="key" :selected="store.activeChat.id === key" :name="item.group_name" :new-message-number="99" @click="selectGroup(key as string)" />
        </div>
      </div>
    </div>
    <RouterView flex-1 />
  </div>
</template>

<route lang="yaml">
name: groups
meta:
  requiresAuth: true
  tab: 0
</route>
