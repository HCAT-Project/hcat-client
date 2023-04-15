<script setup lang="ts">
import GroupListHead from '../../components/group/GroupListHead.vue'
import { useStore } from '~/stores/store'

const store = useStore()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  await store.getGroupList()
})

const selectGroupId = computed(() => {
  return route.path.split('/')[2]
})

function selectGroup(id: string) {
  router.replace(`/groups/${id}`)
}
</script>

<template>
  <!-- Chat -->
  <div flex>
    <div w="70" rounded="l-2xl" bg-back-gray of-hidden hidden md:block>
      <div flex="~ col" p="y5 x5" gap-5>
        <GroupListHead />
        <div flex="~ col">
          <ChatCard v-for="item, key in store.groupList" id="==@click=&quot;selectGroup(key" :key="item.group_name" :group_id="key" :name="item.group_name" :new-message-number="99" :selected="selectGroupId === key" @click="selectGroup(key as string)" />
        </div>
      </div>
    </div>
    <RouterView flex-1 />
  </div>
</template>

<route lang="yaml">
name: groups
meta:
  requiresAuth: true
  tab: 0
</route>
