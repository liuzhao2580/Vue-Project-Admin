<template>
  <div class="option-config-box">
    <!-- 选择地图的主题 -->
    <div class="select-theme">
      <el-select
        v-model="themeModel"
        placeholder="请选择地图主题"
        @change="themeChange"
      >
        <el-option
          v-for="themeItem in selectTheme"
          :key="themeItem.label"
          :label="themeItem.label"
          :value="themeItem.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import AMapInit from "../utils"
@Component({
  name: "OptionConfig",
})
export default class OptionConfig extends Vue {
  /** 当前选中的主题 */
  themeModel: string = "normal"
  /** 高德地图内定的主题 */
  selectTheme: Array<any> = [
    {
      label: "标准 normal",
      value: "normal",
    },
    {
      label: "幻影黑 dark",
      value: "dark",
    },
    {
      label: "月光银 light",
      value: "light",
    },
    {
      label: "远山黛 whitesmoke",
      value: "whitesmoke",
    },

    {
      label: "草色青 fresh",
      value: "fresh",
    },
    {
      label: "雅士灰 grey",
      value: "grey",
    },
    {
      label: "涂鸦 graffiti",
      value: "graffiti",
    },
    {
      label: "马卡龙 macaron",
      value: "macaron",
    },
    {
      label: "靛青蓝 blue",
      value: "blue",
    },
    {
      label: "极夜蓝 darkblue",
      value: "darkblue",
    },
    {
      label: "酱籽 wine",
      value: "wine",
    },
  ]
  /** 地图主题改变事件 */
  themeChange(value) {
    AMapInit.setAMapStyle(value)
  }
}
</script>

<style lang="scss" scoped>
.option-config-box {
  margin-bottom: 10px;
}
</style>
