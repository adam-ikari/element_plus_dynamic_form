import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

// 定义支持的语言
const messages = {
  'zh-CN': zhCN,
  'en-US': enUS
}

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'zh-CN', // 回退语言
  messages, // 语言包
  globalInjection: true // 全局注入 $t 等方法
})

export default i18n