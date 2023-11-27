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
export function saveMock (token: string, uid: string, pid: string, opt: string, gid: string = null) {
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
      opt
    }
  })
}

// export function delResp (token: string, uid: string, pid: string, aid: string, rid: string) {
//   return getAxios<null>({
//     method: 'post',
//     url: '/resp/delete',
//     headers: {
//       token
//     },
//     data: {
//       uid,
//       pid,
//       aid,
//       rid
//     }
//   })
// }

// export function updateRespType (token: string, uid: string, pid: string, aid: string, rid: string, type: Resp['type']) {
//   return getAxios<null>({
//     method: 'post',
//     url: '/resp/update_type',
//     headers: {
//       token
//     },
//     data: {
//       uid,
//       pid,
//       aid,
//       rid,
//       type
//     }
//   })
// }