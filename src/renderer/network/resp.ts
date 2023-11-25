import { AxiosResponse } from 'axios'
import { getAxios } from '.'
import type { Resp } from '.'

/**
 * 获取全部历史
 * @param token
 * @param uid
 * @param pid
 * @param aid 
 * @returns 
 */
export function getRespList (token: string, uid: string, pid: string, aid: string) {
  return getAxios<Resp[]>({
    method: 'get',
    url: '/resp/list',
    headers: {
      token
    },
    params: {
      uid,
      pid,
      aid,
    }
  })
}

/**
 * 保存resp记录
 * @param token
 * @param uid
 * @param pid
 * @param aid
 * @param resp resp
 * @returns 最终Resp
 */
export function saveResp (token: string, uid: string, pid: string, aid: string, resp: AxiosResponse) {
  return getAxios<Resp>({
    method: 'post',
    url: '/resp/save',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      aid,
      status: resp.status,
      statusText: resp.statusText,
      headers: resp.headers,
      body: resp.data,
      request: resp.request
    }
  })
}

export function delResp (token: string, uid: string, pid: string, aid: string, rid: string) {
  return getAxios<null>({
    method: 'post',
    url: '/resp/delete',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      aid,
      rid
    }
  })
}

export function updateRespType (token: string, uid: string, pid: string, aid: string, rid: string, type: Resp['type']) {
  return getAxios<null>({
    method: 'post',
    url: '/resp/update_type',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      aid,
      rid,
      type
    }
  })
}