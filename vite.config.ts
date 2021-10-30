import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      __: resolve(__dirname, './src'),
    },
  },
  plugins: [
    // Add plugin for Vue.js.
    vue(),
  ],
})
