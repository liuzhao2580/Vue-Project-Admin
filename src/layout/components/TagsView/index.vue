<template>
    <div class="TagsView-box">
        <el-scrollbar class="TagsView-scrollbar">
            <template v-for="(tag,index) in tags_data">
                <el-tag
                    :key="index"
                    :closable="is_closable(tag)"
                    effect="dark"
                    @close="handleClose(tag)"
                    size="small"
                    @click="handleClick(tag)"
                    disable-transitions
                    :class="{ 'is-active' : is_active(tag.meta.title)}"
                    @contextmenu.prevent.native="tagContextmenu($event, index)"
                >{{tag.meta.title}}</el-tag>
            </template>
        </el-scrollbar>
        <!-- 用来操作开启的 tag 标签 -->
        <ul v-show="opearTagFlag" class="hide-tag-box" :style="hideTagBox">
            <li class="hide-item">关闭当前</li>
            <li class="hide-item">关闭其他</li>
            <li class="hide-item">关闭右侧</li>
            <li class="hide-item">全部关闭</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import path from 'path'
export default {
    name: 'TagsView',
    components: {},
    props: {},
    data() {
        return {
            affixTags: [],
            opearTagFlag: false,
            hideTagBox: {
                left: 0,
                top: 0
            }
        }
    },
    computed: {
        ...mapGetters({
            tags_data: 'TagsView/tags_data',
            sideBarList: 'user/sideBarList',
        }),
    },
    created() {},
    mounted() {
        this.init_tags()
        this.insertT_Tags()
    },
    methods: {
        ...mapActions({
            ACT_init_Tags: 'TagsView/ACT_init_Tags',
            ACT_setTags: 'TagsView/ACT_setTags',
        }),
        // 初始化 tags
        init_tags() {
            const routes = this.sideBarList
            const affixTags = this.filterAffixTags(routes)
            this.ACT_init_Tags(affixTags)
        },
        // 初始化的时候取出 固定的tags
        filterAffixTags(routes) {
            let tags = []
            tags = routes.filter((item) => {
                if (item.meta.affix) {
                    return {
                        fullPath: item.path,
                        meta: item.meta,
                        name: item.name,
                    }
                }
            })
            return tags
        },
        // 增加 tags
        insertT_Tags() {
            const route = this.$route
            const currentTag = {
                fullPath: route.fullPath,
                meta: route.meta,
                name: route.name,
            }
            this.ACT_setTags(currentTag)
        },
        // 用于高亮当前的tags
        is_active(tag) {
            return tag == this.$route.meta.title
        },
        // 用于设置 不显示关闭按钮 affix 存在 说明不能被关闭
        is_closable(tag) {
            if (tag.meta.affix) return false
            return true
        },
        // 点击关闭按钮
        handleClose(tag) {
            const getIndex = this.tags_data.indexOf(tag)
            const route = this.$route
            if (route.fullPath == tag.fullPath) {
                this.handleClick(this.tags_data[getIndex - 1])
            }
            this.tags_data.splice(getIndex, 1)
        },
        // 点击 tags 跳转
        handleClick(tag) {
            // this.insertT_Tags()
            this.$router.push({
                name: tag.name
            })
        },
        // 鼠标右键菜单
        tagContextmenu(e, index) {
            const getTagWidth = e.target.offsetWidth
            this.hideTagBox.left = 20 + (getTagWidth * (index))+ 'px'
            this.hideTagBox.top = 40 +'px'
            this.opearTagFlag = true
        },
        // 关闭 可以 tag 的操作菜单
        closeTagOperation() {
            this.opearTagFlag = false
        },
        // 开启 tag 的操作菜单
        openTagOperation() {
            this.opearTagFlag = true
        }
    },
    watch: {
        '$route.path'() {
            this.insertT_Tags()
        },
        opearTagFlag(flag) {
            // 每次只要 开启 就全局监听 click 事件，用来关闭
            if(flag) document.body.addEventListener('click',this.closeTagOperation)
            else document.body.removeEventListener('click',this.closeTagOperation)
        }
    },
}
</script>

<style lang="scss" scoped>
.TagsView-box {
    position: relative;
}
.hide-tag-box {
    position: absolute;
    background-color: #fafafa;
    box-shadow: 0px 0px 5px #a6a6a6;
    z-index: 9999;
    display: inline-block;
    border-radius: 5px;
    .hide-item {
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        padding: 0px 10px;
        font-size: 14px;
        &:hover {
            background-color: pink;
            color: #fff;
        }
    }
}
</style>
