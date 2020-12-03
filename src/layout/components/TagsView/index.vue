<template>
    <div class="TagsView-box">
        <el-scrollbar class="TagsView-scrollbar">
            <div class="tag-container-box">
                <template v-for="(tag, index) in tags_data">
                    <el-tag
                        :key="index"
                        :closable="is_closable(tag)"
                        effect="dark"
                        @close="handleClose(tag)"
                        size="small"
                        @click="handleClick(tag)"
                        disable-transitions
                        :class="{ 'is-active': is_active(tag.meta.title) }"
                        @contextmenu.prevent.native="tagContextmenu($event, tag, index)"
                        >{{ tag.meta.title }}</el-tag
                    >
                </template>
            </div>
        </el-scrollbar>
        <!-- 用来操作开启的 tag 标签 -->
        <ul v-show="operaTagFlag" class="hide-tag-box" :style="hideTagBox">
            <li :class="[disabledFlag ? 'disabled-operation' : 'hide-item']" @click="closeNow">
                关闭当前
            </li>
            <li class="hide-item" @click="closeOther">关闭其他</li>
            <li class="hide-item" @click="closeRight">关闭右侧</li>
            <li class="hide-item" @click="closeAll">全部关闭</li>
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
            // tag 操作菜单的显示隐藏
            operaTagFlag: false,
            // tag 操作菜单的样式
            hideTagBox: {
                left: 0,
                top: 0
            },
            // 记录当前右键的是哪个 tag
            saveCurrentTag: {
                currentIndex: -1,
                currentTag: null
            }
        }
    },
    computed: {
        ...mapGetters({
            tags_data: 'TagsView/tags_data',
            sideBarList: 'user/sideBarList'
        }),
        // 当前的 tag 是否可以操作
        disabledFlag() {
            let flag = false
            if (this.saveCurrentTag.currentIndex === 0 || this.saveCurrentTag.currentIndex === 1)
                flag = true
            return flag
        }
    },
    created() {},
    mounted() {
        this.init_tags()
        this.insertT_Tags()
    },
    methods: {
        ...mapActions({
            ACT_init_Tags: 'TagsView/ACT_init_Tags',
            ACT_setTags: 'TagsView/ACT_setTags'
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
                        name: item.name
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
                name: route.name
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
            this.$router.push({
                name: tag.name
            })
        },
        // 鼠标右键菜单
        tagContextmenu(e, tag, index) {
            // 1.获取 tag-container-box html元素
            const getTagBoxDom = document.querySelector('.tag-container-box')
            // 2.将伪数组变成真实的数组
            const getRealArr = Array.prototype.slice.call(getTagBoxDom.children)
            // 3.tag 的操作菜单需要left的 总长度
            let getAllWidth = 0
            getRealArr.forEach((item, Iindex) => {
                // 4.如果当前鼠标右键的元素索引小于其他元素，说明右边的元素长度不考虑
                if (Iindex >= index) return
                // 5.计算每个元素的 宽度 并且 + margin-right的5个像素点
                getAllWidth += item.offsetWidth + 5
            })
            this.hideTagBox.left = 20 + getAllWidth + 'px'
            this.hideTagBox.top = 40 + 'px'
            this.operaTagFlag = true
            this.saveCurrentTag.currentIndex = index
            this.saveCurrentTag.currentTag = tag
        },
        // 关闭当前
        closeNow() {
            const { currentIndex, currentTag } = this.saveCurrentTag
            if (currentIndex === 0 || currentIndex === 1) return
            this.handleClose(currentTag)
        },
        // 关闭其他
        closeOther() {
            const { currentIndex, currentTag } = this.saveCurrentTag
            this.tags_data.forEach((item, index) => {
                if (index === 0 || index === 1 || index === currentIndex) return
                this.tags_data.splice(index, 1)
            })
            // 说明 当前右键选中的 tag 不是当前路由所在，关闭其他之后，路由要跳转到当前位置
            if (!this.is_active(currentTag.meta.title)) this.handleClick(currentTag)
        },
        // 关闭右侧
        closeRight() {
            const { currentIndex, currentTag } = this.saveCurrentTag
            this.tags_data.forEach((item, index) => {
                if (index > currentIndex) this.tags_data.splice(index, 1)
            })
            // 说明 当前右键选中的 tag 不是当前路由所在，关闭其他之后，路由要跳转到当前位置
            if (!this.is_active(currentTag.meta.title)) this.handleClick(currentTag)
        },
        // 全部关闭
        closeAll() {
            this.tags_data.splice(2)
            this.$router.push('/')
        },
        // 关闭 可以 tag 的操作菜单
        closeTagOperation() {
            this.operaTagFlag = false
        },
        // 开启 tag 的操作菜单
        openTagOperation() {
            this.operaTagFlag = true
        }
    },
    watch: {
        '$route.path'() {
            this.insertT_Tags()
        },
        operaTagFlag(flag) {
            // 每次只要 开启 就全局监听 click 事件，用来关闭
            if (flag) document.body.addEventListener('click', this.closeTagOperation)
            else document.body.removeEventListener('click', this.closeTagOperation)
        }
    }
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
    .hide-item,
    .disabled-operation {
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        padding: 0px 10px;
        font-size: 14px;
    }
    .disabled-operation {
        cursor: not-allowed;
    }
    .hide-item {
        &:hover {
            background-color: pink;
            color: #fff;
        }
    }
}
</style>
