<template>
  <el-card shadow="never" class="el-card__div">
    <crumbs slot="header">
      <template slot="title">错误总结</template>
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
      <br />
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
        <el-table-column width="200">
          <template slot-scope="scope">
            <strong style="font-size: 18px">{{ scope.row.title }}</strong>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.content | test
            }}</span>
          </template>
        </el-table-column>
        <el-table-column width="51">
          <el-button
            slot-scope="scope"
            type="text"
            @click="handleDelete(scope.row.id, scope.row)"
            >删除</el-button
          >
          </el-table-column>
          <el-table-column width="52">
          <el-button type="text" @click="handleEdit(scope.row.id, scope.row)"
            >编辑</el-button
          >
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
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      img: require("../../../assets/image/471820949993651087.jpg"),
      tableData: [],
      loading: false,
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页多少条
      total: 0, // 总条数
      search: "",
    };
  },
  mounted() {
    this.matterdata();
  },
  filters: {
    test(value) {
      return value.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "");
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
      this.$router.push({ path: "Addconclusion" });
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
    // 查询方法
    onSubmit(search) {
      let _this = this;
      this.$axios
        .get(`/Bugsummary?_sort=date&_order=desc&q=${_this.search}`)
        .then((res) => {
          return (this.tableData = res.data);
        });
    },
  },
};
</script>

<style>
</style>