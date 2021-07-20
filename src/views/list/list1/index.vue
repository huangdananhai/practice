<template>
  <el-card shadow="never" class="el-card__div">
    <crumbs slot="header">
      <template slot="title">添加错误总结</template>
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
      <el-form-item label="" prop="content">
        <strong style="font-size: 25px">内容</strong><br />
        <textarea
          rows="12"
          cols="165"
          v-model="ruleForm.content"
          placeholder="请输入内容"
        ></textarea>
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
        title: "",
        content: "",
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }, ],
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
                this.$router.push({ path: "./list2" });
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

<style>
</style>