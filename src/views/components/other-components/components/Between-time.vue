<template>
    <div>
        <el-radio-group v-model="radioValue" @change='radioChange'>
            <el-radio-button label="时间"></el-radio-button>
            <el-radio-button label="日期"></el-radio-button>
            <el-radio-button label="月份"></el-radio-button>
            <el-radio-button label="年份"></el-radio-button>
        </el-radio-group>
        <el-date-picker
            v-model="datePickerValue"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
        >
        </el-date-picker>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class BetweenTime extends Vue {
    radioValue: string = '日期'
    datePickerValue: any = ''

    /** 单选框绑定值 发生变化 改变事件 */
    radioChange(value: string) {
        console.log(value, 'value')
    }
}
</script>

<style lang="scss" scoped></style>
