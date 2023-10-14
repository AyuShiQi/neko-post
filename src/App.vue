<template>
  <MainHeader/>
  <router-view></router-view>
</template>

<script setup lang="ts">
  import MainHeader from './renderer/components/MainHeader.vue'
  import { onUpdated } from 'vue'
  import router from '@/renderer/router'
  import { useProfileStore } from './renderer/store'
  const profileStore = useProfileStore()

  onUpdated(() => {
    if (profileStore.isLogin) router.replace('/home')
  })
</script>

<style scoped>
</style>
