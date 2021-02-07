import { RouteConfig } from 'vue-router'
import PageContent from '@/layout/components/AppMain.vue'
const components: RouteConfig = {
    path: '/components',
    meta: { title: '组件', icon: 'components' },
    redirect: '/components/richtext',
    component: PageContent,
    name: 'components',
    children: [
        {
            path: 'richtext',
            meta: { title: '富文本编辑器', icon: 'richtext' },
            name: 'richtextComponents',
            component: () =>
                import(
                    /* webpackChunkName: "richtextComponents" */ '@/views/components/richtext/index.vue'
                )
        },
        {
            path: 'markdown',
            meta: { title: 'Markdown编辑器', icon: 'markdown' },
            name: 'markdownComponents',
            component: () =>
                import(
                    /* webpackChunkName: "markdownComponents" */ '@/views/components/markdown/index.vue'
                )
        },
        {
            path: 'drag-dialog',
            meta: { title: '可拖拽Dialog', icon: 'dialog' },
            name: 'dragDialogComponents',
            component: () =>
                import(
                    /* webpackChunkName: "componentsPage" */ '@/views/components/drag-dialog/index.vue'
                )
        },
        {
            path: 'back-to-top',
            meta: { title: '返回顶部', icon: 'backtop' },
            name: 'backToTopComponents',
            component: () =>
                import(
                    /* webpackChunkName: "componentsPage" */ '@/views/components/back-to-top/index.vue'
                )
        },
        {
            path: 'element',
            meta: { title: 'element', icon: 'element' },
            name: 'elementComponents',
            component: () =>
                import(
                    /* webpackChunkName: "componentsPage" */ '@/views/components/element/index.vue'
                )
        },
        {
            path: 'topology',
            meta: { title: '拓扑图', icon: 'topology' },
            name: 'topologyComponents',
            component: () =>
                import(
                    /* webpackChunkName: "componentsPage" */ '@/views/components/topology/index.vue'
                )
        },
        {
            path: 'other-components',
            meta: { title: '其他组件', icon: 'other-components' },
            name: 'otherComponents',
            component: () =>
                import(
                    /* webpackChunkName: "componentsPage" */ '@/views/components/other-components/index.vue'
                )
        }
    ]
}

export default components
