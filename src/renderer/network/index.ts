import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { useProfileStore } from '../store'

axios.defaults.baseURL='http://localhost:3000'

export function getAxios<K = any, T = any> (option: AxiosRequestConfig<T>): Promise<{
  data: K,
  msg: string,
  code: number
}> {
  const myAxios = new Promise<{data: K,
    msg: string,
    code: number
  }>((resolve) => {
    axios(option).then(res => {
      console.log(option.url, res.data)
      resolve(res.data)
    })
  })
  
  return myAxios
}

export type Api = {
  aid: string
  uid: string
  pid: string
  gid: string
  title: string
  desc: string
  type: number // 0 基础 1 接口 2 分组
  method: number | null
  url: string
  params: string
  headers: string
  authorization: string
  body: string
  update_time: Date
  create_time: Date
}

export enum Method {
  get,
  put,
  post,
  head,
  patch,
  delete,
  options,
  connect,
  none = null,
}