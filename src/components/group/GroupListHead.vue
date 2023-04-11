<script setup lang="ts">
import { useStore } from '~/stores/store.js'

const createGroupName = $ref('')
const store = useStore()
let joinModalVisible = $ref(false)

async function createGroup() {
  if (createGroupName === '')
    return
  await store.createGroup(createGroupName).then(async (res) => {
    await store.getGroupList()
    joinModalVisible = false
  }).catch((err) => {
    alert(err)
  })
}
</script>

<template>
  <div flex gap-3>
    <div flex-1 px-5 rounded-lg gap-3 h-10 flex items-center bg="back-light">
      <div text-text-secondary i-carbon-search />
      <input w-full outline-none bg-transparent>
    </div>
    <button text-text-secondary hover="text-text-light" bg-back-light w-10 h-10 rounded-lg flex items-center justify-center @click="joinModalVisible = true">
      <div i-carbon-add />
      <!-- Create group Modal -->
      <Modal :modal-visible="joinModalVisible" @close="joinModalVisible = false">
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
</template>
