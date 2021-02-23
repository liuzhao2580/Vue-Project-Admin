<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnode = []
    vnode.push(<svg-icon icon-class={icon} />)
    vnode.push(<span slot="title">{title}</span>)
    return vnode
  }
}
</script>
