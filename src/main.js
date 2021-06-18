import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment  from 'moment'
import ElementUI from 'element-ui' // 引入包
import Components from './comments' // 引入组件对象
import 'element-ui/lib/theme-chalk/index.css' // 引入elemenUI样式
import axios from 'axios'
import less from 'less'
axios.defaults.baseURL = "http://localhost:3000/"
// axios.defaults.baseURL = "http://192.168.113.38:3000/"



Vue.prototype.$axios = axios // 赋值给全局对象
Vue.use(ElementUI) // 全局注册
Vue.use(Components) // 注册全局组件对象 =>  调用该对象中的一个方法 install
Vue.use(less)
Vue.prototype.moment=moment
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
