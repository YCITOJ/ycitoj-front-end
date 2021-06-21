<template>
  <div class="box">
    <el-container>
      <!-- 头部 -->
      <el-header class="header_title">{{ headertitle }}</el-header>
      <!-- 主题 -->
      <el-main>
        <!-- 比赛介绍 -->
        <div>{{ mianintroduce }}</div>
        <!-- 比赛内容 -->
        <el-card class="main_card">
          <div>
            <el-button type="primary" v-if="false">报名</el-button>
            <el-button type="primary" >排行榜</el-button>
            <el-button type="success" class="el_button_success">提交记录</el-button>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="状态" width="80">
              </el-table-column>
              <el-table-column prop="name" label="题目" width="800">
              </el-table-column>
              <el-table-column prop="address" label="统计"> </el-table-column>
            </el-table> 
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
          date: '',
          name: '王小虎',
          address: '4/4'
        }, {
          date: '',
          name: '王小虎',
          address: '4524/45224'
        }, {
          date: '',
          name: '王小虎',
          address: '123/4545'
        }, {
          date: '',
          name: '王小虎',
          address: '1/2'
        }],
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
.main_card {
  margin-top: 50px;
  width: 80%;
}
.el-table {
  margin-top: 30px;
}
</style>
