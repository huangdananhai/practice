<template>
  <el-container>
    <!-- 侧栏组件 -->
    <el-aside id="a" :style="{ width: collaspse ? '60px' : '201px' }"
      ><vue-sidebar :collaspse="collaspse"></vue-sidebar
    ></el-aside>
    <!-- 头部组件 -->
    <el-container>
      <el-header style="padding:0px !important;"><vue-head></vue-head></el-header>
       <el-main class="main">
        <transition><router-view /></transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from "../../api/isCollapse.js";
export default {
  data() {
    return {
      collaspse: false, // 是否折叠
    };
  },
  created() {
    // 开启监听
    eventBus.$on("changeCollapse", () => {
      this.collaspse = !this.collaspse;
    });
  },
};
</script>

<style scoped>
#a {
  /* width: 226px !important; */
  transition: all 0.3s;
  /* background-color:#353b4e; */
  min-height: 100vh;
}
.main{
  padding: 0px !important;
}
.v-enter{
  opacity: 0;
}
.v-enter-active{
  transition: all 2s;
}
</style>