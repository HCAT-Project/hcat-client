<script setup lang="ts">
import axios from 'axios'
import { IP } from '~/constant'

const router = useRouter()

const userID = $ref('')
const password = $ref('')
const username = $ref('')

async function register() {
  if (userID === '' || password === '' || username === '') {
    alert('用户名或密码不能为空')
    return
  }
  const form = new FormData()
  form.append('user_id', userID)
  form.append('password', password)
  form.append('username', username)
  form.append('lang', '简体中文')

  await axios.post(
    `${IP}/account/register`,
    form,
  ).then((res) => {
    if (res.data.status === 'ok')
      router.push('/login')
    else if (res.data.status === 'error')
      alert(res.data.message)
    else
      alert('未知错误')
  }).catch((_) => {

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
          <a text-link text-sm cursor-pointer @click="router.push('/login')">已经拥有账号？</a>
        </div>
      </div>
    </div>
  </div>
</template>
