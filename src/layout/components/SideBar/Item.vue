<template>
    <div>
        <svg-icon :icon-class="icon" />
        <span slot="title">{{$t(`i18n.routes.${name}`)}}</span>
    </div>
</template>
<script>
export default {
	name: "MenuItem",
	props: {
		icon: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: ""
		},
		name: {
			type: String,
			default: ''
		}
    }
};
</script>
