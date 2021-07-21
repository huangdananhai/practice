<template>
  <el-card shadow="never" class="el-card__div">
    <crumbs slot="header">
      <template slot="title">添加</template>
    </crumbs>
    <el-form
      :rules="rules"
      ref="ruleForm"
      :model="ruleForm"
      :label-position="labelPosition"
      label-width="80px"
    >
      <el-form-item label="" prop="title">
        <strong style="font-size: 25px">标题</strong>
        <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
        <!-- <el-card shadow="never" :v-model="ruleForm.newDate"></el-card> -->
        <span>{{showtime(ruleForm.newDate)}}</span>
      <el-form-item prop="content">
        <strong style="font-size: 25px">内容</strong><br />
        <el-input
          type="textarea"
          class="text"
          :rows="18"
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
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      ruleForm: {
        id: "",
        newDate: new Date(),
        title: "",
        content: "",
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  created() {
    this.loading = true;
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((isok) => {
        if (isok) {
          this.$axios
            .post("/Bugsummary", this.ruleForm)
            .then(({ data, status }) => {
              if (status === 201) {
                this.$router.push({ path: "./see" });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    
    showtime() {
      var date = new Date();
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let week = date.getDay(); // 星期
      let weekArr = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      // 拼接 时间格式处理
      return (
        year +
        "年" +
        month +
        "月" +
        day +
        "日 " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        " " +
        weekArr[week]
      );
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