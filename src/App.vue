<template>
  <div>
    <LanguageSwitcher />
    <RouterView />
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
</script>

<style scoped></style>
