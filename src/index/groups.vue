<script setup lang="ts">
</script>

<template>
  <div col-span-4 flex="~ col" p="y5 x5">
    <GroupChatCard v-for="item in groupList" :key="item.id" :selected="selectedGroup === item.id" :name="item.name" :new-message-number="99" @click="selectGroup(item.id)" />
  </div>
</template>
