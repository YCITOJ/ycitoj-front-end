import Vue from 'vue'
import VueRouter from 'vue-router'
import NavigtionBar from '../components/NavigationBar.vue'
import Home from '../components/Home/Home.vue'
import Race from '../components/Race/Race.vue'
import Topic from '../components/Topic/Topic.vue'
import Login from '../components/Login.vue'
import Addproblems from '../components/Topic/Addproblems.vue'
import Addcontent from '../components/Topic/Addcontent.vue'
import Submit from '../components/Topic/Submit.vue'
import User from '../components/User/User.vue'
import Revise from '../components/Revise/Revise.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/navigtionbar' },
  { path: '/login', component: Login },
  { path: '/user', component: User },
  { path: '/submit', name: 'submit', component: Submit },
  { path: '/navigtionbar',
    component: NavigtionBar,
    children: [
      { path: '/', redirect: '/home' },
      { path: '/home', name: 'home',component: Home },
      { path: '/race', name: 'race', component: Race },
      { path: '/topic', name: 'topic', component: Topic },
      { path: '/addproblems', name: 'addproblems', component: Addproblems },
      { path: '/addcontent', name: 'addcontent', component: Addcontent },
      { path: '/revise', name: 'revise', component: Revise }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
