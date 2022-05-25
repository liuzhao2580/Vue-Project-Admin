<template>
  <i class="icon-svg">
    <svg class="icon-svg" aria-hidden="true">
      <use :xlink:href="IconName" />
    </svg>
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
interface IProps {
  iconClass: string
}
const props = defineProps<IProps>()

const IconName = computed(() => {
  return `#icon-${props.iconClass}`
})
</script>

<script lang="ts">
export default {
  name: 'SvgIcon'
}
</script>

<style lang="scss" scoped>
.icon-svg {
  width: 24px;
  svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
