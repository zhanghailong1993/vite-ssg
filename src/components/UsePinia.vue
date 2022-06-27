<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from '@/store/user'

const userStore = useUserStore()

const addAge = () => {
  userStore.updateAge(++userStore.age)
}

</script>

<template>
  <h2>欢迎使用vite+vue3+ts+pinia+vue-router4</h2>
  <div>{{userStore.name}}的年龄: {{userStore.age}}</div>
  <br />
  <button @click="addAge">点击给{{ userStore.name }}的年龄增加一岁</button>
  <br />
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
