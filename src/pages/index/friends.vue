<script setup lang="ts">
import { useStore } from '~/stores/store'

const store = useStore()
const router = useRouter()
const route = useRoute()
const reg = /\/[\w]+\/([^\/]+)/

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
        <FriendListHead />
        <div flex="~ col">
          <ChatCard
            v-for="item, key in store.friendList"
            :key="key" :item-id="item" :name="item as string"
            :new-message-number="route.path.includes(item as string) || !store.unReadMsg[item] ? 0 : store.unReadMsg[item].number"
            :selected="selectFriendId === item"
            :new-message=" !store.unReadMsg[item] ? '' : store.unReadMsg[item].lastMsg"
            @click="selectFriend(item as string)"
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
