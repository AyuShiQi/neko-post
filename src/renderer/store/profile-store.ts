import { reactive, ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '../router'

import { getUserInfo, addUserInfo } from '@/common/user'
import { verifyToken } from '../network/user'
import { getProjectList } from '../network/proj'

/**
 * 用户信息注册
 */
export const useProfileStore = defineStore('profile', () => {
  // 本地初始化信息获取
  const localInfo = getUserInfo()
  /**
   * 是否登录
   */
  const isLogin = ref(false)
  /**
   * 用户名
   */
  const username = ref()
  /**
   * 用户token
   */
  const token = ref()
  /**
   * 当前用户id
   */
  const uid = ref()
  /**
   * 成功加载的项目
   */
  const pid = ref(localInfo.pid)
  /**
   * 是否成功加载项目
   */
  const isLoadedProject = ref(false)
  /**
   * 项目列表
   */
  const projectList = reactive({
    list: [],
    // 当前加载的项目
    target: null
  })

  const pidEmitCb = [] as Array<() => void>

  // 当登录状态改变时，改变router路径
  watch(isLogin, () => {
    if (isLogin.value) router.replace('/home')
    else router.replace('/login')
  })

  // 当目标项目改变时，改变list中的target
  watch(pid, () => {
    findTargetProject()
    // 更新用户信息文件
    addUserInfo({
      pid: pid.value
    })
    // 触发回调函数
    for (const cb of pidEmitCb) {
      cb()
    }
  }, { immediate: true })

  /**
   * 当项目刚加载时，同样需要触发pid的回调函数
   */
  watch(isLoadedProject, () => {
    // console.log('进入isLoadedProject watch函数', isLoadedProject.value)
    if (!isLoadedProject.value) return
    // 触发回调函数
    for (const cb of pidEmitCb) {
      cb()
    }
  })

  /**
   * token登录
   * @param newToken 新的token，可以选择传入 
   */
  function tokenLogin (newToken?: string) {
    if (newToken) token.value = newToken
    if (token.value) {
      verifyToken(token.value).then(val => {
        if (val.code === 200) {
          isLogin.value = true
          uid.value = val.data.uid
          username.value = val.data.username
          // 去加载项目列表 和 上一次打开项目
          updateProjectList()
        } else {
          isLogin.value = false
        }
      })
    }
  }

  /**
   * 通过项目名找到项目
   * @param pname 项目名
   * @returns 目标项目
   */
  function findProjectWithPname (pname: string): {pid: string, pname: string} | null {
    for (const proj of projectList.list) {
      if (proj.pname === pname) return proj
    }
    return null
  }

  /**
   * 通过项目id找到项目
   * @param pid 项目id
   * @returns 目标项目
   */
  function findProjectWithPid (pid: string): {pid: string, pname: string} | null {
    for (const proj of projectList.list) {
      if (proj.pid === pid) return proj
    }
    return null
  }

  /**
   * 加载项目
   * @param newPid 新的pid 
   */
  function loadProject (newPid: string) {
    if (newPid) pid.value = newPid
    if (pid.value) isLoadedProject.value = true
    // 加载api
  }

  /**
   * 更新项目列表
   */
  function updateProjectList () {
    getProjectList(token.value, uid.value).then(val => {
      projectList.list = val.data
      // 修改target
      findTargetProject()
    })
  }

  /**
   * 找到目标项目(更新pid后使用)
   */
  function findTargetProject () {
    for (const proj of projectList.list) {
      if (proj.pid === pid.value) {
        // console.log(proj, proj.pid, pid.value)
        projectList.target = proj
        break
      }
    }
    // 如果有那么需要改变一下加载信息
    isLoadedProject.value = pid.value && projectList.target ? true : false
    console.log('change ptarget', projectList.target, isLoadedProject.value)
  }

  /**
   * 注册pid改变的回调函数
   * @param cb 
   */
  function registerPid (cb: () => void) {
    pidEmitCb.push(cb)
  }

  /**
   * 更换加载项目
   * @param pid 项目id
   */
  function changeTarget (npid: string) {
    pid.value = npid
  }

  function toLoginChangeInfo (ntoken: string, nuid: string, nusername: string) {
    isLogin.value = true
    token.value = ntoken
    uid.value = nuid
    username.value = nusername
    // 去加载项目列表 和 上一次打开项目
    updateProjectList()
  }

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
    findProjectWithPname,
    findProjectWithPid,
    updateProjectList,
    registerPid,
    changeTarget,
    toLoginChangeInfo
  }
})