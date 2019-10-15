<template>
	<div class="app-warpper">
        <el-container class="container-box">
            <el-aside width="200px" class="sider-box">
                <Sidebar />
            </el-aside>
            <el-main>
                <AppMain />
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { AppMain, Sidebar } from './components'
export default {
	name: "layout",
	components: {
        AppMain,
        Sidebar
    },
	props: {},
	data() {
		return {};
	},
	created() {},
	mounted() {},
	methods: {},
	watch: {}
};
</script>

<style lang="scss" scoped>
.app-warpper {
    .container-box {
        .sider-box {
            background-color: #304156;
        }
    }
}
</style>
