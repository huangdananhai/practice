<template>
  <el-card shadow="never" class="el-card__div">
    <crumbs slot="header">
      <template slot="title">文章</template>
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
      <span style="font-size:12px">总共 {{tableData.length}} 条数据</span>
    </el-form>
    <!-- <el-card shadow="never">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        :show-header="false"
        v-loading="loading"
        element-loading-text="加载中"
      >
        <el-table-column width="80">
          <template>
            <el-image :size="70" :src="img"></el-image>
          </template>
        </el-table-column>
        <el-table-column width="180">
          <template slot-scope="scope">
            <strong style="font-size: 18px">{{ scope.row.title }}</strong>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.content | test}}</span>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <el-button
            slot-scope="scope"
            type="text"
            @click="handleDelete(scope.row.id, scope.row)"
            >删除</el-button
          >
        </el-table-column>
      </el-table>
    </el-card> -->

    <el-row>
        <el-col :span="24" v-for="(itme, index) in pageData" :key="index">
          <el-card shadow="never" class="card">
            <div>
              <!-- <span>{{ index + 1 }}</span> -->
              <el-image  :src="img" class="img"></el-image>
              <strong class="strong">{{ itme.title }}</strong>
              <div class="bottom clearfix">
                <span>{{ itme.content | test }}</span
                ><br />
                <span style="font-size:8px">{{ itme.newDate | testdate("YYYY-MM-DD hh:mm:ss")}}</span>
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

      <div class="page_bar">
        <a href="javascript:;" @click="pageTurning(0)">首页</a>
        <a href="javascript:;" @click="pageTurning('before')">{{zuo}}</a>
        <span v-if="ellipsis1">...</span>
        <a href="javascript:;" class="page" v-for="(itme,k) in max" :key="k" v-if="range(k)" :class="{active:idx==k}"  @click="pageTurning(k)" v-cloak="">{{k+1}}</a>
        <span v-if="ellipsis2">...</span>
        <a href="javascript:;" @click="pageTurning('next')">></a>
        <a href="javascript:;" @click="pageTurning(max-1)">尾页</a>
        <span>{{idx+1}}/{{max}}</span>
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
      zuo:"<",
      img: require("../../assets/image/471820949993651087.jpg"),
      loading: false,
      editorOption: {},
      labelPosition: "top",
      ruleForm: {
        id: "",
        newDate:new Date(),
        title: "",
        content: "",
      },
      tableData: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }, {}],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      pageDataNum: 3,
      idx: 0,
      idxRange: 6,
      ellipsis1: false,
      ellipsis2: false
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
.img{
  width:50px;
  border-radius:50px;
}
.strong{
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
	/* text-align:center; */
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
