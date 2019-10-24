import Layout from '@/layout'

const components = {
    path: "/components",
    component: Layout,
    meta: { title: "组件", icon: "components" },
    redirect : "/components/tinymce",
    children: [
        {
            path: "tinymce",
            meta: { title: "Tinymce富文本", icon: "tinymce" },
            name: 'tinymce',
            component: () => import ("@/views/components/tinymce")
        },
        {
            path: "CKEditor",
            meta: { title: "CKEditor富文本", icon: "richtext" },
            name: "CKEditor",
            component: () => import("@/views/components/CKEditor")
        },
        {
            path: "markdown",
            meta: { title: "Markdown编辑器", icon: "markdown" },
            name: "markdown",
            component: () => import("@/views/components/markdown")
        },
        
    ]
}

export default components