<template>
  <div class="box">
      <el-col>
        <el-button
          type="primary"
          class="addRacebutton"
          @click="addRace"
          v-if="userlevel == 1"
          >添加比赛</el-button>
      </el-col>
    <el-table :data="tableData" style="width: 100%" @row-click="gotoracehome">
      <el-table-column prop="title" label="比赛名称"></el-table-column>
      <el-table-column label="状态" width="200">
        <template slot-scope="scope">
          <el-link type="primary" disabled v-if="scope.row.state==1">未开始</el-link>
          <el-link type="success" disabled v-if="scope.row.state==2">进行中</el-link>
          <el-link type="info" disabled v-if="scope.row.state==3">已结束</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="start_time" label="开始时间" width="270">
      </el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="270">
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
      tableData: [],
      // 添加题目弹出框
      dialogVisible: false,
      addRaceform: {
        num: "",
        title: "",
        uploader: "",
        difficulty: "",
      },
      // 用户等级
      userlevel: ""
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
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getRaceList();
    },
    // 进入比赛页面
    gotoracehome(row) {
      this.$router.push({ path: "/competehome", query: {id: row.id} });
    },
    // 获取用户等级
    getuserlevel() {
      if (window.localStorage.getItem("access")<=1) this.userlevel = 1;
    },
    // 添加比赛
    addRace() {
      const { href } = this.$router.resolve({
        path: '/addcompete'
      });
      window.open(href, '_blank');
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
.addRacebutton {
  float: right;
}
</style>
