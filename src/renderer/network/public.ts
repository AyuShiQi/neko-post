import { getAxios } from '.'

export function getPublicUserJson () {
  return getAxios<object>({
    methods: 'get',
    url: '/public/user.json'
  })
}