<template>
  <el-card shadow="never">
    <crumbs slot="header">
      <template slot="title">文章</template>
    </crumbs>
    <el-button type="primary" @click="Addarticle">Add</el-button>
    <el-tabs :tab-position="tabPosition" style="height: 200px">
      <el-tab-pane
        v-for="(itme, index) in tableData"
        :key="index"
        :label="itme.title"
        >{{ itme.content }}</el-tab-pane
      >
    </el-tabs>
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
      ruleForm: { title: "", content: "" },
      dialogTableVisible: false,
      tabPosition: "left",
      labelPosition: "left",
      tableData: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  created() {
    this.matterdata();
  },
  methods: {
    async matterdata() {
      //   this.loading = true;
      //  /list?_sort=date&_order=desc 进行倒叙排序
      this.$axios.get("/lnterviewquestions").then((result) => {
        this.tableData = result.data;
        // this.loading = false;
      });
    },
    //添加
    Addarticle() {
      this.dialogTableVisible = true;
    },
    //提交
    submitForm() {
      this.$refs.ruleForm.validate((isok) => {
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
  },
};
</script>

<style scoped>
.text {
  display: flex;
  width: 100%;
  font-size: 18px;
}
</style>