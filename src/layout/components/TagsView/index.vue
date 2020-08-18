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
                >{{tag.meta.title}}</el-tag>
            </template>
        </el-scrollbar>
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
    },
    watch: {
        '$route.path'() {
            this.insertT_Tags()
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
