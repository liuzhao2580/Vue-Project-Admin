import Layout from '@/layout'

const components = {
    path: "/components",
    component: Layout,
    meta: { title: "组件", icon: "components" },
    redirect: "/components/richtext",
    children: [
        {
            path: "richtext",
            meta: { title: "富文本编辑器", icon: "richtext" },
            name: 'richtext',
            component: () => import("@/views/components/richtext")
        },
        {
            path: "markdown",
            meta: { title: "Markdown编辑器", icon: "markdown" },
            name: "markdown",
            component: () => import("@/views/components/markdown")
        },
        {
            path: "drag-dialog",
            meta: {title: "可拖拽Dialog", icon: "dialog"},
            name: "drag-dialog",
            component: ()=> import("@/views/components/drag-dialog")
        },
        {
            path: "back-to-top",
            meta: { title: "返回顶部", icon: "backtop" },
            name: "back-to-top",
            component: () => import("@/views/components/back-to-top")
        },
        {
            path: "other-components",
            meta: { title: "其他组件", icon: "other-components" },
            name: "other-components",
            component: () => import("@/views/components/other-components")
        }
    ]
}

export default components