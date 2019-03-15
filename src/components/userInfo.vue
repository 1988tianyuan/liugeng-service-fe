<template>
  <div id="view">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1" hide-timeout="100">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div>用户</div>
        </el-header>
        <el-button @click="visible=true" class="new_user">新建用户</el-button>
        <el-main>
          <el-table :data="users">
            <el-table-column prop="name" label="姓名" width="250">
            </el-table-column>
            <el-table-column prop="account" label="账号" width="250">
            </el-table-column>
            <el-table-column prop="info" label="信息">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog :visible.sync="visible" title="新建用户">
      <el-form :model="form">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pswd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="信息">
          <el-input v-model="form.info"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="submit" @click="onSubmit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="createdVisible" title="创建结果">
      {{ createdResult }}
    </el-dialog>
    <el-dialog :visible.sync="errorVisible" title="异常">
      {{ errorMsg }}
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import pubProps from '../properties/pubProps'
import router from '../router/router'

export default {
  inject: ['reload'],
  data: function () {
    return {
      users: [],
      visible: false,
      form: {
        name: '',
        account: '',
        info: '',
        pswd: ''
      },
      createdVisible: false,
      createdResult: '',
      errorVisible: false,
      errorMsg: '',
      userUrl: process.env.NODE_ENV === 'production' ? pubProps.prodUrl + '/user' : pubProps.devUrl + '/user'
    }
  },
  mounted () {
    let self = this
    axios.get(this.userUrl)
      .then(function (response) {
        self.users = response.data.data
      }).catch(function (error) {
        let errorResp = error.response
        self.errorMsg = errorResp.data.msg
        self.errorVisible = true
        alert(self.errorMsg)
        if (errorResp.status === 403) {
          router.push('/login')
        }
      })
  },
  methods: {
    onSubmit () {
      console.log('submit!')
      let self = this
      axios.post(this.userUrl, {
        name: this.form.name,
        account: this.form.account,
        info: this.form.info,
        password: this.form.pswd
      })
        .then(
          function (response) {
            let isSuccess = response.data
            self.createdVisible = true
            if (isSuccess) {
              self.createdResult = '创建成功啦！'
              self.visible = false
              self.reload()
            } else {
              self.createdResult = '创建失败啦！'
            }
          }
        ).catch(function (error) {
          self.createdVisible = true
          self.createdResult = '创建失败啦！'
          console.log('出错啦：' + error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .new_user {
    margin-right: 20px;
    width: 100px;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    width: 500px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
     margin-bottom: 0;
   }
  }

  .el-col {
    border-radius: 4px
  }
  .bg-purple-dark {
    background: #99a9bf
  }
  .bg-purple {
    background: #d3dce6
  }
  .bg-purple-light {
    background: #e5e9f2
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc
  }
</style>
