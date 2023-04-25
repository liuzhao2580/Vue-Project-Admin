<template>
  <span v-if="showType === EType.iconfont" :class="iconClass"> </span>
  <i v-else class="icon-svg">
    <svg>
      <use :href="symbolId" />
    </svg>
  </i>
</template>

<script lang="ts" setup>
import { computed } from "vue"
interface IProps {
  iconClass?: string
}
enum EType {
  iconfont = "iconfont",
  svg = "svg"
}
const props = defineProps<IProps>()

const showType = computed(() => {
  let type: EType = EType.svg
  if (props.iconClass && /iconfont/.test(props.iconClass)) {
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

<style lang="scss">
.icon-svg {
  vertical-align: middle;
  margin-right: 5px;
  text-align: center;
  font-size: 18px;
  svg {
    width: 1em;
    height: 1em;
    vertical-align: middle;
  }
}
</style>
