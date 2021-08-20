<template>
  <div>
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
          <!-- <input type="text" v-model="arr1" />
        <input type="text" v-model="arr2" />
        <el-card v-model="arr2"><el-image :src="url"  :preview-src-list="srcList"></el-image></el-card> -->
          <el-button
          size="mini"
            style="float: right"
            type="primary"
            plain
            @click="Add"
            >添加</el-button
          >
        </el-form>
        <br>
      </el-row>
    <el-table
      v-loading="loading"
      element-loading-text="加载中"
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="日期" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="分类名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="level" label="级别"> </el-table-column>
      <el-table-column prop="quantity" label="商品数量"> </el-table-column>
      <el-table-column prop="exhibition" label="是否显示"> </el-table-column>
       <el-table-column  label="操作"> 
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
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search:'',
      loading: false,
      tableData: [],
    }
  },
    created() {
    this.matterdata();
    this.loading = true;
  },
  methods:{
    // 添加
    Add(){

    },
    // 刷新
    refresh(){

    },
    // 查询
    onSubmit(){

    },
    // 编辑
    handleEdit(index, row) {
      // this.$router.push({ path: `editflowingwater/${index}` });
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除数据
          this.$axios.delete("/productCate/" + `${index}`).then(
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
      this.$axios.get("/productCate?_sort=date&_order=desc").then((result) => {
        this.tableData = result.data;
        this.loading = false;
      }).catch(() => {
            this.$message.error("获取列表数据失败！");
        });
    },
  }
};
</script>

<style>
</style>