<template>
  <div class="table-search">
    <!-- 搜索的内容 -->
    <div class="table-search-box">
      <div class="table-search-box-container">
        <div
          v-for="(column, index) in columnConfig"
          :key="index"
          class="table-search-box-container-item"
        >
          <span class="">{{ column.label }}</span>
          <!-- 输入框 -->
          <template v-if="column.searchConfig?.type === ESearchType.input">
            <el-input v-model="modelObj[column.prop]" />
          </template>
          <!-- 下拉选 -->
          <template
            v-else-if="column.searchConfig?.type === ESearchType.select"
          >
            <!-- <el-select v-model="input">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select> -->
          </template>
          <!-- 年月日 YYYY-MM-DD -->
          <!-- 年月日 范围 YYYY-MM-DD~YYYY-MM-DD -->
          <!-- 年月日 时分秒 YYYY-MM-DD HH:mm:ss -->
          <!-- 年月日 时分秒范围 YYYY-MM-DD HH:mm:ss ~ YYYY-MM-DD HH:mm:ss -->
          <!-- 步进器 -->
        </div>
      </div>
      <div class="table-search-box-btn">
        <el-button @click="searchCancel">取消</el-button>
        <el-button type="primary" @click="searchClick">搜索</el-button>
        <el-button type="info">重置</el-button>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="table-search-mask" @click="maskClick"></div>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash'
import { ESearchType } from '@/typescript/shared/enum/table-enum'
import { IColumnConfig } from '@/typescript/shared/interface/table-interface'
import { ref } from 'vue'
interface IProps {
  columnConfig: IColumnConfig[]
  searchModel: {}
}

const props = defineProps<IProps>()

const emits = defineEmits<{ (e: 'maskClick'): void }>()

const modelObj = ref(cloneDeep(props.searchModel))

/** 搜索按钮点击事件 */
const searchClick = ()=> {
  console.log(modelObj.value)
}

/** 取消按钮点击 */
const searchCancel = () => {
  maskClick()
}

/** 遮罩层点击事件 */
const maskClick = () => {
  emits('maskClick')
}

</script>

<script lang="ts">
export default {
  name: 'TableSearch'
}
</script>

<style scoped lang="scss">
.table-search {
  position: absolute;
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  &-box {
    position: relative;
    padding: 12px;
    background-color: #f0f0f0;
    &-container {
      height: 300px;
      overflow: auto;
      margin-bottom: 46px;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: space-between;
      &-item {
        width: 48%;
        height: 46px;
        display: flex;
        align-items: center;
        > span {
          width: 100px;
        }
        .el-input {
          flex: 1;
        }
      }
    }
    &-btn {
      position: absolute;
      text-align: center;
      left: 0;
      right: 0;
      bottom: 0;
      height: 46px;
      z-index: 10;
    }
  }
  &-mask {
    flex: 1;
    background-color: #787878;
    opacity: 0.4;
  }
}
</style>
