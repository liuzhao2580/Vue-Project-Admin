import PageContent from '@/layout/components/AppMain'
const components = {
    path: "/components",
    meta: { title: "组件", icon: "components" },
    redirect: "/components/richtext",
    component: PageContent,
    name: 'components',
    children: [
        {
            path: "richtext",
            meta: { title: "富文本编辑器", icon: "richtext" },
            name: 'richtextComponents',
            component: () => import("@/views/components/richtext")
        },
        {
            path: "markdown",
            meta: { title: "Markdown编辑器", icon: "markdown" },
            name: "markdownComponents",
            component: () => import("@/views/components/markdown")
        },
        {
            path: "drag-dialog",
            meta: {title: "可拖拽Dialog", icon: "dialog"},
            name: "dragDialogComponents",
            component: ()=> import("@/views/components/drag-dialog")
        },
        {
            path: "back-to-top",
            meta: { title: "返回顶部", icon: "backtop" },
            name: "backToTopComponents",
            component: () => import("@/views/components/back-to-top")
        },
        {
            path: "element",
            meta: { title: "element", icon: "element" },
            name: "elementComponents",
            component: () => import("@/views/components/element")
        },
        {
            path: "other-components",
            meta: { title: "其他组件", icon: "other-components" },
            name: "otherComponents",
            component: () => import("@/views/components/other-components")
        }
    ]
}

export default components