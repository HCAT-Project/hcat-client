<script setup lang="ts">
import { useStore } from '~/stores/store.js'
import type { GroupAdminChange, GroupJoinRequest, MemberRemoved } from '~/types'

// TODO: 处理不同群组消息
const props = defineProps<{
  item: GroupAdminChange | GroupJoinRequest | MemberRemoved
}>()

const store = useStore()

function agreeJoinReq() {
  store.agreeJoinGroupReq(props.item.rid).then((res) => {
    store.removeGroupNotification(props.item.rid)
  }).catch((err) => {
    alert(err)
  })
}
</script>

<template>
  <div flex="~" items-center text-start gap-3 text-sm p-3 bg="back-gray" w-full max-w-150 rounded="lg">
    <img src="/avatar.jpeg" w-15 h-15 rounded="full">
    <template v-if="item.type === 'group_join_request'">
      <div flex="~ col" gap-1>
        <p flex items-end gap-2 text="warning">
          {{ item.user_id }}
          <span text="text-secondary">{{ convertTimeStampToTime(item.time) }}</span>
        </p>
        <p>
          申请加入
          <span text="warning">{{ item.group_id }}</span>
        </p>
        <p text="text-secondary xs">
          留言:
          <span>{{ item.add_info }}</span>
        </p>
      </div>
      <div flex-1 />
      <button border="~ back-light" rounded p="x3 y1" hover="bg-back-light" @click="agreeJoinReq">
        同意
      </button>
      <button border="~ back-light" rounded p="x3 y1" hover="bg-back-light">
        拒绝
      </button>
    </template>
    <template v-else-if="item.type === 'admin_added' || item.type === 'admin_removed'">
      <div flex="~ col" gap-1>
        <p flex items-end gap-2 text="warning">
          {{ item.name ?? item.admin_id }}
          <span text="text-secondary">{{ convertTimeStampToTime(item.time) }}</span>
        </p>
        <p>
          {{ item.type === 'admin_added' ? '被添加' : '被移除' }}
          <span text="warning">{{ item.group_id }}</span> 管理员
        </p>
      </div>
      <div flex-1 />
    </template>
    <template v-else-if="item.type === 'member_removed'">
      <div flex="~ col" gap-1>
        <p flex items-end gap-2 text="warning">
          {{ item.member_id }}
          <span text="text-secondary">{{ convertTimeStampToTime(item.time) }}</span>
        </p>
        <p>
          被移出
          <span text="warning">{{ item.group_id }}</span>
        </p>
      </div>
      <div flex-1 />
    </template>
  </div>
</template>
