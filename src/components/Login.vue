<template>
  <div id="view" class="loginForm">
    <div>
      <el-form :model="form">
        <el-form-item label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="是否保持登陆状态">
          <el-switch v-model="form.keepLogin"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="visible = false">注 册</el-button>
          <el-button type="submit" @click="onSubmit">登 陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import pubProps from '../properties/pubProps'
import router from '../router/router'
export default {
  name: 'Login',
  data: function () {
    return {
      users: null,
      visible: false,
      form: {
        account: '',
        password: '',
        keepLogin: false
      },
      createdVisible: false,
      resultMsg: '',
      loginUrl: process.env.NODE_ENV === 'production' ? pubProps.prodUrl + '/login' : pubProps.devUrl + '/login'
    }
  },
  methods: {
    onSubmit () {
      let self = this
      let sendData = {
        account: this.form.account,
        password: this.form.password,
        keepLogin: this.form.keepLogin
      }
      axios.post(this.loginUrl, sendData)
        .then(
          function (response) {
            let responseData = response.data
            let code = responseData.code
            self.resultMsg = responseData.msg
            if (code === 0) {
              alert('登陆成功')
              router.push('/hello')
            } else {
              alert(self.resultMsg)
            }
          }
        ).catch(function (error) {
          self.resultMsg = '登陆失败:' + error
          console.log('出错啦：' + error)
        })
    }
  }
}
</script>

<style scoped>
  .loginForm {
    text-align: center;
    margin-top: 20px;
    margin-right: auto;
    margin-left: auto;
    width: 500px;
  }
</style>
