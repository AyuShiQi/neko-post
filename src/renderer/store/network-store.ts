import { reactive, ref, watch, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { useApiStore } from './api-store'
import { parseMethod } from '../network'
import type { Api, inputTableOption } from '../network'
import type { AxiosRequestConfig } from 'axios'

export const useNetworkStore = defineStore('network', () => {
  const apiStore = useApiStore()
  const networkInfo = reactive({
    request: null,
    response: null
  })

  async function sendApi (api: Api, ...apis: Api[]) {
    const options = parseApiToAxiosOption(api, ...apis)
    axios(options).then(res => {
      console.log(res)
      networkInfo.response = res
    })
    // .catch(err => {
    //   networkInfo.response = err      
    // })
  }

  /**
   * 将api对象转化为axios发送的option
   * @param api api对象
   * @returns axios形式option
   */
  function parseApiToAxiosOption (target: Api, ...apis: Api[]): AxiosRequestConfig {
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
    console.log(inputRes)
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
        if (!(theaders.pick instanceof Array)) continue
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
        if (!(tparams.pick instanceof Array)) continue
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
        if (!(tbody.pick instanceof Array)) continue
        for (const index of tbody.pick) {
          const target = tbody.target[index]
          res[target.key] = target.value
        }
      }
      return res
    }
  }

  return {
    networkInfo,
    sendApi,
    parseApiToAxiosOption
  }
})