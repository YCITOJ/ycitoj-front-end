import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入css
import './assets/css/global.css'

import config from '../config.js'

// 引入mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.use(ElementUI);

import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = config.baseUrl
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem('token')
  // 在最后必须 return config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
