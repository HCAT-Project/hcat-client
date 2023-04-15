<script setup lang="ts">
import { useStore } from '~/stores/store'

const props = defineProps<{
  id: string
}>()

const store = useStore()
const router = useRouter()

watch(() => props.id, async () => {
  if (!Object.values(store.friendList).includes(props.id))
    router.replace('/friends')
}, { immediate: true })
</script>

<template>
  <div flex>
    <div flex-1 flex="~ col" p="x8 t5" rounded="r-2xl" bg-back-gray of-hidden>
      <FriendChatHead :id="id" />
      <FriendChatContent :id="id" />
      <FriendChatInputPanel :id="id" />
    </div>
    <FriendSetting :id="id" />
  </div>
</template>
