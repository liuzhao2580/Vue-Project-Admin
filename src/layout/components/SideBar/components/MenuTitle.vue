<template>
  <SvgIcon :icon-class="icon" />
  <span>{{ title }}</span>
</template>

<script lang="ts" setup>
interface IProps {
  icon: string
  title: string
}

defineProps<IProps>()
</script>

<script lang="ts">
export default {
  name: 'MenuTitle'
}
</script>
