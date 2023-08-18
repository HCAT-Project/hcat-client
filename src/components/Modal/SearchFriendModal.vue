<script setup lang="ts">
import { useStore, useToastStore } from '~/stores'

const props = defineProps<{
  modalVisible: boolean
  close: () => void
}>()
const store = useStore()
const toastStore = useToastStore()
const userId = $ref('')
const addInfo = $ref('')

async function addFriend() {
  await store.addFriend(userId, addInfo).then(() => {
    props.close()
    toastStore.showToast('发送成功！', 'success')
  })
    .catch((err) => {
      toastStore.showToast(err, 'error')
    })
}
</script>

<template>
  <Modal :modal-visible="modalVisible" @close="close">
    <div flex="~ col" gap-10>
      <div flex-1 flex="~ col" items-center gap-5>
        <img w-20 h-20 src="/logo.png">
        <TextInput v-model="userId" text-sm label="用户ID" />
        <TextInput v-model="addInfo" text-sm label="附加消息" />
      </div>
      <TextButton text="添加" @click="addFriend" />
    </div>
  </Modal>
</template>

<style scoped>

</style>
