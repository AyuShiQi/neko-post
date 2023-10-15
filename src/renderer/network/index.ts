import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL='http://localhost:3000'

export function getAxios<T = any> (option: AxiosRequestConfig<T>): Promise<{
  data: T,
  msg: string,
  code: number
}> {
  const myAxios = new Promise<{data: T,
    msg: string,
    code: number
  }>((resolve) => {
    axios(option).then(res => {
      console.log(res.data)
      resolve(res.data)
    })
  })
  
  return myAxios
}