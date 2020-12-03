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
            <div v-show="isMobile" class="click-icon el-icon-s-operation" @click="showORhidden"></div>
        </el-container>
    </div>
</template>

<script>
import { AppMain, Sidebar, Navbar } from './components'
import { mapGetters,mapActions } from 'vuex'
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
        ...mapActions({
            ACT_unflodSide: 'app/ACT_unflodSide'
        }),
        init() {
            // userInfoApi().then((res) => {
            //     console.log(res)
            // })
        },
        // 在 mobile 移动端模式下显示隐藏 侧边栏按钮
        showORhidden() {
            this.ACT_unflodSide()
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
            cursor: pointer;
            width: 40px;
            height: 40px;
            font-size: 20px;
            text-align: center;
            line-height: 40px;
            box-shadow: 0px 0px 8px #a6a6a6;
            background-color: #fff;
            position: fixed;
            left: 0;
            top: 100px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
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
