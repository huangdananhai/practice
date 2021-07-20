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
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="" prop="content">
        <strong style="font-size: 25px">内容</strong><br />
        <textarea
          class="text"
          rows="20px"
          v-model="ruleForm.content"
        ></textarea>
      </el-form-item>
      <br />
      <el-button type="primary" @click.prevent="submitForm" style="width: 100%"
        >编辑完成</el-button
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
        content: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      }
    };
  },
  created() {
    this.loading = true;
  },
  mounted() {
    const { heroid } = this.$route.params;
    this.$axios.get(`/Bugsummary/${heroid}`).then(({ data }) => {
      this.ruleForm = data;
    });
  },
  methods: {
    submitForm() {
        const { heroid } = this.$route.params;
        this.$axios.put(`/Bugsummary/${heroid}`, this.ruleForm).then(({ status }) => {
          status === 200 && this.$router.push({ path: "/list/see" });
        });
      } 
  }
};
</script>

<style sscoped>
.text {
  display: flex;
  width: 100%;
}
</style>
