<template>
  <div class="box">
    <el-container>
      <!-- 头部 -->
      <el-header class="header_title" height="550px">
        <div>
          <mavon-editor
          class="md"
          v-model="value"
          :subfield="false"
          :defaultOpen="'preview'"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="true"
          :ishljs="true"
        />
        </div>
      </el-header>
      <el-main class="mainthins">
        <!-- 比赛内容 -->
        <el-card class="main_card">
          <div>
            <el-button type="primary" v-if="false">报名</el-button>
            <el-button type="primary" >排行榜</el-button>
            <el-button type="success" class="el_button_success">提交记录</el-button>
            <el-table :data="tableData" border style="width: 100%" >
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
      value: "<h3>盐城工学院程序设计大赛DIV1<h3><h3>盐城工学院程序设计大赛DIV1<h3><h3>盐城工学院程序设计大赛DIV1<h3><h3>盐城工学院程序设计大赛DIV1<h3><h3>盐城工学院程序设计大赛DIV1<h3><h3>盐城工学院程序设计大赛DIV1<h3>",
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
  width: 80%;
  background-color: black;
}
.md {
  height: 550px;
}
.mainthins {
  padding-top: 50px;
}
.main_card {
  width: 80%;
}
.el-table {
  margin-top: 30px;
}
</style>
