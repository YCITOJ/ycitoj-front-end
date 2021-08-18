<template>
  <div class="box">
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
      <el-button type="primary" icon="el-icon-edit" class="word" size="small"
        >编辑</el-button
      >
    </el-card>
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
.box {
  width: 80%;
  margin-left: 10%;
  margin-top: 100px;
}
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
