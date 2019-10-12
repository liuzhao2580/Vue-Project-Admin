import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/layout'
// 不需要权限的公共页面
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    }
]
// 需要权限的页面
export const asyncRoutes = [
    // {
    //     path: '/login',
    //     component: () => import('@/views/login/index'),
    //     hidden: true
    // },
    // 入库单反馈
    {
        path: '/',
        redirect: '/InventoryEnterW',
        component: Layout,
        children: [
            {
                path: 'InventoryEnterW',
                component: () => import('@/views/InventoryEnterW/InventoryEnterW'),
                name: 'InventoryEnterW',
                meta: { title: '入库单反馈', icon: 'example', noCache: true }
            }
        ]
    },
    // 出库单反馈
    {
        path: '/InventoryOutW',
        component: Layout,
        children: [
            {
                path: 'InventoryOutW',
                component: () => import('@/views/InventoryOutW/InventoryOutW'),
                name: 'InventoryOutW',
                meta: { title: '出库单反馈', icon: 'example', noCache: true }
            }
        ]
    },
    // 订单取消反馈
    {
        path: '/InventoryCancel',
        component: Layout,
        children: [
            {
                path: 'InventoryCancel',
                component: () => import('@/views/InventoryCancel/InventoryCancel'),
                name: 'InventoryCancel',
                meta: { title: '订单取消反馈', icon: 'example', noCache: true }
            }
        ]
    },
    // 库存比对反馈
    {
        path: '/InventoryCom',
        component: Layout,
        children: [
            {
                path: 'InventoryCom',
                component: () => import('@/views/InventoryCom/InventoryCom'),
                name: 'InventoryCom',
                meta: { title: '库存比对反馈', icon: 'component', noCache: true }
            }
        ]
    },
    // 库存调整反馈
    {
        path: '/InventoryAdjust',
        component: Layout,
        children: [
            {
                path: 'InventoryAdjust',
                component: () => import('@/views/InventoryAdjust/InventoryAdjust'),
                name: 'InventoryAdjust',
                meta: { title: '库存调整反馈', icon: 'edit', noCache: true }
            }
        ]
    },
    // 字典管理
    {
        path: '/InventoryDic',
        component: Layout,
        children: [
            {
                path: 'InventoryDic',
                component: () => import('@/views/InventoryDic/InventoryDic'),
                name: 'InventoryDic',
                meta: { title: '字典管理', icon: 'edit', noCache: true }
            }
        ]
    },
    // 入库订单
    {
        path: '/IpnOrders',
        component: Layout,
        children: [
            {
                path: 'IpnOrders',
                component: () => import('@/views/IpnOrders/IpnOrders'),
                name: 'IpnOrders',
                meta: { title: '入库订单', icon: 'icon', noCache: true }
            }
        ]
    },
    // 单位管理
    {
        path: '/UnitConverter',
        component: Layout,
        children: [
            {
                path: 'UnitConverter',
                component: () => import('@/views/UnitConverter/UnitConverter'),
                name: 'UnitConverter',
                meta: { title: '单位管理', icon: 'icon', noCache: true }
            }
        ]
    },
    // 地址管理
    {
        path: '/Address',
        component: Layout,
        children: [
            {
                path: 'Address',
                component: () => import('@/views/Address/Address'),
                name: 'Address',
                meta: { title: '地址管理', icon: 'icon', noCache: true }
            }
        ]
    },
    // 库存余额管理
    {
        path: '/TabKcyedz',
        component: Layout,
        children: [
            {
                path: 'TabKcyedz',
                component: () => import('@/views/TabKcyedz/TabKcyedz'),
                name: 'TabKcyedz',
                meta: { title: '库存余额管理', icon: 'icon', noCache: true }
            }
        ]
    },
    // 出库单
    {
        path: '/OutOrders',
        component: Layout,
        children: [
            {
                path: 'OutOrders',
                component: () => import('@/views/OutOrders/OutOrders'),
                name: 'OutOrders',
                meta: { title: '出库单', icon: 'icon', noCache: true }
            }
        ]
    },
    // 商品管理
    {
        path: '/Goods',
        component: Layout,
        children: [
            {
                path: 'Goods',
                component: () => import('@/views/Goods/Goods.vue'),
                name: 'Goods',
                meta: { title: '商品管理', icon: 'icon', noCache: true }
            }
        ]
    },
    // 订单取消
    {
        path: '/OrderCancel',
        component: Layout,
        children: [
            {
                path: 'OrderCancel',
                component: () => import('@/views/OrderCancel/OrderCancel.vue'),
                name: 'OrderCancel',
                meta: { title: '订单取消', icon: 'icon', noCache: true }
            }
        ]
    },
    // 医疗器械检验记录
    {
        path: '/InspectRecord',
        component: Layout,
        children: [
            {
                path: 'InspectRecord',
                component: () => import('@/views/MedicalDevices/InspectRecord.vue'),
                name: 'InspectRecord',
                meta: { title: '医疗器械检验记录', icon: 'icon', noCache: true }
            }
        ]
    },
    // 医疗器械入库记录
    {
        path: '/StorageRecord',
        component: Layout,
        children: [
            {
                path: 'StorageRecord',
                component: () => import('@/views/MedicalDevices/StorageRecord.vue'),
                name: 'StorageRecord',
                meta: { title: '医疗器械入库记录', icon: 'icon', noCache: true }
            },
        ]
    },
    // 医疗器械养护记录
    {
        path: '/MaintenanceRecord',
        component: Layout,
        children: [
            {
                path: 'MaintenanceRecord',
                component: () => import('@/views/MedicalDevices/MaintenanceRecord.vue'),
                name: 'MaintenanceRecord',
                meta: { title: '医疗器械养护记录', icon: 'icon', noCache: true }
            }
        ]
    },
    // 医疗器械采购记录
    {
        path: '/ProcurementRecord',
        component: Layout,
        children: [
            {
                path: 'ProcurementRecord',
                component: () => import('@/views/ProcurementRecord/ProcurementRecord.vue'),
                name: 'ProcurementRecord',
                meta: { title: '医疗器械采购记录', icon: 'icon', noCache: true }
            }
        ]
    },
    // 医疗器械收货记录
    {
        path: '/GoodsRecord',
        component: Layout,
        children: [
            {
                path: 'GoodsRecord',
                component: () => import('@/views/GoodsRecord/GoodsRecord.vue'),
                name: 'GoodsRecord',
                meta: { title: '医疗器械收货记录', icon: 'icon', noCache: true }
            }
        ]
    },
    //医疗器械出库管理
    {
        path: '/YlqxckfhxsRh',
        component: Layout,
        children: [
            {
                path: 'YlqxckfhxsRh',
                component: () => import('@/views/YlqxckfhxsRh/YlqxckfhxsRh'),
                name: 'YlqxckfhxsRh',
                meta: { title: '医疗器械出库管理', icon: 'icon', noCache: true }
            }
        ]
    },
    //医疗器械出库录入
    {
        path: '/Ylqxgxck',
        component: Layout,
        children: [
            {
                path: 'Ylqxgxck',
                component: () => import('@/views/Ylqxckgl/Ylqxgxck'),
                name: 'Ylqxgxck',
                meta: { title: '医疗器械出库录入', icon: 'icon', noCache: true }
            }
        ]
    },
    //医疗器械复核录入
    {
        path: '/Ylqxfhlr',
        component: Layout,
        children: [
            {
                path: 'Ylqxfhlr',
                component: () => import('@/views/Ylqxckgl/Ylqxfhlr'),
                name: 'Ylqxfhlr',
                meta: { title: '医疗器械复核录入', icon: 'icon', noCache: true }
            }
        ]
    },
    //医疗器械销售录入
    {
        path: '/Ylqxxslr',
        component: Layout,
        children: [
            {
                path: 'Ylqxxslr',
                component: () => import('@/views/Ylqxckgl/Ylqxxslr'),
                name: 'Ylqxxslr',
                meta: { title: '医疗器械销售录入', icon: 'icon', noCache: true }
            }
        ]
    },
    //医疗器械入库录入
    {
        path: '/Ylqxrklr',
        component: Layout,
        children: [
            {
                path: 'Ylqxrklr',
                component: () => import('@/views/Ylqxrkgl/Ylqxrklr'),
                name: 'Ylqxrklr',
                meta: { title: '医疗器械入库录入', icon: 'icon', noCache: true }
            }
        ]
    },
    //医疗器械采购录入
    {
        path: '/Ylqxcglr',
        component: Layout,
        children: [
            {
                path: 'Ylqxcglr',
                component: () => import('@/views/Ylqxrkgl/Ylqxcglr'),
                name: 'Ylqxcglr',
                meta: { title: '医疗器械采购录入', icon: 'icon', noCache: true }
            }
        ]
    },
    //医疗器械收货录入
    {
        path: '/Ylqxshlr',
        component: Layout,
        children: [
            {
                path: 'Ylqxshlr',
                component: () => import('@/views/Ylqxrkgl/Ylqxshlr'),
                name: 'Ylqxshlr',
                meta: { title: '医疗器械收货录入', icon: 'icon', noCache: true }
            }
        ]
    },
    //医疗器械检验录入
    {
        path: '/Ylqxjylr',
        component: Layout,
        children: [
            {
                path: 'Ylqxjylr',
                component: () => import('@/views/Ylqxrkgl/Ylqxjylr'),
                name: 'Ylqxjylr',
                meta: { title: '医疗器械检验录入', icon: 'icon', noCache: true }
            }
        ]
    },
    //医疗器械复核记录
    {
        path: '/Ylqxfhjl',
        component: Layout,
        children: [
            {
                path: 'Ylqxfhjl',
                component: () => import('@/views/Ylqxfhjl/Ylqxfhjl'),
                name: 'Ylqxfhjl',
                meta: { title: '医疗器械复核记录', icon: 'icon', noCache: true }
            }
        ]
    },
    //医疗器械出库记录
    {
        path: '/Ylqxckjl',
        component: Layout,
        children: [
            {
                path: 'Ylqxckjl',
                component: () => import('@/views/Ylqxckjl/Ylqxckjl'),
                name: 'Ylqxckjl',
                meta: { title: '医疗器械出库记录', icon: 'icon', noCache: true }
            }
        ]
    },
    //医疗器械销售记录
    {
        path: '/Ylqxxsjl',
        component: Layout,
        children: [
            {
                path: 'Ylqxxsjl',
                component: () => import('@/views/Ylqxxsjl/Ylqxxsjl'),
                name: 'Ylqxxsjl',
                meta: { title: '医疗器械销售记录', icon: 'icon', noCache: true }
            }
        ]
    },
    // 用户管理
    {
        path: '/UserManage',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/UserManage/UserManage'),
                name: 'UserManage',
                meta: { title: '用户管理', icon: 'peoples', noCache: true }
            }
        ]
    },
    // 404
    { path: '*', component: () => import('@/views/error-page/404'), hidden: true }
]
const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}
export default router

    



