<template>
  <div>{{ name12 }}</div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
@Component({
  name: "threeJSComponents",
})
export default class ThreeJSComponents extends Vue {
  name12 = "1234"
}
</script>

<style lang="scss" scoped></style>
