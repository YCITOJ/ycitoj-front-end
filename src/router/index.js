import Vue from 'vue'
import VueRouter from 'vue-router'
import NavigtionBar from '../components/NavigationBar.vue'
import Home from '../components/Home/Home.vue'
import compete from '../components/Compete/Compete.vue'
import Competehome from '../components/Compete/Competehome.vue'
import Topic from '../components/Topic/Topic.vue'
import Login from '../components/Login.vue'
import Addproblems from '../components/Topic/Addproblems.vue'
import Addcontent from '../components/Topic/Addcontent.vue'
import Submit from '../components/Topic/Submit.vue'
import User from '../components/User/User.vue'
import Revise from '../components/Topic/Revise.vue'
import UserSubmit from '../components/UserSubmit/UserSubmit.vue'
import ProblemSubmit from '../components/Topic/ProblemSubmit.vue'
import AddCompete from '../components/Compete/AddCompete.vue'
import ReviseCompete from '../components/Compete/ReviseCompete.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/navigtionbar' },
  { path: '/login', component: Login },
  { path: '/submit', name: 'submit', component: Submit},
  { path: '/navigtionbar',
    component: NavigtionBar,
    children: [
      { path: '/', redirect: '/home' },
      // 主页
      { path: '/home', name: 'home',component: Home },
      // 比赛页面
      { path: '/compete', name: 'compete', component: Compete },
      { path: '/competehome', name: 'competehome', component: Competehome },
      { path: '/addcompete', name: 'addcompete', component: AddCompete },
      { path: '/revisecompete', name: 'revisecompete', component: ReviseCompete },
      // 题库页面
      { path: '/topic', name: 'topic', component: Topic },
      { path: '/addproblems', name: 'addproblems', component: Addproblems },
      { path: '/addcontent', name: 'addcontent', component: Addcontent },
      { path: '/revise', name: 'revise', component: Revise },
      { path: '/problemSubmit', name: 'problemSubmit', component: ProblemSubmit },
      // 提交记录页面
      { path: '/usersubmit', name: 'usersubmit', component: UserSubmit },
      // 用户界面
      { path: '/user', component: User }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
