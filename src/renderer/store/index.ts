import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import router from '../router'

import { getUserInfo } from '@/common/user'
import { verifyToken } from '../network/user'

/**
 * 用户信息注册
 */
export const useProfileStore = defineStore('profile', () => {
  const isLogin = ref(false)
  const username = ref()
  const token = ref()

  watch(isLogin, () => {
    if (isLogin.value) router.replace('/home')
    else router.replace('/login')
  })

  // 本地初始化信息获取
  const localInfo = getUserInfo()
  token.value = localInfo.token
  // 自动登录
  if (token.value) {
    verifyToken(token.value).then(val => {
      if (val.code === 200) {
        isLogin.value = true
        username.value = val.data.username
      } else {
        isLogin.value = false
      }
    })
  }

  return {
    isLogin,
    username
  }
})