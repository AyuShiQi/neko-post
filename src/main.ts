import { createApp } from 'vue'
import './renderer/assets/style.css'
import './renderer/assets/icon/iconfont.css'
import router from './renderer/store'
import App from './App.vue'

createApp(App)
.use(router)
.mount('#app')