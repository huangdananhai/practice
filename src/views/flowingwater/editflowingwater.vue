<template>
  <el-card shadow="never">
    <crumbs slot="header">
      <template slot="title">编辑</template>
    </crumbs>
    <el-form
      class="formm"
      size="small"
      :label-position="labelPosition"
      label-width="160px"
      :model="ruleForm"
    >
      <el-form-item prop="id" label="id">
        <el-input v-model="ruleForm.id" disabled></el-input>
        <el-alert title="ID修改后无效，禁止修改" type="warning"></el-alert>
      </el-form-item>
      <el-form-item prop="date" label="日期">
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
        <!-- <el-input v-model="ruleForm.consoleerr"></el-input> -->
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
        <!-- <el-input v-model="ruleForm.Openanaccount"></el-input> -->
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
      <el-form-item prop="img" label="图片">
        <input type="file" accept="img/*" @change="chooseImg" />
         <el-image :src="ruleForm.img" ref="imgPreview"></el-image>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="sumbit">编辑完成</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
const Base64 = require("js-base64").Base64;
export default {
   name: "list",
  data() {
    return {
      options: [
        {
          value: "选项1",
          consoleerr: "是",
          Terminalonlinetest: "完成",
          Terminalofflinetest: "完成",
          Openanaccount: "完成"
        },
        {
          value: "选项2",
          consoleerr: "否",
          Terminalonlinetest: "未完成",
          Terminalofflinetest: "未完成",
          Openanaccount: "未完成"
        }
      ],
      value: "",
      imgUrlFromServer: "#",
      base64: "",
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
      }
    };
  },
  methods: {
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
      img.onload = () => {
        img.width = 100;
        img.height = 100;
        // 设置canvas大小
        canvas.width = 100;
        canvas.height = 100;
      };
    },
    sumbit() {
      if (
        this.ruleForm.date &&
        this.ruleForm.zs &&
        this.ruleForm.UCAS &&
        this.ruleForm.DCAS &&
        this.ruleForm.gz &&
        this.ruleForm.dz 
      ) {
        const { heroid } = this.$route.params;
        this.$axios.put(`/list/${heroid}`, this.ruleForm).then(({ status }) => {
          status === 200 && this.$router.push({ path: "/home/flowingwater" });
        });
      } else {
        alert("内容不能为空");
      }
    }
  },
  mounted() {
    //   解构赋值
    const { heroid } = this.$route.params;
    this.$axios.get(`/list/${heroid}`).then(({ data }) => {
      this.ruleForm = data;
    });
  }
};
</script>

<style scoped>
.formm {
  overflow: auto;
  height: 510px;
  padding: 0px 200px 0px 200px;
}
.el-select {
  width: 100%;
}
</style>
