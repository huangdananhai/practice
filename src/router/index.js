import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Home2 from '../views/home/home'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/home',
    },{
        path: '/home',
        component: Home,
        children: [{
            path: '', // 二级路由 什么都不写 作为显示组件
            component: Home2
        }, {
            path: 'flowingwater',
            component: () => import('../views/flowingwater')// 按需加载
        },{
            path: 'Addflowingwater',
            component: () => import('../views/flowingwater/Addflowingwater')// 按需加载
        },{
            path: 'editflowingwater/:heroid',
            component: () => import('../views/flowingwater/editflowingwater')// 按需加载
        }]
    }
]
    

const router = new VueRouter({
    routes
})
export default router