<script setup lang="ts">
import type { Item } from '~/components/ui/DropdownBtn.vue'

let createGroupModalVisible = $ref(false)
let searchFDModalVisible = $ref(false)
let searchGPModalVisible = $ref(false)

const itemsList: Item[] = [
  {
    label: '创建群组',
    onClick: () => {
      createGroupModalVisible = true
    },
  },
  {
    label: '查找用户',
    onClick: () => {
      searchFDModalVisible = true
    },
  },
  {
    label: '查找群组',
    onClick: () => {
      searchGPModalVisible = true
    },
  },
]
</script>

<template>
  <div flex>
    <div flex-1 px-5 rounded-lg gap-3 h-10 flex items-center bg="back-light">
      <div text-text-secondary i-carbon-search />
      <input w-full outline-none bg-transparent>
    </div>
    <DropdownBtn icon="i-carbon-add" :items="itemsList" />
    <CreateGroupModal :modal-visible="createGroupModalVisible" :close="() => { createGroupModalVisible = false }" />
    <SearchFriendModal :modal-visible="searchFDModalVisible" :close="() => { searchFDModalVisible = false }" />
    <SearchGroupModal :modal-visible="searchGPModalVisible" :close="() => { searchGPModalVisible = false }" />
  </div>
</template>
