<script setup lang="ts">
import { useStore, useUserStore } from '~/stores'
import type { Profile } from '~/types'

const props = defineProps<{
  modalVisible: boolean
  close: () => void
  profile: Profile
}>()

const store = useStore()
const userStore = useUserStore()

let profiles = reactive<Profile>(props.profile)
async function updateProfile() {
  await store.updateProfile({
    bio: profiles.bio,
    gender: profiles.gender,
  })
  await store.getProfile(userStore.userId)
  props.close()
}

watch(() => props.modalVisible, () => {
  if (props.modalVisible)
    profiles = props.profile
})
</script>

<template>
  <Modal :modal-visible="modalVisible" @close="close">
    <div space-y-3>
      <div w-full flex items-center justify-center>
        <img :src="profiles.avatar.length === 0 ? '/avatar.jpeg' : profiles.avatar" alt="avatar" w-15 h-15 rounded-full>
      </div>
      <div flex bg-back px-3 py-2 rounded gap-5>
        <span w-10 text-start>昵称</span>
        <input disabled :value="profiles.name" bg-transparent outline-none type="text">
      </div>
      <div flex bg-back px-3 py-2 rounded gap-5>
        <span w-10 text-start>ID</span>
        <input v-model="profiles.id" disabled bg-transparent outline-none type="text">
      </div>
      <div flex bg-back px-3 py-2 rounded gap-5>
        <span w-10 text-start>个签</span>
        <input v-model="profiles.bio" bg-transparent outline-none type="text">
      </div>
      <div flex bg-back px-3 py-2 rounded gap-5>
        <span w-10 text-start>性别</span>
        <input v-model="profiles.gender" bg-transparent outline-none type="text">
      </div>
      <div flex w-full justify-end gap-3>
        <button rounded border-base px-5 py-1 hover:bg-op10 bg-back bg-op0 @click="close">
          取消
        </button>
        <button rounded bg-primary px-5 py-1 bg-op80 hover:bg-op100 @click="updateProfile">
          保存
        </button>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
</style>
