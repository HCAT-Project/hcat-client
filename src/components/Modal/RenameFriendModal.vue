<script setup lang="ts">
import { useToastStore } from '~/stores'

defineProps < {
  modalVisible: boolean
  close: () => void
} > ()

const toastStore = useToastStore()

const newNickName = $ref('')

function renameFriend() {
  // TODO: rename friend
  toastStore.notImplemented()
}
</script>

<template>
  <Modal :modal-visible="modalVisible" title="更改备注" @close="close">
    <div flex="~ col" gap-8 p5>
      <div flex="~ col" gap-3>
        <TextInput v-model="newNickName" label="备注名" />
      </div>
      <div flex justify-end gap-3>
        <TextButton text="保存" @click="renameFriend" />
      </div>
    </div>
  </Modal>
</template>

<style scoped>

</style>
