/** * [pagination 分页组件] * @param {Number} total [数据总条数] * @param
{Number} display [每页显示条数 default:10] * @param {Number} current [当前页码
default:1] * @param {Number} pagegroup [分页条数(奇数) default:5] * @param
{Event} pagechange [页码改动时 dispatch ] * @return {[type]} [description] */
<template>
  <el-card shadow="never">
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
    </el-form>
    <br />
    <el-card shadow="never">
      <!-- <table id="customers" :data="tableData">
        <tr>
          <th>标题</th>
          <th>内容</th>
        </tr>
        <tr v-for="(itme,index) in tableData" :key="index">
          <td>{{itme.title}}</td>
          <td>{{itme.content}}</td>
        </tr>
      </table> -->

      <!-- <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        :header-cell-style="{ background: '#f5f7fa', color: '#000' }"
      >
        <el-table-column label="ID" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="内容">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.content }}</span>
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
      </el-table> -->
      <el-row>
        <el-col :span="24" v-for="(itme, index) in tableData" :key="index">
          <el-card shadow="never" class="card">
            <div>
              <span>{{ index + 1 }}</span>
              <strong style="font-size:22px">{{ itme.title }}</strong>
              <div class="bottom clearfix">
                <span>{{ itme.content }}</span
                ><br />
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

      <!--分页-->
      <div class="page-bar">
        <ul>
          <li v-if="cur > 1"><a v-on:click="cur--, pageClick()">上一页</a></li>
          <li v-if="cur == 1"><a class="banclick">上一页</a></li>
          <li v-for="(index, i) in indexs" v-bind:class="{ active: cur == index }" :key="i"><a v-on:click="btnClick(index)">{{ index }}</a></li>
          <li v-if="cur != all">
            <a v-on:click="cur++, pageClick()">下一页</a>
          </li>
          <li v-if="cur == all"><a class="banclick">下一页</a></li>
          <li><a>共<i>{{ all }}</i>页</a></li>
        </ul>
      </div>

      <!-- <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination> -->

      <!--total ：代表的是数据的总长度-->
      <!--page-size：代表的是每一页数据的长度-->
      <!--current-page：代表当前页数-->
      <!--page-sizes：每页显示个数选择器-->
    </el-card>
  </el-card>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; // 导入quillEditor组件
import "quill/dist/quill.js";

export default {
  inject: ["reload"],
  data() {
    return {
      all: 10, //总页数
      cur: 1, //当前页码
      totalPage: 0, //当前条数
      editorOption: {},
      labelPosition: "top",
      // currentPage: 1, // 当前页码
      // pageSize: 5, //每页显示
      ruleForm: {
        id: "",
        title: "",
        content: ""
      },
      tableData: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      }
    };
  },
  created() {
    this.matterdata();
  },
  components: {
    quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    indexs() {
      var left = 1;
      var right = this.all;
      var ar = [];
      if (this.all >= 5) {
        if (this.cur > 3 && this.cur < this.all - 2) {
          left = this.cur - 2;
          right = this.cur + 2;
        } else {
          if (this.cur <= 3) {
            left = 1;
            right = 5;
          } else {
            right = this.all;
            left = this.all - 4;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    }
  },
  methods: {
    dataListFn(index) {
      this.$axios
        .get("/article?_sort=id&_order=desc", {
          params: {
            page: index,
            limit: "2",
            state: 0
          }
        })
        .then(res => {
          if (res.data.message == "success") {
            this.dataList = [];
            for (let i = 0; i < res.data.data.length; i++) {
              this.dataList.push(res.data.data[i]);
            }
            this.all = res.data.totalPage; //总页数
            this.cur = res.data.pageNum;
            this.totalPage = res.data.totalPage;
          }
        });
    },
    //分页
    btnClick(data) {
      //页码点击事件
      if (data != this.cur) {
        this.cur = data;
      }
      //根据点击页数请求数据
      this.dataListFn(this.cur.toString());
    },
    pageClick() {
      //根据点击页数请求数据
      this.dataListFn(this.cur.toString());
    },

    refresh() {
      this.reload();
    },
    //获取数据
    matterdata() {
      //  /list?_sort=date&_order=desc 进行倒叙排序
      this.$axios.get("/article?_sort=id&_order=desc").then(result => {
        this.tableData = result.data;
      });
    },
    submitForm() {
      this.$refs.ruleForm.validate(isok => {
        if (isok) {
          this.$axios
            .post("/article", this.ruleForm)
            .then(({ data, status }) => {
              if (status === 201) {
                this.reload();
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
        type: "warning"
      })
        .then(() => {
          ////删除数据
          this.$axios.delete("/article/" + `${index}`).then(
            res => {
              this.reload();
              // console.log(res, "删除成功");
            },
            function(err) {
              // console.log(err, "删除失败");
            }
          );
          ////删除数据END
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
    // //每页显示数据变更
    // handleSizeChange(val) {
    //   // console.log("每页" + val + "条");
    //   //this.pageSize 是请求表格数据接口中的参数 设置表格每页显示多少条数据
    //   this.currentPage = 1;
    //   this.pageSize = val;
    // },
    // // 页码变更
    // handleCurrentChange(val) {
    //   // console.log("当前页" + val);
    //   //this.currentPage 是请求表格数据接口中的参数 设置表格当前处于多少页
    //   this.currentPage = val;
    // },
  }
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
  background: #eee;
  width: 100%;
  margin-bottom: 10px;
}
/*分页*/
.page-bar {
  margin: 40px auto;
  margin-top: 150px;
}
ul,
li {
  margin: 0px;
  padding: 0px;
}
li {
  list-style: none;
}
.page-bar li:first-child > a {
  margin-left: 0px;
}
.page-bar a {
  border: 1px solid #ddd;
  text-decoration: none;
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #5d6062;
  cursor: pointer;
  margin-right: 20px;
}
.page-bar a:hover {
  background-color: #eee;
}
.page-bar a.banclick {
  cursor: not-allowed;
}
.page-bar .active a {
  color: #fff;
  cursor: default;
  background-color: #e96463;
  border-color: #e96463;
}
.page-bar i {
  font-style: normal;
  color: #d44950;
  margin: 0px 4px;
  font-size: 12px;
}
</style>
