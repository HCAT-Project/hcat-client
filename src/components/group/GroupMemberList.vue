<script setup lang="ts">
import { useStore, useToastStore, useUserStore } from '~/stores'
import type { GroupMember, GroupPermission } from '~/types'

const props = defineProps<{
  id: string
  members: GroupMember[]
  permission: GroupPermission
}>()

const emits = defineEmits<{
  (event: 'refreshMemberList'): void
}>()

const store = useStore()
const userStore = useUserStore()
const toastStore = useToastStore()

async function giveAdmin(userId: string) {
  await store.addAdmin(props.id, userId).then(async (res) => {
    emits('refreshMemberList')
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}

async function removeAdmin(userId: string) {
  await store.removeAdmin(props.id, userId).then(async (res) => {
    emits ('refreshMemberList')
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}

async function kickMember(userId: string) {
  await store.kickMember(props.id, userId).then(async (res) => {
    emits ('refreshMemberList')
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}
</script>

<template>
  <div flex-1 flex="~ col">
    <!-- Members -->
    <div v-for="item, key in members" :key="key" flex items-center justify-between hover="bg-back-gray" rounded-lg p="x3 y2">
      <div flex items-center gap-3>
        <img src="/avatar.jpeg" w-10 h-10 rounded-full>
        <p text="lg" font-bold>
          {{ item.user_id }}
        </p>
      </div>
      <div flex gap-2 items-end>
        <!--  -->
        <div v-if="item.permission === 'owner'" text-warning i-carbon-user-certification />
        <button v-else-if="item.permission === 'admin'" :disabled="permission !== 'owner'" @click="removeAdmin(item.user_id)">
          <div text-safe i-carbon-user-sponsor />
        </button>
        <button v-else :disabled="permission !== 'owner'" @click="giveAdmin(item.user_id)">
          <div text-text-secondary i-carbon-user-admin />
        </button>
        <!--  -->
        <button v-if="item.permission !== 'owner' && permission !== 'member' && userStore.userId" @click="kickMember(item.user_id)">
          <div text="important xs" i-carbon-trash-can />
        </button>
      </div>
    </div>
  </div>
</template>
