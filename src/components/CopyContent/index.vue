<template>
  <div class="copy-content" title="点击复制">
    <span class="copy-text">{{ props.copyText }}</span>
    <i class="iconfont icon-fuzhi" @click="copyClick"></i>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
interface IProps {
  copyText: string;
}

const props = defineProps<IProps>();

function copyClick() {
  navigator.clipboard.writeText(props.copyText).then(
    () => {
      ElMessage({
        message: "复制成功: " + props.copyText,
        type: "success",
        center: true,
        duration: 1000
      });
    },
    error => {
      console.log(error);
    }
  );
}
</script>

<script lang="ts">
export default {
  name: "CopyContent"
};
</script>

<style scoped lang="scss">
.copy-content {
  display: inline-block;
  .copy-text {
    font-weight: 700;
    margin-right: 3px;
  }
  .iconfont {
    cursor: pointer;
  }
}
</style>
