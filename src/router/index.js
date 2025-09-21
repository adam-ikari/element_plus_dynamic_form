import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DynamicFromView from '@/views/DynamicFromView.vue'
import I18nDemo from '@/views/I18nDemo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dynamic-form',
      name: 'dynamic-form',
      component: DynamicFromView,
    },
    {
      path: '/i18n-demo',
      name: 'i18n-demo',
      component: I18nDemo,
    },
  ],
})

export default router
