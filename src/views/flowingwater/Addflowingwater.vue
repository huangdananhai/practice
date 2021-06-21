<template>
  <el-card shadow="never">
    <crumbs slot="header">
      <template slot="title">添加</template>
    </crumbs>
    <el-form
      class="formm"
      size="small"
      :label-position="labelPosition"
      label-width="160px"
      :model="ruleForm"
      ref="ruleForm"
      :rules="loginRules"
    >
      <el-form-item prop="id" label="id">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="date" label="时间">
        <el-input v-model="ruleForm.date"></el-input>
      </el-form-item> -->
      <el-form-item label="日期" prop="date">
        <el-input
          v-model="ruleForm.date"
          type="date"
          placeholder="选择日期"
        ></el-input>
        <!-- <el-date-picker 
          v-model="ruleForm.date"
          placeholder="选择日期"
        >{{date}}</el-date-picker> -->
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
      <el-form-item prop="gGV_EMM" label="高GV_EMM刷新周期">
        <el-input v-model="ruleForm.gGV_EMM"></el-input>
      </el-form-item>
      <el-form-item prop="dGV_EMM" label="低GV_EMM刷新周期">
        <el-input v-model="ruleForm.dGV_EMM"></el-input>
      </el-form-item>
      <el-form-item prop="SGK_EMM" label="SGK_EMM刷新周期">
        <el-input v-model="ruleForm.SGK_EMM"></el-input>
      </el-form-item>
      <el-form-item prop="PK_EMM" label="PK_EMM刷新周期">
        <el-input v-model="ruleForm.PK_EMM"></el-input>
      </el-form-item>
      <el-form-item prop="EMM" label="EMM内存">
        <el-input v-model="ruleForm.EMM"></el-input>
      </el-form-item>
      <el-form-item prop="ECM" label="ECM内存">
        <el-input v-model="ruleForm.ECM"></el-input>
      </el-form-item>
      <el-form-item prop="DBGW" label="DBGW内存">
        <el-input v-model="ruleForm.DBGW"></el-input>
      </el-form-item>
      <el-form-item prop="SNSGW" label="SNSGW内存">
        <el-input v-model="ruleForm.SNSGW"></el-input>
      </el-form-item>
      <el-form-item prop="MYSQL" label="MYSQL内存">
        <el-input v-model="ruleForm.MYSQL"></el-input>
      </el-form-item>
      <el-form-item prop="consoleerr" label="日志生成及监控台是否异常报错">
        <el-input v-model="ruleForm.consoleerr"></el-input>
      </el-form-item>
      <el-form-item prop="Lineup" label="队列空闲率(3\2\1\0)">
        <el-input v-model="ruleForm.Lineup"></el-input>
      </el-form-item>
      <el-form-item prop="Terminalonlinetest" label="俩终端在线指令验证">
        <el-input v-model="ruleForm.Terminalonlinetest"></el-input>
      </el-form-item>
      <el-form-item prop="Terminalofflinetest" label="俩终端离线验证">
        <el-input v-model="ruleForm.Terminalofflinetest"></el-input>
      </el-form-item>
      <el-form-item prop="Openanaccount" label="每日开户">
        <el-input v-model="ruleForm.Openanaccount"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="monitor" label="当日监控画面截图保存">
        <el-input v-model="ruleForm.monitor"></el-input>
      </el-form-item> -->
      <el-form-item
        prop="img"
        label="当日监控画面截图保存"
        v-model="ruleForm.img"
      >
          <!-- 选择图片 -->
          <input type="file" accept="img/*" @change="chooseImg"/>
          <!-- 预览图片 -->
          <canvas ref="imgPreview" height="0" width="0"></canvas>
          <!-- 提交图片 -->
          <!-- <button @click="uploadImg">提交图片</button> -->
          <!-- 通过后台返回的url向文件服务器请求图片 -->
          <!-- <img :src="imgUrlFromServer" /> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="sumbit">提交</el-button>
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
      imgUrlFromServer: "#",
      base64: "",
      date: new Date(),
      labelPosition: "left",
      ruleForm: {
        id: "",
        date: "",
        zs: "zs",
        UCAS: "UCAS",
        DCAS: "DCAS",
        gz: "gz",
        dz: "dz",
        gGV_EMM: "gGV_EMM",
        dGV_EMM: "dGV_EMM",
        SGK_EMM: "SGK_EMM",
        PK_EMM: "PK_EMM",
        EMM: "EMM",
        ECM: "ECM",
        DBGW: "DBGW",
        SNSGW: "SNSGW",
        MYSQL: "MYSQL",
        consoleerr: "consoleerr",
        Lineup: "Lineup",
        Terminalonlinetest: "Terminalonlinetest1",
        Terminalofflinetest: "Terminalofflinetest",
        Openanaccount: "Openanaccount",
        img:'',
      },
      loginRules: {
        // 验证规则
        id: [{ required: true, message: "请输入内容", trigger: "blur" }],
        date: [{ required: true, message: "请输入内容", trigger: "blur" }],
        name: [{ required: true, message: "请输入内容", trigger: "blur" }],
        UCAS: [{ required: true, message: "请输入内容", trigger: "blur" }],
        DCAS: [{ required: true, message: "请输入内容", trigger: "blur" }],
        gz: [{ required: true, message: "请输入内容", trigger: "blur" }],
        gGV_EMM: [{ required: true, message: "请输入内容", trigger: "blur" }],
        dGV_EMM: [{ required: true, message: "请输入内容", trigger: "blur" }],
        SGK_EMM: [{ required: true, message: "请输入内容", trigger: "blur" }],
        PK_EMM: [{ required: true, message: "请输入内容", trigger: "blur" }],
        EMM: [{ required: true, message: "请输入内容", trigger: "blur" }],
        ECM: [{ required: true, message: "请输入内容", trigger: "blur" }],
        DBGW: [{ required: true, message: "请输入内容", trigger: "blur" }],
        SNSGW: [{ required: true, message: "请输入内容", trigger: "blur" }],
        MYSQL: [{ required: true, message: "请输入内容", trigger: "blur" }],
        consoleerr: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        Lineup: [{ required: true, message: "请输入内容", trigger: "blur" }],
        Terminalonlinetest: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        Terminalofflinetest: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        Openanaccount: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
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
          this.ruleForm.img=this.base64
      };
      // 预览图片
      let canvas = this.$refs["imgPreview"];
      let context = canvas.getContext("2d");
      img.onload = () => {
        img.width = 100;
        img.height = 100;
        // 设置canvas大小
        canvas.width = 100;
        canvas.height = 100;
        // 清空canvas
        context.clearRect(0, 0, 100, 100);
        // 画图
        context.drawImage(img, 0, 0, 200, 200);
      };
    },
    sumbit() {
      if (
        this.ruleForm.date &&
        this.ruleForm.zs &&
        this.ruleForm.UCAS &&
        this.ruleForm.DCAS &&
        this.ruleForm.gz &&
        this.ruleForm.dz &&
        this.ruleForm.gGV_EMM &&
        this.ruleForm.dGV_EMM &&
        this.ruleForm.SGK_EMM &&
        this.ruleForm.PK_EMM &&
        this.ruleForm.EMM &&
        this.ruleForm.ECM &&
        this.ruleForm.DBGW &&
        this.ruleForm.SNSGW &&
        this.ruleForm.MYSQL &&
        this.ruleForm.consoleerr &&
        this.ruleForm.Lineup &&
        this.ruleForm.Terminalonlinetest 
        // this.ruleForm.Openanaccount &&
      ) {
        this.$axios.post("/list", this.ruleForm).then(({ data, status }) => {
          if (status === 201) {
            this.$router.push({ path: "./flowingwater" });
          }
        })
      } else {
        alert("内容不能为空");
      }
    },

// 提交图片按钮方法
    uploadImg() {
      this.$axios.post("/list",{img: this.base64}).then(response => {
        console.log(response.data.img)
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

<style>
.formm {
  overflow: auto;
  height: 510px;
}
</style>
