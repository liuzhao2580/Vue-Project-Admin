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
        }
    ]
}

export default components