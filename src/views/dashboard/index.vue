<template>
	<div class="dashboard-box">
        <card />
    </div>
</template>

<script>
// import { dashboardApi } from "@/api/dashboard"
export default {
	name: "dashboard",
	components: {
        card: () => import("./card")
    },
	props: {},
	data() {
		return {};
	},
	created() {
        this.init()
    },
	mounted() {},
	methods: {
        // 初始化
        init() {
            // dashboardApi().then((data) => {
            //     console.log(data)
            console.log(222)
            // })
        }
    },
	watch: {}
};
</script>

<style lang="scss" scoped>
</style>
