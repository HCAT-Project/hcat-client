<script setup lang="ts">
import { useStore } from '~/stores/store'

const store = useStore()
const router = useRouter()
const route = useRoute()
onMounted(async () => {
  await store.getFriendList()
})

const selectFriendId = computed(() => {
  return route.path.split('/')[2]
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
            v-for="item, key in store.friendList" :key="item" :group_id="key" :selected="selectFriendId === item" :name="item" :new-message-number="99"
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
