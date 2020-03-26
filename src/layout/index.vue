<template>
	<div class="app-warpper">
        <el-container class="container-box">
            <el-aside :width="asideWidth" class="sider-box" >
                <Sidebar />
            </el-aside>
            <el-main class="main-box" :style="{marginLeft: (side_status? '64px':'200px')}">
                <Navbar />
                <AppMain />
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { AppMain, Sidebar, Navbar } from './components'
import {mapGetters} from 'vuex'
// import { userInfoApi } from '@/api/user'
import ResizeMixin from './mixin/Resize.js'
export default {
	name: "layout",
	components: {
        AppMain,
        Sidebar,
        Navbar
    },
    mixins: [ResizeMixin],
    computed: {
        ...mapGetters(["side_status"]),
        asideWidth() {
            if (this.side_status) return "64px"
            return "200px"
        }
    },
	props: {},
	data() {
		return {};
	},
	created() {},
	mounted() {
        // 初始化
        this.init()
    },
	methods: {
        init() {
            // userInfoApi().then((res) => {
            //     console.log(res)
            // })
        }
    },
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
