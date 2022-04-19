<template>
  <div class="Calculator-box">
    <el-card class="box-card">
      <p>使用 computed 的简单计算器</p>
      <div
        v-for="item in CalculatorData"
        :key="item.name"
        class="Calculator-input"
      >
        <el-input v-model="item.value"></el-input>
        <span>{{ item.name }}</span>
      </div>
      <p style="margin-top: 10px">一共花费 {{ total }}</p>
    </el-card>
    <el-card class="box-card">
      <div>
        <span>使用 computed 的简单截取 </span>
        <el-button type="primary" @click="clear">清空</el-button>
      </div>
      <div v-for="item in nameDate" :key="item.name" class="Calculator-input">
        <el-input v-model="item.value"></el-input>
        <span>{{ item.name }}</span>
      </div>
      <p style="margin-top: 10px">全名 {{ fullName }}</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CalculatorCom',
  components: {},
  props: {},
  computed: {
    total() {
      let getTotal = 0
      this.CalculatorData.forEach(item => {
        getTotal += Number(item.value)
      })
      return getTotal
    },
    fullName: {
      get() {
        let getFullName = ''
        this.nameDate.forEach(item => {
          getFullName += item.value
        })
        return getFullName
      },
      set() {
        this.nameDate.forEach(item => {
          item.value = ''
        })
      }
    }
  },
  data() {
    return {
      CalculatorData: [
        {
          name: '早餐',
          value: ''
        },
        {
          name: '中餐',
          value: ''
        },
        {
          name: '晚餐',
          value: ''
        }
      ],
      nameDate: [
        {
          name: '姓',
          value: ''
        },
        {
          name: '名',
          value: ''
        }
      ]
    }
  },
  methods: {
    clear() {
      this.fullName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.Calculator-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
  span {
    text-align: center;
    width: 30%;
    vertical-align: middle;
  }
}
</style>