// export default new Router({
//     routes: [
//         {
//             path: '/login',
//             component: () => import('@/views/login/index'),
//             hidden: true
//         },
//         {
//             path: '/auth-redirect',
//             component: () => import('@/views/login/auth-redirect'),
//             hidden: true
//         },
//         {
//             path: '/401',
//             component: () => import('@/views/error-page/401'),
//             hidden: true
//         },
//         // 入库单反馈
//         {
//             path: '/',
//             redirect: '/InventoryEnterW',
//             component: Layout,
//             children: [
//                 {
//                     path: 'InventoryEnterW',
//                     component: () => import('@/views/InventoryEnterW/InventoryEnterW'),
//                     name: 'InventoryEnterW',
//                     meta: { title: '入库单反馈', icon: 'example', noCache: true }
//                 }
//             ]
//         },
//         // 出库单反馈
//         {
//             path: '/InventoryOutW',
//             component: Layout,
//             children: [
//                 {
//                     path: 'InventoryOutW',
//                     component: () => import('@/views/InventoryOutW/InventoryOutW'),
//                     name: 'InventoryOutW',
//                     meta: { title: '出库单反馈', icon: 'example', noCache: true }
//                 }
//             ]
//         },
//         // 订单取消反馈
//         {
//             path: '/InventoryCancel',
//             component: Layout,
//             children: [
//                 {
//                     path: 'InventoryCancel',
//                     component: () => import('@/views/InventoryCancel/InventoryCancel'),
//                     name: 'InventoryCancel',
//                     meta: { title: '订单取消反馈', icon: 'example', noCache: true }
//                 }
//             ]
//         },
//         // 库存比对反馈
//         {
//             path: '/InventoryCom',
//             component: Layout,
//             children: [
//                 {
//                     path: 'InventoryCom',
//                     component: () => import('@/views/InventoryCom/InventoryCom'),
//                     name: 'InventoryCom',
//                     meta: { title: '库存比对反馈', icon: 'component', noCache: true }
//                 }
//             ]
//         },
//         // 库存调整反馈
//         {
//             path: '/InventoryAdjust',
//             component: Layout,
//             children: [
//                 {
//                     path: 'InventoryAdjust',
//                     component: () => import('@/views/InventoryAdjust/InventoryAdjust'),
//                     name: 'InventoryAdjust',
//                     meta: { title: '库存调整反馈', icon: 'edit', noCache: true }
//                 }
//             ]
//         },
//         // 字典管理
//         {
//             path: '/InventoryDic',
//             component: Layout,
//             children: [
//                 {
//                     path: 'InventoryDic',
//                     component: () => import('@/views/InventoryDic/InventoryDic'),
//                     name: 'InventoryDic',
//                     meta: { title: '字典管理', icon: 'edit', noCache: true }
//                 }
//             ]
//         },
//         // 入库订单
//         {
//             path: '/IpnOrders',
//             component: Layout,
//             children: [
//                 {
//                     path: 'IpnOrders',
//                     component: () => import('@/views/IpnOrders/IpnOrders'),
//                     name: 'IpnOrders',
//                     meta: { title: '入库订单', icon: 'icon', noCache: true }
//                 }
//             ]
//         },
//         // 单位管理
//         {
//             path: '/UnitConverter',
//             component: Layout,
//             children: [
//                 {
//                     path: 'UnitConverter',
//                     component: () => import('@/views/UnitConverter/UnitConverter'),
//                     name: 'UnitConverter',
//                     meta: { title: '单位管理', icon: 'icon', noCache: true }
//                 }
//             ]
//         },
//         // 地址管理
//         {
//             path: '/Address',
//             component: Layout,
//             children: [
//                 {
//                     path: 'Address',
//                     component: () => import('@/views/Address/Address'),
//                     name: 'Address',
//                     meta: { title: '地址管理', icon: 'icon', noCache: true }
//                 }
//             ]
//         },
//         // 库存余额管理
//         {
//             path: '/TabKcyedz',
//             component: Layout,
//             children: [
//                 {
//                     path: 'TabKcyedz',
//                     component: () => import('@/views/TabKcyedz/TabKcyedz'),
//                     name: 'TabKcyedz',
//                     meta: { title: '库存余额管理', icon: 'icon', noCache: true }
//                 }
//             ]
//         },
//         // 出库单
//         {
//             path: '/OutOrders',
//             component: Layout,
//             children: [
//                 {
//                     path: 'OutOrders',
//                     component: () => import('@/views/OutOrders/OutOrders'),
//                     name: 'OutOrders',
//                     meta: { title: '出库单', icon: 'icon', noCache: true }
//                 }
//             ]
//         },
//         // 商品管理
//         {
//             path: '/Goods',
//             component: Layout,
//             children: [
//                 {
//                     path: 'Goods',
//                     component: () => import('@/views/Goods/Goods.vue'),
//                     name: 'Goods',
//                     meta: { title: '商品管理', icon: 'icon', noCache: true }
//                 }
//             ]
//         },
//         // 订单取消
//         {
//             path: '/OrderCancel',
//             component: Layout,
//             children: [
//                 {
//                     path: 'OrderCancel',
//                     component: () => import('@/views/OrderCancel/OrderCancel.vue'),
//                     name: 'OrderCancel',
//                     meta: { title: '订单取消', icon: 'icon', noCache: true }
//                 }
//             ]
//         },
//         // 医疗器械检验记录
//         {
//             path: '/InspectRecord',
//             component: Layout,
//             children: [
//                 {
//                     path: 'InspectRecord',
//                     component: () => import('@/views/MedicalDevices/InspectRecord.vue'),
//                     name: 'InspectRecord',
//                     meta: { title: '医疗器械检验记录', icon: 'icon', noCache: true }
//                 }
//             ]
//         },
//         // 医疗器械入库记录
//         {
//             path: '/StorageRecord',
//             component: Layout,
//             children: [
//                 {
//                     path: 'StorageRecord',
//                     component: () => import('@/views/MedicalDevices/StorageRecord.vue'),
//                     name: 'StorageRecord',
//                     meta: { title: '医疗器械入库记录', icon: 'icon', noCache: true }
//                 },
//             ]
//         },
//         // 医疗器械养护记录
//         {
//             path: '/MaintenanceRecord',
//             component: Layout,
//             children: [
//                 {
//                     path: 'MaintenanceRecord',
//                     component: () => import('@/views/MedicalDevices/MaintenanceRecord.vue'),
//                     name: 'MaintenanceRecord',
//                     meta: { title: '医疗器械养护记录', icon: 'icon', noCache: true }
//                 }
//             ]
//         },
//         // 医疗器械采购记录
//         {
//             path: '/ProcurementRecord',
//             component: Layout,
//             children: [
//                 {
//                     path: 'ProcurementRecord',
//                     component: () => import('@/views/ProcurementRecord/ProcurementRecord.vue'),
//                     name: 'ProcurementRecord',
//                     meta: { title: '医疗器械采购记录', icon: 'icon', noCache: true }
//                 }
//             ]
//         },
//         // 医疗器械收货记录
//         {
//             path: '/GoodsRecord',
//             component: Layout,
//             children: [
//                 {
//                     path: 'GoodsRecord',
//                     component: () => import('@/views/GoodsRecord/GoodsRecord.vue'),
//                     name: 'GoodsRecord',
//                     meta: { title: '医疗器械收货记录', icon: 'icon', noCache: true }
//                 }
//             ]
//         },
//         //医疗器械复核记录
//         {
//             path: '/Ylqxfhjl',
//             component: Layout,
//             children: [
//                 {
//                     path: 'Ylqxfhjl',
//                     component: () => import('@/views/Ylqxfhjl/Ylqxfhjl'),
//                     name: 'Ylqxfhjl',
//                     meta: { title: '医疗器械复核记录', icon: 'icon', noCache: true }
//                 }
//             ]
//         },
//         //医疗器械出库记录
//         {
//             path: '/Ylqxckjl',
//             component: Layout,
//             children: [
//                 {
//                     path: 'Ylqxckjl',
//                     component: () => import('@/views/Ylqxckjl/Ylqxckjl'),
//                     name: 'Ylqxckjl',
//                     meta: { title: '医疗器械出库记录', icon: 'icon', noCache: true }
//                 }
//             ]
//         },
//         //医疗器械销售记录
//         {
//             path: '/Ylqxxsjl',
//             component: Layout,
//             children: [
//                 {
//                     path: 'Ylqxxsjl',
//                     component: () => import('@/views/Ylqxxsjl/Ylqxxsjl'),
//                     name: 'Ylqxxsjl',
//                     meta: { title: '医疗器械销售记录', icon: 'icon', noCache: true }
//                 }
//             ]
//         },

