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
/* eslint-disable */
import { mapGetters } from "vuex"
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
        this.init_tags()
    },
	methods: {
        // 初始化 tags 
        init_tags() {
            const routes = this.$router.options.routes
            const affixTags = this.filterAffixTags(routes)
            console.log(affixTags)
            // for (const tag of affixTags) {
            //     store.dispatch("TagsView/ACT_setTags", tag);
            // }
        },
        // 增加 tags
        insertT_Tags() {
            
            // for (const tag of affixTags) {
            //     store.dispatch("TagsView/ACT_setTags", tag);
            // }
        },
        filterAffixTags(routes) {
            const tags = routes.filter(item => {
                if (item.children && !item.meta) {
                    if (item.children[0].meta.affix) {
                       return true 
                    }
                }
            })
            return tags;
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
        
    },
	watch: {
        $route: {
            handler() {
                this.insertT_Tags()
            },
            immediate: true
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
