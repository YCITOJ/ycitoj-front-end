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
          active-text-color="#ffd04b"
        >
          <el-menu-item disabled class="log">YCITOJ</el-menu-item>
          <el-menu-item index="home">首页</el-menu-item>
          <el-menu-item index="topic">题库</el-menu-item>
          <el-menu-item index="compete">比赛</el-menu-item>
          <el-menu-item index="usersubmit">提交记录</el-menu-item>
          <el-submenu index="2">
            <template slot="title">班级</template>
            <el-menu-item index="2-1">作业</el-menu-item>
            <el-menu-item index="2-2">考试</el-menu-item>
            <el-menu-item index="2-2">成绩</el-menu-item>
          </el-submenu>
          <el-menu-item class="signin" index="login" v-show="loginname === 'in'"
            >登录|注册</el-menu-item
          >
          <el-menu-item class="signin" index="user" v-show="loginname === 'out'">
            <i class="el-icon-user-solid"></i>
            {{username}}
          </el-menu-item>
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
      loginname: "",
      username: "",
    };
  },
  created() {
    this.pdlogin();
  },
  methods: {
    pdlogin() {
      this.username=window.localStorage.getItem("username")
      //console.log(window.localStorage.getItem("token") === null)
      if (window.localStorage.getItem("token")) {
        this.loginname = "out";
        return;
      }
      this.loginname = "in";
    },
  },
};
</script>
<style scoped>
.el-menu--horizontal > .el-menu-item.signin {
  float: right;
}
.log {
  padding-right: 100px;
  font-size: 30px;
}
</style>
