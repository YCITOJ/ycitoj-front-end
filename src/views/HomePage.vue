<template>
  <div class="homxBox">
    <el-containers style="with:100%;">
    <!-- Top -->
      <el-header class="el-header">
          <el-menu
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item class="log" disabled >YCITOJ</el-menu-item>
          <el-menu-item index="1" @click="gotohome">首页</el-menu-item>
          <el-menu-item index="2" @click="gototopic">题库</el-menu-item>
          <el-menu-item index="3" @click="gotorace">比赛</el-menu-item>
          <el-menu-item index="4" class="signin" @click="gotologin">登录/注册</el-menu-item>
        </el-menu>
      </el-header>
      <!-- 主体 -->
      <el-main class="el-main">
        <router-view/>
      </el-main>
    </el-containers>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    
    const router = useRouter();

    /* onMounted(() => {
      gotohome()
    }); */
    function gotologin() {
      router.push("/login");
    }
    function gototopic() {
      router.push("/topic");
    }
    function gotorace() {
      router.push("/race");
    }
    function gotohome() {
      router.push("/home");
    }
    return {
      gotologin,
      gototopic,
      gotorace,
      gotohome
    };
  },
};
</script>
<style scoped>
.signin {
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
