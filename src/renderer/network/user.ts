import { getAxios } from '.'

export function getUserBase () {
  return getAxios({
    methods: 'get',
    url: '/user/base'
  })
}