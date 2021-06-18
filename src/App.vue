<template>
        <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
 <router-view v-if="isShow"></router-view>  
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    reload () {
      this.isShow= false
      this.$nextTick(function () {
        this.isShow= true
      })
    }
  }
}
</script>

<style>

</style>