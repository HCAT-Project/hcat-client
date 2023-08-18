<script setup lang="ts">
import { useStore, useToastStore } from '~/stores'
import type { GroupMember } from '~/types'

const props = defineProps<{
  modalVisible: boolean
  close: () => void
  groupMembers: GroupMember[]
  groupId: string
}>()

const emit = defineEmits(['refresh'])

const store = useStore()
const toastStore = useToastStore()

async function transferOwnership(userId: string) {
  await store.transferOwnership(props.groupId, userId).then(async (res) => {
    props.close()
    emit('refresh')
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}
</script>

<template>
  <Modal :modal-visible="modalVisible" text="text-light" title="转让群组" @close="close">
    <div flex="~ col" gap-5>
      <div flex-1 flex="~ col">
        <!-- Members -->
        <div v-for="item, key in groupMembers" :key="key" flex items-center justify-between hover="bg-back-light" rounded-lg p="x3 y2">
          <div flex items-center gap-3>
            <img src="/avatar.jpeg" w-10 h-10 rounded-full>
            <p text="lg" font-bold>
              {{ item.user_id }}
            </p>
          </div>
          <div flex gap-2 items-end>
            <!--  -->
            <button v-if="item.permission !== 'owner'" @click="transferOwnership(item.user_id)">
              <div i-carbon-study-skip />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped>

</style>
