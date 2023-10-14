import axios from 'axios'

axios.defaults.baseURL='http://localhost:3000'

type RequestOption = {
  methods: string,
  url: string
}

export function getAxios (option: RequestOption) {
  const myAxios = new Promise((resolve) => {
    axios({
      method: option.methods,
      url: option.url
    }).then(res => {
      console.log(res.data)
      resolve(res.data)
    })
  })
  
  return myAxios
}