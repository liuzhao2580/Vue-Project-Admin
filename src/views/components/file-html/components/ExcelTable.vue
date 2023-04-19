<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%; height: 100%"
    :max-height="maxHeight"
  >
    <el-table-column
      v-for="(tableItem, index) in tableHeader"
      :key="index"
      :label="tableItem"
      :prop="tableItem"
    >
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, shallowRef, computed, nextTick } from "vue"
interface IProp {
  tableData: any[]
  dialogVisible: boolean
}
const props = defineProps<IProp>()
const maxHeight = ref(0)
const getBody = shallowRef<HTMLBodyElement | null>()
onMounted(() => {
  getBody.value = document.querySelector("body") as HTMLBodyElement
  nextTick(() => {
    maxHeight.value = (getBody.value?.offsetHeight as number) - 150
  })
})

// 获取表格的表头
const tableHeader = computed(() => {
  return Object.keys(props.tableData[0])
})
watch(
  () => props.dialogVisible,
  flag => {
    if (flag) {
      // 通过当前body的高度,减去header和footer的高度, 从而动态设置 table的高度
      maxHeight.value = (getBody.value?.offsetHeight as number) - 150
    }
  }
)
</script>

<script lang="ts">
export default {
  name: "ExcelTable"
}
</script>

<style scoped lang="scss"></style>
