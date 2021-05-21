import Vue from 'vue'
import VueRouter from 'vue-router'
import NavigtionBar from '../components/NavigationBar.vue'
import Home from '../components/Home/Home.vue'
import Race from '../components/Race/Race.vue'
import Topic from '../components/Topic/Topic.vue'
import Login from '../components/Login.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/navigtionbar' },
  { path: '/login', component: Login },
  { path: '/navigtionbar',
    component: NavigtionBar,
    children: [
      { path: '/', redirect: '/home' },
      { path: '/home', component: Home },
      { path: '/race', component: Race },
      { path: '/topic', component: Topic }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
