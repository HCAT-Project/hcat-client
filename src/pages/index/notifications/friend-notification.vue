<script setup lang="ts">
</script>

<template>
  <div flex="~ col">
    <div text-start p="x10 y5" border="b-0.1 back-light">
      好友通知
    </div>
    <div flex="~ col" gap-5 items-center of-auto p="5">
      <div flex="~" items-center text-start gap-3 text-sm p-3 bg="back-gray" w-full max-w-150 rounded="lg">
        <img src="/avatar.jpeg" w-15 h-15 rounded="full">
        <div flex="~ col" gap-1>
          <p flex text="warning" gap-2 items-end>
            XMZOVO
            <span text-text-light>请求加为好友</span>
            <span text="text-secondary">12:14</span>
          </p>
          <p text="text-secondary xs">
            留言:
            <span>Hello, I'm XMZOVO</span>
          </p>
        </div>
        <div flex-1 />
        <button border="~ back-light" rounded p="x3 y1" hover="bg-back-light">
          同意
        </button>
        <button border="~ back-light" rounded p="x3 y1" hover="bg-back-light">
          拒绝
        </button>
      </div>
    </div>
  </div>
</template>
