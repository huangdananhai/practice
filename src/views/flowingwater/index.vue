<template>
  <div>
    <el-card shadow="never">
      <!-- 面包屑 -->
      <crumbs slot="header">
        <template slot="title">统计表</template>
      </crumbs>
      <el-row>
        <el-form :inline="true" class="demo-form-inline">
          <el-button type="primary" @click="export2Excel" size="mini"
            >导出</el-button
          >
          <el-input
            style="width: 15%"
            size="mini"
            v-model="search"
            type="text"
            placeholder="输入可查询的内容"
            clearable
          ></el-input>
          <el-button
            type="primary"
            size="mini"
            @click="onSubmit(search)"
            prop="search"
            v-model="search"
            icon="el-icon-search"
            >查询</el-button
          >
          <el-button type="primary" @click="refresh" size="mini"
            >刷新</el-button
          >
          <el-button type="primary" @click="sort" size="mini">排序</el-button>
          <!-- <input type="text" v-model="arr1" />
        <input type="text" v-model="arr2" />
        <el-card v-model="arr2"><el-image :src="url"  :preview-src-list="srcList"></el-image></el-card> -->
          <el-button
            size="mini"
            style="float: right"
            type="primary"
            plain
            @click="Addflowingwater"
            >添加</el-button
          >
        </el-form>
        <br />
      </el-row>
      <el-table
        v-loading="loading"
        element-loading-text="加载中"
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
        border
        :header-cell-style="{ background: '#f5f7fa', color: '#000' }"
      >
        <template>
          <el-table-column label="时间" width="120px">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{
                scope.row.date | testdate("YYYY-MM-DD hh:mm:ss 星期d")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总数">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.zs }}</span>
            </template>
          </el-table-column>
          <el-table-column label="已开户数(UCAS)" width="130px">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.UCAS }}</span>
            </template>
          </el-table-column>
          <el-table-column label="已开户数(DCAS)" width="130">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.DCAS }}</span>
            </template>
          </el-table-column>
          <el-table-column label="高优先级组数" width="110">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.gz }}</span>
            </template>
          </el-table-column>
          <el-table-column label="低优先级组数" width="110">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.dz }}</span>
            </template>
          </el-table-column>
          <el-table-column label="日志异常报错" width="115">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.consoleerr }}</span>
            </template>
          </el-table-column>
          <el-table-column label="每日开户" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{
                scope.row.Openanaccount
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>
          <el-table-column label="当日监控画面截图保存" width="170">
            <!-- <template slot-scope="scope">
            <span style="margin-left: 10px" >{{scope.row.img}}</span>
          </template> -->
            <!-- :preview-src-list="srcList" -->
            <el-image
              style="height: 30px"
              :src="scope.row.img"
              alt="图片"
              :preview-src-list="[scope.row.img]"
              slot-scope="scope"
            ></el-image>
            <!-- <el-image  @click="dialogVisible  = true"></el-image> -->
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row.id, scope.row)"
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
        </template>
      </el-table>

      <!--
    <el-card shadow="never" class="aaa">
      <table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
      >
         头部 
        <div id="customers">
          <tr v-for="(item, index) in tables" :key="index">
            <th>{{ item.id }}</th>
            <th>{{ item.date }}</th>
            <th>{{ item.zs }}</th>
            <th>{{ item.UCAS }}</th>
            <th>{{ item.DCAS }}</th>
            <th>{{ item.gz }}</th>
            <th>{{ item.dz }}</th>
            <th>{{ item.gGV_EMM }}</th>
            <th>{{ item.dGV_EMM }}</th>
            <th>{{ item.SGK_EMM }}</th>
            <th>{{ item.PK_EMM }}</th>
            <th>{{ item.EMM }}</th>
            <th>{{ item.ECM }}</th>
            <th>{{ item.DBGW }}</th>
            <th>{{ item.SNSGW }}</th>
            <th>{{ item.MYSQL }}</th>
            <th>{{ item.consoleerr }}</th>
            <th>{{ item.Lineup }}</th>
            <th>{{ item.Terminalonlinetest }}</th>
            <th>{{ item.Terminalofflinetest }}</th>
            <th>{{ item.Openanaccount }}</th>
            <th>{{ item.img }}</th>
            <th>{{ item.operation }}</th>
          </tr>
          <tr v-for="(item, index) in tableData" :key="'info2' + index">
            <td prop="id">{{ index.id }}</td>
            <td prop="date">{{ item.date }}</td>
            <td prop="zs">{{ item.zs }}</td>
            <td prop="UCAS">{{ item.UCAS }}</td>
            <td prop="DCAS">{{ item.DCAS }}</td>
            <td prop="gz">{{ item.gz }}</td>
            <td prop="dz">{{ item.dz }}</td>
            <td prop="gGV_EMM">{{ item.gGV_EMM }}</td>
            <td prop="dGV_EMM">{{ item.dGV_EMM }}</td>
            <td prop="SGK_EMM">{{ item.SGK_EMM }}</td>
            <td prop="PK_EMM">{{ item.PK_EMM }}</td>
            <td prop="EMM">{{ item.EMM }}</td>
            <td prop="ECM">{{ item.ECM }}</td>
            <td prop="DBGW">{{ item.DBGW }}</td>
            <td prop="SNSGW">{{ item.SNSGW }}</td>
            <td prop="MYSQL">{{ item.MYSQL }}</td>
            <td prop="consoleerr">{{ item.consoleerr }}</td>
            <td prop="Lineup">{{ item.Lineup }}</td>
            <td prop="Terminalonlinetest">{{ item.Terminalonlinetest }}</td>
            <td prop="Terminalofflinetest">{{ item.Terminalofflinetest }}</td>
            <td prop="Openanaccount">{{ item.Openanaccount }}</td>
            <td prop="img">{{ item.img }}</td>
            <td>
              <template>
                <el-button size="mini" @click="handleEdit(item.id)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(item.id)"
                  >删除</el-button
                >
              </template>
            </td>
          </tr>
          
        </div>
      </table>
    </el-card>
    -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.tableData.length"
      >
        <!--total ：代表的是数据的总长度-->
        <!--page-size：代表的是每一页数据的长度-->
        <!--current-page：代表当前页数-->
        <!--page-sizes：每页显示个数选择器-->
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";
const Base64 = require("js-base64").Base64;
export default {
  Base64,
  inject: ["reload"],
  data() {
    return {
      loading: false,
      dialogVisible: false,
      // arr1: Base64.encode("url"),
      // arr2: Base64.decode("dXJs"),
      labelPosition: "left",
      tableData: [],
      currentPage: 1, // 当前页码
      pageSize: 5, //每页显示
      date: new Date(),
      search: "",
      // tables: [
      //   {
      //     id: "ID",
      //     date: "时间",
      //     zs: "总数",
      //     UCAS: "UCAS开户",
      //     DCAS: "DCAS开户",
      //     gz: "高优先级组数",
      //     dz: "地优先级组数",
      //     gGV_EMM: "高GV_EMM刷新周期",
      //     dGV_EMM: "低GV_EMM刷新周期",
      //     SGK_EMM: "SGK_EMM刷新周期",
      //     PK_EMM: "PK_EMM刷新周期",
      //     EMM: "EMM内存",
      //     ECM: "ECM内存",
      //     DBGW: "DBGW内存",
      //     SNSGW: "SNSGW内存",
      //     MYSQL: "MYSQL内存",
      //     consoleerr: "日志异常报错",
      //     Lineup: "队列空闲率",
      //     Terminalonlinetest: "俩终端在线指令验证",
      //     Terminalofflinetest: "俩终端离线指令验证",
      //     Openanaccount: "每日开户",
      //     img: "当日监控画面截图保存",
      //     operation: "操作",
      //   },
      // ],
    };
  },

  created() {
    this.matterdata();
    this.loading = true;
  },
  computed: {},
  watch: {},
  directives: {
    trigger: {
      inserted(e) {
        e.click();
      },
    },
  },
  methods: {
    sort() {
      this.tableData.sort(function (a, b) {
        //降序
        // return a.date < b.date ? 1 : -1
        if (a.date > b.date) {
          return a.date < b.date ? 1 : -1;
        } else if (a.date < b.date ? 1 : -1) {
          return a.date > b.date ? 1 : -1;
        }
      });
    },
    refresh() {
      this.matterdata();
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    // 导出方法
    export2Excel() {
      require.ensure([], () => {
        const {
          export_json_to_excel,
        } = require("../../assets/excel/Export2Excel");
        const tHeader = [
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
          "MYSQL内存",
          "日志异常报错",
          "列队空闲率",
          "终端在线指令验证",
          "终端离线指令验证",
          "每日开户",
          "备注",
        ];
        const filterVal = [
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
          "SMSGW",
          "MYSQL",
          "consoleerr",
          "Lineup",
          "Terminalonlinetest",
          "Terminalofflinetest",
          "Openanaccount",
          "remarks",
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "统计巡检表格");
      });
    },

    handleEdit(index, row) {
      this.$router.push({ path: `editflowingwater/${index}` });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除数据
          this.$axios.delete("/list/" + `${index}`).then(
            (res) => {
              this.matterdata();
              // console.log(res, "删除成功");
            },
            function (err) {
              // console.log(err, "删除失败");
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
    },
    // 获取后台数据展现到界面
    matterdata() {
      this.loading = true;
      //  /list?_sort=date&_order=desc 进行倒叙排序
      this.$axios
        .get("/list?_sort=date&_order=desc")
        .then((result) => {
          this.tableData = result.data;
          this.loading = false;
        })
        .catch(() => {
            this.$message.error("获取列表数据失败！");
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
    // 查询方法
    onSubmit(search) {
      let _this = this;
      // _this.tableData = _this.tableData.filter(Val => {
      //   if (
      //     Val.date.includes(_this.search) ||
      //     Val.remarks.includes(_this.search)
      //   ) {
      //     _this.tableData.push(Val);
      //     return _this.tableData;
      //   }
      // });
      this.$axios
        .get(`/list?_sort=date&_order=desc&q=${_this.search}`)
        .then((res) => {
          return (this.tableData = res.data);
        });
    },
  },
  filters: {
    testdate(value, format) {
      return moment(value).format(format);
    },
    join(value) {
      for (var i = 0; i < value.length; i += 2) {
        return value.split("").slice(i).join("/");
      }
    },
  },
};
</script>

<style scoped>
.aaa {
  width: auto;
  height: auto;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  /* background-color: #f2f2f2; */
  background-color: #fff;
}

#customers tr:hover {
  background-color: rgb(177, 176, 176);
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}
</style>
