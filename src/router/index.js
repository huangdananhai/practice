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
            //视频
            path: 'video',
            component: () => import('../views/video')// 按需加载
        }, {
            //帖子
            path: 'publish',
            component: () => import('../views/publish')// 按需加载
        },{
            //文章
            path: 'articl',
            component: () => import('../views/articl')// 按需加载
        },]
    }, {
        path: '/list',
        component: Home,
        children: [{
            path: '', // 二级路由 什么都不写 作为显示组件
            component: Home2
        }, {
            //添加
            path: 'add',
            component: () => import('../views/list/add'),// 按需加载
            meta: [
                { name: '首页', url: '/home' },
                { name: '添加', url: '/list/add' }
            ],
        }, {
            //查看
            path: 'see',
            component: () => import('../views/list/see'),// 按需加载
        }, {
            //編輯
            path: 'editcondusion/:heroid',
            component: () => import('../views/list/see/editcondusion'),// 按需加载
            meta: [
                { name: '首页', url: '/home' },
                { name: '查看', url: '/list/see' },
                { name: '编辑' },
            ],
        },]
    }, {
        path: '/pms',
        component: Home,
        children: [{
            path: '', // 二级路由 什么都不写 作为显示组件
            component: Home2
        }, {
            //商品列表
            path: 'productlist',
            component: () => import('../views/pms/productlist'),// 按需加载
            meta: [
                { name: '商品' },
                { name: '商品列表', url: '../views/pms/productlist' },
            ]
        }, {
            //添加商品
            path: 'addproduct',
            component: () => import('../views/pms/addproduct')// 按需加载
        }, {
            //商品类型
            path: 'productAttr',
            component: () => import('../views/pms/productAttr')// 按需加载
        }, {
            //商品类型
            path: 'productCate',
            component: () => import('../views/pms/productCate')// 按需加载
        }]
    },
]

const router = new VueRouter({
    routes
})
export default router