<template>
    <div class="breadcrumb-box">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">{{ $t(`i18n.routes.dashboard`) }}</el-breadcrumb-item>
            <!--面包屑的切换动画 -->
            <transition-group name="breadcrumb-transition" mode="out-in" v-if="getMatched.length !== 0">
                <el-breadcrumb-item v-for="item in getMatched" :key="item.path" :to="handleClick(item)"
                    >{{$t(`i18n.routes.${item.name}`)}}</el-breadcrumb-item
                >
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'breadcrumb',
    data() {
        return {
            getMatched: []
        }
    },
    created() {},
    methods: {
        init() {
            const nowRoute = this.$route.matched
            this.getMatched = nowRoute.filter((item) => {
                // 说明存在多级路由
                if (item.meta && item.meta.title) {
                    // 用于判断 当前页面是否在首页
                    if (item.path == '/dashboard') return false
                    // 用于判断当前的路由是否显示在面包屑中
                    else if (item.meta.breadcrumb == false) return false
                    return true
                }
            })
        },
        // 面包屑点击
        handleClick(item) {
            // 用于判断当前的面包屑是否可以点击跳转
            if (item.redirect !== 'noRedirect') {
                return item.redirect
            }
        }
    },
    watch: {
        $route: {
            handler() {
                this.init()
            },
            immediate: true
        }
    }
}
</script>

<style></style>
