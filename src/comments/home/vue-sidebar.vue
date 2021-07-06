<template>
  <div id="a">
    <el-menu
      :collapse="collaspse"
      router
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
          <el-menu-item index="/home/list1">list1</el-menu-item>
          <el-menu-item index="/home/list2">list2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3" disabled>
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span slot="title">产品列表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/productlist">商品列表</el-menu-item>
          <el-menu-item index="/home/addproduct">商品添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/home/video" disabled>
        <i class="el-icon-video-camera-solid"></i>
        <span slot="title">视频</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["collaspse"], // 接收传递过来的折叠值
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