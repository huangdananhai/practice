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
        <el-col :span="24" v-for="(itme,index) in tableData" :key="index">
          <el-card shadow="never" class="card">
            <div>
              <span>{{index+1}}</span>
              <strong style="font-size:22px">{{itme.title}}</strong>
              <div class="bottom clearfix">
                <span>{{ itme.content }}</span><br>
                <el-button type="text" class="button"  @click="handleDelete(itme.id)" >删除</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <span v-if="!tableData.length">暂无数据</span>
      </el-row>
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

        <ul class="pagination">
            <li :class="{'disabled': current == 1}"><a href="javascript:;" v-on:click="setCurrent(1)"> 首页 </a></li>
            <li :class="{'disabled': current == 1}"><a href="javascript:;" v-on:click="setCurrent(current - 1)"> 上一页 </a></li>
            <li v-for="(p,index) in grouplist" :class="{'active': current == p.val}" :key="index"><a href="javascript:;" v-on:click="setCurrent(p.val)"> {{ p.text }} </a></li>
            <li :class="{'disabled': current == page}"><a href="javascript:;" v-on:click="setCurrent(current + 1)"> 下一页</a></li>
            <li :class="{'disabled': current == page}"><a href="javascript:;" v-on:click="setCurrent(page)"> 尾页 </a></li>
        </ul> 


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

import './Pager.js'
export default {
  inject: ["reload"],
  data() {
    return {
       total: 81,     // 记录总条数
            display: 10,   // 每页显示条数
            current: 1 ,    // 当前第n页 ， 也可以 watch current 的变化
      editorOption: {},
      labelPosition: "top",
      // currentPage: 1, // 当前页码
      // pageSize: 5, //每页显示
      ruleForm: {
        id: "",
        title: "",
        content: "",
      },
      tableData: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  created() {
    this.matterdata();
  },
  components: {
    quillEditor,
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  methods: {
      pagechange: function (p) {
                this.current = p;// 页码改变event ， p 为新的 current
                console.log('pagechange', p);
            },
    refresh() {
      this.reload();
    },
    //获取数据
    matterdata() {
      //  /list?_sort=date&_order=desc 进行倒叙排序
      this.$axios.get("/article?_sort=id&_order=desc").then((result) => {
        this.tableData = result.data;
      });
    },
    submitForm() {
      this.$refs.ruleForm.validate((isok) => {
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
        type: "warning",
      })
        .then(() => {
          ////删除数据
          this.$axios.delete("/article/" + `${index}`).then(
            (res) => {
              this.reload();
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
.card{
  background: #eee;
  width: 100%;
  margin-bottom: 10px;
}
</style>
