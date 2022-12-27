<template>
  <div :style="{ height }" :id="echartsId"></div>
</template>

<script lang="ts" setup>
import { watch, withDefaults, ref, onMounted, nextTick } from "vue";
import { init } from "echarts";
import type { EChartsOption } from "echarts";
import EchartMixins from "./mixins";

interface IProps {
  height?: string;
  echartsData: EChartsOption;
  echartsTitle?: string;
}
const props = withDefaults(defineProps<IProps>(), {
  height: "400px",
  echartsTitle: "Echarts",
  echartsData: () => {
    return {};
  }
});
const { EchartsInstances } = EchartMixins();

/** echarts 的id */
const echartsId = `echarts-${
  +new Date().getTime() + (10000 * Math.random()).toFixed(0)
}`;

const EchartsDom = ref<HTMLElement>();

// 暴露出去,通过 ref 获取子组件
defineExpose({
  echartsInstances: EchartsInstances
});

onMounted(() => {
  EchartsDom.value = document.querySelector(`#${echartsId}`) as HTMLElement;
  nextTick(() => {
    initEcharts();
  });
});

/** 初始化 Echarts */
const initEcharts = () => {
  if (!EchartsInstances.value) {
    EchartsInstances.value = init(EchartsDom.value as HTMLElement);
  }

  EchartsInstances.value.setOption(props.echartsData);
};

// 用来监听 echartsData 的数据变化
watch(
  () => props.echartsData,
  () => {
    EchartsInstances.value?.clear();
    initEcharts();
  }
);
</script>

<script lang="ts">
export default {
  name: "EchartsCom"
};
</script>

<style lang="scss" scoped></style>
