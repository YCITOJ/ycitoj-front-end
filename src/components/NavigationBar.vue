<template>
  <div class="box">
    <el-container>
      <el-header width='200px'>
        <!-- 导航栏Start -->
        <el-menu
         :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item disabled index="1" class="log">YCITOJ</el-menu-item>
          <el-menu-item index="home">首页</el-menu-item>
          <el-menu-item index="topic">题库</el-menu-item>
          <el-menu-item index="problemlist">题单</el-menu-item>
          <el-menu-item index="contest">比赛</el-menu-item>
          <el-menu-item index="usersubmit">提交记录</el-menu-item>
          <el-menu-item index="class">班级</el-menu-item>
          <el-menu-item index="admin" v-show="userlevel==1">后台</el-menu-item>
          <el-menu-item class="signin" index="login" v-show="loginname === 'in'">登录|注册</el-menu-item>
          <el-menu-item class="signin" index="user" v-show="loginname === 'out'">
            <i class="el-icon-user-solid"></i>
            {{username}}
          </el-menu-item>
        </el-menu>
        <!-- 导航栏End -->
      </el-header>

      <el-main>
        <!-- 内容主体Start -->
          <router-view></router-view>
        <!-- 内容主体End -->
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 判断登录状态
      loginname: "",
      // 用户名
      username: "",
      // 导航栏位置 
      activeIndex: "home",
      // 用户等级
      userlevel: "2"
    };
  },
  created() {
    this.pdlogin();
    this.getuserlevel();
    this.activeIndex = window.sessionStorage.getItem("navigation_bar_activeIndex");
  },
  methods: {
    pdlogin() {
      this.username=window.localStorage.getItem("username")
      if (window.localStorage.getItem("token")) {
        this.loginname = "out";
        return;
      }
      this.loginname = "in";
    },
    // 处理选中
    handleSelect(key,keyPath){
      //给个人信息页面导航栏赋值
      if(key=='user'){
        window.sessionStorage.setItem("user_activeIndex", 'passlist');
        window.sessionStorage.setItem("proList_activeIndex",'problemlisthomeinfo');
      }
      window.sessionStorage.setItem("navigation_bar_activeIndex", key);
      this.activeIndex = key
      window.localStorage.setItem("navigation_bar_activeIndex",key);
    },
    // 获取用户等级
    getuserlevel() {
      if (window.localStorage.getItem("access") <= 1) this.userlevel = 1;
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
