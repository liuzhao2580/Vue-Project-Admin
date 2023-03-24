<template>
  <svg class="icon-svg" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue"
interface IProps {
  iconClass?: string;
}
const props = defineProps<IProps>()

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
