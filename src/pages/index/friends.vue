<script setup lang="ts">
import FriendListHead from '~/components/friend/FriendListHead.vue'
import { useStore } from '~/stores/store'

const store = useStore()
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

onMounted(async () => {
  await store.getFriendList()
})

const selectFriendId = computed(() => {
  const result = route.path.match(reg)
  return result ? result[1] : ''
})

function selectFriend(friendId: string) {
  router.replace(`/friends/${friendId}`)
}
</script>

<template>
  <!-- Chat -->
  <div flex>
    <div w="70" rounded="l-2xl" bg-back-gray of-hidden hidden md:block>
      <div flex="~ col" p="y5 x5" gap-5>
        <FriendListHead v-model="input" />
        <div flex="~ col">
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
    </div>
    <RouterView flex-1 />
  </div>
</template>

<route lang="yaml">
name: friends
meta:
  requiresAuth: true
  tab: 1
</route>
