<template>
  <el-card shadow="never">
    <crumbs slot="header">
      <template slot="title">商品添加</template>
    </crumbs>

     <el-card shadow="never">
    <el-steps :active="active" finish-status="success">
      <el-step title="填写商品信息"></el-step>
      <el-step title="填写商品促销"></el-step>
      <el-step title="填写商品属性"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px; width: 100%" @click="next" type="primary">下一步</el-button>
     </el-card>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
  },
};
</script>

<style>
</style>