<script setup lang="ts">
import { useStore } from '~/stores/store'
import type { GroupMember, GroupPermission } from '~/types'

const props = defineProps<{
  id: string
  members: GroupMember[]
  permission: GroupPermission
}>()

const store = useStore()

async function giveAdmin(userId: string) {
  await store.addAdmin(props.id, userId).then(async (res) => {
    await store.getGroupMembers(props.id)
  }).catch((err) => {
    alert(err)
  })
}

async function removeAdmin(userId: string) {
  await store.removeAdmin(props.id, userId).then(async (res) => {
    await store.getGroupMembers(props.id)
  }).catch((err) => {
    alert(err)
  })
}

async function kickMember(userId: string) {
  await store.kickMember(props.id, userId).then(async (res) => {
    // await store.getGroupMembers(props.id)
  }).catch((err) => {
    alert(err)
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
        <button v-if="item.permission !== 'owner' && permission !== 'member' && item.user_id !== getCookie('user_id')" @click="kickMember(item.user_id)">
          <div text="important xs" i-carbon-trash-can />
        </button>
      </div>
    </div>
  </div>
</template>
