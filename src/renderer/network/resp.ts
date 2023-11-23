import { AxiosResponse } from 'axios'
import { getAxios } from '.'
import type { Resp } from '.'

/**
 * 保存resp记录
 * @param token
 * @param uid
 * @param pid
 * @param aid
 * @param resp resp
 * @returns 最终Resp
 */
export function saveResp (token: string, uid: string, pid: string, aid: string, type: number, resp: AxiosResponse) {
  return getAxios<Resp>({
    method: 'post',
    url: '/resp/save',
    headers: {
      token
    },
    params: {
      uid,
      pid,
      aid,
      type,
      status: resp.status,
      statusText: resp.statusText,
      headers: resp.headers,
      body: resp.data,
      request: resp.request
    }
  })
}