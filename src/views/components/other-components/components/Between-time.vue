<template>
  <div class="between-time-box">
    <el-radio-group
      v-model="state.radioValue"
      @change="radioChange"
      class="radio-box"
    >
      <el-radio-button :label="BetweenTimeTypeEnum.time">时间</el-radio-button>
      <el-radio-button :label="BetweenTimeTypeEnum.date">日期</el-radio-button>
      <el-radio-button :label="BetweenTimeTypeEnum.month">月份</el-radio-button>
      <el-radio-button :label="BetweenTimeTypeEnum.year">年份</el-radio-button>
    </el-radio-group>
    <!-- 时间选择器 -->
    <div
      v-show="state.radioValue === BetweenTimeTypeEnum.time"
      class="time-select-box"
    >
      <el-time-select
        placeholder="起始时间"
        v-model="state.startTime"
        start="00:00"
        step="00:60"
        end="24:00"
        :max-time="state.endTime"
        @change="startTimeChange"
      />
      <el-time-select
        placeholder="结束时间"
        v-model="state.endTime"
        :disabled="!state.startTime"
        start="00:00"
        step="00:60"
        end="24:00"
        :min-time="state.startTime"
        @change="endTimeChange"
      />
    </div>
    <!-- 日期选择器 日期 和 月份 -->
    <el-date-picker
      v-if="
        state.radioValue === BetweenTimeTypeEnum.date ||
        state.radioValue === BetweenTimeTypeEnum.month
      "
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      v-model="state.datePickerValue"
      :type="state.radioValue"
      @change="(value: Date[]) => datePickerChange(value, state.radioValue)"
    >
    </el-date-picker>
    <!-- 年份选择器 -->
    <div
      v-show="state.radioValue === BetweenTimeTypeEnum.year"
      class="time-select-box"
    >
      <el-date-picker
        v-model="state.startYear"
        type="year"
        :disabled-date="(time: Date) =>{
            if (state.endYear) return time.toString() > state.endYear
          }"
        placeholder="选择年"
        @change="startYearChange"
      >
      </el-date-picker>
      <el-date-picker
        v-model="state.endYear"
        :disabled="!state.startYear"
        :disabled-date="(time: Date)=> {if (state.startYear) return time.toString() < state.startYear}"
        type="year"
        placeholder="选择年"
        @change="endYearChange"
      >
      </el-date-picker>
    </div>
    <!-- 选择的数据 -->
    <div class="selected-data-box" v-show="state.selectedTimeData.length > 0">
      <p class="select-title">选中的数据</p>
      <div class="selected-item-box">
        <span
          class="selected-item"
          v-for="(date, index) in state.selectedTimeData"
          :key="index"
          >{{ date }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { BetweenTimeTypeEnum } from "../shared/enum/other-components.enum";
import {
  getBetweenDate,
  getBetweenMonth,
  getBetweenYear,
  getBetweenTime
} from "../shared/utils/between-time";

type BetweenTimeType = BetweenTimeTypeEnum | string | number | boolean;

interface IState {
  /** 单选框选中的数据 */
  radioValue: BetweenTimeType;
  /** 开始时间 */
  startTime: string;
  /** 结束时间 */
  endTime: string;
  /** 开始年份 */
  startYear: string;
  /** 结束年份 */
  endYear: string;
  /** 日期选择器 绑定的 model */
  datePickerValue: string;
  /** 时间选择器选中的数据 */
  selectedTimeData: string[];
}

const state = reactive<IState>({
  /** 单选框选中的数据 */
  radioValue: BetweenTimeTypeEnum.date,
  /** 开始时间 */
  startTime: "",
  /** 结束时间 */
  endTime: "",
  /** 开始年份 */
  startYear: "",
  /** 结束年份 */
  endYear: "",
  /** 日期选择器 绑定的 model */
  datePickerValue: "date",
  /** 时间选择器选中的数据 */
  selectedTimeData: []
});

/** 单选框绑定值 发生变化 改变事件 */
const radioChange = (value: BetweenTimeType) => {
  state.radioValue = value;
  state.selectedTimeData = [];
};
/** 时间选择器 开始时间选择器 */
const startTimeChange = (value: string | null) => {
  if (!value) state.endTime = "";
};
/** 时间选择器 结束时间选择器 */
const endTimeChange = (value: string | null) => {
  if (value) state.selectedTimeData = getBetweenTime(state.startTime, value);
};
/** 日期选择器 改变事件 */
const datePickerChange = (value: Date[], type: BetweenTimeType) => {
  if (!value || !Array.isArray(value)) return;
  // 日期
  if (type === BetweenTimeTypeEnum.date)
    state.selectedTimeData = getBetweenDate(value[0], value[1]);
  // 月份
  else if (type === BetweenTimeTypeEnum.month)
    state.selectedTimeData = getBetweenMonth(value[0], value[1]);
};
/** 年份选择器 改变事件 开始年份 */
const startYearChange = (value: Event) => {
  if (!value) state.endYear = "";
};
/** 年份选择器 改变事件 结束年份 */
const endYearChange = (value: Event) => {
  if (value)
    state.selectedTimeData = getBetweenYear(state.startYear, value.toString());
};
</script>

<style lang="scss" scoped>
.between-time-box {
  display: flex;
  flex-direction: column;
  // radio 选择器
  .radio-box {
    margin-bottom: 10px;
  }
  ::v-deep(.el-date-editor.el-input__wrapper) {
    width: auto;
  }
  // 时间 年份 选择器
  .time-select-box {
    display: flex;
    justify-content: space-between;
    > div {
      flex: 0.48;
    }
  }
  // 选择的数据
  .selected-data-box {
    margin-top: 10px;
    .select-title {
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }
    .selected-item-box {
      display: flex;
      flex-wrap: wrap;
      .selected-item {
        margin-right: 5px;
        border: 1px solid #c0c0c0;
        padding: 2px 5px;
        font-size: 12px;
        font-family: "宋体";
        margin-bottom: 5px;
      }
    }
  }
}
</style>
