<template>
  <div>
    <el-container class="box_container">
      <el-header class="header_card">
        <el-card>
          <i class="el-icon-user-solid">{{ username }}</i>
          <el-button
            type="primary"
            icon="el-icon-close"
            class="word"
            size="small"
            @click="out"
            >退出</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-circle-check"
            class="word"
            size="small"
            >打卡</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            class="word"
            size="small">编辑</el-button
          >
        </el-card>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>首页</span>
                </template>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">动态</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">基本资料</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">设置</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "李丽丽",
    };
  },
  methods: {
    out() {
      window.localStorage.setItem("token", "");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.box_container {
  padding-left: 10%;
  width: 80%;
}
.header_card {
  margin-top: 20px;
}
.word {
  float: right;
  margin-right: 20px;
}
</style>
