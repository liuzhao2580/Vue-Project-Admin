<template>
	<div class="Navbar-box">
        <div class="Navbar-Breadcrumb">
            <div class="side-btn" @click="side_Btn">
                <i class="el-icon-s-operation"></i>
            </div>
            <!-- 面包屑 -->
            <Breadcrumb />
            <!-- 中英文切换 -->
            <Change-language />
            <!-- 颜色选择器 -->
            <Change-color />
            <!-- 个人 -->
            <Personal />
        </div>
        <TagsView />
    </div>
</template>

<script>
import Breadcrumb from "../Breadcrumb"
import TagsView from "../TagsView"
import Personal from '../Personal'
import ChangeLanguage from '../Change-language'
export default {
	name: "Navbar",
	components: {
        Breadcrumb,
        TagsView,
        ChangeLanguage,
        Personal,
        ChangeColor: () => import('../ChangeColor')
    },
	props: {},
	data() {
		return {};
	},
	created() {},
	mounted() {},
	methods: {
        // 侧边栏按钮点击事件
        side_Btn() {
            this.$store.dispatch("app/change_SideStatus")
        },
    },
	watch: {}
};
</script>

<style lang="scss" scoped>
@import "./index.scss"
</style>
