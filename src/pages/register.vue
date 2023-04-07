<script setup lang="ts">
const router = useRouter()

function navToLogin() {
  router.push('/login')
}
</script>

<template>
  <div p="x-4 y-10" max-w-md w-full mx-auto flex="~ col" h-full justify-center items-center>
    <div w-full h-120 bg-back-gray rounded-lg>
      <div flex="~ col" w-full justify-evenly h-full items-center p="md:x10 x8 y5">
        <h1 text-2xl font-bold>
          注册 <span text-primary>H</span>CAT
        </h1>
        <TextInput label="用户名" />
        <TextInput label="密码" type="password" />
        <TextInput label="昵称" />
        <div flex="~ col" gap-1 w-full text-start>
          <TextButton text="注册" />
          <a text-link text-sm cursor-pointer @click="navToLogin">已经拥有账号？</a>
        </div>
      </div>
    </div>
  </div>
</template>
