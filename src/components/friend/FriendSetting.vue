<script setup lang="ts">
import { useStore, useToastStore } from '~/stores'

const props = defineProps<{
  id: string
}>()

const store = useStore()
const toastStore = useToastStore()
const router = useRouter()
const renameModalVisible = $ref(false)

function deleteFriend() {
  store.deleteFriend(props.id).then(() => {
    router.replace('/friends')
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}
</script>

<template>
  <div min-w-60 flex="md:~ col" p-5 gap-5 hidden>
    <h1 text="lg" font-bold text-start>
      好友设定<span mx-2 text="text-secondary xs" font-sans>{{ id }}</span>
    </h1>
    <div flex justify-between gap-3>
      <button hover="bg-back-light" w-12 h-12 bg-back-gray flex items-center justify-center rounded-xl @click="() => { renameModalVisible = true }">
        <div i-carbon-text-annotation-toggle />
        <RenameFriendModal :modal-visible="renameModalVisible" :close="() => { renameModalVisible = false }" />
      </button>
    </div>
    <div flex-1 />
    <button v-if="id !== '0sAccount'" bg-back-gray w-full py-2 rounded-lg hover="bg-back-light" text-important @click="deleteFriend">
      删除好友
    </button>
  </div>
</template>
