<script setup lang="ts">
import { useStore } from '~/stores/store'

const store = useStore()

const userId = $ref('')
const addInfo = $ref('')
let addModalVisible = $ref(false)

async function addFriend() {
  await store.addFriend(userId, addInfo).then()
    .catch(err => alert(err))
  addModalVisible = false
}
</script>

<template>
  <div flex gap-3>
    <div flex-1 px-5 rounded-lg gap-3 h-10 flex items-center bg="back-light">
      <div text-text-secondary i-carbon-search />
      <input w-full outline-none bg-transparent>
    </div>
    <button text-text-secondary hover="text-text-light" bg-back-light w-10 h-10 rounded-lg flex items-center justify-center @click="addModalVisible = true">
      <div i-carbon-add />
      <!-- Add friend Modal -->
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
    </button>
  </div>
</template>
