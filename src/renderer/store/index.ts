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
  const pid = ref()
  // 是否成功加载项目
  const isLoadedProject = ref(false)

  watch(isLogin, () => {
    if (isLogin.value) router.replace('/home')
    else router.replace('/login')
  })

  function tokenLogin (newToken?: string) {
    if (newToken) token.value = newToken
    if (token.value) {
      verifyToken(token.value).then(val => {
        if (val.code === 200) {
          isLogin.value = true
          username.value = val.data.username
          // 去加载项目
        } else {
          isLogin.value = false
        }
      })
    }
  }

  function loadProject () {
    console.log(isLoadedProject.value)
  }

  // 本地初始化信息获取
  const localInfo = getUserInfo()
  pid.value = localInfo.pid
  // 自动登录
  tokenLogin(localInfo.token)

  return {
    token,
    isLogin,
    username,
    pid,
    isLoadedProject,
    tokenLogin,
    loadProject
  }
})