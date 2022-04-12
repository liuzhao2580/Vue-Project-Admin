<template>
  <div class="timeline-box">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        placement="top"
        color="#409EFF"
        size="large"
        :timestamp="activity.timestamp"
      >
        <el-card>
          <h3 style="margin-bottom: 10px">{{ activity.project_name }}</h3>
          <p>{{ activity.project_outline }}</p>
          <p>{{ activity.project_personal }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
interface IActive {
  project_name: string
  timestamp: string
  icon: string
  project_outline: string
  project_personal: string
}
const activities = ref<IActive[]>()
activities.value = [
  {
    project_name: '多赢普惠官网',
    timestamp: '201801-201807',
    icon: 'el-icon-more',
    project_outline:
      '项目概述：展示公司的基本信息，提供注册登录选项，对公司的产品进行展示.',
    project_personal:
      '个人职责：主要负责首页、注册、登录等页面的布局，其他页面简单动画的切换，用户的交互功能'
  },
  {
    project_name: '多赢普惠APP',
    timestamp: '201801-201807',
    icon: 'el-icon-view',
    project_outline:
      '项目概述：用户可以进行登录、注册、查询等功能，每日基金推荐、提供网贷服务等功能.',
    project_personal: '个人职责： 按公司项目团队编码规范进行编写代码'
  },
  {
    project_name: '转换商城',
    timestamp: '201808-201901',
    icon: 'el-icon-bell',
    project_outline:
      '项目概述：类似于京东淘宝的购物商城，用户可以进行注册、登录、搜索商品、购物等基本功能',
    project_personal:
      '个人职责： 整个项目自己主要负责商城注册页面、登录页面和购物车页面以及一些其它页面的编写和渲染,通过发送Ajax向后台请求数据,校验用户登录名和密码是否匹配等等功能的实现'
  },
  {
    project_name: '医疗项目的后台管理系统',
    timestamp: '201903-至今',
    icon: 'el-icon-info',
    project_outline: `项目概述: 项目具有登录的功能,每个用户可以根据自己的账户名和密码进行登录, 而且每个用户名具有自己独立的权限, 使其能够访问该权限下的页面, 其他没有权限的页面该用户不可见. 页面的Echarts图表能够展示不同时间段, 不同数据的变化趋势,  用户可以对不同的患者信息进行相应的增删改查处理. `,
    project_personal:
      '个人职责:  整个项目基本上是自己独立完成, 在任务比较繁重的时候, 后台的工作人员会帮忙完善一些功能代码.'
  }
]
</script>

<script lang="ts">
export default {
  name: 'Timeline'
}
</script>

<style lang="scss" scoped>
.timeline-box {
  .el-timeline {
    padding-left: 10px;
  }
}
</style>
