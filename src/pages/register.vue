<script setup lang="ts">
import { useToastStore, useUserStore } from '~/stores'

const router = useRouter()
const userStore = useUserStore()
const toastStore = useToastStore()

const userID = $ref('')
const password = $ref('')
const username = $ref('')

async function register() {
  if (userID === '' || password === '' || username === '') {
    toastStore.showToast('用户名或密码不能为空', 'error')
    return
  }
  const form = {
    user_id: userID,
    password,
    username,
    lang: '简体中文',
  }
  await userStore.register(form).then(() => {
    router.replace('/login')
  }).catch((err) => {
    toastStore.showToast(err, 'error')
  })
}
</script>

<template>
  <div p="x-4 y-10" max-w-md w-full mx-auto flex="~ col" h-full justify-center items-center>
    <div w-full h-120 bg-back-gray rounded-lg>
      <div flex="~ col" w-full justify-evenly h-full items-center p="md:x10 x8 y5">
        <h1 text-2xl font-bold>
          注册 <span text-primary>H</span>CAT
        </h1>
        <TextInput v-model="userID" label="用户名" />
        <TextInput v-model="password" label="密码" type="password" />
        <TextInput v-model="username" label="昵称" />
        <div flex="~ col" gap-1 w-full text-start>
          <TextButton text="注册" @click="register" />
          <a text-link text-sm cursor-pointer @click="router.replace('/login')">已经拥有账号？</a>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: register
meta:
  requiresAuth: false
</route>
