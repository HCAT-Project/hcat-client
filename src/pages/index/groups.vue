<script setup lang="ts">
import type { Group } from '~/types'
import { useStore } from '~/stores/store'

const store = useStore()
const router = useRouter()
const route = useRoute()
const reg = /\/[\w]+\/([^\/]+)/
const input = ref('')
let groupList: Group[] = []

onMounted(async () => {
  await store.getGroupList()
})

watch(
  input,
  () => {
    if (input.value === '') {
      groupList = store.groupList
    }
    else {
      groupList = store.groupList.filter((item) => {
        const groupName = item.groupName.toLocaleLowerCase()
        return groupName.includes(input.value.toLocaleLowerCase())
      })
    }
  },
  { immediate: true },
)

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
        <GroupListHead v-model="input" />
        <div flex="~ col">
          <ChatCard
            v-for="item in groupList"
            :key="item.id" :item-id="item.id" :name="item.groupName"
            :new-message-number="route.path.includes(item.id) || !store.unReadMsg[item.id] ? 0 : store.unReadMsg[item.id].number"
            :selected="selectGroupId === item.id"
            :new-message=" !store.unReadMsg[item.id] ? '' : store.unReadMsg[item.id].lastMsg"
            @click="selectGroup(item.id)"
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
