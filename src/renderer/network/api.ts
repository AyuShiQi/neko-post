import { getAxios } from '.'
import type { Api } from '.'

/**
 * 获取api列表
 * @param uid 用户id
 * @param pid 项目id
 */
export function getApiList (token: string, uid: string, pid: string) {
  // console.log(username, password)
  return getAxios<Api[]>({
    method: 'get',
    url: '/apis/list',
    headers: {
      token
    },
    params: {
      uid,
      pid
    }
  })
}

/**
 * 获取api分组列表
 * @param uid 用户id
 * @param pid 项目id
 */
export function getGroupList (token: string, uid: string, pid: string) {
  // console.log(username, password)
  return getAxios<Api[]>({
    method: 'get',
    url: '/apis/groupList',
    headers: {
      token
    },
    params: {
      uid,
      pid
    }
  })
}

/**
 * 创建api
 * @param token 
 * @param uid
 * @param pid
 * @param title 标题
 * @param gid 
 * @returns 
 */
export function createApi (token: string, uid: string, pid: string, title: string, gid: string) {
  return getAxios<Api>({
    method: 'post',
    url: '/apis/create',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      gid,
      title
    }
  })
}

/**
 * 创建api项目组
 * @param token 
 * @param uid
 * @param pid
 * @param title 标题
 * @param gid
 * @returns 
 */
export function createApiGroup (token: string, uid: string, pid: string, title: string, gid: string) {
  return getAxios<Api>({
    method: 'post',
    url: '/apis/createGroup',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      gid,
      title
    }
  })
}

export function getBase (token: string, uid: string, pid: string) {
  // console.log(username, password)
  return getAxios<Api>({
    method: 'post',
    url: '/apis/base',
    headers: {
      token
    },
    data: {
      uid,
      pid
    }
  })
}

export function updateApi (token: string, uid: string, pid: string, aid: string, type: number, update: {
  gid?: string,
  title?: string,
  desc?: string,
  method?: number,
  url?: string,
  params?: string,
  headers?: string,
  authorization?: string,
  body?: string
}) {
  // console.log(username, password)
  return getAxios<Api>({
    method: 'post',
    url: '/apis/update',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      aid,
      type,
      update
    }
  })
}

export function updateApiTitle (token: string, uid: string, pid: string, aid: string, type: number, title: string) {
  return getAxios<Api>({
    method: 'post',
    url: '/apis/update',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      aid,
      type,
      update: {
        title
      }
    }
  })
}

/**
 * 删除接口
 * @param token
 * @param uid
 * @param pid
 * @param aid
 * @returns
 */
export function delApi (token: string, uid: string, pid: string, aid: string) {
  return getAxios<Api>({
    method: 'post',
    url: '/apis/delete',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      aid,
    }
  })
}

/**
 * 删除项目组
 * @param token
 * @param uid
 * @param pid
 * @param aid
 * @returns
 */
export function delApiGroup (token: string, uid: string, pid: string, aid: string) {
  return getAxios<Api>({
    method: 'post',
    url: '/apis/deleteGroup',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      aid,
    }
  })
}

