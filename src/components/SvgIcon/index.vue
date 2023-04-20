<template>
  <span v-if="showType === EType.iconfont" :class="iconClass">
  </span>
  <svg v-else class="icon-svg" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue"
interface IProps {
  iconClass?: string;
}
enum EType {
  iconfont = "iconfont",
  svg = "svg"
}
const props = defineProps<IProps>()

const showType = computed(()=> {
  let type: EType = EType.svg
  if(props.iconClass && /iconfont/.test(props.iconClass)) {
    type = EType.iconfont
  }
  return type
})

const symbolId = computed(() => `#icon-${props.iconClass}`)
</script>

<script lang="ts">
export default {
  name: "SvgIcon"
}
</script>

<style lang="scss" scoped>
.icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
