import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: 'HomePage'
  },
  {
    path: '/homepage',
    name: 'Homepage',
    component: () => import('../views/HomePage.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
