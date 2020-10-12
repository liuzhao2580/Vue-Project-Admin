<template>
    <div>
<<<<<<< HEAD
        <svg-icon :icon-class='icon'/>
=======
        <svg-icon :icon-class="icon" />
>>>>>>> master
        <span slot="title">{{title}}</span>
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
        }
    }
};
</script>
