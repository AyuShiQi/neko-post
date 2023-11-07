import { getAxios } from '.'

/**
 * 获取项目列表
 * @param uid 用户id 
 */
export function getProjectList (token: string, uid: string) {
  // console.log(username, password)
  return getAxios<any[]>({
    method: 'get',
    url: '/proj/list',
    headers: {
      token
    },
    params: {
      uid
    }
  })
}

/**
 * 创建新项目
 * @param token token 
 * @param uid 用户id
 * @param pname 项目id
 * @returns 
 */
export function createProject (token: string, uid: string, pname: string) {
  // console.log(username, password)
  return getAxios<any>({
    method: 'post',
    url: '/proj/create',
    headers: {
      token
    },
    data: {
      uid,
      pname
    }
  })
}

/**
 * 更新项目标题
 * @param token 
 * @param uid 
 * @param pid 
 * @param npname 
 * @returns 目标项目
 */
export function updateProjectTitle (token: string, uid: string, pid: string, npname: string) {
  return getAxios<any>({
    method: 'post',
    url: '/proj/update',
    headers: {
      token
    },
    data: {
      uid,
      pid,
      npname
    }
  })
}

/**
 * 删除项目
 * @param token
 * @param uid
 * @param pid
 * @returns
 */
export function deleteProject (token: string, uid: string, pid: string) {
  return getAxios<any>({
    method: 'post',
    url: '/proj/delete',
    headers: {
      token
    },
    data: {
      uid,
      pid
    }
  })
}