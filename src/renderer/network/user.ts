import { getAxios } from '.'

// export function getUserBase () {
//   return getAxios({
//     methods: 'get',
//     url: '/user/base'
//   })
// }

export function createNewUser (username: string, password: string) {
  console.log(username, password)
  getAxios({
    method: 'post',
    url: '/user/create',
    data: {
      username,
      password
    }
  })
}

/**
 * 通过token获取用户基础数据
 * @param token token
 */
export function verifyToken (token: string) {
  getAxios({
    method: 'get',
    url: '/user/verify',
    headers: {
      token
    }
  })
}