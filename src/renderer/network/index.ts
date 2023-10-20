import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL='http://localhost:3000'

export function getAxios<K = any, T = any> (option: AxiosRequestConfig<T>): Promise<{
  data: K,
  msg: string,
  code: number
}> {
  const myAxios = new Promise<{data: K,
    msg: string,
    code: number
  }>((resolve) => {
    axios(option).then(res => {
      console.log(option.url, res.data)
      resolve(res.data)
    })
  })
  
  return myAxios
}