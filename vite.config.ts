import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { devPlugin, getReplacer } from './plugins/devPlugin'
import { buildPlugin } from './plugins/buildPlugin'
import optimizer from 'vite-plugin-optimizer'
import path from 'path'

export default defineConfig({
  plugins: [optimizer(getReplacer()), devPlugin(), vue()],
  build: {
    rollupOptions: {
      plugins: [buildPlugin()],
    },
    // 关闭小图标编译
    assetsInlineLimit: 0
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  // server: {
  // 	https: true,
  //   proxy: {
  //     '/user': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
  //       target: 'http://127.0.0.1:3000', // 目标地址 --> 服务器地址
  //       changeOrigin: true, // 允许跨域
  //     }
  //   }
  // }
})