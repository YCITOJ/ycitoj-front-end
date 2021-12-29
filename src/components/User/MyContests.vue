<template>
<el-card class="box-card ">
  <el-table :data="MyContestsList" style="width: 100%" @row-click="gotoracehome">
      <el-table-column prop="title" label="比赛名称" :show-overflow-tooltip="true"></el-table-column>
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
      layout="prev, pager, next, jumper"
    >
    </el-pagination>
</el-card>
</template> 

<script>
export default {
  data() {
    return {
      MyContestsList: [],
      // 获取用户列表的参数对象
      queryInfo: {
        // 搜索区域
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
    };
  },
  created() {
    this.get_my_contests_list();
  },
  methods: {
    //获取参加过的比赛
    async get_my_contests_list() {
      const { data: res } = await this.$http.get(
        `contest/my_contest?user_id=${window.localStorage.getItem(
          "userid"
        )}&page_no=${this.queryInfo.pagenum}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.MyContestsList = res.data;
      console.log(this.MyContestsList)
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.get_my_contests_list();
    },
    // 进入比赛页面
    gotoracehome(row) {
      this.$router.push({ path: "/contesthome", query: {id: row.id} });
    },
  },
};
</script>

<style>
.box-card {
  margin-top: 10px;
}
.text span {
  display: block;
  width: 100px;
  text-align: center;
  background-color: #000;
}
.clearfix span:nth-child(2) {
  float: right;
}
</style>

