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