<script setup lang="ts" generic="T extends any, O extends any">
import { useStore } from '~/stores/store'

const router = useRouter()
const store = useStore()

const userID = $ref('')
const password = $ref('')

onMounted(async () => {
  // await store.authToken().then((res) => {
  //   router.replace('/')
  // }).catch((_) => {
  // })
})

async function login() {
  if (userID === '' || password === '') {
    alert('用户名或密码不能为空')
    return
  }
  const form = {
    user_id: userID,
    password,
  }
  await store.login(form).then((res) => {
    router.replace('/')
  }).catch((err) => {
    alert(err)
  })
}
</script>

<template>
  <div p="x-4 y-10" max-w-screen-md w-full mx-auto flex="~ col" h-full justify-center items-center>
    <div grid="~ md:cols-12" w-full h-100 bg-back-gray rounded-lg>
      <div flex="~ col" w-full justify-evenly col-span="md:7 12" items-center p="md:x10 x8 y5">
        <h1 text-2xl font-bold>
          登录 <span md:hidden inline-flex text-primary>H</span><span md:hidden inline-flex>CAT</span>
        </h1>
        <TextInput v-model="userID" label="用户名" :is-required="true" />
        <TextInput v-model="password" label="密码" :is-required="true" type="password" @keydown.enter="login">
          <a text-sm href="" max-w-20 text-link>忘记密码?</a>
        </TextInput>
        <div flex="~ col" gap-1 w-full>
          <TextButton text="登录" @click="login" />
          <p w-full text="sm start">
            需要新的账号？<a text-link cursor-pointer @click="router.replace('/register')">注册</a>
          </p>
        </div>
      </div>
      <div flex="md:~ col" col-span-5 hidden justify-center items-center gap-5>
        <img w-30 h-30 src="/logo.png">
        <h1 text-4xl font-bold>
          <span text-primary>H</span>CAT
        </h1>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: login
meta:
  requiresAuth: false
</route>
