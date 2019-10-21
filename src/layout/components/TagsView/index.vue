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
                    :class="{ 'is-active' : is_active(tag.meta.title)}"
				>{{tag.meta.title}}</el-tag>
			</template>
		</el-scrollbar>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import path from 'path'
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
	created() {},
	mounted() {
        this.initTags()
    },
	methods: {
        // 初始化 tags
        // init_Tags() {
        //     // console.log(111)
        //     console.log(store.state.TagsView.init_Tags)
        // },
        // 增加 tags
        insertT_Tags() {
            const TagsTitle = this.$route
            store.dispatch("TagsView/ACT_setTags", TagsTitle)
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
			this.tags_data.splice(this.tags_data.indexOf(tag), 1);
        },
        // 点击 tags 跳转
		handleClick(tag) {
            this.$router.push(tag.path)
        },
        filterAffixTags(routes, basePath = "/") {
            let tags = [];
            routes.forEach(route => {
                if (route.meta && route.meta.affix) {
                    const tagPath = path.resolve(basePath, route.path);
                    tags.push({
                        fullPath: tagPath,
                        path: tagPath,
                        name: route.name,
                        meta: { ...route.meta }
                    });
                }
                if (route.children) {
                    const tempTags = this.filterAffixTags(
                        route.children,
                        route.path
                    );
                    if (tempTags.length >= 1) {
                        tags = [...tags, ...tempTags];
                    }
                }
            });
            return tags;
        },
        initTags() {
            console.log(this.$router.options)
            const affixTags = (this.affixTags = this.filterAffixTags(
                this.$router.options.routes
            ));
            console.log(affixTags)
            // for (const tag of affixTags) {
            //     // Must have tag name
            //     if (tag.name) {
            //         this.$store.dispatch("tagsView/addVisitedView", tag);
            //     }
            // }
        },
    },
    beforeDestroy() {
        store.dispatch("TagsView/ACT_initTags")
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
