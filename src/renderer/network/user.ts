import { getAxios } from '.'

// export function getUserBase () {
//   return getAxios({
//     methods: 'get',
//     url: '/user/base'
//   })
// }

/**
 * 注册新用户
 * @param username 账户 
 * @param password 密码
 */
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
 * 登录
 * @param username 账户 
 * @param password 密码
 */
export function login(username: string, password: string) {
  // console.log(username, password)
  return getAxios({
    method: 'post',
    url: '/user/login',
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
  return getAxios({
    method: 'get',
    url: '/user/verify',
    headers: {
      token
    }
  })
}