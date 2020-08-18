<template>
	<div v-if="!item.hidden" class="SidebarItem-box">
        <!-- 首先判断 当级路由下不存在多级路由 -->
        <template v-if="checkMoreRouter(item)">
            <el-menu-item :index="resolvePath(onlyOneChild.path)">
                <MenuItem :icon="onlyOneChild.meta.icon" :title="onlyOneChild.meta.title"/>
            </el-menu-item>
        </template>
        <!-- 当级路由下存在多级路由 -->
        <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body :class="{'MenuitemClass' : (side_status && !isMoreChild) }">
            <template slot="title">
                <MenuItem :icon="onlyOneChild.meta.icon" :title="onlyOneChild.meta.title" />
            </template>
            <template v-if="item.children">
                <SidebarItem
                    v-for="child in item.children"
                    :key="child.path"
                    :item="child"
                    :isMoreChild="true"
                    :base-path="resolvePath(child.path)"
                    class="More-Sildbar"
                />
            </template>
        </el-submenu>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
// 引入 path 模块 用于拼接url地址
import path from 'path'
import MenuItem from './Item'
export default {
	name: "SidebarItem",
    components: {
        MenuItem
    },
    computed: {
        ...mapGetters({
            side_status: 'app/side_status'
        })
    },
	props: {
		item: {
			require: true
		},
		basePath: {
			type: String,
			default: ""
        },
        isMoreChild: {
            type:Boolean,
            default: false
        }
	},
	data() {
		return {
            onlyOneChild: null
        };
	},
	created() {},
	mounted() {},
	methods: {
        // 用于拼接 url 地址
        resolvePath(routePath) {
            return path.resolve(this.basePath, routePath)
        },
        // 用户判断多级路由
        checkMoreRouter(route) {
            // 判断 是否含有多级路由
            // 当 children 存在时, 说明还存在子路由
            if (route.children) {
                this.onlyOneChild = route
                return false
            }
            // 说明当前路由不存在子路由 
            else {
                // 如果 isMoreChild 存在 说明当前的路由是通过递归传递的数据
                if (this.isMoreChild) {
                    // 重新定义 path 
                    this.onlyOneChild = {...route,path:""}
                }
                // 说明 当前的路由是一级路由 
                else {
                    this.onlyOneChild = route
                }
                return true
            }
        },
    },
	watch: {}
};
</script>

<style lang="scss" scoped>
</style>
