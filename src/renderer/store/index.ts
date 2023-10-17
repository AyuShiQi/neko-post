import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import router from '../router'

import { getUserInfo } from '@/common/user'

/**
 * 用户信息注册
 */
export const useProfileStore = defineStore('profile', () => {
  const isLogin = ref(false)
  const username = ref()

  watch(isLogin, () => {
    if (isLogin.value) router.replace('/home')
    else router.replace('/login')
  })

  // 初始化信息获取
  getUserInfo()

  // 先去获取数据
  return {
    isLogin,
    username
  }
})