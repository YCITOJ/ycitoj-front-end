<template>
  <div class="box"
  v-loading="loading"
   element-loading-text="拼命加载中"
   element-loading-spinner="el-icon-loading"
   element-loading-background="#ffffff">
      <el-col>
        <el-button
          type="primary"
          class="addRacebutton"
          @click="addRace"
          v-if="userlevel == 1"
          >添加比赛</el-button>
      </el-col>
    <el-table :data="tableData" style="width: 100%" @row-click="gotoracehome">
      <el-table-column prop="title" label="比赛名称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-link type="primary" disabled v-if="scope.row.state==1">未开始</el-link>
          <el-link type="success" disabled v-if="scope.row.state==2">进行中</el-link>
          <el-link type="info" disabled v-if="scope.row.state==3">已结束</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="start_time" label="开始时间" width="180">
      </el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="180">
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
      userlevel: "",
      // 页面加载
      loading: true,
    };
  },
  created() {
    this.getuserlevel();
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
      this.loading = false
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
      this.getPageinfo();
      this.getRaceList();
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
  position: absolute;
  width: 80%;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.addRacebutton {
  float: right;
}
</style>
