<template>
  <el-container class="admin_box">
    <el-header>
      <div class="nav">
        <span>YCITOJ后台管理系统</span>
        <el-button
          icon="el-icon-switch-button"
          circle
          @click="goto_home()"
        ></el-button>
      </div>
    </el-header>
    <el-container class="home-container">
      <el-aside :width="isCollapse ? '64px' : '200px'" class="home-container">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏 -->
        <el-menu
          default-active="activePath"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="judgeserver">
            <i class="el-icon-s-platform"></i>
            <span slot="title">服务器管理</span>
          </el-menu-item>
          <el-menu-item index="submitserver">
            <i class="el-icon-tickets"></i>
            <span slot="title">提交管理</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="insertauth">添加用户认证信息</el-menu-item>
              <el-menu-item index="authtab">查看用户认证信息</el-menu-item>
              <el-menu-item index="userlist">查看用户列表</el-menu-item>
              <el-menu-item index="autheduserlist">已认证用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-menu-item index="tag">
            <i class="el-icon-price-tag"></i>
            <span slot="title">管理Tag</span>
          </el-menu-item>
          <el-menu-item index="uploadproblem">
            <i class="el-icon-price-tag"></i>
            <span slot="title">上传题目</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: "",
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("server_activePath");
  },
  methods: {
    //返回主页
    goto_home() {
      this.$router.push("/home");
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("server_activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style scoped>
/* .box {
  position: absolute;
  height: 91%;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
} */
.admin_box {
  height: 100%;
}
.nav {
  height: 100%;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  padding-left: 15px;
  padding-right: 15px;
}
.el-aside {
  background-color: #333744;
}
.el-aside .el-menu {
  border-right: none;
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>