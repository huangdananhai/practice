<template>
  <el-card shadow="never">
    <!-- 面包屑 -->
    <crumbs slot="header">
      <template slot="title"></template>
    </crumbs>
    <el-row>
      <el-button type="primary" @click="export2Excel">下载</el-button>
      <el-button
        style="float: right"
        type="primary"
        plain
        @click="Addflowingwater"
        >添加</el-button
      >
    </el-row>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
      border
    >
      <el-table-column label="ID">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总数">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.zs }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已开户数(UCAS)" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.UCAS }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已开户数(DCAS)" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.DCAS }}</span>
        </template>
      </el-table-column>
      <el-table-column label="高优先级组数" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gz }}</span>
        </template>
      </el-table-column>
      <el-table-column label="低优先级组数" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.dz }}</span>
        </template>
      </el-table-column>
      <el-table-column label="高GV_EMM刷新周期" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gGV_EMM }}</span>
        </template>
      </el-table-column>
      <el-table-column label="低GV_EMM刷新周期" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.dGV_EMM }}</span>
        </template>
      </el-table-column>
      <el-table-column label="SGK_EMM刷新周期" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.SGK_EMM }}</span>
        </template>
      </el-table-column>
      <el-table-column label="PK_EMM刷新周期" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.PK_EMM }}</span>
        </template>
      </el-table-column>
      <el-table-column label="EMM内存(M)" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.EMM }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ECM内存(M)" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ECM }}</span>
        </template>
      </el-table-column>
      <el-table-column label="DBGW内存(M)" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.DBGW }}</span>
        </template>
      </el-table-column>
      <el-table-column label="SMSGW内存(M)" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.SNSGW }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MYSQL内存(M)" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.MYSQL }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日志异常报错" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.consoleerr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="队列空闲率(3\2\1\0)" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.Lineup }}</span>
        </template>
      </el-table-column>
      <el-table-column label="俩终端在线指令验证" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.Terminalonlinetest
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="俩终端离线验证" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.Terminalofflinetest
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="每日开户" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.Openanaccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当日监控画面截图保存" width="90">
        <template prop="img">
          <span style="margin-left: 10px"></span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
      <!--total ：代表的是数据的总长度-->
      <!--page-size：代表的是每一页数据的长度-->
      <!--current-page：代表当前页数-->
      <!--page-sizes：每页显示个数选择器-->
    </el-pagination>
  </el-card>
</template>

<script>
import moment from "moment";
export default {
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页码
      pageSize: 5, //每页显示
      date: new Date(),
    };
  },
  created() {
    this.matterdata();
  },
  methods: {
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    export2Excel() {
      require.ensure([], () => {
        const {
          export_json_to_excel,
        } = require("../../assets/excel/Export2Excel");
        const tHeader = [
          "ID",
          "时间",
          "总数",
          "UCAS开户数",
          "DCAS开户数",
          "高优先级组数",
          "低优先级组数",
          "高GV_EMM刷新率",
          "低GV_EMM刷新率",
          "SGK_EMM刷新周期",
          "PK_EMM刷新周期",
          "EMM内存",
          "ECM内存",
          "DBGW内存",
          "SMSGW内存",
          "日志异常报错",
          "列队空闲率",
          "终端在线指令验证",
          "终端离线指令验证",
          "每日开户",
          "截图",
        ];
        const filterVal = [
          "id",
          "date",
          "zs",
          "UCAS",
          "DCAS",
          "gz",
          "dz",
          "gGV_EMM",
          "dGV_EMM",
          "SGK_EMM",
          "PK_EMM",
          "EMM",
          "ECM",
          "DBGW",
          "SNSGW",
          "MYSQL",
          "consoleerr",
          "Lineup",
          "Terminalonlinetest",
          "Terminalofflinetest",
          "Openanaccount",
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "统计巡检表格");
      });
    },

    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({ path: `editflowingwater/${index}` });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ////删除数据
          this.$axios.delete("/list/" + `${index}`).then(
            (res) => {
              this.reload();
              console.log(res, "删除成功");
            },
            function (err) {
              console.log(err, "删除失败");
            }
          );
          ////删除数据END
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      console.log(index, row);
    },
    matterdata() {
      this.$axios.get("/list").then((result) => {
        this.tableData = result.data;
      });
    },
    Addflowingwater() {
      this.$router.push({ path: "Addflowingwater" });
    },
    // 每页显示数据变更
    handleSizeChange(val) {
      // console.log("每页" + val + "条");
      //this.pageSize 是请求表格数据接口中的参数 设置表格每页显示多少条数据
      this.currentPage = 1;
      this.pageSize = val;
    },
    // 页码变更
    handleCurrentChange(val) {
      // console.log("当前页" + val);
      //this.currentPage 是请求表格数据接口中的参数 设置表格当前处于多少页
      this.currentPage = val;
    },
  },
  filters: {
    test(value, format) {
      return moment(value).format(format);
    },
  },
};
</script>

<style>
</style>