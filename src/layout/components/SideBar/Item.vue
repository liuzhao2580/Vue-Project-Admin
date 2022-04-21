<template>
  <SvgIcon :icon-class="icon" />
  <span>{{ title }}</span>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon/index.vue'
interface IProps {
  icon: string
  title: string
}

defineProps<IProps>()
</script>

<script lang="ts">
export default {
  name: 'MenuItem'
}
</script>
