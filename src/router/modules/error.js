import PageContent from '@/layout/components/AppMain'
const error_page = {
    path: "/errorPage",
    meta: { title: "Error", icon: "error" },
    redirect: "/errorPage/401",
    component: PageContent,
    name: 'errorPage',
    children: [
        {
            path: '401',
            component: () => import('@/views/error_page/401_page'),
            name: 'errorPage401',
            meta: { title: '401', icon: "401", breadcrumb: false },
            redirect: "/errorPage/401/4011",
            children: [
                {
                    path: '4011',
                    component: () => import('@/views/error_page/4011_page'),
                    name: 'errorPage4011',
                    meta: { title: '4011', icon: "warn" },
                }
            ]
        },
        {
            path: '404',
            component: () => import('@/views/error_page/404_page'),
            name: 'errorPage404',
            meta: { title: '404', icon: "404" }
        },
    ]
}
export default error_page
