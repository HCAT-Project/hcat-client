<script setup lang="ts">
import { useStore, useToastStore } from '~/stores'

const props = defineProps<{
  modalVisible: boolean
  close: () => void
}>()

const joinGroupID = $ref('')
const addMessage = $ref('')
const answer = $ref('')
const store = useStore()
const toastStore = useToastStore()
let showQA = $ref(false)
let question = $ref('')

async function joinGroup() {
  // TODO: 自由进出与需要验证分开处理
  if (joinGroupID.trim() === '') {
    // TODO: 处理错误
    return
  }

  await store.getGroupVerification(joinGroupID).then(async (verification) => {
    question = verification.question
    const form = {
      group_id: joinGroupID,
      add_info: addMessage,
    }
    switch (verification.verification_method) {
      case 'fr':
        await store.joinGroup(form).then((res) => {
          store.getGroupList()
          props.close()
        }).catch((err) => {
          toastStore.showToast(err, 'error')
        })
        break
      case 'ac':
        await store.joinGroup(form).then((res) => {
          toastStore.showToast('已发送入群申请', 'success')
          props.close()
        }).catch((err) => {
          toastStore.showToast(err, 'error')
        })
        break
      case 'na':
        toastStore.showToast('该群不允许加入', 'error')
        break
      case 'aw':
        showQA = true
        break
    }
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}

async function submitAnswer() {
  await store.joinGroup({
    group_id: joinGroupID,
    add_info: answer,
  }).then((res) => {
    showQA = false
    props.close()
    toastStore.showToast('加入成功', 'success')
    store.getGroupList()
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}
</script>

<template>
  <Modal :modal-visible="modalVisible" :child-page-visible="showQA" @close="() => { close(), showQA = false }">
    <div v-if="!showQA" flex="~ col" gap-8>
      <div flex-1 flex="~ col" items-center gap-3>
        <img w-20 h-20 src="/logo.png">
        <TextInput v-model="joinGroupID" text-sm label="群组ID" />
        <TextInput v-model="addMessage" text-sm label="附加消息" />
      </div>
      <TextButton text="加入" @click="joinGroup" />
    </div>
    <div v-else>
      <div flex="~ col" gap-5>
        <div flex="~ col" gap-3>
          <TextInput v-model="question" :disabled="true" text-sm label="问题" />
          <TextInput v-model="answer" text-sm label="答案" />
        </div>
        <TextButton text="提交" @click="submitAnswer" />
      </div>
    </div>
  </Modal>
</template>

<style scoped>

</style>
