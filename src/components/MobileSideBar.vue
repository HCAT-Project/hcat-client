<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'
import { useSidebarStore, useStore } from '~/stores'

const sidebarStore = useSidebarStore()

const route = useRoute()
const store = useStore()
</script>

<template>
  <Transition name="fade">
    <div v-show="sidebarStore.show" absolute inset-0 bg="black op60" backdrop-blur-sm z-50>
      <Transition>
        <OnClickOutside v-show="sidebarStore.show" w="2/3" bg-back-gray flex border-base h-full @trigger="sidebarStore.show = false">
          <NavSideBar />
          <template v-if="route.path.includes('friends')">
            <ChatListContent :list="store.friendList" type="friends" />
          </template>
          <template v-else-if="route.path.includes('groups')">
            <ChatListContent :list="store.groupList" type="groups" />
          </template>
          <template v-else>
            <NotificationCate />
          </template>
        </OnClickOutside>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

.v-enter-from,
.v-leave-to {
transform:translateX( -100%)
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
