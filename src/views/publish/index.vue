<template>
  <el-card shadow="never" class="el-card__div">
    <crumbs slot="header">
      <template slot="title">帖子</template>
    </crumbs>
    <el-form
      :rules="rules"
      ref="ruleForm"
      :model="ruleForm"
      :label-position="labelPosition"
      label-width="80px"
    >
      <el-form-item label="" prop="title">
        <strong style="font-size: 25px">标题</strong>
        <el-input v-model="ruleForm.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <quill-editor
        prop="content"
        v-model="ruleForm.content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      >
      </quill-editor>
      <br />
      <el-button type="primary" @click="submitForm" style="width: 100%"
        >发表</el-button
      >
      <span style="font-size: 12px">总共 {{ tableData.length }} 条数据</span>
    </el-form>

    <el-row>
      <el-col :span="24" v-for="(itme, index) in pageData" :key="index">
        <el-card shadow="never" class="card">
          <div>
            <!-- <span>{{ index + 1 }}</span> -->
            <el-image :src="img" class="img"></el-image>
            <strong class="strong">{{ itme.title }}</strong>
            <div class="bottom clearfix">
              <span>{{ itme.content | test }}</span
              ><br />
              <span style="font-size: 8px">{{
                itme.newDate | testdate("YYYY-MM-DD hh:mm:ss")
              }}</span>
              <el-button
                type="text"
                class="button"
                @click="handleDelete(itme.id)"
                >删除</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
      <span v-if="!tableData.length">暂无数据</span>
    </el-row>
    <div class="page" v-show="show">
      <div class="pagelist">
        <span
          class="jump"
          :class="{ disabled: starts }"
          @click="pageTurning('before')"
          >上一页</span
        >
        <span v-show="current_page > 5" class="jump" @click="jumpPage(1)"
          >1</span
        >
        <span class="ellipsis" v-show="efont" >...</span>
        <span
          class="jump"
          v-for="(itme, index) in max"
          :key="index"
          :class="{ bgprimary: idx== index }"
          @click="pageTurning(index)"
          >{{ index + 1 }}</span>

        <span class="ellipsis" v-show="ebehind">...</span>
        <span
          :class="{ disabled: ends }"
          class="jump"
          @click="pageTurning('next')"
          >下一页</span
        >
        <span class="jumppoint">前往：</span>
        <span class="jumpinp"><input type="text" v-model="changePage" /></span>
        <span class="jump gobtn" @click="jumpPage(changePage)">GO</span>
      </div>
       <span class="pageNum">{{idx+1}}/{{max}}</span>
    </div>

    <!--total ：代表的是数据的总长度-->
    <!--page-size：代表的是每一页数据的长度-->
    <!--current-page：代表当前页数-->
    <!--page-sizes：每页显示个数选择器-->
  </el-card>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; // 导入quillEditor组件
import "quill/dist/quill.js";
import moment from "moment";

export default {
  inject: ["reload"],
  data() {
    return {
      zuo: "<",
      img: require("../../assets/image/471820949993651087.jpg"),
      loading: false,
      editorOption: {},
      labelPosition: "top",
      ruleForm: {
        id: "",
        newDate: new Date(),
        title: "",
        content: "",
      },
      tableData: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }, {}],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      pageDataNum: 3, //每页显示
      idx: 0,
      current_page: 1, //当前页
      pages: "max", //总页数
      changePage: "", //跳转页
      nowIndex: 0,
    };
  },
  created() {
    this.matterdata();
    this.loading = true;
  },
  components: {
    quillEditor,
  },
  filters: {
    test(value) {
      return value.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "");
    },
    testdate(value, format) {
      return moment(value).format(format);
    },
  },
  computed: {
    max() {
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
    },
    // ...是否禁用上一页
    show() {
      return this.pages && this.pages != 1;
    },
    // 开始
    starts() {
      return this.current_page == 1;
    },
    ends() {
      return this.current_page == this.pages;
    },
    // ...
    efont() {
      if (this.pages <= 7) return false;
      return this.current_page > 5;
    },
    // 是否大于7
    ebehind() {
      if (this.pages <= 7) return false;
      var nowAy = this.indexs;
      return nowAy[nowAy.length - 1] != this.pages;
    },
    indexs() {
      var left = 1,
        right = this.pages,
        ar = [];
      if (this.pages >= 7) {
        if (this.current_page > 5 && this.current_page < this.pages - 4) {
          left = Number(this.current_page) - 2;
          right = Number(this.current_page) + 2;
        } else {
          if (this.current_page <= 5) {
            left = 1;
            right = 7;
          } else {
            right = this.pages;
            left = this.pages - 6;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    },
  },
  methods: {
    pageTurning(str) {
      if (str === "next") {
        this.current_page++;
        if (this.idx < this.max - 1) {
          this.idx++;
        }
      } else if (str === "before") {
         this.current_page--;
        if (this.idx > 0) {
          this.idx--;
        }
      } else if (typeof str === "number") {
        this.idx = str;
      }
    },
    jumpPage(id) {
      this.idx = id;
    },

    refresh() {
      this.reload();
    },
    //获取数据
    async matterdata() {
      this.loading = true;
      //  /list?_sort=date&_order=desc 进行倒叙排序
      this.$axios.get("/article?_sort=id&_order=desc").then((result) => {
        this.tableData = result.data;
        this.loading = false;
      });
    },

    submitForm() {
      this.$refs.ruleForm.validate((isok) => {
        if (isok) {
          this.$axios
            .post("/article", this.ruleForm)
            .then(({ data, status }) => {
              if (status === 201) {
                this.matterdata();
                this.ruleForm.title = "";
                this.ruleForm.content = "";
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
      //   console.log(this.content);
      //$('.text').html(this.content)
    },
    handleDelete(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ////删除数据
          this.$axios.delete("/article/" + `${index}`).then(
            (res) => {
              this.matterdata();
              // console.log(res, "删除成功");
            },
            function (err) {
              // console.log(err, "删除失败");
            }
          );
          ////删除数据END
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}
.card {
  width: 100%;
  border: 1px solid #000;
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

/* 分页2 */
.page {
  /* display: inline-block; */
  /* margin: 50px; */
  text-align: center;
}

.pagelist {
  display: inline-block;
  height: 40px;
  line-height: 40px;
}

.pagelist span {
  font-size: 10px;
  color: rgba(51, 51, 51, 1);
}

.pagelist .jump {
  padding: 6px 14px;
  text-align: center;
  cursor: pointer;
  margin-left: 5px;
  width: 40px;
  height: 40px;
  background: rgba(204, 204, 204, 0.3);
  border-radius: 6px;
}

.pagelist .bgprimary {
  cursor: default;
  color: #fff;
  background: rgba(255, 30, 27, 1);
  border-radius: 6px;
}

.jumpinp input {
  width: 55px;
  height: 26px;
  font-size: 13px;
  border: 1px solid #ccc;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  text-align: center;
}

.ellipsis {
  padding: 0px 8px;
  text-align: center;
  cursor: pointer;
  margin-left: 30px;
  width: 40px;
  height: 40px;
  background: rgba(204, 204, 204, 0);
  border-radius: 6px;
}

.bgprimary {
  cursor: default;
  color: #fff;
  background: rgba(255, 30, 27, 1);
  border-radius: 6px;
}

.pagelist .jump.disabled {
  pointer-events: none;
  color: rgba(153, 153, 153, 1);
}

.jumppoint {
  margin-left: 30px;
}

.pagelist .gobtn {
  font-size: 10px;
}

.pageNum {
  display: inline-block;
  height: 28px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 28px;
}
</style>
