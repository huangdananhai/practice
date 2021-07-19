<template>
  <div id="a">
    <el-menu
      :collapse="collaspse"
      router
      :style="{ width: collaspse ? '60px' : '200px' }"
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
        <span slot="title">统计表</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>无内容</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/list/list1">list1</el-menu-item>
          <el-menu-item index="/list/list2">list2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span slot="title">商品</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/pms/productlist">商品列表</el-menu-item>
          <el-menu-item index="/pms/addproduct">商品添加</el-menu-item>
          <el-menu-item index="/pms/productAttr">商品类型</el-menu-item>
          <el-menu-item index="/pms/productCate">商品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/home/video">
        <i class="el-icon-video-camera-solid"></i>
        <span slot="title">视频</span>
      </el-menu-item>
      <el-menu-item index="/home/publish">
        <i class="el-icon-tickets"></i>
        <span slot="title">文章</span>
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
  position: fixed;
  transition: width .58s;
  top:0;
  left: 0;
  bottom: 0;
  padding: 0;
  z-index: 1001;
  overflow: hidden;
}
</style>