<script setup lang="ts">
import type { Group } from '~/types'
import { useStore } from '~/stores/store'
import { useSidebarStore } from '~/stores'

const store = useStore()
const sidebarStore = useSidebarStore()
const router = useRouter()
const route = useRoute()
const reg = /\/[\w]+\/([^\/]+)/
const input = ref('')
let groupList: Group[] = $ref([])

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
  sidebarStore.show = false
}

watch(
  () => store.groupList,
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
)
</script>

<template>
  <div w="70" rounded="l-2xl" bg-back-gray flex-col h-full>
    <ChatListHead p="x5 y5" />
    <div of-y-auto p="x5" class="no-scrollbar">
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
</template>

<style scoped>

</style>
