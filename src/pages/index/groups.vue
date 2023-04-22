<script setup lang="ts">
import GroupListHead from '../../components/group/GroupListHead.vue'
import { useStore } from '~/stores/store'

const store = useStore()
const router = useRouter()
const route = useRoute()
const reg = /\/[\w]+\/([^\/]+)/

onMounted(async () => {
  await store.getGroupList()
})

const selectGroupId = computed(() => {
  const result = route.path.match(reg)
  return result ? result[1] : ''
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
          <ChatCard
            v-for="item, key in store.groupList"
            :key="item.group_name" :item-id="key" :name="item.group_name"
            :new-message-number="route.path.includes(key as string) || !store.unReadMsg[key] ? 0 : store.unReadMsg[key].number"
            :selected="selectGroupId === key"
            :new-message=" !store.unReadMsg[key] ? '' : store.unReadMsg[key].lastMsg"
            @click="selectGroup(key as string)"
          />
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
