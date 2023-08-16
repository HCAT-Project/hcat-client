<script setup lang="ts">
import { useSidebarStore } from '~/stores'
import { useStore } from '~/stores/store'

const store = useStore()
const sidebarStore = useSidebarStore()
const router = useRouter()
const route = useRoute()
const reg = /\/[\w]+\/([^\/]+)/
const input = ref('')
let friendList: string[] = []

watch(
  input,
  () => {
    if (input.value === '') {
      friendList = store.friendList
    }
    else {
      friendList = store.friendList.filter((item) => {
        return item.includes(input.value)
      })
    }
  },
  { immediate: true },
)

watch(
  () => store.friendList,
  () => {
    if (input.value === '') {
      friendList = store.friendList
    }
    else {
      friendList = store.friendList.filter((item) => {
        return item.includes(input.value)
      })
    }
  },
)

onMounted(async () => {
  await store.getFriendList()
})

const selectFriendId = computed(() => {
  const result = route.path.match(reg)
  return result ? result[1] : ''
})

function selectFriend(friendId: string) {
  router.replace(`/friends/${friendId}`)
  sidebarStore.show = false
}
</script>

<template>
  <div w="70" rounded="l-2xl" bg-back-gray flex-col h-full>
    <ChatListHead p-5 />
    <div of-y-auto p="x5" class="no-scrollbar">
      <ChatCard
        v-for="item in friendList"
        :key="item" :item-id="item" :name="item"
        :new-message-number="route.path.includes(item) || !store.unReadMsg[item] ? 0 : store.unReadMsg[item].number"
        :selected="selectFriendId === item"
        :new-message=" !store.unReadMsg[item] ? '' : store.unReadMsg[item].lastMsg"
        @click="selectFriend(item)"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
