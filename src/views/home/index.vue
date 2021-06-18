<template>
  <el-container>
    <!-- 侧栏组件 -->
    <el-aside><vue-sidebar></vue-sidebar></el-aside>
    <!-- 头部组件 -->
    <el-container>
      <el-header><vue-head></vue-head></el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
</style>