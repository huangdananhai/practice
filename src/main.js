import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment  from 'moment'
import ElementUI from 'element-ui' // 引入包
import Components from './comments' // 引入组件对象
import echarts from 'echarts' 
import 'element-ui/lib/theme-chalk/index.css' // 引入elemenUI样式
import JsonExcel from 'vue-json-excel'
import axios from 'axios'
import less from 'less'
axios.defaults.baseURL = "http://localhost:3000/"
// axios.defaults.baseURL = "http://192.168.113.38:3000/"
import { Base64 } from 'js-base64'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios // 赋值给全局对象
Vue.use(ElementUI) // 全局注册
Vue.use(Components) // 注册全局组件对象 =>  调用该对象中的一个方法 install
Vue.use(less)
Vue.use(VueDirectiveImagePreviewer)
Vue.use(VueQuillEditor)
Vue.component('downloadExcel', JsonExcel)
Vue.prototype.moment = moment
Vue.use(Base64);
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
