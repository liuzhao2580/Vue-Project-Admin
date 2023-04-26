<template>
  <span v-if="showType === EType.iconfont" :class="icon"> </span>
  <img
    class="icon-img"
    v-else-if="showType === EType.url"
    :src="props.icon"
    alt=""
  />
  <i v-else class="icon-svg">
    <svg>
      <use :href="symbolId" />
    </svg>
  </i>
</template>

<script lang="ts" setup>
import { computed } from "vue"
interface IProps {
  icon?: string
}
enum EType {
  // iconfont 字体文件
  iconfont = "iconfont",
  // svg
  svg = "svg",
  // url 链接
  url = "url"
}
const props = defineProps<IProps>()

const showType = computed(() => {
  let type: EType = EType.svg
  if (props.icon) {
    // 说明是 iconfont 字体
    if (/iconfont/.test(props.icon)) {
      type = EType.iconfont
    }
    // 说明是 url 链接
    else if (/http(s)/.test(props.icon)) {
      type = EType.url
    }
  }

  return type
})

const symbolId = computed(() => `#icon-${props.icon}`)
</script>

<script lang="ts">
export default {
  name: "SvgIcon"
}
</script>

<style lang="scss">
.icon-svg {
  vertical-align: middle;
  text-align: center;
  font-size: 18px;
  svg {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
  }
}
.icon-img {
  display: inline-block;
  width: 18px;
  height: 18px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
}
</style>
