<template>
  <div>
<el-container>
  <el-header>
      <!-- 导航栏 -->
    <el-menu
  :default-active="this.$route.path"
  class="el-menu-demo"
  mode="horizontal"
  router
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item disabled class="log">YCITOJ</el-menu-item>
  <el-menu-item index="home">首页</el-menu-item>
  <el-menu-item index="topic">题库</el-menu-item>
  <el-menu-item index="race">比赛</el-menu-item>
  <el-menu-item index="usersubmit">提交记录</el-menu-item>
  <el-menu-item class="signin" index="login" v-show="loginname === 'in'">登录|注册</el-menu-item>
  <el-menu-item class="signin" index="user" v-show="loginname === 'out'"><i class="el-icon-user-solid"></i></el-menu-item>
</el-menu>
  </el-header>
  <el-main>
      <router-view></router-view>
  </el-main>
</el-container>
  </div>
</template>
<script>
export default {
    data() {
      return {
        loginname:''
      };
    },
    created() {
      this.pdlogin()
    },
    methods: {
      pdlogin() {
        console.log(window.sessionStorage.getItem("token") === null)
        if (window.sessionStorage.getItem("token"))
        {
          this.loginname = 'out';
          return;
        }
         this.loginname = 'in';
      },
    }
}
</script>
<style scoped>
.el-menu--horizontal>.el-menu-item.signin {
  float: right;
}
.log {
  padding-right: 100px;
  font-size: 30px;
}
</style>