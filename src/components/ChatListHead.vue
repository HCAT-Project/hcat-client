<script setup lang="ts">
import type { Item } from '~/components/ui/DropdownBtn.vue'
import { useStore, useToastStore } from '~/stores'

const createGroupName = $ref('')
const userId = $ref('')
const addInfo = $ref('')
const store = useStore()
const toastStore = useToastStore()
let createGroupModalVisible = $ref(false)
let addModalVisible = $ref(false)

const itemsList: Item[] = [
  {
    label: '创建群组',
    onClick: () => {
      createGroupModalVisible = true
    },
  },
  {
    label: '查找群/用户',
    onClick: () => {
      addModalVisible = true
    },
  },
]

async function createGroup() {
  if (createGroupName === '')
    return
  await store.createGroup(createGroupName).then(async (res) => {
    await store.getGroupList()
    createGroupModalVisible = false
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}

async function addFriend() {
  await store.addFriend(userId, addInfo).then(() => {
    addModalVisible = false
    toastStore.showToast('发送成功！', 'success')
  })
    .catch((err) => {
      toastStore.showToast(err, 'error')
    })
}
</script>

<template>
  <div flex>
    <div flex-1 px-5 rounded-lg gap-3 h-10 flex items-center bg="back-light">
      <div text-text-secondary i-carbon-search />
      <input w-full outline-none bg-transparent>
    </div>

    <DropdownBtn icon="i-carbon-add" :items="itemsList" />
    <Modal :modal-visible="createGroupModalVisible" @close="createGroupModalVisible = false">
      <div flex="~ col" gap-10>
        <div flex-1 flex="~ col" items-center gap-5>
          <img w-20 h-20 src="/logo.png">
          <TextInput v-model="createGroupName" text-sm label="群组名" />
        </div>
        <TextButton text="创建" @click="createGroup" />
      </div>
    </Modal>

    <Modal :modal-visible="addModalVisible" @close="addModalVisible = false">
      <div flex="~ col" gap-10>
        <div flex-1 flex="~ col" items-center gap-5>
          <img w-20 h-20 src="/logo.png">
          <TextInput v-model="userId" text-sm label="用户ID" />
          <TextInput v-model="addInfo" text-sm label="附加消息" />
        </div>
        <TextButton text="添加" @click="addFriend" />
      </div>
    </Modal>
  </div>
</template>
