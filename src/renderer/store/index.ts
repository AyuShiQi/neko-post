import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import router from '../router'

/**
 * 用户信息注册
 */
export const useProfileStore = defineStore('profile', () => {
  const isLogin = ref(false)
  const username = ref('ysq_杨诗绮')

  watch(isLogin, () => {
    if (isLogin.value) router.replace('/home')
    else router.replace('/login')
  })

  // 先去获取数据
  return {
    isLogin,
    username
  }
})