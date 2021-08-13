<template>
  <el-row>
    <span style="font-size: 12px">总共 {{ tableData.length }} 条数据</span>
    <el-col :span="24">
        <el-card
          shadow="never"
          class="card"
          v-for="(itme, index) in pageData"
          :key="index"
        >
          <el-image :src="img" class="img"></el-image>
          <strong class="strong">{{ itme.title }}</strong>
          <div class="bottom clearfix">
            <span>{{ itme.content | test }}</span
            ><br />
            <span style="font-size: 8px">{{
              itme.newDate | testdate("YYYY-MM-DD hh:mm:ss")
            }}</span>
          </div>
        </el-card>
    </el-col>
    <div class="page_bar">
        <a href="javascript:;" @click="pageTurning(0)">首页</a>
        <a href="javascript:;" @click="pageTurning('before')">{{zuo}}</a>
        <span v-if="ellipsis1">...</span>
        <a href="javascript:;" class="page" v-for="(itme,k) in max" :key="k"  v-if="range(k)" :class="{active:idx==k}"  @click="pageTurning(k)">{{k+1}}</a>
        <span v-if="ellipsis2">...</span>
        <a href="javascript:;" @click="pageTurning('next')">></a>
        <a href="javascript:;" @click="pageTurning(max-1)">尾页</a>
        <span>{{idx+1}}/{{max}}</span>
    </div>
    <span v-if="!tableData.length">暂无数据</span>
  </el-row>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tableData: [],
      activeName: "all", // 默认选中全部
      img: require("../../assets/image/471820949993651087.jpg"),
      zuo:"<",
      pageDataNum: 5,
      idx: 0,
      idxRange: 6,
      ellipsis1: false,
      ellipsis2: false
    };
  },
  created() {
    this.matterdata();
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
     max(){
            return Math.ceil(this.tableData.length / this.pageDataNum);
        },
        start() {
            return this.idx * this.pageDataNum;
        },
        end() {
            return (this.idx + 1) * this.pageDataNum;
        },
        pageData() {
            return this.tableData.slice(this.start, this.end);
        }
  },
  methods: {
         pageTurning(str) {
            if (str === "next") {
                if (this.idx < this.max - 1) {
                    this.idx++;
                }
            } else if (str === "before") {
                if (this.idx > 0) {
                    this.idx--;
                }
            } else if (typeof str === "number") {
                this.idx = str;
            }
        },
        range(k) {
            var idxStart;
            var idxEnd;
            if (!(this.idxRange % 2)) {
                this.idxRange -= 1;
            }
            var x = this.idxRange / 2;
            //尾部区间
            if (this.idx > (this.max - (this.idxRange - 1))) {
                idxStart = this.max - this.idxRange;
                idxEnd = this.max - 1;
                this.ellipsis1 = true;
                this.ellipsis2 = false;
            }
            // 中间区间
            if (this.idx > x && this.idx <= (this.max - (this.idxRange - 1))) {
                idxStart = this.idx - x;
                idxEnd = this.idx + x;
                this.ellipsis1 = true;
                this.ellipsis2 = true;
            }
            // 开始区间
            if (this.idx < x) {
                idxStart = 0;
                idxEnd = this.idxRange;
                this.ellipsis1 = false;
                this.ellipsis2 = true;
            }

            if (idxStart && idxEnd) {
                return k <= idxEnd && k >= idxStart;
            } else {
                return k < this.idxRange;
            }
        },
    async matterdata() {
      // all 所有 collect  收藏  this.activeName === "collect"
      let result = await this.$axios({
        url: "/article?_sort=id&_order=desc",
      });
      this.tableData = result.data;
    },
  },
  filters: {
    test(value) {
      return value.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "");
    },
    testdate(value, format) {
      return moment(value).format(format);
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  margin-bottom: 10px;
}
.el-card__div {
  padding: 0px !important;
}
.img {
  width: 50px;
  border-radius: 50px;
}
.strong {
  margin-top: 11px;
  position: absolute;
  font-size: 20px;
  padding-left: 10px;
}
/* 分页 */
.f_left {
	float:left;
}
.clearfix:after {
	content:'';
	display:block;
	clear:both;
	height:0;
	visibility:hidden;
}
.page_bar {
	text-align:center;
  color: #000;
}
.page_bar a,.page_bar span {
	display:inline-block;
	padding:1px 7px;
	border:1px solid gray;
	margin:0;
	text-decoration:none;
	letter-spacing:0;
	word-spacing:0;
	border-radius:4px;
  color: #000;
}
.page_bar .page {
	margin:0 5px;
}
.page_bar .page.active {
	background:gray;
	color:#fff;
}
[v-cloak] {
	display:none;
}
</style>