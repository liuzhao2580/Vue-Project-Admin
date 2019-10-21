import Layout from '@/layout'
const error_page = {
    path: "/errorPage",
    component: Layout,
    meta: { title: "Error", icon: "error" },
    redirect: "/errorPage/401",
    children: [
        {
            path: '401',
            component: () => import('@/views/error_page/401_page'),
            name: '401_page',
            meta: { title: '401', icon: "401" },
            redirect: "/errorPage/401/4011",
            children: [
                {
                    path: '4011',
                    component: () => import('@/views/error_page/4011_page'),
                    name: 'page4011',
                    meta: { title: '4011', icon: "warn" },
                }
            ]
        },
        {
            path: '404',
            component: () => import('@/views/error_page/404_page'),
            name: '404_page',
            meta: { title: '404', icon: "404" }
        },
    ]
}
export default error_page
