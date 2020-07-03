<template>
	<div class="map-box">
		<AmapCom />
	</div>
</template>

<script>
import AmapCom from "./Amap";
export default {
	name: "amap",
	components: {
		AmapCom
	},
	props: {},
	data() {
        return{}
	},
	created() {},
	mounted() {},
	methods: {},
	watch: {}
};
</script>

<style lang="scss" scoped>
.map-box {
    border: 5px solid #ccc;
	width: 100%;
	height: 800px;
    border-radius: 10px;
}
</style>
