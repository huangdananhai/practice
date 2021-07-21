<template>
  <el-card shadow="never" class="el-card__div">
    <crumbs slot="header">
      <template slot="title">编辑</template>
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
      <el-form-item label="" prop="newDate">
        <el-button readonly="readonly" >{{ruleForm.newDate}}</el-button>
      </el-form-item>
      <el-form-item label="" prop="content">
        <strong style="font-size: 25px">内容</strong><br />
        <el-input
          type="textarea"
          class="text"
          :rows="18"
          v-model="ruleForm.content"
        ></el-input>
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
        newDate: "",
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
  mounted() {
    const { heroid } = this.$route.params;
    this.$axios.get(`/Bugsummary/${heroid}`).then(({ data }) => {
      this.ruleForm = data;
    });
  },
  methods: {
    submitForm() {
      if (this.ruleForm.title && this.ruleForm.content) {
        const { heroid } = this.$route.params;
        this.$axios
          .put(`/Bugsummary/${heroid}`, this.ruleForm)
          .then(({ data, status }) => {
            status === 200 && this.$router.push({ path: "/list/see" });
          });
      }else{
         this.$message.error('内容不能为空');
      }
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
