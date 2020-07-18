<template>
  <div>
    <table class="mailTable" :style="styleObject">
      <tr v-for="(item,index) in tableData" :key="index">
        <td v-if="item.key == '内存'" class="column">{{ item.key }}</td>
        <td v-else class="column">{{ item.key }}盘</td>
        <td class="td-right">
          <el-progress class="use-process" :text-inside="true" :stroke-width="20" :percentage="item.usage" />
          已用:{{ item.use }}G
          <span style="float:right;">
            可用:{{ item.free }}G/总量:{{ item.total }}G
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>
<style>
.use-process{
    width: 50%;
    display: inline-block;
}
.mailTable {
    border-collapse: collapse;
    border-radius: 8px;
    margin: 10px 0;
}
.mailTable, .mailTable tr, .mailTable tr td{
    border:1px solid #dfe6ec;
}
.mailTable{
    font-size: 15px;
    color: #606266;
}
.mailTable tr td{
    border:1px solid #dfe6ec;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    padding: 0 10px;
    text-align: left;
}
.mailTable tr td.column {
    width: 20%;
    color: #909399;
    font-weight: 550;
    text-align: center;
}
</style>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['tableData', 'tableStyle'],
  data() {
    return {
      styleObject: {}
    }
  },
  created() {
    this.styleObject = this.tableStyle
  }
}
</script>

