import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

export type Result<K = any> = {
  data: K,
  msg: string,
  code: number
}

export async function getAxios<K = any, T = any> (option: AxiosRequestConfig<T>) {
  option.baseURL = 'http://localhost:3000'
  const res = await axios(option)
  console.log(option.url, res.data)
  return res.data as Result<K>
}

export function parseMethod (method: number) {
  switch (method) {
    case Method.get:
      return 'get'
    case Method.put:
      return 'put'
    case Method.post:
      return 'post'
    case Method.head:
      return 'head'
    case Method.delete:
      return 'delete'
    case Method.connect:
      return 'connect'
    case Method.options:
      return 'option'
    case Method.patch:
      return 'patch'
    default:
      return null
  }
}

export type inputTableOption = {
  target: { key: string, value: any }[],
  pick: number[],
  type?: string
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
  params: string | inputTableOption
  headers: string | inputTableOption
  authorization: string | inputTableOption
  body: string | inputTableOption // 有type
  update_time: Date
  create_time: Date
}

export type Resp = {
  rid: string,
  aid: string
  uid: string
  pid: string
  gid: string
  type: RespType // 0 cur 1 histroy
  status: number
  statusText: string
  headers: string | any
  body: string | any,
  request: string | any,
  update_time: Date
  create_time: Date
}

export type Mock = {
}

export enum RespType {
  default,
  fix
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