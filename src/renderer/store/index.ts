import { reactive, ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '../router'

import { getUserInfo, addUserInfo } from '@/common/user'
import { verifyToken } from '../network/user'
import { getProjectList } from '../network/proj'
import { getApiList as getApiListInterface, getBase, getGroupList } from '../network/api'
import type { Api } from '../network'

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
   * 找到目标项目
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
    if (pid.value && projectList.target) isLoadedProject.value = true
  }

  /**
   * 注册pid改变的回调函数
   * @param cb 
   */
  function registerPid (cb: () => void) {
    pidEmitCb.push(cb)
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
    updateProjectList,
    registerPid
  }
})

/**
 * api接口信息
 */
export const useApiStore = defineStore('api', () => {
  const profileStore = useProfileStore()
  // 当前选中的api id号
  const aid = ref()
  // 当前聚焦的group id号
  const gid = ref()
  const apiList = reactive({
    list: [] as Api[],
    group: [] as Api[],
    target: null as Api,
    base: null as Api
  })
  const tabList = reactive(new Map()) as Map<string, Api>

  const groupApi = computed(() => {
    return (gid: string) => {
      const targetList = [] as Api[]
      for (const api of apiList.list) {
        console.log(api.gid, gid)
        if (api.gid === gid) targetList.push(api)
      }
      return targetList
    }
  })

  watch(aid, () => {
    loadTargetApi()
  })

  // 监听pid改变
  profileStore.registerPid(updateInfo)
  updateInfo()

  function updateInfo () {
    // 重新获取list
    loadApiList()
    // 重新获取base
    loadBase()
    // 重新获取group
    loadGroupList()
  }

  function loadApiList () {
    // profileStore.pid
    const { token, isLoadedProject, pid, uid } = profileStore
    if (isLoadedProject) getApiListInterface(token, uid, pid).then(val => {
      if (val.code === 200) {
        apiList.list = val.data
        loadTargetApi()
        // 更换updateTab
        updateTab()
      }
    })
  }

  /**
   * 加载target
   * @param newAid 新的加载aid
   */
  function loadTargetApi (newAid?: string) {
    if (newAid) aid.value = newAid
    if (!aid.value) return
    for (const api of apiList.list) {
      if (api.aid === aid.value) {
        apiList.target = api
        break
      }
    }
  }

  function loadGroupList () {
    const { token, pid, uid } = profileStore
    getGroupList(token, uid, pid).then(val => {
      if (val.code === 200) {
        apiList.group = val.data
      }
    })
  }

  function loadBase () {
    const { token, pid, uid } = profileStore
    getBase(token, uid, pid).then(val => {
      console.log('load base', val.data)
      if (val.code === 200) apiList.base = val.data 
    })
  }

  function addTab (aid: string, api: Api) {
    tabList.set(aid, api)
  }

  function updateTab () {
    let change = 0
    for(const api of apiList.list) {
      if (tabList.has(api.aid)) {
        tabList.set(api.aid, api)
        change++
      }
      if (change >= tabList.size) break
    }
  }

  function removeTab (aid: string) {
    tabList.delete(aid)
  }

  return {
    aid,
    gid,
    apiList,
    tabList,
    groupApi,
    loadApiList,
    loadGroupList,
    addTab,
    removeTab
  }
})