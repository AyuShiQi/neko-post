import { ref } from 'vue'
import { defineStore } from 'pinia'


/**
 * 用户信息注册
 */
export const useProfileStore = defineStore('profile', () => {
  const username = ref('ysq')
  return {
    username
  }
})