import { createApp } from 'vue'
import Viog from 'viog-ui'
import 'viog-ui/dist/viog-ui.css'
import './renderer/assets/style.css'
import './renderer/assets/icon/iconfont.css'
import router from './renderer/router'
import App from './App.vue'
import { createPinia } from 'pinia'
import './common/user'

createApp(App)
.use(router)
.use(createPinia())
.use(Viog)
.mount('#app')