<template>
  <el-card shadow="never">
    <crumbs slot="header">
      <template slot="title">文章</template>
    </crumbs>
    <template><el-backtop :bottom="100"></el-backtop></template>
    <el-card
      shadow="never"
      class="box_fixed"
      id="boxFixed"
      :class="{ is_fixed: isFixed }"
    >
      <span v-if="tableData.length">共{{ tableData.length }}条</span>
      <el-button type="primary" size="mini" @click="Addarticle">Add</el-button>
      <el-input
        style="width: 50%"
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
        icon="el-icon-search"
        >查询</el-button
      >
      <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
      <br />
      <div v-if="!tableData.length" class="div_null">
        <img src="../../assets/image/无数据图.jpg" alt="" />
      </div>
      <!-- <el-empty description="描述文字" v-show="emptyShow"></el-empty> -->
    </el-card>
    <hr />
    <!-- <el-card shadow="never" style="white-space: pre-wrap;" v-for="(itme, index) in tableData" :key="index"> {{itme.content}}</el-card> -->
    <div class="otitle" ref="div" v-show="value">
      <table
        v-for="(itme, index) in tableData"
        :key="index"
        style="white-space: pre-wrap;"
      >
        <el-tag type="success" color="#409EFF" class="table_tag">{{
          index + 1 + "&nbsp;" + "&nbsp;" + "&nbsp;" + itme.title
        }}</el-tag>
        <el-card class="table_card" shadow="never"
          >{{ itme.content }}<br />
          <el-button
            type="text"
            @click="handleDelete(itme.id)"
            style="font-size:10px"
            >删除</el-button
          >
          <el-button
            type="text"
            @click="handleEdit(itme.id, itme.index)"
            style="font-size:10px"
            >编辑</el-button
          >
        </el-card>
      </table>
    </div>

    <el-dialog :visible.sync="dialogTableVisible" :fullscreen="true">
      <el-card shadow="never">
        <el-form
          :rules="rules"
          ref="ruleForm"
          :model="ruleForm"
          :label-position="labelPosition"
          label-width="80px"
        >
          <el-form-item label="" prop="title">
            <strong style="font-size: 25px">标题</strong>
            <el-input
              v-model="ruleForm.title"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <!-- <el-card shadow="never" :v-model="ruleForm.newDate"></el-card> -->
          <el-form-item prop="content">
            <strong style="font-size: 25px">内容</strong><br />
            <el-input
              type="textarea"
              class="text"
              :rows="15"
              v-model="ruleForm.content"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <br />
          <el-button type="primary" @click="submitForm" style="width: 100%"
            >提交</el-button
          >
        </el-form>
      </el-card>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      value:true,
      search: "",
      isFixed: false,
      offsetTop: 0,
      ruleForm: { title: "", content: "", show: true },
      dialogTableVisible: false,
      labelPosition: "left",
      tableData: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      }
    };
  },
  created() {
    this.matterdata();
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
    this.$nextTick(() => {
      this.offsetTop = document.querySelector("#boxFixed").offsetTop;
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    initHeight() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop > this.offsetTop ? true : false;
    },
    async matterdata() {
      //   this.loading = true;
      //  /list?_sort=date&_order=desc 进行倒叙排序
      this.$axios.get("/lnterviewquestions").then(result => {
        // if (this.tableData.length == 0) {//搜索时判断是否有数据，显示空状态样式
        //   this.emptyShow = true;
        // } else {
        //   this.emptyShow = false;
        // }
        this.tableData = result.data;
        // this.loading = false;
      });
    },
    //添加
    Addarticle() {
      this.dialogTableVisible = true;
    },
    //编辑
    handleEdit(index, row) {
      this.$router.push({ path: `articl/${index}` });
      console.log(this.$refs.div);
    },
    // 查询方法
    onSubmit(search) {
      let _this = this;
      this.$axios.get(`/lnterviewquestions?q=${_this.search}`).then(res => {
        return (this.tableData = res.data);
      });
    },
    //提交
    submitForm() {
      this.$refs.ruleForm.validate(isok => {
        if (isok) {
          this.$axios
            .post("/lnterviewquestions", this.ruleForm)
            .then(({ data, status }) => {
              if (status === 201) {
                this.$router.push({ path: "articl" });
                this.dialogTableVisible = false;
                this.matterdata();
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除
    handleDelete(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ////删除数据
          this.$axios.delete("/lnterviewquestions/" + `${index}`).then(
            res => {
              this.matterdata();
              // console.log(res, "删除成功");
            },
            function(err) {
              // console.log(err, "删除失败");
            }
          );
          ////删除数据END
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.text {
  display: flex;
  width: 100%;
  font-size: 18px;
}
.otitle {
  width: auto;
  height: auto;
}
.otitle .table_tag {
  color: black;
  font-size: 25px;
}
.otitle .table_card {
  display: flex;
  justify-content: flex-start;
  margin-left: -39px;
  font-size: 35px;
}
.box_fixed {
  width: 31%;

}
.is_fixed {
  position: fixed;
  top: 0;
  left: 44%;
  margin-left: 28%;
  z-index: 999;
}
.div_null {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
