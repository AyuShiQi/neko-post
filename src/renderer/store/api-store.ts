import { reactive, ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { getApiList as getApiListInterface, getBase, getGroupList, updateApi as updateApiInterface, delApi as da, delApiGroup as dg} from '../network/api'
import type { Api } from '../network'
import { useProfileStore } from './profile-store'
import { globalOberver } from '@/common/observer'
/**
 * api接口信息
 */
export const useApiStore = defineStore('api', () => {
  const profileStore = useProfileStore()
  // 当前选中的api id号
  const aid = ref()
  // 是否正在更新target
  const isChangeTarget = ref(false)
  // 当前聚焦的group id号(目前暂时还没有什么用)
  const gid = ref()
  const apiList = reactive({
    list: [] as Api[],
    group: [] as Api[],
    target: {} as Api,
    base: {} as Api
  })
  /**
   * 是否是基础配置
   */
  const isBaseOpen = computed(() => aid.value === apiList.base.aid)
  /**
   * 已打开接口列表
   */
  const tabList = reactive(new Map()) as Map<string, Api>
  /**
   * 待更新接口列表
   */
  const watingUpdateTabList = reactive(new Set()) as Set<string>

  /**
   * gid为aid的接口们
   */
  const groupApi = computed(() => {
    return (gid: string) => {
      const targetList = [] as Api[]
      for (const api of apiList.list) {
        // console.log(api.gid, gid)
        if (api.gid === gid) targetList.push(api)
      }
      return targetList
    }
  })

  /**
   * 判断一个接口是否待更新
   * @params aid 接口id
   */
  const isWatingUpdate = computed(() => {
    return (aid: string) => watingUpdateTabList.has(aid)
  })

  watch(aid, () => {
    loadTargetApi()
    isChangeTarget.value = true
    globalOberver.emit('update-aid', aid.value)
  })

  // 监听pid改变
  profileStore.registerPid(updateNewProjectApi)
  updateNewProjectApi()

  /**
   * 更新新的项目Api列表
   */
  function updateNewProjectApi () {
    console.log('通过pid或者加载project状态进入清空tablist')
    // tabList改变
    aid.value = undefined
    // 清空tabList列表
    clearTabList()
    updateInfo()
  }

  /**
   * 更新api列表
   */
  function updateInfo () {
    // 重新获取list
    loadApiList()
    // 重新获取base
    loadBase()
    // 重新获取group
    loadGroupList()    
  }

  /**
   * 加载apiList
   */
  async function loadApiList () {
    // profileStore.pid
    const { token, isLoadedProject, pid, uid } = profileStore
    if (isLoadedProject) {
      const val = await getApiListInterface(token, uid, pid)
      if (val.code === 200) {
        apiList.list = val.data
        loadTargetApi()
        // 更换updateTab
        updateTab()
      }
      return val
    } else return { code: 500, msg: '无加载项目', data: null}
  }

  /**
   * 加载target
   * @param newAid 新的加载aid
   */
  function loadTargetApi (newAid?: string) {
    if (newAid) aid.value = newAid
    if (!aid.value) return
    if (aid.value === apiList.base.aid) {
      // 把目标变为对象
      formatApi(apiList.base)
      apiList.target = apiList.base
      return
    }
    for (const api of apiList.list) {
      if (api.aid === aid.value) {
        // 把目标变为对象
        formatApi(api)
        apiList.target = api
        return
      }
    }
    apiList.target = null
  }

  /**
   * 格式化Api
   * @param api 
   */
  function formatApi (api: Api) {
    console.log('format')
    if (!(api.params instanceof Object)) api.params = JSON.parse(api.params) ?? {
      target: []
    }
    if (!(api.body instanceof Object)) api.body = JSON.parse(api.body) ?? {
      target: [],
    }
    if (!(api.headers instanceof Object)) api.headers = JSON.parse(api.headers) ?? {
      target: [],
      type: 'none'
    }
    if (!(api.headers as any).type) (api.headers as any).type = 'none'
    if (!(api.authorization instanceof Object)) api.authorization = JSON.parse(api.authorization) ?? {
      target: []
    }
  }
  /**
   * 加载groupList
   */
  async function loadGroupList () {
    const { token, pid, uid } = profileStore
    const val = await getGroupList(token, uid, pid)
    if (val.code === 200) {
      apiList.group = val.data
    }
    return val
  }

  /**
   * 加载基础配置
   */
  async function loadBase () {
    const { token, pid, uid } = profileStore
    const val = await getBase(token, uid, pid)
    if (val.code === 200) apiList.base = val.data
    return val
  }

  /**
   * 添加tab-card
   * @param aid 接口id
   * @param api 接口对象
   */
  function addTab (aid: string, api: Api) {
    tabList.set(aid, api)
  }

  /**
   * 更新接口信息
   * @param api api对象
   * @returns
   */
  function updateApi (api: string | Api) {
    let target: Api
    if (typeof api === 'string') target = findApiWithAid(api)
    else target = api
    // console.log('update api', target)
    if (!target) return Promise.resolve({ code: 500, msg: '', data: null })
    return updateApiInterface(profileStore.token, profileStore.uid, profileStore.pid, target.aid, target.type, {
      gid: target.gid,
      title: target.title,
      desc: target.desc,
      method: target.method,
      url: target.url,
      params: JSON.stringify(target.params),
      headers: JSON.stringify(target.headers),
      authorization: JSON.stringify(target.authorization),
      body: JSON.stringify(target.body)
    })
  }

  /**
   * 更新接口信息
   * @param api api对象
   * @returns
   */
  function updateApiTitle (api: string | Api, title: string) {
    let target: Api
    if (typeof api === 'string') target = findApiWithAid(api)
    else target = api
    // console.log('update api', target)
    if (!target) return Promise.resolve({ code: 500, msg: '', data: null })
    if (target.title === title) return Promise.resolve({ code: 201, msg: '没有更改', data: null })
    return updateApiInterface(profileStore.token, profileStore.uid, profileStore.pid, target.aid, target.type, {
      title
    })
  }

  /**
   * 更新tabList中update后的信息
   */
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

  /**
   * 随机返回一个tab Api
   * @returns
   */
  function getTabApi () {
    for (const aid of tabList.keys() as any) {
      return aid
    }
    return null
  }

  function clearTabList () {
    tabList.clear()
    watingUpdateTabList.clear()
  }

  /**
   * 添加待更新的列表
   * @param aid 
   */
  function addWatingUpdateTab (aid: string) {
    watingUpdateTabList.add(aid)
    globalOberver.emit('update-api', aid)
  }

  /**
   * 溢出待更新的列表
   * @param aid 
   */
  function removeWatingUpdateTab (aid: string) {
    watingUpdateTabList.delete(aid)
  }

  /**
   * 随机返回一个待更新接口aid
   * @returns 
   */
  function getAWatingUpdateAid () {
    for (const aid of watingUpdateTabList.values() as any) {
      return aid
    }
    return null
  }

  /**
   * 更新全部待更新接口
   */
  function updateAllWatingUpdate () {
    for (const aid of watingUpdateTabList.values() as any) {
      updateApi(aid)
      removeWatingUpdateTab(aid)
    }
  }

  /**
   * 通过aid找到对应的接口信息（包括基础配置，但不包括组）
   * @param aid 
   */
  function findApiWithAid (aid: string) {
    // 基础配置匹配
    if (apiList.base.aid === aid) return apiList.base
    for (const api of apiList.list) {
      if (api.aid === aid) return api
    }
    return null
  }

  /**
   * 删除接口
   * @param daid 接口id 
   * @returns
   */
  async function delApi (daid: string) {
    const val = await da(profileStore.token, profileStore.uid, profileStore.pid, daid)
    if (val.code === 200) {
      removeTab(daid)
      if (aid.value === daid) aid.value = getTabApi()
      removeWatingUpdateTab(daid)      
      loadApiList()
    }
    return val
  }

  /**
   * 删除组
   * @param gaid 组的aid 
   * @returns
   */
  async function delApiGroup (gaid: string) {
    const val = await dg(profileStore.token, profileStore.uid, profileStore.pid, gaid)
    if (val.code === 200) {
      const apis = groupApi.value(gaid)
      for (const api of apis) {
        removeTab(api.aid)
        if (aid.value === api.aid) aid.value = getTabApi()
        removeWatingUpdateTab(gaid)    
      }
      await loadApiList()
      await loadGroupList()
    }
    return val
  }

  return {
    aid,
    gid,
    apiList,
    isBaseOpen,
    tabList,
    groupApi,
    watingUpdateTabList,
    isWatingUpdate,
    formatApi,
    updateApi,
    loadBase,
    loadApiList,
    loadGroupList,
    addTab,
    removeTab,
    getTabApi,
    addWatingUpdateTab,
    removeWatingUpdateTab,
    getAWatingUpdateAid,
    updateAllWatingUpdate,
    updateApiTitle,
    delApi,
    delApiGroup
  }
})