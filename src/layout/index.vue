<template>
    <div class="app-warpper">
        <el-container :class="[isMobile ? 'mobile' : 'desktop', 'container-box']">
            <el-aside :width="dynamicWidth" class="sider-box">
                <Sidebar />
            </el-aside>
            <el-main class="main-box" :style="{ marginLeft: dynamicWidth }">
                <Navbar class="nav-bar" />
                <AppMain class="app-main" />
            </el-main>
            <div class="click-icon">1111</div>
        </el-container>
    </div>
</template>

<script>
import { AppMain, Sidebar, Navbar } from './components'
import { mapGetters } from 'vuex'
import ResizeMixin from './mixin/Resize.js'
export default {
    name: 'Layout',
    components: {
        AppMain,
        Sidebar,
        Navbar
    },
    mixins: [ResizeMixin],
    computed: {
        ...mapGetters({
            side_status: 'app/side_status',
            isMobile: 'app/isMobile'
        }),
        dynamicWidth() {
            if (this.isMobile) return '0'
            if (this.side_status) return '64px'
            return '200px'
        }
    },
    props: {},
    data() {
        return {}
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
}
</script>

<style lang="scss" scoped>
.app-warpper {
    .container-box {
        .sider-box {
            background-color: #304156;
        }
    }
    .mobile {
        .click-icon {
            width: 200px;
            height: 200px;
            background-color: pink;
            position: fixed;
            left: 0;
            top: 100px;
        }
    }
    .main-box {
        display: flex;
        flex-direction: column;
        /deep/ .app-main {
            flex: 1;
            > div {
                height: 100%;
            }
        }
    }
}
</style>
