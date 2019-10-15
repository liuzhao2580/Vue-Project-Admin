<template>
	<div v-if="!item.hidden" class="SidebarItem-box">
        <!-- 首先判断有没有 三级 四级... 多级路由 -->
        <template v-if="checkMoreRouter(item.children)">
            <!-- 说明只有一级菜单 -->
            <template v-if="!item.meta">
                 <el-menu-item :index="basePath">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{item.children[0].meta.title}}</span>
                </el-menu-item>
            </template>
            <!-- 说明存在二级菜单 -->
            <template v-else>
                <el-submenu :index="item.path">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">{{item.meta.title}}</span>
                    </template>
                    <el-menu-item-group v-for="groupItem in item.children" :key="groupItem.path">
                        <el-menu-item :index="item.path + '/' +groupItem.path">
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{groupItem.meta.title}}</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </template>
        </template>
        <!-- 说明存在 多级 菜单 -->
        <template v-else>
            
        </template>
	</div>
</template>

<script>
export default {
	name: "SidebarItem",
	components: {},
	props: {
		item: {
			type: Object
		},
		basePath: {
			type: String,
			default: ""
		}
	},
	data() {
		return {};
	},
	created() {},
	mounted() {},
	methods: {
        // 用户判断多级路由
        checkMoreRouter(Citem) {
            // 说明存在多级路由
            if (Citem.children) {
                return false
            }
            return true
        }
    },
	watch: {}
};
</script>

<style lang="scss" scoped>
</style>
