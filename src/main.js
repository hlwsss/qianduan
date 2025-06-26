import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import i18n from './i18n'

// 创建应用实例
const app = createApp(App)

// 创建Pinia实例
const pinia = createPinia()

// 使用Pinia
app.use(pinia)

// 使用i18n
app.use(i18n)

// 挂载应用
app.mount('#app')

// 开发环境下的全局错误处理
if (import.meta.env.DEV) {
  app.config.errorHandler = (err, vm, info) => {
    console.error('Vue Error:', err)
    console.error('Component:', vm)
    console.error('Info:', info)
  }
  
  window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled Promise Rejection:', event.reason)
  })
}

// 全局属性
app.config.globalProperties.$filters = {
  // 格式化日期
  formatDate(date) {
    if (!date) return ''
    return new Date(date).toLocaleDateString('zh-CN')
  },
  
  // 格式化数字
  formatNumber(num) {
    if (!num) return '0'
    return num.toLocaleString()
  },
  
  // 截断文本
  truncate(text, length = 100) {
    if (!text) return ''
    if (text.length <= length) return text
    return text.substring(0, length) + '...'
  }
}

console.log('🚀 法律案例库应用已启动')
console.log('📚 版本: 1.0.0')
console.log('🔧 环境:', import.meta.env.MODE) 