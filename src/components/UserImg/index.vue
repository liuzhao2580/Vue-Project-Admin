<template>
	<div class="UserImg-box">
		<div class="img" :style="{backgroundImage: `url(${user_img})`}"></div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: "UserImg",
    components: {},
    computed: {
        ...mapGetters(["user_img"])
    },
};
</script>

<style lang="scss" scoped>
.UserImg-box {
	margin: 0 auto;
	width: 120px;
	height: 120px;
	text-align: center;
	&:hover {
		.img {
			transform: rotate(-360deg);
		}
	}
	.img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-size: cover;
		background-position: 50%;
		transition: all 0.6s;
	}
}
</style>
