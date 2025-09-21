<template>
  <div class="language-switcher">
    <el-dropdown @command="handleLanguageChange">
      <el-button size="small" type="primary">
        {{ currentLocale === 'zh-CN' ? '中文' : 'English' }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
          <el-dropdown-item command="en-US">English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { currentLocale, setLocale } from '@/i18n'

const handleLanguageChange = (locale) => {
  setLocale(locale)
}
</script>

<style scoped>
.language-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
</style>