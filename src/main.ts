import { createApp } from 'vue'
import './renderer/assets/style.css'
import './renderer/assets/icon/iconfont.css'
import Viog from 'viog-ui'
import 'viog-ui/dist/viog-ui.css'
import router from './renderer/router'
import App from './App.vue'
import { createPinia } from 'pinia'
import { db } from './common/db'

createApp(App)
.use(router)
.use(createPinia())
.use(Viog)
.mount('#app')

db("Chat")
.first()
.then((obj) => {
  console.log(obj);
})