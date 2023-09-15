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
  }
})