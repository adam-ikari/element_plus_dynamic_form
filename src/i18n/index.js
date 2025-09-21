import { ref, computed } from 'vue'
import zhCN from './zh-CN.js'
import enUS from './en-US.js'

// 支持的语言列表
const locales = {
  'zh-CN': zhCN,
  'en-US': enUS
}

// 当前语言
const currentLocale = ref('zh-CN')

// 获取当前语言包
const currentMessages = computed(() => {
  return locales[currentLocale.value] || locales['zh-CN']
})

// 切换语言
const setLocale = (locale) => {
  if (locales[locale]) {
    currentLocale.value = locale
  }
}

// 翻译函数
const t = (key, params = {}) => {
  // 根据 key 获取翻译文本，如 'form.submit'
  const keys = key.split('.')
  let message = currentMessages.value
  
  for (const k of keys) {
    message = message[k]
    if (!message) {
      return key // 如果找不到翻译，返回原始 key
    }
  }
  
  // 处理参数替换，如 {name}
  if (typeof message === 'string') {
    return message.replace(/\{(\w+)\}/g, (match, p1) => {
      return params[p1] || match
    })
  }
  
  return message
}

export { currentLocale, setLocale, t, currentMessages }