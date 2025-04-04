import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/service-orders',
      name: 'serviceOrders',
      component: () => import('../views/SOListView.vue'),
    },
    {
      path: '/service-orders/:id/edit',
      name: 'serviceOrdersEdit',
      component: () => import('../views/SOEditView.vue'),
    },
  ],
})

export default router
