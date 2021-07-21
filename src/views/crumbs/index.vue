<template>
  
       <!-- 面包屑的内容  -->
  <el-breadcrumb separator=">">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
          <!-- 具名插槽  -->
         <slot name='title'></slot>
      </el-breadcrumb-item>
  </el-breadcrumb>

  <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">
      <router-link v-if="item.url" :to="item.url">{{ item.name }}</router-link>
      <a v-else>
        {{ item.name }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb> -->
</template>

<script>
export default {};
</script>

<style>
</style>