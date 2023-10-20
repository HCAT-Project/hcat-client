<script setup lang="ts">
import type { Group } from '~/types'
import { useStore } from '~/stores/store'
import { useSidebarStore } from '~/stores'

const props = defineProps<{
  type: 'groups' | 'friends'
  list: string[] | Group[]
}>()

const store = useStore()
const sidebarStore = useSidebarStore()
const router = useRouter()
const route = useRoute()
const reg = /\/[\w]+\/([^\/]+)/

onMounted(async () => {
  await store.getGroupList()
})

// watch(
//   input,
//   () => {
//     if (input.value === '') {
//       groupList = store.groupList
//     }
//     else {
//       groupList = store.groupList.filter((item) => {
//         const groupName = item.groupName.toLocaleLowerCase()
//         return groupName.includes(input.value.toLocaleLowerCase())
//       })
//     }
//   },
//   { immediate: true },
// )

const selectedId = computed(() => {
  const result = route.path.match(reg)
  return result ? result[1] : ''
})

function selectChat(id: string) {
  router.replace(`/${props.type}/${id}`)
  sidebarStore.show = false
}

// watch(
//   () => store.groupList,
//   () => {
//     if (input.value === '') {
//       groupList = store.groupList
//     }
//     else {
//       groupList = store.groupList.filter((item) => {
//         const groupName = item.groupName.toLocaleLowerCase()
//         return groupName.includes(input.value.toLocaleLowerCase())
//       })
//     }
//   },
// )
</script>

<template>
  <div w="70" rounded="l-2xl" bg-back-gray flex-col h-full>
    <ChatListHead p="x5 y5" />
    <div of-y-auto p="x5" class="no-scrollbar" space-y-0.5>
      <template v-if="type === 'friends'">
        <ChatCard
          v-for="item in list as string[]"
          :key="item" :item-id="item" :name="item"
          :new-message-number="route.path.includes(item) || !store.unReadMsg[item] ? 0 : store.unReadMsg[item].number"
          :selected="selectedId === item"
          :new-message=" !store.unReadMsg[item] ? '' : store.unReadMsg[item].lastMsg"
          @click="selectChat(item)"
        />
      </template>
      <template v-else>
        <ChatCard
          v-for="item in list as Group[]"
          :key="item.id" :item-id="item.id" :name="item.group_name"
          :new-message-number="route.path.includes(item.id) || !store.unReadMsg[item.id] ? 0 : store.unReadMsg[item.id].number"
          :selected="selectedId === item.id"
          :new-message=" !store.unReadMsg[item.id] ? '' : store.unReadMsg[item.id].lastMsg"
          @click="selectChat(item.id)"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>
