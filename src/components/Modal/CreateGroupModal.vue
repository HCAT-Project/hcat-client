<script setup lang="ts">
import { useStore, useToastStore } from '~/stores'

defineProps<{
  modalVisible: boolean
  close: () => void
}>()

const store = useStore()
const toastStore = useToastStore()

const createGroupName = $ref('')

async function createGroup() {
  if (createGroupName === '')
    return
  await store.createGroup(createGroupName).then(async (res) => {
    await store.getGroupList()
    close()
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}
</script>

<template>
  <Modal :modal-visible="modalVisible" @close="close">
    <div flex="~ col" gap-10>
      <div flex-1 flex="~ col" items-center gap-5>
        <img w-20 h-20 src="/logo.png">
        <TextInput v-model="createGroupName" text-sm label="群组名" />
      </div>
      <TextButton text="创建" @click="createGroup" />
    </div>
  </Modal>
</template>

<style scoped>

</style>
