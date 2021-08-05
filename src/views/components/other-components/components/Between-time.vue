<template>
  <div class="between-time-box">
    <el-radio-group
      v-model="radioValue"
      @change="radioChange"
      class="radio-box"
    >
      <el-radio-button :label="BetweenTimeType.time">时间</el-radio-button>
      <el-radio-button :label="BetweenTimeType.date">日期</el-radio-button>
      <el-radio-button :label="BetweenTimeType.month">月份</el-radio-button>
      <el-radio-button :label="BetweenTimeType.year">年份</el-radio-button>
    </el-radio-group>
    <!-- 时间选择器 -->
    <div v-show="radioValue === BetweenTimeType.time" class="time-select-box">
      <el-time-select
        placeholder="起始时间"
        v-model="startTime"
        :picker-options="{
          start: '00:00',
          step: '00:60',
          end: '24:00',
          maxTime: endTime
        }"
        @change="startTimeChange"
      >
      </el-time-select>
      <el-time-select
        placeholder="结束时间"
        v-model="endTime"
        :disabled="!startTime"
        :picker-options="{
          start: '00:00',
          step: '00:60',
          end: '24:00',
          minTime: startTime
        }"
        @change="endTimeChange"
      >
      </el-time-select>
    </div>
    <!-- 日期选择器 日期 和 月份 -->
    <el-date-picker
      v-if="
        radioValue === BetweenTimeType.date ||
          radioValue === BetweenTimeType.month
      "
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      v-model="datePickerValue"
      :type="radioValue"
      @change="event => datePickerChange(event, radioValue)"
      style="width:200px"
    >
    </el-date-picker>
    <!-- 年份选择器 -->
    <div v-show="radioValue === BetweenTimeType.year" class="time-select-box">
      <el-date-picker
        v-model="startYear"
        type="year"
        :picker-options="{
          disabledDate(time) {
            if (endYear) return time > endYear
          }
        }"
        placeholder="选择年"
        @change="startYearChange"
      >
      </el-date-picker>
      <el-date-picker
        v-model="endYear"
        :disabled="!startYear"
        :picker-options="{
          disabledDate(time) {
            if (startYear) return time < startYear
          }
        }"
        type="year"
        placeholder="选择年"
        @change="endYearChange"
      >
      </el-date-picker>
    </div>
    <!-- 选择的数据 -->
    <div class="selected-data-box" v-show="selectedTimeData.length > 0">
      <p class="select-title">选中的数据</p>
      <div class="selected-item-box">
        <span
          class="selected-item"
          v-for="(date, index) in selectedTimeData"
          :key="index"
          >{{ date }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BetweenTimeTypeEnum } from '../shared/enum/other-components.enum'
import {
  getBetweenDate,
  getBetweenMonth,
  getBetweenYear,
  getBetweenTime
} from '../shared/utils/between-time'
@Component({})
export default class BetweenTime extends Vue {
  /** 实例化 单选框的枚举类型 */
  BetweenTimeType = BetweenTimeTypeEnum
  /** 单选框选中的数据 */
  radioValue: BetweenTimeTypeEnum = BetweenTimeTypeEnum.date
  /** 开始时间 */
  startTime: any = ''
  /** 结束时间 */
  endTime: any = ''
  /** 开始年份 */
  startYear: any = ''
  /** 结束年份 */
  endYear: any = ''
  /** 日期选择器 绑定的 model */
  datePickerValue: any = ''
  /** 时间选择器选中的数据 */
  selectedTimeData: string[] = []

  /** 单选框绑定值 发生变化 改变事件 */
  radioChange(value: BetweenTimeTypeEnum) {
    this.radioValue = value
    this.selectedTimeData = []
  }
  /** 时间选择器 开始时间选择器 */
  startTimeChange(value: string | null) {
    if (!value) this.endTime = null
  }
  /** 时间选择器 结束时间选择器 */
  endTimeChange(value: string | null) {
    if (value) this.selectedTimeData = getBetweenTime(this.startTime, value)
  }
  /** 日期选择器 改变事件 */
  datePickerChange(value: Array<Date>, type: BetweenTimeTypeEnum) {
    if (!value) return
    // 日期
    if (type === BetweenTimeTypeEnum.date)
      this.selectedTimeData = getBetweenDate(value[0], value[1])
    // 月份
    else if (type === BetweenTimeTypeEnum.month)
      this.selectedTimeData = getBetweenMonth(value[0], value[1])
  }
  /** 年份选择器 改变事件 开始年份 */
  startYearChange(value: Date | null) {
    if (!value) this.endYear = null
  }
  /** 年份选择器 改变事件 结束年份 */
  endYearChange(value: Date | null) {
    if (value) this.selectedTimeData = getBetweenYear(this.startYear, value)
  }
}
</script>

<style lang="scss" scoped>
.between-time-box {
  display: flex;
  flex-direction: column;
  // radio 选择器
  .radio-box {
    margin-bottom: 10px;
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
        font-family: '宋体';
        margin-bottom: 5px;
      }
    }
  }
}
</style>
