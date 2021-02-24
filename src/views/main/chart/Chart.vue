<template>
  <div class="chart">
    <el-card class="progress">
      <ul class="list">
        <li>
          <div class="itemContent color1">{{ chartData.increment_users }}</div>
          <p>今日新增用户</p>
        </li>
        <li>
          <div class="itemContent color2">{{ chartData.total_users }}</div>
          <p>总用户量</p>
        </li>
        <li>
          <div class="itemContent color3">
            {{ chartData.increment_questions }}
          </div>
          <p>新增试题</p>
        </li>
        <li>
          <div class="itemContent color4">{{ chartData.total_questions }}</div>
          <p>总试题量</p>
        </li>
        <li>
          <div class="itemContent color5">
            {{ chartData.total_done_questions }}
          </div>
          <p>总刷题量</p>
        </li>
        <li>
          <div class="itemContent color6">
            {{ chartData.personal_questions }}
          </div>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>
    <el-card class="box-card" id="main1" style="height:400px;"></el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  created () {
    this.getChartData()
  },
  async mounted () {
    // console.log(echarts)
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('main1'))
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption({
      title: {
        text: '黑马面面用户访问来源',
        left: 'center'
      },
      color: [
        '#5470c6',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc'
      ],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '70%',
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' },
            { value: 300, name: '视频广告' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  },
  data () {
    return {
      chartData: {}
    }
  },
  methods: {
    async getChartData () {
      const res = await this.$axios.post('/data/title')
      // console.log(res)
      if (res.code !== 200) {
        return this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
      this.chartData = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 100%;
}
.box-card {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
.list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  li p {
    font-size: 14px;
    color: #888;
    line-height: 24px;
  }
  .itemContent {
    border-radius: 50%;
    width: 99px;
    height: 99px;
    line-height: 99px;
  }
  .color1 {
    border: 3px solid #0086fa;
    color: #0086fa;
  }
  .color2 {
    border: 3px solid #f76137;
    color: #f76137;
  }
  .color3 {
    border: 3px solid #43b984;
    color: #43b984;
  }
  .color4 {
    border: 3px solid #9a60b4;
    color: #9a60b4;
  }
  .color5 {
    border: 3px solid #fac858;
    color: #fac858;
  }
  .color6 {
    border: 3px solid #ea7ccc;
    color: #ea7ccc;
  }
}
</style>
