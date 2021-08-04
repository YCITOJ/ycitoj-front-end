<template>
  <div class="box">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-button
          type="primary"
          @click="addRace"
          v-if="userlevel == 1"
          >添加比赛</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" @row-click="gotoracehome">
      <el-table-column prop="name" label="比赛名称" width="600">
        <template slot-scope="scope">
          {{ scope.row.title }}
          <el-button type="primary" size="mini" v-show="scope.row.fff == 1"
            >报名</el-button
          >
          <el-button type="success" size="mini" v-if="scope.row.fff == 2"
            >进行中</el-button
          >
          <el-button type="info" size="mini" v-if="scope.row.fff == 3"
            >结束</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="start_time" label="开始时间" width="300">
      </el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="300">
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-size="queryInfo.pagesize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 6,
      },
      total: 50,
      tableData: [
        {
        },
      ],
      // 添加题目弹出框
      dialogVisible: false,
      addRaceform: {
        num: "",
        title: "",
        uploader: "",
        difficulty: "",
      },
    };
  },
  created() {
    this.getuserlevel();
    this.getRaceList();
    this.getPageinfo();
  },
  methods: {
    async getRaceList() {
      const { data: res } = await this.$http.get(
        "contest/list?page_no=" + this.queryInfo.pagenum
      );
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error("获取题目列表失败！");
      }
      this.tableData = res.data;
    },
    // 比赛个数以及每页比赛数量
    async getPageinfo() {
      const { data: res } = await this.$http.get("contest/contest_cnt");
      if (res.meta.status !== 200) {
        return this.$message.error("获取题目列表失败！");
      }
      this.total = res.count;
      this.queryInfo.pagesize = res.show_per_page;
    },
    gotoracehome() {
      this.$router.push({ path: "/racehome" });
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getRaceList();
    },
    // 获取用户等级
    getuserlevel() {
      if (window.localStorage.getItem("token")) this.userlevel = 1;
    },
    // 添加比赛
    addRace() {
      this.$router.push("/addrace");
    }
  },
};
</script>
<style scoped>
.box {
  margin-top: 40px;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
