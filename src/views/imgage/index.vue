<template>
  <div>
    <div>
      <el-carousel :interval="3000" height="650px" >
        <el-carousel-item v-for="(item, index) in imgUrl" :key="index">
          <img :src="item.id" class="image" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-col
      v-for="(item, index) in imgUrl"
      :key="index"
      ref="test"
      @click="testurl(index)"
    >
      <el-card :body-style="{ padding: '0px' }">
        <img :src="item.id" class="image" />
        <div class="left">加入购物车</div>
        <div class="right">好吃的汉堡</div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: [
        { id: require("../../assets/image/1.jpg") },
        { id: require("../../assets/image/2.jpg") },
        { id: require("../../assets/image/3.jpg") },
        { id: require("../../assets/image/4.jpg") },
        { id: require("../../assets/image/5.jpg") },
        { id: require("../../assets/image/6.jpg") },
      ],
      screenWidth: 0, // 浏览器宽度
    };
  },
  methods: {
    setSize: function () {
      // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = (1920 / 1080) * this.screenWidth;
    },
    testurl(index) {
      console.log(index);
      if (index === 0) {
        this.$refs[test].style.width = "239px";
        console.log((this.$refs.test[0].style.width = "239px"));
      }
    },
  },
  mounted() {
    // 首次加载时,需要调用一次
    this.screenWidth = window.innerWidth;
    this.setSize();
    // 窗口大小发生改变时,调用一次
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.setSize();
    };
  },
};
</script>

<style scoped>
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: inherit;
}
.image {
  width: 100%;
  display: block;
}
.left {
  float: left;
  width: 50%;
  height: 51px;
  line-height: 51px;
  background: #eee;
  font-size: 20px;
  text-align: center;
  color: #0000ff;
}
.left:hover {
  transform: scale(1.2, 1.2);
  box-shadow: 0 0 8px #eee;
  cursor: pointer;
}
.right:hover {
  transform: scale(1.2, 1.2);
  box-shadow: 0 0 8px #eee;
  cursor: pointer;
}
.right {
  float: right;
  width: 50%;
  height: 51px;
  line-height: 51px;
  background: #eee;
  font-size: 20px;
  text-align: center;
  color: #0000ff;
}
#imga {
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>