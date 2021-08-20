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
        style="width: 40%"
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
        disabled
        v-model="showStatus.showStatus"
        :active-value="1"
        :inactive-value="0"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="changeSwitch($event)"
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
    <div
      class="otitle"
      v-show="value"
      v-for="(itme, index) in tableData"
      :key="index"
      style="white-space: pre-wrap"
    >
    <span style="font-size:35px">{{index+1+'.'}}</span>
      <el-tag class="table_tag" color="#409eff">{{
        itme.h_title
      }}</el-tag>
      <br />
      <el-input
        v-show="itme.isedit"
        v-model="itme.h_info"
        type="textarea"
        class="text"
        :rows="18"
      ></el-input>
      <span v-show="!itme.isedit" class="table_card">{{ itme.h_info }}</span>
      <br />
      <el-button
        type="text"
        @click="handleDelete(itme.id)"
        style="font-size: 10px"
        >删除</el-button
      >
      <!-- @click="handleEdit(itme.id, itme.index)"  -->

      <el-button
        v-show="!itme.isedit"
        type="text"
        @click="handleEdit(itme.id, itme.index, (itme.isedit = !itme.isedit))"
        style="font-size: 10px"
        >编辑</el-button
      >
      <el-button
        v-show="itme.isedit"
        type="text"
        @click="handlcomplete(itme.id, itme, (itme.isedit = !itme.isedit))"
        style="font-size: 10px"
        >完成</el-button
      >
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
              v-model="ruleForm.h_title"
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
              v-model="ruleForm.h_info"
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
      value: true,
      search: "",
      isFixed: false,
      offsetTop: 0,
      ruleForm: { h_title: "", h_info: "", isedit: false },
      dialogTableVisible: false,
      labelPosition: "left",
      tableData: [],
      rules: {
        h_title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        h_info: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      showStatus: []
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
    changeSwitch(e, row) {
      this.$axios
        .get("/switch", { status: e ? 1 : 0 })
        .then(res => {
          console.log(123);
        })
        .catch(err => {
          console.log(err);
          let newData = row;
          newData.status = newData.status === 1 ? 0 : 1; //恢复 原状态
          this.showStatus[index] = newData;
        });
    },
    initHeight() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop > this.offsetTop ? true : false;
    },
    //请求数据
    async matterdata() {
      //   this.loading = true;
      //list?_sort=date&_order=desc 进行倒叙排序
      this.$axios.get("/lnterviewquestions").then(result => {
        // this.tableData.data = eval("(" + result.data + ")");
        this.tableData = result.data;
        //   // this.loading = false;
      }).catch(() => {
            this.$message.error("获取列表数据失败！");
        });
    },
    //添加
    Addarticle() {
      this.dialogTableVisible = true;
    },
    //编辑
    handleEdit(index, row) {
      // this.$router.push({ path: `articl/${index}` });
    },
    //完成编辑
    handlcomplete(index, itme) {
      // this.$axios.put(`/lnterviewquestions/${index}`,this.edisdata).then(({ data, status }) => {
      //       status === 200 && this.$router.push({ path: "articl" });
      //     });
      this.$axios({
        url: `/lnterviewquestions/${index}`,
        method: "put",
        data: this.tableData
      }).then(res => {
        console.log(res.data);
      });
    },
    // 查询方法
    onSubmit(search) {
      let _this = this;
      this.$axios.get(`/lnterviewquestions?q=${_this.search}`).then(res => {
        return (this.tableData = res.data);
      });
    },
    //提交
    //https://www.cnblogs.com/mrszhou/p/7859012.html
    submitForm() {
      // this.$refs.ruleForm.validate(isok => {
      //   if (isok) {
      //     this.$axios({
      //       url: "/lnterviewquestions",
      //       method: "post",
      //       this.ruleForm
      //     })
      //       .then(res => {
      //         this.ruleForm.h_title = "";
      //         this.ruleForm.h_info = "";
      //         this.matterdata();
      //         this.dialogTableVisible = false;
      //       })
      //       .catch(err => {
      //         console.log(err);
      //       });
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      this.$refs.ruleForm.validate(isok => {
        if (isok) {
          this.$axios
            .post("/lnterviewquestions", this.ruleForm)
            .then(({status }) => {
              if (status === 201) {
                this.matterdata();
                this.ruleForm.h_title = "";
                this.ruleForm.h_info = "";
                this.dialogTableVisible = false;
              }
            }).catch(err => {
              console.log(err);
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
  padding: 0px;
  margin: 0px;
}
.otitle .table_card {
  display: flex;
  justify-content: flex-start;
  font-size: 35px;
}
.box_fixed {
  width: auto;
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
