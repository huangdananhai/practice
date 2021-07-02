<template>
<div>
      <div id="main" style="width: auto; height: 550px"></div>
        <p>123123</p>
</div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  mounted() {
    this.initCharts();
    this.matterdata();
  },
  methods: {
    initCharts() {
      // 初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));
      // 绘制图表
      this.$axios.get('/list').then((res)=>{
        for(var i=0;i<res.data.length;i++){

      myChart.setOption({
        title: {
          text: "巡检表格统计",
        },
        //配置提示信息
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
           data: ["EMM内存", "ECM内存", "DBGW内存", "SMSGW内存", "MYSQL内存"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        // 配置要在 X 轴显示的项:
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["EMM内存", "ECM内存", "DBGW内存", "SMSGW内存", "MYSQL内存"],
          },
        ],
        // 配置要在 Y 轴显示的项
        yAxis: [
          {
            type:"value",
          //  data: ["EMM内存", "ECM内存", "DBGW内存", "SMSGW内存", "MYSQL内存"],
          },
        ],
        // 每个系列通过 type 决定自己的图表类型:
        series: [
          {
            name: "EMM内存",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [res.data.date]
          },
          {
            name: "ECM内存",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
             data: [res.data[i].ECM,res.data[i].ECM,res.data[i].ECM,res.data[i].ECM,res.data[i].ECM]
          },
          {
            name: "DBGW内存",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [res.data[i].DBGW,res.data[i].DBGW,res.data[i].DBGW,res.data[i].DBGW,res.data[i].DBGW]
          },
          {
            name: "SMSGW内存",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
             data: [res.data[i].SMSGW,res.data[i].SMSGW,res.data[i].SMSGW,res.data[i].SMSGW,res.data[i].SMSGW]
          },
          {
            name: "MYSQL内存",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
             data: [res.data[i].MYSQL,res.data[i].MYSQL,res.data[i].MYSQL,res.data[i].MYSQL,res.data[i].MYSQL]
          },
        ],
      });
      }
    })
    },
    matterdata() {
      this.$axios.get("/list").then((result) => {
        this.tableData = result.data;
      });
    },
  },
};
</script>

<style>
</style>