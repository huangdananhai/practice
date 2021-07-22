<template>
  <el-card shadow="never" class="el-card__div">
    <crumbs slot="header">
      <template slot="title">查看</template>
    </crumbs>
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
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
        <el-button type="primary" @click="refresh" size="mini">刷新</el-button>
        <el-button
          size="mini"
          style="float: right"
          type="primary"
          plain
          @click="Addbugconclusion"
          >添加</el-button
        >
      </el-form>
      <span style="font-size:10px;color:#000" v-cloak>共找到 {{tableData.length}} 条数据</span>
    </el-row>
    <el-card shadow="never">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        :show-header="false"
        v-loading="loading"
        element-loading-text="加载中"
      >
        <el-table-column width="80">
          <template>
            <el-image :size="70" :src="img"></el-image>
          </template>
        </el-table-column>
        <el-table-column width="90">
          <template slot-scope="scope">
            <span style="font-size: 8px">{{
              scope.row.newDate | testdate("YYYY-MM-DD hh:mm:ss")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column width="140">
          <template slot-scope="scope">
            <span class="span">{{ scope.row.title }}</span>
            <!-- <el-button type="success" style="font-size: 16px">{{ scope.row.title }}</el-button> -->
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div style="margin-left: 10px">{{ scope.row.content }}</div>
          </template>
        </el-table-column>
        <el-table-column width="130" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="danger"
              style="padding: 5px !important"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.row.id, scope.row)"
              size="small"
            ></el-button>
            <el-button
              type="primary"
              style="padding: 5px !important"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.row.id, scope.row)"
              size="small"
            ></el-button>
            <el-button
              type="success"
              style="padding: 5px !important"
              icon="el-icon-thumb"
              @click="handlesee(scope.row.id, scope.row)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[3, 5, 10, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
    <!-- 查看界面 -->
    <el-dialog :visible.sync="dialogTableVisible" :fullscreen="true">
      <el-card shadow="never">
        <el-form>
          <el-form-item label="" prop="title">
             <el-button type="success" style="font-size: 16px" >{{form.title}}</el-button>
          </el-form-item>
          <el-form-item label="" prop="content">
            <strong style="font-size: 25px">内容</strong><br />
            <el-input
              readonly="readonly"
              type="textarea"
              class="text"
              :rows="18"
              v-model="form.content"
            ></el-input>
          </el-form-item>
          <br />
        </el-form>
      </el-card>
    </el-dialog>
  </el-card>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      loading:true,
      form: "",
      dialogTableVisible: false,
      img: require("../../../assets/image/471820949993651087.jpg"),
      tableData: [],
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页多少条
      total: 0, // 总条数
      search: "",
      replace: "",
      time: "",
    };
  },
  mounted() {
    this.matterdata();
  },
  filters: {
    testdate(value, format) {
      return moment(value).format(format);
    },
  },
  methods: {
    refresh() {
      this.matterdata();
    },
    async matterdata() {
      this.loading = true;
      //  /list?_sort=date&_order=desc 进行倒叙排序
      this.$axios.get("/Bugsummary?_sort=id&_order=desc").then((result) => {
        this.tableData = result.data;
        this.loading = false;
      });
    },
    Addbugconclusion() {
      this.$router.push({ path: "/list/add" });
    },
    //每页显示数据变更
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
    //删除
    handleDelete(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ////删除数据
          this.$axios.delete("/Bugsummary/" + `${index}`).then(
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
    //编辑
    handleEdit(index, row) {
      this.$router.push({ path: `editcondusion/${index}` });
    },
    // 查看
    handlesee(index, row) {
      // this.$router.push({ path: `Viewlist/${index}` });
      this.dialogTableVisible = true;
      this.form = Object.assign({ index }, row);
    },
    // 查询方法
    onSubmit(search) {
      let _this = this;
      this.$axios
        .get(`/Bugsummary?_sort=id&_order=desc&q=${_this.search}`)
        .then((res) => {
          return (this.tableData = res.data);
        });
    },
  },
};
</script>

<style scoped>
.text {
  display: flex;
  width: 100%;
  font-size: 18px;
}
.span{
  font-size: 16px;
  background:#67C23A;
  color:#fff;
}
</style>