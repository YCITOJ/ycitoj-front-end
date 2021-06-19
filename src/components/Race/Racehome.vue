<template>
  <div class="box">
    <el-container>
      <el-header class="header_title">{{ headertitle }}</el-header>
      <el-main>
        <div>{{ mianintroduce }}</div>
        <div>
          <div class="one"></div>
          <el-progress :percentage="50" status="success"></el-progress>
        </div>
        <div>题目</div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headertitle: "盐城工学院程序设计大赛DIV1",
      mianintroduce: "本场比赛允许全体盐城工学院学生参加",
    };
  },
};
</script>
<style scoped>
.box {
  padding-left: 200px;
  padding-top: 20px;
}
.header_title {
  font-size: 30px;
  font-weight: bold;
}
.one {
  width: 200px;
  height: 0px;
  background-color: #cdcdcd;
  border-top: 20px solid transparent;
  border-left: 30px solid ghostwhite;
  border-right: 30px solid transparent;
  border-bottom: 20px solid transparent;
}
</style>
