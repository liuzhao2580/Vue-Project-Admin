<template>
	<div class="map-box">
		<AmapCom />
	</div>
</template>

<script>
import AmapCom from "@/components/Amap";
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
	height: 600px;
    border: 5px solid #ccc;
    width: 100%;
    border-radius: 10px;
}
</style>
