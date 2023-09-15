import { createRouter, createWebHistory } from 'vue-router'

import homeWindow from '@/renderer/Window/homeWindow.vue'

console.log(homeWindow)

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: homeWindow
    }
  ]
})