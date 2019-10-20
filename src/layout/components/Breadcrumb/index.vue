<template>
    <div class="breadcrumb-box">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">{{breadcrumbTitle}}</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in getMatched" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
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
            console.log(nowRoute)
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
            } else if (nowRoute.matched.length > 2){
                this.getMatched = nowRoute.matched
            }
            console.log(this.getMatched)
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