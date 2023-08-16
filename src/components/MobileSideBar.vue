<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'
import { useSidebarStore } from '~/stores'

const sidebarStore = useSidebarStore()

const route = useRoute()
</script>

<template>
  <Transition name="fade">
    <div v-show="sidebarStore.show" absolute inset-0 bg="black op80" z-50>
      <Transition>
        <OnClickOutside v-show="sidebarStore.show" w="2/3" bg-back-gray flex border-base h-full @trigger="sidebarStore.show = false">
          <NavSideBar />
          <template v-if="route.path.includes('groups')">
            <GroupList />
          </template>
          <template v-else-if="route.path.includes('friends')">
            <FriendList />
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
