<template>
<div>
  <el-menu
    router
    background-color="#304156"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/home" >
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>首页</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/home/flowingwater">
      <i class="el-icon-menu"></i>
      <span slot="title">OCN前端巡检统计表</span>
    </el-menu-item>
    <el-submenu index="2" disabled>
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>无内容</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">未知</el-menu-item>
        <el-menu-item index="1-2">未知</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
  </div>
</template>

<script>
export default {};
</script>

<style>

</style>