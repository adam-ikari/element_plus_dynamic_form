import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import I18nGuide from '@/views/I18nGuide.vue'
import I18nDemo from '@/views/I18nDemo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/i18n-guide',
      name: 'i18n-guide',
      component: I18nGuide
    },
    {
      path: '/i18n-demo',
      name: 'i18n-demo',
      component: I18nDemo
    }
  ],
})

export default router
