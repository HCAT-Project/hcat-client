<script setup lang="ts">
import { useStore, useToastStore } from '~/stores'

const props = defineProps<{
  modalVisible: boolean
  close: () => void
  groupId: string
  groupName: string
}>()
const store = useStore()
const toastStore = useToastStore()

let newGroupName = $ref(props.groupName)

watch(() => props.modalVisible, () => {
  if (props.modalVisible)
    newGroupName = props.groupName
})

async function renameGroup() {
  await store.renameGroup(props.groupId, newGroupName).then(async () => {
    await store.getGroupList()
    props.close()
    toastStore.showToast('更改成功', 'success')
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}
</script>

<template>
  <Modal :modal-visible="modalVisible" title="更改群名" @close="close">
    <div flex="~ col" gap-8 p="x5 y5">
      <div flex="~ col" gap-3>
        <TextInput v-model="newGroupName" label="群名" />
      </div>
      <div flex justify-end gap-3>
        <TextButton text="保存" @click="renameGroup" />
      </div>
    </div>
  </Modal>
</template>

<style scoped>

</style>
