<template>
  <div id="a">
    <el-menu
      :collapse="collaspse"    router
      :style="{ width: collaspse ? '60px' : '230px' }"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/home">
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
export default {
  props: ["collaspse"],  // 接收传递过来的折叠值
};
</script>

<style scoped>
#a {
  background-color: #304156;
  height: 100%;
  top: 0;
  padding: 0;
}
</style>