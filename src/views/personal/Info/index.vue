<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>个人信息</span>
		</div>
		<div class="img-box">
			<userImg />
			<p>{{user_name}}</p>
		</div>
		<div class="experience">
			<div class="Education">
				<i class="el-icon-star-on"></i>
				爱好
				<el-divider></el-divider>
                <el-tag v-for="item in items" :key="item.label" :type="item.type" effect="dark">{{ item.label }}</el-tag>
			</div>
			<div class="Skills">
				<i class="el-icon-s-order"></i>
				技术
				<el-divider></el-divider>
				<Progress />
			</div>
		</div>
	</el-card>
</template>

<script>
import { mapGetters } from "vuex";
import userImg from "@/components/UserImg";
import Progress from '@/components/Progress'
export default {
	name: "Info",
	components: {
        userImg,
        Progress
	},
	props: {},
	computed: {
		...mapGetters(["user_img", "user_name"])
	},
	data() {
		return {
			items: [
				{ type: "", label: "唱" },
				{ type: "success", label: "跳" },
				{ type: "info", label: "rap" },
				{ type: "danger", label: "篮球" },
				{ type: "warning", label: "music" }
			]
		};
	},
	created() {},
	mounted() {},
	methods: {},
	watch: {}
};
</script>

<style lang="scss" scoped>
</style>
