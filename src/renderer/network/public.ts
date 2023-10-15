import { getAxios } from '.'

export function getPublicUserJson () {
  return getAxios<object>({
    method: 'get',
    url: '/public/user.json'
  })
}