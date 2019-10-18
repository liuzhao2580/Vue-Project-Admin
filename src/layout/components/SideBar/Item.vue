
<script>
export default {
	name: "MenuItem",
	functional: true,
	props: {
		icon: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: ""
		}
    },
    /* eslint-disable */
	render(h, context) {
        // 渲染函数, 用于创建 html 元素

        // 获得传递的 icon 和 title 
        const { icon ,title } = context.props
        const vnodes = []
        if (icon) {
            vnodes.push(<svg-icon icon-class={icon} />)
        }
        if (title) {
            vnodes.push(<span slot="title">{title}</span>)
        }
        // 将生成的数据放入数组中返回
		return vnodes;
	}
};
</script>
