import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/homepage',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue'),
    children: [
      {
    path: '/topic',
    name: 'Topic',
    component: () => import('../views/Question.vue')
  },
  {
    path: '/race',
    name: 'Race',
    component: () => import('../views/Race.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
  ]
 }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
