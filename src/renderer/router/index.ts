import { createRouter, createWebHistory } from 'vue-router'

// mainWindow系列
import homeWindow from '@/renderer/Window/homeWindow.vue'
import ApisView from '@/renderer/Window/home-window/ApisView.vue'
import MockView from '@/renderer/Window/home-window/MockView.vue'
import HistoryView from '@/renderer/Window/home-window/HistoryView.vue'
import SettingView from '@/renderer/Window/home-window/SettingView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: homeWindow,
      children: [
        {
          path: 'apis',
          component: ApisView
        },
        {
          path: 'mock',
          component: MockView
        },
        {
          path: 'history',
          component: HistoryView
        },
        {
          path: 'setting',
          component: SettingView
        }
      ]
    }
  ]
})