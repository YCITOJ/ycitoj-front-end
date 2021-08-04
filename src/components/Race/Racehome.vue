<template>
  <div class="box">
    <el-container>
      <!-- 头部 -->
      <h2>{{title}}</h2>
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
            <el-button type="primary">报名</el-button>
            <el-button type="primary">排行榜</el-button>
            <el-button type="success">提交记录</el-button>
            <el-button type="info" @click="gotoReviseRace">编辑</el-button>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="状态" width="80">
              </el-table-column>
              <el-table-column prop="title" label="题目" width="800">
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
      tableData: [],
      value: "",
      title: ""
    };
  },
  created() {
    this.getRaceList();
  },
  methods: {
    async getRaceList() {
      const { data: res } = await this.$http.get(
        `contest/contest?id=${this.$route.query.id}`
      );
      console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("获取题目列表失败！");
      }
      this.tableData = res.data.prob_list;
      this.value = res.data.information;
      this.title = res.data.title;
    },
    // 修改题目
    gotoReviseRace() {
      this.$router.push({
        path: "/reviserace",
        query: { id: this.$route.query.id },
      });
    },
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
