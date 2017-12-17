<template>
  <el-row>
    <el-col :span="24">
      <div class="container">
        <el-form :model="submitForm" ref="submitForm" :rules="submitRules" label-position="left" label-width="0px"
                 class="login-container">
          <img class="logo" :src="require(`@/assets/logo_tuzhan.png`)" alt="兔展">
          <h2 class="title">系统登录</h2>
          <el-form-item prop="userId">
            <el-input type="text" v-model="submitForm.userId" auto-complete="off" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="psw">
            <el-input type="password" v-model="submitForm.psw" auto-complete="off" placeholder="密码"
                      @keyup.native.enter="onSubmit"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>


<script>
  import {loginAPI} from '@/api/api'
export default {
  data: function () {
    return {
      loading: false,
      submitForm: { userId: 'admin', psw: '123456' },
      submitRules: {
        userId:[{ required: true, message: '请输入账号', trigger: 'blur'}],
        psw:[{ required: true, message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    handleReset() {
      this.$refs.submitForm.resetFields();
    },
    onSubmit () {
      this.$refs.submitForm.validate((valid) => {
        if (!valid)  return false;
        this.loading = true;
        // ============== 待完善===================
        loginAPI(this.submitForm).then( res => {
          this.logining = false;
          console.log(res)
          if( res.code !== 0){
            this.handleReset();
            this.$message.error(`${res.msg}`);
            return false;
          }
          this.$store.commit('create_login_certification', this.submitForm);
          this.$router.push({ path: '/' });
        }).catch((err)=>{
          this.loading = false
          this.$message.error(`无法登陆，原因为：${JSON.stringify(err)}`);
        });
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .login-container {
    position: relative;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    background: #fff;
    .logo {
      position: absolute;
      top: 2%;
      right: 110%;
    }
    .title {
      margin: 0px auto 40px auto;
      font-size: 30px;
      text-align: center;
      color: #505458;
    }
  }
</style>
