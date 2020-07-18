<template>
  <div class="performance-main">
    <div class="performance-title">访问数</div>
    <panel-group />
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" @change="refreshCharts">
      <el-radio-button label="7">7天</el-radio-button>
      <el-radio-button label="15">15天</el-radio-button>
      <el-radio-button label="30">30天</el-radio-button>
    </el-radio-group>
    <div class="line-chart-div">
      <line-chart :chart-data="lineChartData" :x-axis="xAxis" />
    </div>
    <div class="performance-title">仪表盘</div>
    <el-row style="margin-left: 0; margin-right: 0;" :gutter="20">
      <el-col :span="12">
        <guage-chart :chart-data="cpuUsage" :chart-name="guageTitle[0]" />
      </el-col>
      <el-col :span="12">
        <guage-chart :chart-data="memoryUsage" :chart-name="guageTitle[1]" />
      </el-col>
    </el-row>
    <div class="systeminfo-table">
      <system-usage :table-data="systemUsage" :table-style="{ width:'100%' }" />
    </div>
    <div class="performance-title">服务器信息</div>
    <div class="systeminfo-table">
      <system-info :table-data="systemInfo" :table-style="{ width:'100%' }" />
    </div>
  </div>
</template>
<script>
import { getVisitByDay } from '@/api/visit'
import { getSystemInfo, getSystemUsage, getDiskUsage } from '@/api/systemInfo'
import PanelGroup from '@/components/PanelGroup'
import LineChart from '@/components/LineChart'
import SystemInfo from '@/components/SystemInfo'
import GuageChart from '@/components/GuageChart'
import SystemUsage from '@/components/SystemUsage'
export default {
  components: {
    PanelGroup,
    LineChart,
    SystemInfo,
    GuageChart,
    SystemUsage
  },
  data() {
    return {
      tabPosition: 7,
      lineChartData: {
        pvData: [],
        uvData: []
      },
      xAxis: [],
      systemInfo: [],
      guageTitle: ['cpu使用率', '内存使用率'],
      cpuUsage: 0,
      memoryUsage: 0,
      systemUsage: [{ key: '内存', usage: 0, free: 0, total: 0, use: 0 }],
      timer: null
    }
  },
  created() {
    this.getChartsData(7)
    this.getCpuAndMemoryUsage()
    this.getSystemInfoData()
    this.getDiskUsageData()
  },
  mounted() {
    this.timer = window.setInterval(() => {
      setTimeout(this.getCpuAndMemoryUsage, 0)
    }, 5000)
  },
  destroyed() {
    // 组件销毁时清除定时器
    clearInterval(this.timer)
  },
  methods: {
    // 刷新访问数折线图
    refreshCharts(selectNum) {
      this.getChartsData(selectNum)
    },
    // 获取访问数折线图数据
    getChartsData(days) {
      getVisitByDay(days).then(res => {
        this.xAxis = res.data.time
        this.lineChartData.pvData = res.data.pv
        this.lineChartData.uvData = res.data.uv
      })
    },
    // 获取cpu和内存的使用率
    getCpuAndMemoryUsage() {
      getSystemUsage().then(res => {
        this.cpuUsage = res.data.cpuUsage
        this.memoryUsage = res.data.memoryUsage
        this.systemUsage[0].usage = res.data.memoryUsage
        this.systemUsage[0].free = res.data.freeMemory
        this.systemUsage[0].use = res.data.useMemory
        this.systemUsage[0].total = res.data.totalMemory
      })
    },
    // 获取系统信息
    getSystemInfoData() {
      getSystemInfo().then(res => {
        const data = res.data
        for (const val in data) {
          const obj = {
            key: val,
            value: data[val]
          }
          this.systemInfo.push(obj)
        }
      })
    },
    // 获取硬盘使用率
    getDiskUsageData() {
      getDiskUsage().then(res => {
        const data = res.data
        for (const val in data) {
          const obj = {
            key: val,
            usage: data[val]['usage'],
            free: data[val]['free'],
            total: data[val]['total'],
            use: data[val]['use']
          }
          this.systemUsage.push(obj)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.performance-main{
  padding: 20px;
  // background-color: #f4f4f4;

  .performance-title{
    font-size: 24px;
    margin: 20px 0;
    color: #909399;
  }

  .line-chart-div{
    background-color: #fff;
    height: 380px;
    padding:16px 16px 0;
    margin-bottom:32px
  }

  .systeminfo-table{
    background-color: #fff;
    padding: 25px;
  }

  .el-row{
    width: 100%;
    height: 100%;
    background-color: #fff;

  }
}
</style>
