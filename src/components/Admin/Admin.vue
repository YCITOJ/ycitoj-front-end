<template>
  <div class="box">
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
      router>
      <el-menu-item index="judgeserver">
        <i class="el-icon-s-platform"></i>
        <span slot="title">服务器管理</span>
      </el-menu-item>
      <el-menu-item index="submitserver">
        <i class="el-icon-tickets"></i>
        <span slot="title">提交管理</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-main>
      <!-- 路由占位符 -->
        <router-view></router-view>
    </el-main>
  </el-container>
  </div>
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
.box {
  position: absolute;
  height: 91%;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.home-container {
  height: 100%;
  background-color: #000;
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