<template>
     <el-card class="box-card">
      <!-- 题目列表区域 -->
    <el-table
      :data="problemslist"
      stripe
      @row-click="gotohome"
      class="problemlist"
    >
    <el-table-column label="编号" prop="id" width="100"></el-table-column>
    <el-table-column label="题单" prop="title"></el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-size="queryInfo.pagesize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    </el-card>
</template>
<script>
import "../Topic/style.js";
export default {
  data() {
    return {
      // 获取题单列表的参数对象
      queryInfo: {
        // 搜索区域
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
      problemslist: [],
      total: 0,
    };
  },
  created() {
    this.getPageinfo();
  },
  methods: {
    async getProblemList() {
      const { data: res } = await this.$http.get(`prob_collection/my_collection?page_no=${this.queryInfo.pagenum}`);
      console.log(res)
       if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.problemslist = res.data;
    },
    // 题单个数以及每页题单数量
    async getPageinfo() {
      const { data: res } = await this.$http.get("prob_collection/my_collection_cnt");
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.total = res.count;
      this.queryInfo.pagesize = res.show_per_page;
      this.getProblemList();
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getProblemList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      window.sessionStorage.setItem("topicPage", newPage);
      this.getProblemList();
    },
    // 进入题单
    gotohome(row) {
      this.$router.push({ path: "/problemlisthome", query: { id: row.id } });
    },
  },
};
</script>
<style>
.box-card {
    margin-top: 10px;
}
</style>