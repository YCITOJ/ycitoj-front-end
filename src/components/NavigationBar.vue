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
  <el-menu-item class="signin" index="login" >登录/注册</el-menu-item>
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
      };
    },
    methods: {
    }
}
</script>
<style scoped>
.el-menu--horizontal>.el-menu-item.signin {
  float: right;
}
.el-header,
.el-main {
  padding-left: 0;
  padding-right: 0;
}
.log {
  padding-right: 100px;
  font-size: 30px;
}
</style>