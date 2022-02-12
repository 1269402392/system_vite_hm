import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/assets/css/global.less";'
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      views: '/src/views',
      components: '/src/components'
    }
  },
  server: {
    // host: '0.0.0.0',
    port: 3000,
    open: false,
    https: false,
    proxy: {
      '/api': {
        target: 'http://47.116.26.11:8096/api/',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
