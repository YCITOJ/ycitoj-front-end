<template>
  <div class="box">
    <el-container>
      <el-header width='100px'>
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
          <el-menu-item disabled index="1" class="log" v-if="flag">YCITOJ</el-menu-item>
          <el-menu-item index="home" v-if="flag">首页</el-menu-item>
          <el-menu-item index="topic">题库</el-menu-item>
          <el-menu-item index="problemlist">题单</el-menu-item>
          <el-menu-item index="contest" v-if="flag">比赛</el-menu-item>
          <el-menu-item index="usersubmit" v-if="flag">提交记录</el-menu-item>
          <el-menu-item index="class">班级</el-menu-item>
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
        <div >
          <router-view></router-view>
        </div>
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
      // 判断是否的移动端
      flag: true
    };
  },
   mounted() {
    if (this._isMobile()) {
      this.flag=false
    }
  },
  created() {
    this.pdlogin();
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
      window.sessionStorage.setItem("proList_activeIndex",'problemlisthomeinfo');
      window.sessionStorage.setItem("navigation_bar_activeIndex", key);
      this.activeIndex = key
      window.localStorage.setItem("navigation_bar_activeIndex",key);
    },
    // 移动端判定
    _isMobile() {
	 let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
	 return flag;
  }
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
.el-main {
  height: 100%;
}
</style>
