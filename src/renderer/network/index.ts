import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL='http://localhost:3000'

export type Result<K = any> = {
  data: K,
  msg: string,
  code: number
}

export function getAxios<K = any, T = any> (option: AxiosRequestConfig<T>): Promise<Result<K>> {
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
  params: string | Object
  headers: string | Object
  authorization: string | Object
  body: string | Object
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