import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式表
import './assets/css/global.css'

import Element from "element-plus"
import "element-plus/lib/theme-chalk/index.css"

createApp(App)
.use(store)
.use(router)
.use(Element)
.mount('#app')
