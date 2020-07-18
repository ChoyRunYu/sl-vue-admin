<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-todayPv">
          <svg-icon icon-class="todayPv" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日访问数(PV)
          </div>
          <count-to :start-val="0" :end-val="panelGroupData.todayPv" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-todayUv">
          <svg-icon icon-class="todayUv" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日访客数(UV)
          </div>
          <count-to :start-val="0" :end-val="panelGroupData.todayUv" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-totalPv">
          <svg-icon icon-class="totalPv" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总访问数(PV)
          </div>
          <count-to :start-val="0" :end-val="panelGroupData.totalPv" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-totalUv">
          <svg-icon icon-class="totalUv" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总访客数(UV)
          </div>
          <count-to :start-val="0" :end-val="panelGroupData.totalUv" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getVisitInfo } from '@/api/visit'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      panelGroupData: {
        'todayPv': 0, 'todayUv': 0, 'totalPv': 0, 'totalUv': 0
      }
    }
  },
  mounted() {
    getVisitInfo().then(res => {
      this.panelGroupData = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-todayPv {
        background: #40c9c6;
      }

      .icon-todayUv {
        background: #36a3f7;
      }

      .icon-totalPv {
        background: #f4516c;
      }

      .icon-totalUv {
        background: #34bfa3
      }
    }

    .icon-todayPv {
      color: #40c9c6;
    }

    .icon-todayUv {
      color: #36a3f7;
    }

    .icon-totalPv {
      color: #f4516c;
    }

    .icon-totalUv {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
