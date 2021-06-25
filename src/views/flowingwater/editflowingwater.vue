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
        <el-input v-model="ruleForm.date"></el-input>
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
      <el-form-item prop="SMSGW" label="SMSGW内存">
        <el-input v-model="ruleForm.SMSGW"></el-input>
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
      <el-form-item prop="remarks" label="备注">
        <el-input v-model="ruleForm.remarks"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="sumbit">编辑完成</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "left",
      ruleForm: {
        id: "",
        date: "",
        zs: "",
        UCAS: "",
        DCAS: "",
        gz: "",
        dz: "",
        gGV_EMM: "",
        dGV_EMM: "",
        SGK_EMM: "",
        PK_EMM: "",
        EMM: "",
        ECM: "",
        DBGW: "",
        SMSGW: "",
        MYSQL: "",
        consoleerr: "",
        Lineup: "",
        Terminalonlinetest: "",
        Terminalofflinetest: "",
        Openanaccount: "",
      },
    };
  },
  methods: {
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
        this.ruleForm.SMSGW &&
        this.ruleForm.MYSQL &&
        this.ruleForm.consoleerr &&
        this.ruleForm.Lineup &&
        this.ruleForm.Terminalonlinetest &&
        this.ruleForm.Openanaccount 
        // this.ruleForm.monitor
      ) {
        const { heroid } = this.$route.params;
        this.$axios.put(`/list/${heroid}`, this.ruleForm).then(({ status }) => {
          status === 200 && this.$router.push({ path: "/home/flowingwater" });
        });
      } else {
        alert("内容不能为空");
      }
    },
  },
  mounted() {
    //   解构赋值
    const { heroid } = this.$route.params;
    this.$axios.get(`/list/${heroid}`).then(({ data }) => {
      this.ruleForm = data;
    });
  },
};
</script>

<style  scoped>
.formm {
  overflow: auto;
  height: 510px;
   padding: 0px 200px 0px 200px;
}
</style>