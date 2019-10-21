<template>
	<div class="Navbar-box">
        <div class="Navbar-Breadcrumb">
            <div class="side-btn" @click="side_Btn">
                <i class="el-icon-s-operation"></i>
            </div>
            <Breadcrumb />
        </div>
        <TagsView />
    </div>
</template>

<script>
import Breadcrumb from "../Breadcrumb"
import TagsView from "../TagsView"
export default {
	name: "Navbar",
	components: {
        Breadcrumb,
        TagsView
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
