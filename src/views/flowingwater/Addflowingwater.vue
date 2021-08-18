<template>
  <el-card shadow="never" class="form-container">
    <crumbs slot="header">
      <template slot="title">添加</template>
    </crumbs>
    <el-form
      :hide-required-asterisk="true"
      class="formm"
      size="small"
      :label-position="labelPosition"
      label-width="160px"
      :model="ruleForm"
      ref="ruleForm"
      :rules="loginRules"
    >
      <el-form-item label="日期" prop="date">
      <el-date-picker
      style="width:100%"
      v-model="ruleForm.date"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
      </el-form-item>
      <el-form-item prop="zs" label="总数">
        <el-input v-model="ruleForm.zs"></el-input>
      </el-form-item>
      <el-form-item prop="UCAS" label="已开户数(UCAS)">
        <el-input v-model="ruleForm.UCAS"></el-input>
      </el-form-item>
      <el-form-item prop="DCAS" label="已开户数(DCAS)">
        <el-input v-model="ruleForm.DCAS"></el-input>
      </el-form-item>
      <el-form-item prop="gz" label="高优先级组数">
        <el-input v-model="ruleForm.gz"></el-input>
      </el-form-item>
      <el-form-item prop="dz" label="低优先级组数">
        <el-input v-model="ruleForm.dz"></el-input>
      </el-form-item>
      <el-form-item prop="consoleerr" label="日志生成及监控台是否异常报错">
        <el-select v-model="ruleForm.consoleerr" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.consoleerr"
            :label="item.label"
            :value="item.consoleerr"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="Openanaccount" label="每日开户">
        <el-select v-model="ruleForm.Openanaccount" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.Openanaccount"
            :label="item.label"
            :value="item.Openanaccount"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="remarks" label="备注">
        <el-input v-model="ruleForm.remarks"></el-input>
      </el-form-item>
      <el-form-item
        prop="img"
        label="当日监控画面截图保存"
        v-model="ruleForm.img"
      >
        <!-- 选择图片 -->
        <input type="file" accept="img/*" @change="chooseImg" />
        <!-- 预览图片 -->
        <!-- <canvas ref="imgPreview" height="0" width="0"></canvas> -->
        <el-image  ref="imgPreview" :src="ruleForm.img" ></el-image>
        <!-- 提交图片 -->
        <!-- <button @click="uploadImg">提交图片</button> -->
        <!-- 通过后台返回的url向文件服务器请求图片 -->
        <!-- <img :src="imgUrlFromServer" /> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="sumbit('first')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>        
  </el-card>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      options: [
        {
          value: "选项1",
          consoleerr: "是",
          Terminalonlinetest:"完成",
          Terminalofflinetest:"完成",
          Openanaccount:"完成",
        },
        {
          value: "选项2",
          consoleerr: "否",
          Terminalonlinetest:"未完成",
          Terminalofflinetest:"未完成",
          Openanaccount:"未完成",
        }
      ],
      value: "",
      imgUrlFromServer: "#",
      base64: "",
      date: new Date(),
      labelPosition: "left",
      ruleForm: {
        id: "",
        date: "",
        zs: "",
        UCAS: "",
        DCAS: "",
        gz: "",
        dz: "",
        img: ""
      },
      loginRules: {
        // 验证规则
        id: [{ required: true, message: "请输入内容", trigger: "blur" }],
        date: [{ required: true, message: "请输入内容", trigger: "blur" }],
        name: [{ required: true, message: "请输入内容", trigger: "blur" }],
        UCAS: [{ required: true, message: "请输入内容", trigger: "blur" }],
        DCAS: [{ required: true, message: "请输入内容", trigger: "blur" }],
        gz: [{ required: true, message: "请输入内容", trigger: "blur" }],
        dz: [{ required: true, message: "请输入内容", trigger: "blur" }],
        img: [{ required: true, message: "请输入内容", trigger: "blur" }]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    chooseImg(event) {
      let file = event.target.files[0];
      let reader = new FileReader();
      let img = new Image();
      // 读取图片
      reader.readAsDataURL(file);
      // 读取完毕后的操作
      reader.onloadend = e => {
        img.src = e.target.result;
        // 这里的e.target就是reader
        // console.log(reader.result)
        // reader.result就是图片的base64字符串
        this.base64 = reader.result;
        this.ruleForm.img = this.base64;
      };
      // 预览图片
      let canvas = this.$refs["imgPreview"];
      // let context = canvas.getContext("2d");
      img.onload = () => {
        img.width = 100;
        img.height = 100;
        // 设置canvas大小
        canvas.width = 100;
        canvas.height = 100;
        // 清空canvas
        // context.clearRect(0, 0, 100, 100);
        // // 画图
        // context.drawImage(img, 0, 0, 200, 200);
      };
    },
    sumbit(type) {
      if (
        this.ruleForm.date &&
        this.ruleForm.zs &&
        this.ruleForm.UCAS &&
        this.ruleForm.DCAS &&
        this.ruleForm.gz &&
        this.ruleForm.dz 
      ) {
        this.$axios.post("/list", this.ruleForm).then(({ data, status }) => {
          if (status === 201) {
            this.$router.push({ path: "./flowingwater" });
          }
        });
      } else {
        alert("内容不能为空");
      }
    },

    // 提交图片按钮方法
    uploadImg() {
      this.$axios.post("/list", { img: this.base64 }).then(response => {
        console.log(response.data.img);
        this.imgUrlFromServer = response.data.imgUrl;
      });
    }
  },
  // 过滤器
  filters: {
    test(value, format) {
      return moment(value).format(format);
    }
  }
};
</script>

<style scoped>
.formm {
  overflow: auto;
  height: 600px;
  padding: 0px 200px 0px 200px;
}
.el-select {
  width: 100%;
}
</style>
