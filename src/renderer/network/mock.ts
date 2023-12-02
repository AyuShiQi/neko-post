import { getAxios } from '.'
import type { Mock } from '.'

/**
 * 获取全部历史
 * @param token
 * @param uid
 * @param pid
 * @param aid 
 * @returns 
 */
export function getMockList (token: string, uid: string, pid: string) {
  return getAxios<Mock[]>({
    method: 'get',
    url: '/mock/list',
    headers: {
      token
    },
    params: {
      uid,
      pid,
    }
  })
}

/**
 * 保存Mock
 * @param token
 * @param uid
 * @param pid
 * @param aid
 * @param resp resp
 * @returns 最终Mock
 */
export function saveMock (token: string, uid: string, pid: string, title: string, path: string, gid: string = null) {
  return getAxios<Mock>({
    method: 'post',
    url: '/mock/save',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      gid,
      path,
      title
    }
  })
}

/**
 * 删除路径
 * @param token 用户token
 * @param uid 用户id
 * @param pid project id
 * @param gid 分组id
 * @param mid mock id
 * @returns Promise
 */
export function delMock (token: string, uid: string, pid: string, gid: string, mid: string) {
  return getAxios<null>({
    method: 'post',
    url: '/mock/delete',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      gid,
      mid
    }
  })
}

export function updateOpt (token: string, uid: string, pid: string, mid: string, gid: string, opt: string ) {
  return getAxios<null>({
    method: 'post',
    url: '/mock/update',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      mid,
      gid,
      opt
    }
  })
}

export function updatePath (token: string, uid: string, pid: string, mid: string, gid: string, path: string) {
  return getAxios<null>({
    method: 'post',
    url: '/mock/update-path',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      mid,
      gid,
      path
    }
  })
}

export function updateTitle (token: string, uid: string, pid: string, mid: string, gid: string, title: string) {
  return getAxios<null>({
    method: 'post',
    url: '/mock/update-title',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      mid,
      gid,
      title
    }
  })
}