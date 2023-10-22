import { createApp } from 'vue'
import Viog from 'viog-ui'
import 'viog-ui/dist/viog-ui.css'
import './renderer/assets/style.css'
import './renderer/assets/icon/iconfont.css'
import router from './renderer/router'
import './common/user'
import App from './App.vue'
import { createPinia } from 'pinia'

createApp(App)
.use(createPinia())
.use(router)
.use(Viog)
.mount('#app')