<template>
  <div class="i18n-guide">
    <h1>多国语实践指南</h1>
    
    <el-card class="mb-20">
      <template #header>
        <div class="card-header">
          <span>概述</span>
        </div>
      </template>
      <p>本项目采用非侵入式国际化方案，将语言文本与组件逻辑完全分离，实现灵活的多语言支持。</p>
    </el-card>

    <el-card class="mb-20">
      <template #header>
        <div class="card-header">
          <span>核心实现原理</span>
        </div>
      </template>
      <h3>1. 语言包结构</h3>
      <p>所有语言文本集中管理在 <code>src/i18n</code> 目录下，每种语言对应一个 JS 文件：</p>
      <pre><code>// src/i18n/zh-CN.js
export default {
  form: {
    submit: '提交',
    reset: '重置'
  },
  validation: {
    required: '请输入{name}'
  }
}</code></pre>

      <h3>2. 翻译函数</h3>
      <p>通过 <code>t(key, params)</code> 函数获取翻译文本：</p>
      <pre><code>import { t } from '@/i18n'

// 基本用法
t('form.submit') // 返回"提交"

// 带参数
t('validation.required', { name: '用户名' }) // 返回"请输入用户名"</code></pre>

      <h3>3. 语言切换</h3>
      <p>通过 <code>setLocale(locale)</code> 函数动态切换语言：</p>
      <pre><code>import { setLocale } from '@/i18n'

setLocale('en-US') // 切换到英文</code></pre>
    </el-card>

    <el-card class="mb-20">
      <template #header>
        <div class="card-header">
          <span>在动态表单中使用</span>
        </div>
      </template>
      <h3>表单配置</h3>
      <p>在表单字段配置中使用翻译函数：</p>
      <pre><code>const formFields = [
  {
    type: 'input',
    label: t('form.field.username'),
    prop: 'username',
    placeholder: t('form.placeholder.username'),
    rules: [
      { 
        required: true, 
        message: t('validation.required', { name: t('form.field.username') }), 
        trigger: 'blur' 
      }
    ]
  }
]</code></pre>
    </el-card>

    <el-card class="mb-20">
      <template #header>
        <div class="card-header">
          <span>优势特点</span>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="12">
          <h3>非侵入性</h3>
          <ul>
            <li>国际化逻辑与组件逻辑完全分离</li>
            <li>无需修改现有组件代码</li>
            <li>保持代码纯净性</li>
          </ul>
        </el-col>
        <el-col :span="12">
          <h3>可扩展性</h3>
          <ul>
            <li>轻松添加新语言包</li>
            <li>支持运行时语言切换</li>
            <li>集中管理所有文本内容</li>
          </ul>
        </el-col>
      </el-row>
    </el-card>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>最佳实践</span>
        </div>
      </template>
      <ol>
        <li><strong>键名规范</strong>：使用层级结构命名，如 <code>form.field.username</code></li>
        <li><strong>参数化文本</strong>：使用 <code>{param}</code> 占位符处理动态内容</li>
        <li><strong>语言包组织</strong>：按功能模块组织语言包内容</li>
        <li><strong>默认语言</strong>：设置合理的默认语言回退机制</li>
        <li><strong>测试覆盖</strong>：确保所有语言版本的功能一致性</li>
      </ol>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { t, currentLocale, setLocale } from '@/i18n'
</script>

<style scoped>
.i18n-guide {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.card-header {
  font-weight: bold;
}

.mb-20 {
  margin-bottom: 20px;
}

pre {
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', Courier, monospace;
}

ul, ol {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}
</style>