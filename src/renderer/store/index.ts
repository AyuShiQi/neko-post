import { reactive, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import router from '../router'

import { getUserInfo } from '@/common/user'
import { verifyToken } from '../network/user'
import { getProjectList } from '../network/proj'

/**
 * 用户信息注册
 */
export const useProfileStore = defineStore('profile', () => {
  const isLogin = ref(false)
  const username = ref()
  const token = ref()
  const uid = ref()
  const pid = ref()
  // 是否成功加载项目
  const isLoadedProject = ref(false)
  const projectList = reactive({
    list: []
  })

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
          uid.value = val.data.uid
          username.value = val.data.username
          // 去加载项目列表 和 上一次打开项目
          getProjectList(token.value, uid.value).then(val => {
            projectList.list = val.data
          })
        } else {
          isLogin.value = false
        }
      })
    }
  }

  function findProjectWithPname (pname: string): {pid: string, pname: string} | null {
    for (const proj of projectList.list) {
      if (proj[pname] === pname) return proj
    }
    return null
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
    uid,
    username,
    pid,
    isLoadedProject,
    projectList,
    tokenLogin,
    loadProject,
    findProjectWithPname
  }
})