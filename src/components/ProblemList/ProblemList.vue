<template>
  <div class="topicbox"
   v-loading="loading"
   element-loading-text="拼命加载中"
   element-loading-spinner="el-icon-loading"
   element-loading-background="#ffffff">
    <!-- 搜索与添加区域 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="请输入题目编号或内容"
          v-model="queryInfo.query"
          clearable
          @clear="getProblemList"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="find_problem_list"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addDialogVisible">添加题单</el-button>
      </el-col>
    </el-row>
    <!-- 题目列表区域 -->
    <el-table
      :data="problemslist"
      stripe
      class="problemlist"
      @row-click="gotohome"
    >
      <el-table-column label="编号" prop="id" width="100"></el-table-column>
      <el-table-column label="名称" prop="title" :show-overflow-tooltip="true"></el-table-column>
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
        pagesize: 2,
      },
      problemslist: [],
      total: 0,
      form: {
        num: "",
      },

      // 用户等级
      userlevel: "0",

      isLoading: true,
      // 页面加载
      loading: true,
    };
  },
  created() {
    this.getuserlevel();
  },
  methods: {
    async getProblemList() {
      const { data: res } = await this.$http.get(
        "prob_collection/list?page_no=" + this.queryInfo.pagenum
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.problemslist = res.data;
      this.loading = false
    },
    // 题目个数以及每页题目数量
    async getPageinfo() {
      const { data: res } = await this.$http.get("prob_collection/count");
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
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 获取用户等级
    getuserlevel() {
      if (window.localStorage.getItem("access") <= 1) this.userlevel = 1;
      this.getPageinfo();
    },
    // 搜索题单
    async find_problem_list() {
      const { data: res } = await this.$http.get(
        "prob_collection/find?key=" + this.queryInfo.query
      );
      if (res.meta.status !== 200) {
        return this.$message.error("搜索题目失败！");
      }
      this.problemslist = res.data;
    },
    // 进入题单
    gotohome(row) {
      this.$router.push({ path: "/problemlisthome", query: { id: row.id } });
    },
    // 跳转到添加题单
    addDialogVisible() {
      this.$router.push("/addproblemslist");
    },
  },
};
</script>

<style scoped>
.topicbox {
  position: absolute;
  width: 80%;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.problemlist {
  margin-top: 20px;
}
.up_things {
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
