<script setup lang="ts" generic="T extends any, O extends any">
import { useStore } from '~/stores/store.js'

const store = useStore()
const route = useRoute()

watch(() => route.meta.tab, () => {
  store.activeTab = route.meta.tab as number ?? -1
}, { immediate: true })

onMounted(() => {
  setInterval(async () => {
    await store.getTodoList()
  }, 2000)
})
</script>

<template>
  <div h-full flex="~">
    <!-- Sidebar -->
    <NavSideBar />
    <RouterView flex-1 />
  </div>
</template>
