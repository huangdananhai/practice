import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'  //首页
import Home2 from '../views/home/home'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/home',
        // redirect:'/home/flowingwater'   //默认指向流水组件
    }, {
        path: '/home',
        component: Home,
        children: [{
            path: '', // 二级路由 什么都不写 作为显示组件
            component: Home2
        }, {
            //流水
            path: 'flowingwater',
            component: () => import('../views/flowingwater')// 按需加载
        }, {
            //添加流水
            path: 'Addflowingwater',
            component: () => import('../views/flowingwater/Addflowingwater')// 按需加载
        }, {
            // 编辑流水
            path: 'editflowingwater/:heroid',
            component: () => import('../views/flowingwater/editflowingwater')// 按需加载
        }, {
            path: 'list1',
            component: () => import('../views/list1')// 按需加载
        }, {
            path: 'list2',
            component: () => import('../views/list2')// 按需加载
        },{
            //产品列表
            path: 'productlist',
            component: () => import('../views/productlist')// 按需加载
        },{
            //商品添加
            path: 'addproduct',
            component: () => import('../views/addproduct')// 按需加载
        },{
            //视频
            path: 'video',
            component: () => import('../views/video')// 按需加载
        },]
    }
]


const router = new VueRouter({
    routes
})
export default router