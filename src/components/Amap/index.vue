<template>
	<div class="amap-page-container AmapCom-box">
		<!-- <el-amap-search-box
			class="search-box"
			:search-option="searchOption"
			:on-search-result="onSearchResult"
		></el-amap-search-box>
		<el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="mapCenter">
            <el-amap-marker v-for="(marker,index) in markers" :position="marker" :key="index"></el-amap-marker>
        </el-amap> -->

		<!-- <div class="toolbar">
			<span v-if="loaded">location: lng = {{ lng }} lat = {{ lat }}</span>
			<span v-else>正在定位</span>
		</div> -->
	</div>
</template>
<script src="https://webapi.amap.com/maps?v=1.4.8&key=626c3bb76a402642db9015e188d25a98" />

<script>
/*eslint-disable */
import "./AmapConfig.js";
// import AMap from "vue-amap";
export default {
	name: "AmapCom",
	components: {},
	props: {},
	data() {
		let self = this;
		return {
		};
	},
	created() {},
	mounted() {},
	methods: {
	},
	watch: {}
};
</script>

<style lang="scss" scoped>
.AmapCom-box {
	height: 100%;
	.amap-demo {
		height: 100%;
	}
}
</style>
