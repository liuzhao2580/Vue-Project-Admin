<template>
	<div class="TagsView-box">
		<el-scrollbar class="TagsView-scrollbar">
			<template v-for="tag in tags_data">
				<el-tag
					:key="tag.path"
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
/* eslint-disable */
import { mapGetters } from "vuex"
import path from "path"
import store from '@/store'
export default {
	name: "TagsView",
	components: {},
	props: {},
	data() {
		return {
            affixTags: []
		};
    },
    computed: {
        ...mapGetters(["tags_data"])
    },
	created() {
        this.init_tags()
        this.insertT_Tags()
    },
	mounted() {},
	methods: {
        // 初始化 tags 
        init_tags() {
            const routes = this.$router.options.routes
            const affixTags = this.filterAffixTags(routes)
            store.dispatch("TagsView/ACT_init_Tags", affixTags)
        },
        // 初始化的时候取出 固定的tags
        filterAffixTags(routes) {
            let tags = []
            routes.forEach(item => {
                if (item.children && !item.meta) {
                    if (item.children[0].meta.affix) {
                       let item_child = item.children[0]
                       tags.push({
                           fullPath: path.resolve(item.path, item_child.path),
                           meta: item_child.meta,
                           name: item_child.name
                       })
                    }
                }
            })
            return tags;
        },
        // 增加 tags
        insertT_Tags() {
            const route = this.$route
            const currentTag = {
                fullPath: route.fullPath,
                meta: route.meta,
                name: route.name
            }
            store.dispatch("TagsView/ACT_setTags", currentTag);
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
            this.tags_data.splice(getIndex, 1);
        },
        // 点击 tags 跳转
		handleClick(tag) {
            this.$router.push(tag.fullPath)
        }
    },
	watch: {
        $route: {
            handler() {
                this.insertT_Tags()
            }
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
