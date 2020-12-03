<template>
    <div class="breadcrumb-box">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="hidden-md-and-down">
            <el-breadcrumb-item :to="{ path: '/' }">{{ breadcrumbTitle }}</el-breadcrumb-item>
            <!--面包屑的切换动画 -->
            <transition-group
                name="breadcrumb-transition"
                mode="out-in"
                v-if="getMatched.length !== 0"
            >
                <el-breadcrumb-item
                    v-for="item in getMatched"
                    :key="item.path"
                    :to="handleClick(item)"
                    >{{ item.meta.title }}</el-breadcrumb-item
                >
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script>
import defaultConfig from '@/setting'
export default {
    name: 'breadcrumb',
    computed: {
        breadcrumbTitle() {
            return defaultConfig.title
        }
    },
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

<style lang="scss" scoped>
/*---------------------------------面包屑的过度动画----------------------- */
.breadcrumb-transition-enter,
.breadcrumb-transition-leave {
    opacity: 0.2;
}
.breadcrumb-transition-enter {
    opacity: 0;
    transform: translateX(50px);
}
.breadcrumb-transition-leave {
    opacity: 0;
    transform: translateX(-50px);
}
.breadcrumb-transition-enter-active,
.breadcrumb-transition-leave-active {
    transition: 0.7s;
}
/*---------------------------------面包屑的过度动画----------------------- */
</style>