//         // {
//         //     path: '/example',
//         //     component: Layout,
//         //     redirect: '/example/list',
//         //     name: 'Example',
//         //     meta: {
//         //         title: 'Example',
//         //         icon: 'example'
//         //     },
//         //     children: [
//         //         {
//         //             path: 'create',
//         //             component: () => import('@/views/example/create'),
//         //             name: 'CreateArticle',
//         //             meta: { title: 'Create Article', icon: 'edit' }
//         //         },
//         //         {
//         //             path: 'edit/:id(\\d+)',
//         //             component: () => import('@/views/example/edit'),
//         //             name: 'EditArticle',
//         //             meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
//         //             hidden: true
//         //         },
//         //         {
//         //             path: 'list',
//         //             component: () => import('@/views/example/list'),
//         //             name: 'ArticleList',
//         //             meta: { title: 'Article List', icon: 'list' }
//         //         }
//         //     ]
//         // },

//         // 用户管理
//         {
//             path: '/UserManage',
//             component: Layout,
//             children: [
//                 {
//                     path: 'index',
//                     component: () => import('@/views/UserManage/UserManage'),
//                     name: 'UserManage',
//                     meta: { title: '用户管理', icon: 'peoples', noCache: true }
//                 }
//             ]
//         },

//         { path: '*', redirect: '/404', hidden: true }
//     ]
// })


