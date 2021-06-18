import Vuehead from './home/vue-head'
import Vuesidebar from './home/vue-sidebar'
import Crumbs from '../views/crumbs'

export default {
    install (Vue) {
    Vue.component('vue-head', Vuehead) // 全局注册
    Vue.component('vue-sidebar', Vuesidebar)
    Vue.component('crumbs', Crumbs)
    }
  }