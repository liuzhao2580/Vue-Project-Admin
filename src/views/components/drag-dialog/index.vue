<template>
	<div class="dragDialog-box">
		<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
		<el-dialog v-el-drag-dialog :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false" @opened="dialog_open" class="dialog-box">
			<!-- <span slot="title">这是一段信息</span> -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
/* eslint-disable */
import dragDialog from "@/directives/el-drag-dialog"
export default {
	name: "dragDialog",
    components: {},
    directives: {dragDialog},
	props: {},
	data() {
		return {
			dialogVisible: false
		};
	},
	created() {},
	mounted() {},
	methods: {
        dialog_open() {
            
        }
	},
	watch: {}
};
</script>

<style lang="scss" scoped>
.dialog-box {
    .el-dialog {
        position: absolute;
    }
}
</style>
