<template>
    <div :class="{'has-logo':showLogo}">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="false"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="route in permissionData"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import axios from "axios";
import baseURL from "@/assets/js/config";
import {aside} from "@/api/login.js";
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
    data() {
        return {
            permissionData: []
        }
    },
    components: { SidebarItem, Logo },
    computed: {
        ...mapGetters(["permission_routes", "sidebar"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        // 初始化
        init() {
            this.permissionData = this.$store.getters.permission_routes
            // let params = {
            //     GYWL2RoleId: sessionStorage.getItem("GYWL2RoleId")
            // };
            // aside(params).then(({data}) => {
            //     const getRouter = this.$router.options.routes
            //     this.permissionData = []
            //     getRouter.forEach(item => {
            //         data.forEach(DItem => {
            //             if (!item.hidden && item.children[0].meta.title == DItem.par) {
            //                 this.permissionData.push(item)
            //             }
            //         })
            //     })
            //     // this.$router.addRoutes(this.permissionData)
            // })
        }
    },
};
</script>
