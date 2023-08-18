<script setup lang="ts">
import type { Profile } from '~/types'

defineProps<{
  modalVisible: boolean
  close: () => void
  profile: Profile
}>()
</script>

<template>
  <Modal :modal-visible="modalVisible" @close="close">
    <div space-y-3>
      <div w-full flex items-center justify-center>
        <img :src="profile.avatar.length === 0 ? '/avatar.jpeg' : profile.avatar" alt="avatar" w-15 h-15 rounded-full>
      </div>
      <div flex bg-back px-3 py-2 rounded gap-5>
        <span w-10 text-start>昵称</span>
        <input :value="profile.name" bg-transparent outline-none type="text">
      </div>
      <div flex bg-back px-3 py-2 rounded gap-5>
        <span w-10 text-start>ID</span>
        <input disabled :value="profile.id" bg-transparent outline-none type="text">
      </div>
      <div flex bg-back px-3 py-2 rounded gap-5>
        <span w-10 text-start>个签</span>
        <input :value="profile.bio" bg-transparent outline-none type="text">
      </div>
      <div flex bg-back px-3 py-2 rounded gap-5>
        <span w-10 text-start>性别</span>
        <input :value="profile.gender" bg-transparent outline-none type="text">
      </div>
      <div flex w-full justify-end gap-3>
        <button rounded border-base px-5 py-1 hover:bg-op10 bg-back bg-op0 @click="close">
          取消
        </button>
        <button rounded bg-primary px-5 py-1 bg-op80 hover:bg-op100>
          保存
        </button>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
</style>
