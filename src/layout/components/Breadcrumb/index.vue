<template>
    <div class="breadcrumb-box">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">{{breadcrumbTitle}}</el-breadcrumb-item>
            <!--面包屑的切换动画 -->
            <transition-group name="breadcrumb-transition" mode="out-in" v-if="getMatched.length !== 0">
                <el-breadcrumb-item  v-for="item in getMatched" :key="item.path" :to="handleClick(item)">{{item.meta.title}}</el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script>
/* eslint-disable */
import defaultConfig from "@/setting"
export default {
    name: "breadcrumb",
    computed: {
        breadcrumbTitle() {
            return defaultConfig.title
        }
    },
    data() {
        return {
            getMatched : []
        }
    },
    created() {},
    methods: {
        init() {
            const nowRoute = this.$route
            // 说明只有一级路由
            if (nowRoute.matched.length == 2) {
                this.getMatched = nowRoute.matched.filter(item => {
                    if (item.name) {
                        // 用于判断 当前页面是否在首页
                        if (item.path == "/dashboard") {
                            return  false
                        } else {
                            return true
                        }
                    }
                })
            } 
            // 说明存在多级路由
            else if (nowRoute.matched.length > 2){
                // 用于判断当前的路由是否显示在面包屑中
                this.getMatched = nowRoute.matched.filter(item => {
                    if (item.meta.breadcrumb == false) {
                        return false
                    } else {
                        return true
                    }
                })
            }
        },
        // 面包屑点击
        handleClick(item) {
            if (item.redirect !== "noRedirect") {
                return item.redirect
            } else {
                return
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
};
</script>

<style>
</style>