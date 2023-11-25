import { ref, reactive, computed } from 'vue'
import axios from 'axios'
import Qs from 'qs'
import { defineStore } from 'pinia'
import { useProfileStore } from './profile-store'
import { useApiStore } from './api-store'
import { parseMethod } from '../network'
import { saveResp, updateRespType, getRespList, delResp } from '../network/resp'
import type { Api, RespType, inputTableOption } from '../network'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { globalOberver } from '@/common/observer'

export const useNetworkStore = defineStore('network', () => {
  const profileStore = useProfileStore()
  const apiStore = useApiStore()
  /**
   * 用于设置当前相关api发送过请求后，还没有进行过修改的aid
   */
  const dirtyRequest = new Set<string>()
  // 注册dirty修改函数
  globalOberver.on('update-api', (aid: string) => {
    dirtyRequest.delete(aid)
  })
  // 以aid储存, 当前展示cur列表响应
  const responseMap = reactive(new Map<string, AxiosResponse>())
  // 历史响应记录
  const repsList = ref()

  const nowResponse = computed(() => responseMap.get(apiStore.apiList.target.aid))
  /**
   * 目标响应是否是错误的
   */
  const isError = computed(() => {
    const t = String(nowResponse.value.status)[0]
    return t === '4' || t === '5' || t === '' || t === undefined
  })

  /**
   * 发送对应Api请求
   * @param api api
   * @param apis 基础配置（从最近到base）
   */
  function sendApi (api: Api, ...apis: Api[]) {
    // 如果是没有发送了，还没修改的，就不重新发了
    if (dirtyRequest.has(api.aid)) return
    const options = parseApiToAxiosOption(api, ...apis)
    return new Promise((resolve) => {
      axios(options).then(res => {
        console.log(res)
        saveRespHistory(api.aid, res).then(saveVal => resolve(saveVal))
      })
      .catch(err => {
        console.log(err)
        saveRespHistory(api.aid, err.response ?? { status: '', statusText: '无响应返回', config: err.config}).then(saveVal => resolve(saveVal))
      })
    })
  }

  function saveRespHistory (aid: string, res: AxiosResponse) {
    responseMap.set(aid, res)
    // 把当前为设置为脏位
    dirtyRequest.add(aid)
    // 把其保存到respList中
    return saveResponse(res)
  }

  /**
   * 将api对象转化为axios发送的option
   * @param api api对象
   * @returns axios形式option
   */
  function parseApiToAxiosOption (target: Api, ...apis: Api[]): AxiosRequestConfig {
    /**
     * 包含所有的Api(顺序从base到当前)
     */
    const total = [...apis].reverse()
    total.push(target)
    const inputRes = {
      url: parseUrl(),
      method: parseMethod(target.method),
      headers: handleHeaders(),
      params: handleParams(),
      data: handleData(),
      timeout: 20000,
      timeoutErrorMessage: '超时啦'
    } as AxiosRequestConfig
    return inputRes

    function parseUrl () {
      let url = target.url
      for (const api of apis) {
        if (api === apiStore.apiList.base) url = url.replace('${BASE}', api.url)
        else url = url.replace('${'+ api.title +'}', api.url)
      }
      return url
    }
  
    function handleHeaders () {
      const res = {} as any
      for (const api of total) {
        if (typeof api.headers === 'string') apiStore.formatApi(api)
        const theaders = api.headers as inputTableOption
        if (!(theaders?.pick instanceof Array)) continue
        console.log(theaders.pick)
        for (const index of theaders.pick) {
          const target = theaders.target[index]
          res[target.key] = target.value
        }
      }
      return res
    }

    function handleParams () {
      const res = {} as any
      for (const api of total) {
        if (typeof api.params === 'string') apiStore.formatApi(api)
        const tparams = api.params as inputTableOption
        if (!(tparams?.pick instanceof Array)) continue
        for (const index of tparams.pick) {
          const target = tparams.target[index]
          res[target.key] = target.value
        }
      }
      return res
    }

    function handleData () {
      const res = {} as any
      for (const api of total) {
        if (typeof api.body === 'string') apiStore.formatApi(api)
        const tbody = api.body as inputTableOption
        if (!(tbody?.pick instanceof Array)) continue
        for (const index of tbody.pick) {
          const target = tbody.target[index]
          res[target.key] = target.value
        }
      }
      switch ((target.body as inputTableOption).type) {
        case 'form-data':
          const formData = new FormData()
          for (const name in res) {
            formData.set(name, res[name])
          }
          return formData
        case 'x-www-form-urlencoded':
          return Qs.stringify(res)
        case 'none':
          return undefined
        case 'binary':
          return ''  
        case 'JSON':
        case 'raw':
        default: 
          return res
      }
    }
  }

  /**
   * 保存响应
   * @param response 响应
   */
  async function saveResponse (response: AxiosResponse) {
    const newRes = handleDataAndHeadersAndParams()
    const res = await saveResp(profileStore.token, profileStore.uid, profileStore.pid, apiStore.aid, newRes)
    // 更新response列表
    if (res.code === 200) {
      await updateResponseList()
    }
    return res.code === 200

    function handleDataAndHeadersAndParams () {
      const newRes: any = {...response}
      newRes.headers = JSON.stringify(newRes.headers)
      newRes.data = JSON.stringify(newRes.data)
      newRes.request = JSON.stringify({
        headers: newRes?.config?.headers,
        method: newRes?.config?.method,
        url: newRes?.config?.url,
        data: newRes?.config?.data
      })
      return newRes
    }
  }

  /**
   * 更新响应列表
   */
  async function updateResponseList () {
    const res = await getRespList(profileStore.token, profileStore.uid, profileStore.pid, apiStore.aid)
    repsList.value = res.data
  }
  // 注册aid变化响应函数
  globalOberver.on('update-aid', updateResponseList)

  async function updateResponseType (rid: string, type: RespType) {
    return updateRespType(profileStore.token, profileStore.uid, profileStore.pid, apiStore.aid, rid, type)
  }

  async function deleteResponse (rid: string) {
    return delResp(profileStore.token, profileStore.uid, profileStore.pid, apiStore.aid, rid)
  }

  return {
    nowResponse,
    repsList,
    isError,
    sendApi,
    parseApiToAxiosOption,
    saveResponse,
    updateResponseList,
    updateResponseType,
    deleteResponse
  }
})