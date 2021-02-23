<template>
    <svg class="icon-svg" aria-hidden="true">
        <use :xlink:href="IconName" />
    </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    iconClass : {
      default : "",
      required: true
    }
  },
  computed: {
    IconName() {
      return `#icon-${this.iconClass}`
    }
  }
};
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