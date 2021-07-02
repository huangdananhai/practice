<template>
  <el-menu
    background-color="#304156"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">   <i
        @click="collaspseOrOpen"
        :class="{ 'el-icon-s-unfold': collaspse, 'el-icon-s-fold': !collaspse }"
      ></i>测试稳定性统计系统</el-menu-item>
  </el-menu>
</template>

<script>
import eventBus from '../../api/isCollapse.js' // 引入公共实例
export default {
  data() {
    return {
        collaspse: false, // 是否折叠
    };
  },
  methods: {
    collaspseOrOpen() {
      // 直接取反
      this.collaspse = !this.collaspse; // 直接返回
      // 通知要改变宽度的组件
      eventBus.$emit("changeCollapse"); // 改变了折叠状态
    },
  },
};
</script>

<style>
</style>